import { LoginForm } from "@/components/authForms/login-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { DecorativeBackground } from "@/components/decorative-background";
import { Toaster } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      {/* Decorative background elements for left side */}
      <DecorativeBackground side="left" variant="blue" />

      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <div className="absolute top-6 left-6 z-50">
        <a href="#" className="flex items-center gap-3 font-semibold text-lg hover:opacity-80 transition-opacity">
          <div className="flex size-10 items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <Image src="/favicon.ico" alt="SASE Intranet Logo" width={32} height={32} className="rounded-lg" />
          </div>
          <span className="text-gray-800 dark:text-white">SASE Intranet</span>
        </a>
      </div>

  <div className="flex flex-col p-8 md:p-12 lg:p-16 relative z-10 min-h-screen">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-300 text-base">Sign in to access your academic dashboard</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <LoginForm />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Secure access to your educational resources</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-auto">
          <p className="text-xs text-gray-400 dark:text-gray-500">© 2025 SASE Intranet. All rights reserved.</p>
        </div>
      </div>

  <div className="relative hidden lg:block overflow-hidden rounded-l-4xl min-h-screen">
        <Image src="/images/login.jpg" alt="Academic workspace" fill className="object-cover" 
         />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-indigo-600/70 to-slate-800/60"></div>

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-8 max-w-lg">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <Image src="/favicon.ico" alt="SASE Intranet Logo" width={64} height={64} className="rounded-xl" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">SASE Intranet</h2>
              <p className="text-xl text-white/90 leading-relaxed">Streamlined access to coursework, research materials, and collaborative academic tools.</p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-semibold">500+</div>
                <div className="text-sm text-white/80 font-medium">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">50+</div>
                <div className="text-sm text-white/80 font-medium">Course Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">24/7</div>
                <div className="text-sm text-white/80 font-medium">Platform Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
