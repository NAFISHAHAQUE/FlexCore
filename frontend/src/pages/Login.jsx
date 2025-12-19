import React, { useState } from 'react';
import api from '../api';

export default function Login({ onLogin, onBackHome }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Call the login endpoint to set the current user session
      await api.post('/api/profile/login', { email });
      if (onLogin) onLogin();
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920)',
        }}
      />
      
      {/* Blur and Dark Overlay */}
      <div className="fixed inset-0 backdrop-blur-md bg-gradient-to-br from-black/60 via-black/50 to-slate-900/60" />
      
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={onBackHome}
            disabled={!onBackHome}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur disabled:opacity-50"
          >
            <span aria-hidden="true">←</span>
            Back to homepage
          </button>
        </div>
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-10 border border-white/20">
        <div className="mb-8 text-center space-y-3">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-[#f0f5ed] px-5 py-2 text-sm font-medium text-[#7B9669] border border-[#d4e0ce]">
            <span>🔐</span>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            {mode === 'login' ? 'Login to FlexCore' : 'Get Started with FlexCore'}
          </h2>
          <p className="text-slate-600 text-sm max-w-sm mx-auto">
            {mode === 'login'
              ? 'Sign in to sync your plans and progress across devices.'
              : 'Sign up to unlock personalized plans, progress tracking, and history.'}
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#7B9669] focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#7B9669] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Fitness Goal</label>
              <input
                type="text"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#7B9669] focus:outline-none transition-colors"
                placeholder="e.g. Lose fat, build strength"
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !email}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7B9669] to-[#8aa678] hover:from-[#8aa678] hover:to-[#7B9669] disabled:bg-slate-300 disabled:from-slate-300 disabled:to-slate-300 px-6 py-4 text-base font-bold text-white transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          {loading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Create account')}
        </button>

        <div className="mt-6 text-sm text-slate-600 text-center">
          {mode === 'login' ? (
            <>
              New here?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-[#7B9669] hover:text-[#6b8659] underline-offset-2 hover:underline transition-colors"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#7B9669] hover:text-[#6b8659] underline-offset-2 hover:underline transition-colors"
              >
                Log in
              </button>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
