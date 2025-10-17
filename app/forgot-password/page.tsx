import Image from 'next/image';
import Link from 'next/link';

import { ForgotPasswordForm } from '@/components/authForms/forgot-password-form';
import { DecorativeBackground } from '@/components/decorative-background';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function ForgotPasswordPage() {
  return (
    <div className="relative grid min-h-svh bg-gradient-to-br from-slate-50 to-blue-50 lg:grid-cols-2 dark:from-gray-900 dark:to-slate-800">
      {/* Decorative background elements for left side */}
      <DecorativeBackground side="left" variant="purple" />

      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold transition-opacity hover:opacity-80"
        >
          <div className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <Image
              src="/favicon.ico"
              alt="Astra Learn Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          <span className="text-gray-800 dark:text-white">Astra Learn</span>
        </Link>
      </div>

      <div className="relative z-10 flex flex-col p-8 md:p-12 lg:p-16">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Reset Password
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Don&apos;t worry, we&apos;ll help you get back into your account
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <ForgotPasswordForm />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remember your password?
                <Link
                  href="/login"
                  className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2025 Astra Learn. All rights reserved.
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden rounded-l-4xl lg:block">
        <Image
          src="/images/3.jpg"
          alt="Academic workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-blue-600/70 to-slate-800/60"></div>

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg space-y-8 text-center text-white">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl border border-white/30 bg-white/20 p-4 backdrop-blur-sm">
                <svg
                  className="h-16 w-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl leading-tight font-bold">
                Secure Recovery
              </h2>
              <p className="text-xl leading-relaxed text-white/90">
                Your account security is our priority. We&apos;ll send you a
                secure link to reset your password.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-semibold">256-bit</div>
                <div className="text-sm font-medium text-white/80">
                  Encryption
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">Instant</div>
                <div className="text-sm font-medium text-white/80">
                  Recovery
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">100%</div>
                <div className="text-sm font-medium text-white/80">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
