import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, Feather, Palette, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../components/auth/roleConfig';

export default function SignupPage({ onNavigate }) {
  const { signup, isDevMode } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('designer');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
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
      await signup(fullName, email, password, selectedRole);
      onNavigate('role-selection');
    } catch (err) {
      setServerError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#7B1113 1px, transparent 1px), radial-gradient(#0D4D4D 1px, #FDFBF7 1px)`,
        backgroundSize: '36px 36px',
        backgroundPosition: '0 0, 18px 18px'
      }} />

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        
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
            Create Your WeaveGen Account
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-sans">
            Join the community of master artisans, textile designers, and researchers
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-6 bg-white border border-heritage-sand rounded-3xl py-8 px-6 sm:px-10 shadow-xl">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            
            {/* Global Error Banner */}
            {serverError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Role Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Select Your Primary Persona
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {USER_ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'border-heritage-deepTeal bg-heritage-deepTeal/5 ring-1 ring-heritage-deepTeal'
                          : 'border-heritage-sand bg-heritage-cream/40 hover:bg-heritage-sand/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-heritage-deepTeal text-white' : 'bg-white text-slate-600 border border-heritage-sand'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-serif font-bold text-slate-800">{role.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Weaver / Priya Sharma"
                  className={`block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-colors ${
                    errors.fullName
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-heritage-sand focus:border-heritage-deepTeal'
                  }`}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-heritage-sand focus:border-heritage-deepTeal'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>}
            </div>

            {/* Password and Confirm Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className={`block w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-colors ${
                      errors.password
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-heritage-sand focus:border-heritage-deepTeal'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className={`block w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-colors ${
                      errors.confirmPassword
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-heritage-sand focus:border-heritage-deepTeal'
                    }`}
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-heritage-maroon to-heritage-deepMaroon hover:from-heritage-deepMaroon hover:to-heritage-maroon text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </span>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="font-semibold text-heritage-deepTeal hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
