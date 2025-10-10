import { type NextRequest, NextResponse } from 'next/server'

const AUTH_API_URL = process.env.AUTH_API_URL || process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8001'

// Routes that should redirect to home if user is authenticated
const authRoutes = [
  '/login',
  '/register',
  '/signup',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/auth',
]

async function checkAuthStatus(request: NextRequest): Promise<boolean> {
  const sessionId = request.cookies.get('session_id')?.value
  
  console.log('🔍 [AUTH CHECK] Session ID:', sessionId ? `${sessionId.substring(0, 8)}...` : 'null')
  
  if (!sessionId) {
    console.log('❌ [AUTH CHECK] No session_id found in cookies')
    return false
  }

  const statusUrl = `${AUTH_API_URL}/auth/status/`
  console.log('🌐 [AUTH CHECK] Making request to:', statusUrl)

  try {
    const response = await fetch(statusUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `session_id=${sessionId}`,
      },
      signal: AbortSignal.timeout(10000),
    })
    
    console.log('📡 [AUTH CHECK] Response status:', response.status)
    
    if (!response.ok) {
      console.log('❌ [AUTH CHECK] Auth status check failed:', response.status)
      return false
    }

    const data = await response.json()
    console.log('📋 [AUTH CHECK] Response data:', JSON.stringify(data))
    const isAuthenticated = data.authenticated === true
    console.log('✅ [AUTH CHECK] Is authenticated:', isAuthenticated)
    
    return isAuthenticated
  } catch (error) {
    console.error('❌ [AUTH CHECK] Auth status check error:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

function clearAuthCookies(response: NextResponse) {
  console.log('🧹 [CLEANUP] Clearing authentication cookies')
  response.cookies.delete('session_id')
  response.cookies.delete('csrftoken')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log('🚀 [MIDDLEWARE] Processing request for:', pathname)
  console.log('🔧 [MIDDLEWARE] AUTH_API_URL:', AUTH_API_URL)

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    console.log('⏭️ [MIDDLEWARE] Skipping middleware for static/API route:', pathname)
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  console.log('🎯 [MIDDLEWARE] Is auth route:', isAuthRoute)
  
  const hasSessionId = !!request.cookies.get('session_id')?.value
  console.log('🍪 [MIDDLEWARE] Has session_id:', hasSessionId)

  let isAuthenticated = false

  // Check authentication status if we have a session_id
  if (hasSessionId) {
    console.log('🔐 [MIDDLEWARE] Checking authentication status...')
    isAuthenticated = await checkAuthStatus(request)
    
    // If session is invalid, clear the cookie
    if (!isAuthenticated) {
      console.log('🚫 [MIDDLEWARE] Session invalid, clearing cookies')
      clearAuthCookies(response)
    }
  } else {
    console.log('⚠️ [MIDDLEWARE] No session_id found, user not authenticated')
  }

  console.log('✅ [MIDDLEWARE] Final authentication status:', isAuthenticated)

  // Redirect unauthenticated users to login (except if already on auth routes)
  if (!isAuthenticated && !isAuthRoute) {
    console.log('🔄 [MIDDLEWARE] Redirecting unauthenticated user to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isAuthenticated) {
    console.log('🔄 [MIDDLEWARE] Redirecting authenticated user away from auth page to /')
    return NextResponse.redirect(new URL('/', request.url))
  }

  console.log('✅ [MIDDLEWARE] Allowing request to proceed')
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}