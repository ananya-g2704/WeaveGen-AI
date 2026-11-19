import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEV_SAMPLE_ACCOUNTS } from '../services/supabaseClient';

export default function LoginPage({ onNavigate }) {
  const { login, isDevMode } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Quick helper to fill demo credentials
  const handleQuickFill = (roleKey) => {
    const acc = DEV_SAMPLE_ACCOUNTS[roleKey];
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
      setErrors({});
      setServerError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(email, password);
      // Navigate to role-selection or dashboard
      onNavigate('dashboard');
    } catch (err) {
      setServerError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Traditional Geometric Weft Lattice Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#7B1113 1px, transparent 1px), radial-gradient(#0D4D4D 1px, #FDFBF7 1px)`,
        backgroundSize: '36px 36px',
        backgroundPosition: '0 0, 18px 18px'
      }} />

      {/* Decorative Gold & Teal Glow */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-heritage-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-heritage-teal/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* Back to Home Button */}
        <button
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-heritage-maroon transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing Page</span>
        </button>

        {/* Logo and Heading */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-heritage-maroon to-heritage-deepMaroon flex items-center justify-center text-heritage-gold shadow-md mx-auto mb-3">
            <svg className="w-7 h-7 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16M8 3v18M16 3v18" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-deepTeal">
            Welcome to WeaveGen AI
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-sans">
            Sign in to access your handloom design workspace
          </p>
        </div>

        {/* Mode Notice Banner */}
        <div className="mt-6">
          {isDevMode ? (
            <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Development Auth Mode Active</span>
                Supabase credentials not configured in <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">.env.local</code>. Click any quick-fill role below to test instantly!
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Connected to Live Supabase Authentication</span>
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="mt-4 bg-white border border-heritage-sand rounded-3xl py-8 px-6 sm:px-10 shadow-xl">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            
            {/* Global Error Banner */}
            {serverError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-heritage-sand focus:border-heritage-deepTeal focus:ring-1 focus:ring-heritage-deepTeal'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset will be sent via Supabase email recovery.')}
                  className="text-xs text-heritage-maroon hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-colors ${
                    errors.password
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-heritage-sand focus:border-heritage-deepTeal focus:ring-1 focus:ring-heritage-deepTeal'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-heritage-deepTeal to-heritage-teal hover:from-heritage-teal hover:to-heritage-deepTeal text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick-Fill Sample Accounts for Testing */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 text-center mb-2.5">
              Quick Test: Select Role Preset
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('artisan')}
                className="py-1.5 px-2 bg-heritage-cream/70 hover:bg-heritage-sand border border-heritage-sand rounded-lg text-[11px] font-medium text-heritage-maroon transition-colors text-center"
              >
                Artisan
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('designer')}
                className="py-1.5 px-2 bg-heritage-cream/70 hover:bg-heritage-sand border border-heritage-sand rounded-lg text-[11px] font-medium text-heritage-deepTeal transition-colors text-center"
              >
                Designer
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="py-1.5 px-2 bg-heritage-cream/70 hover:bg-heritage-sand border border-heritage-sand rounded-lg text-[11px] font-medium text-amber-800 transition-colors text-center"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Switch to Signup */}
          <div className="mt-6 text-center text-xs text-slate-600">
            Don't have an account yet?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="font-semibold text-heritage-maroon hover:underline"
            >
              Create Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
