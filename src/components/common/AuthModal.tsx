import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, Sparkles, AlertCircle, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalTab,
    closeAuthModal,
    openAuthModal,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    loginAsGuest
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (authModalTab === 'login') {
        if (!email.trim() || !password) {
          throw new Error('Please enter both email and password.');
        }
        await loginWithEmail(email.trim(), password);
      } else {
        if (!name.trim()) {
          throw new Error('Please enter your full name.');
        }
        if (!email.trim() || !password) {
          throw new Error('Please fill in all required fields.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        await signupWithEmail(name.trim(), email.trim(), password);
      }
    } catch (err: any) {
      let msg = err.message || 'Authentication failed. Please try again.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Try signing in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Google sign-in was cancelled.';
      }
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestAuth = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginAsGuest();
    } catch (err: any) {
      setError(err.message || 'Guest sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#E8EEF5]"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-br from-[#101827] via-[#1E293B] to-[#0F172A] p-6 text-white">
            {/* Close Button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF5E1E] to-[#FF8C38] flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Yatri Account</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              {authModalTab === 'login' ? 'Welcome Back, Explorer' : 'Begin Your Indian Journey'}
            </h2>
            <p className="text-xs text-white/75 leading-relaxed">
              {authModalTab === 'login'
                ? 'Sign in to access your saved trips, custom circuits, and live itinerary budgets.'
                : 'Join thousands of yatris saving routes, discovering hidden gems, and planning stress-free.'}
            </p>

            {/* Tab switch */}
            <div className="flex bg-white/10 p-1 rounded-xl mt-5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  openAuthModal('login');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  authModalTab === 'login'
                    ? 'bg-white text-[#101827] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  openAuthModal('signup');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  authModalTab === 'signup'
                    ? 'bg-white text-[#101827] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </motion.div>
            )}

            {/* Google Sign In Quick Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[#D9E2EC] hover:bg-[#F8FAFC] text-sm font-semibold text-[#101827] transition-all shadow-sm active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-[#E8EEF5] w-full" />
              <span className="bg-white px-3 text-[11px] font-medium text-[#8292A2] uppercase tracking-wider">
                or with email
              </span>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authModalTab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-[#334E68] mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#8292A2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Pruthviraj Chawan"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D9E2EC] text-sm text-[#101827] focus:outline-none focus:ring-2 focus:ring-[#FF5E1E]/20 focus:border-[#FF5E1E] transition-all bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#334E68] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8292A2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D9E2EC] text-sm text-[#101827] focus:outline-none focus:ring-2 focus:ring-[#FF5E1E]/20 focus:border-[#FF5E1E] transition-all bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334E68] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8292A2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={authModalTab === 'signup' ? 'Min. 6 characters' : 'Enter password'}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D9E2EC] text-sm text-[#101827] focus:outline-none focus:ring-2 focus:ring-[#FF5E1E]/20 focus:border-[#FF5E1E] transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8292A2] hover:text-[#334E68] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5E1E] to-[#FF8C38] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authModalTab === 'login' ? 'Sign In to Yatri' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Guest Option & Security badge */}
            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleGuestAuth}
                disabled={isSubmitting}
                className="text-xs text-[#627D98] hover:text-[#101827] font-medium transition-colors cursor-pointer underline underline-offset-4 decoration-[#D9E2EC]"
              >
                Continue without sign-up as Guest
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-[#8292A2]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by Firebase Firestore & 256-bit encryption</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
