import Image from 'next/image';

import { LoginForm } from '@/components/authForms/login-form';
import { DecorativeBackground } from '@/components/decorative-background';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function LoginPage() {
  return (
    <div className="relative grid min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 lg:grid-cols-2 dark:from-gray-900 dark:to-slate-800">
      {/* Decorative background elements for left side */}
      <DecorativeBackground side="left" variant="blue" />

      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <div className="absolute top-6 left-6 z-50">
        <a
          href="#"
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
        </a>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col p-8 md:p-12 lg:p-16">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Sign in to access your academic dashboard
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <LoginForm />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Secure access to your educational resources
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

      <div className="relative hidden min-h-screen overflow-hidden rounded-l-4xl lg:block">
        <Image
          src="/images/login.jpg"
          alt="Academic workspace"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-indigo-600/70 to-slate-800/60"></div>

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg space-y-8 text-center text-white">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl border border-white/30 bg-white/20 p-4 backdrop-blur-sm">
                <Image
                  src="/favicon.ico"
                  alt="Astra Learn Logo"
                  width={64}
                  height={64}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl leading-tight font-bold">Astra Learn</h2>
              <p className="text-xl leading-relaxed text-white/90">
                Streamlined access to coursework, research materials, and
                collaborative academic tools.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-semibold">500+</div>
                <div className="text-sm font-medium text-white/80">
                  Active Students
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">50+</div>
                <div className="text-sm font-medium text-white/80">
                  Course Modules
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">24/7</div>
                <div className="text-sm font-medium text-white/80">
                  Platform Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
