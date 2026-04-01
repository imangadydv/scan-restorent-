'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Lock, Mail } from 'lucide-react';
import { useApp } from '@/lib/store';
import { demoLoginOptions } from '@/lib/login-options';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = demoLoginOptions[selectedIndex];
  const [email, setEmail] = useState(selected.email);
  const [password, setPassword] = useState(selected.password);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectRole = (index: number) => {
    setSelectedIndex(index);
    const opt = demoLoginOptions[index];
    setEmail(opt.email);
    setPassword(opt.password);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const success = login(email.trim(), password);
      if (success) {
        const match = demoLoginOptions.find(
          (o) => o.email.toLowerCase() === email.trim().toLowerCase() && o.password === password,
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('userEmail', email.trim());
          localStorage.setItem('userRole', match?.role ?? selected.role);
        }
        router.push(match?.path ?? selected.path);
      } else {
        setError('Invalid email or password. Demo accounts use the credentials shown for each role.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-orange-50 via-white to-amber-50 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-lg">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-orange-100/50 sm:p-8">
          <div className="mb-2 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-500 text-lg font-bold text-white shadow-lg">
              T
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Sign in to Tap2Menu</h1>
            <p className="mt-2 text-sm text-slate-500">
              Choose how you want to sign in, then use the demo credentials or your own.
            </p>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Login as
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {demoLoginOptions.map((option, index) => {
                const Icon = option.icon;
                const isActive = index === selectedIndex;
                return (
                  <button
                    key={option.title}
                    type="button"
                    onClick={() => handleSelectRole(index)}
                    className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                      isActive
                        ? 'border-orange-500 bg-orange-50/80 shadow-md ring-2 ring-orange-200'
                        : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40'
                    }`}
                  >
                    <div
                      className={`mb-1 flex h-10 w-10 items-center justify-center rounded-lg ${
                        isActive
                          ? 'bg-linear-to-br from-orange-500 to-amber-500 text-white'
                          : 'bg-linear-to-br from-orange-100 to-amber-100 text-orange-600'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{option.title}</span>
                    <span className="text-xs text-slate-500 leading-snug">{option.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-900 outline-none ring-orange-500/20 transition focus:border-orange-400 focus:ring-2"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-900 outline-none ring-orange-500/20 transition focus:border-orange-400 focus:ring-2"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Continue to {selected.title}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 rounded-lg bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">
            Demo password for all accounts:{' '}
            <span className="font-mono font-semibold text-orange-600">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
