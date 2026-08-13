'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardAuthProps {
  onAuthenticate: () => void;
}

export default function DashboardAuth({ onAuthenticate }: DashboardAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemoHint, setShowDemoHint] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Demo authentication logic
      const validEmail = 'admin@remeet.fashion';
      const validPassword = 'password123';

      if (
        (email.trim().toLowerCase() === validEmail || email.trim().toLowerCase() === 'admin@remeet.com') &&
        (password === validPassword || password === 'remeet2026' || password === 'admin')
      ) {
        sessionStorage.setItem('remeet_dashboard_authenticated', 'true');
        onAuthenticate();
      } else {
        setError('Invalid credentials. Use demo credentials or click Quick Demo Sign In.');
        setLoading(false);
      }
    }, 600);
  };

  const handleQuickDemo = () => {
    setEmail('admin@remeet.fashion');
    setPassword('password123');
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('remeet_dashboard_authenticated', 'true');
      onAuthenticate();
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#071912] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#a3e635]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#527661]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(163,230,53,0.12),rgba(255,255,255,0))]" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10 bg-[#0d251c]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/60"
      >
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="mb-4 bg-gradient-to-br from-[#1b3d30] to-[#071912] p-4 rounded-2xl border border-white/10 shadow-lg flex items-center justify-center"
          >
            <Image
              src="/images/common/remeet_footer_logo.png"
              alt="reMeet Logo"
              width={130}
              height={38}
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          </motion.div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
            Protected Store Portal
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">
            Store Management
          </h1>
          <p className="text-xs text-white/60 font-mono mt-1">
            Enter credentials to access live revenue & store analytics
          </p>
        </div>

        {/* Demo Hint Box */}
        <AnimatePresence>
          {showDemoHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-gradient-to-r from-[#173b2c] to-[#0d251c] border border-[#a3e635]/30 rounded-2xl p-3.5 text-xs text-white/90 relative group"
            >
              <button
                type="button"
                onClick={() => setShowDemoHint(false)}
                className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors"
                title="Dismiss"
              >
                ✕
              </button>
              <p className="font-mono text-[#a3e635] font-bold mb-1 flex items-center gap-1.5">
                <span>🔑</span> Demo Login Credentials:
              </p>
              <p className="font-mono text-white/80 text-[11px] leading-tight">
                Email: <span className="text-white font-semibold underline">admin@remeet.fashion</span><br />
                Password: <span className="text-white font-semibold underline">password123</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@remeet.fashion"
                className="w-full bg-[#071912]/80 border border-white/15 focus:border-[#a3e635] text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm transition-all outline-none focus:ring-2 focus:ring-[#a3e635]/20"
              />
              <span className="absolute right-3.5 top-3.5 text-white/30 text-xs">✉️</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#071912]/80 border border-white/15 focus:border-[#a3e635] text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm transition-all outline-none focus:ring-2 focus:ring-[#a3e635]/20"
              />
              <span className="absolute right-3.5 top-3.5 text-white/30 text-xs">🔒</span>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a3e635] text-[#071912] hover:bg-[#b2f046] font-bold py-3 px-4 rounded-xl text-sm transition-all transform active:scale-[0.98] shadow-lg shadow-[#a3e635]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#071912]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <span>→</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡ Quick Demo 1-Click Access</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-[11px] text-white/40 font-mono">
          reMeet Fashion Operations • Encrypted 256-bit SSL
        </div>
      </motion.div>
    </div>
  );
}
