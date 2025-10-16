import { ForgotPasswordForm } from "@/components/authForms/forgot-password-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { DecorativeBackground } from "@/components/decorative-background";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      {/* Decorative background elements for left side */}
      <DecorativeBackground side="left" variant="purple" />

      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-lg hover:opacity-80 transition-opacity"
        >
          <div className="flex size-10 items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
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

      <div className="flex flex-col p-8 md:p-12 lg:p-16 relative z-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Reset Password
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                Don&apos;t worry, we&apos;ll help you get back into your account
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <ForgotPasswordForm />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remember your password?
                <Link
                  href="/login"
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-auto">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2025 Astra Learn. All rights reserved.
          </p>
        </div>
      </div>

      <div className="relative hidden lg:block overflow-hidden rounded-l-4xl">
        <Image
          src="/images/3.jpg"
          alt="Academic workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-blue-600/70 to-slate-800/60"></div>

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-8 max-w-lg">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <svg
                  className="w-16 h-16 text-white"
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
              <h2 className="text-4xl font-bold leading-tight">
                Secure Recovery
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Your account security is our priority. We&apos;ll send you a
                secure link to reset your password.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-semibold">256-bit</div>
                <div className="text-sm text-white/80 font-medium">
                  Encryption
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">Instant</div>
                <div className="text-sm text-white/80 font-medium">
                  Recovery
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">100%</div>
                <div className="text-sm text-white/80 font-medium">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
