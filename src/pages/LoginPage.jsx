import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, Sparkles, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setDemoMode } = useApp();
  const [identifier, setIdentifier] = useState('rahul.sharma@technovacraft.in');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      setOtp('482910');
    } else {
      setDemoMode(true);
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 selection:bg-emerald-600 font-sans">
      {/* Top minimal header */}
      <header className="border-b border-slate-200 bg-white py-3 px-4 sm:px-8 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-xs">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">
              Dev<span className="text-emerald-700">Ko</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
              Schemes
            </span>
          </div>
        </NavLink>
        <NavLink to="/" className="text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-smooth">
          ← Back to Home
        </NavLink>
      </header>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 sm:p-8 max-w-6xl mx-auto w-full gap-8 my-auto">
        {/* Left Side: Product story & Trust */}
        <div className="md:w-1/2 space-y-5 max-w-lg w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-xs border border-emerald-500/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-2xl tracking-tight">
                Dev<span className="text-emerald-700">Ko</span>
              </span>
              <p className="text-xs text-slate-500 font-semibold">Independent Scheme Discovery & Eligibility Intelligence</p>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Discover financial schemes you're eligible for.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Verify your statutory eligibility with authentic document parameters, estimate financial subsidies, and receive step-by-step guidance to apply.
            </p>
          </div>

          <div className="space-y-2.5 pt-1 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Direct cross-referencing with statutory policy circulars</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% deterministic rule evaluation (Zero AI hallucinations)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Independent, privacy-first document and parameter validation</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean White Auth Card */}
        <div className="md:w-1/2 max-w-md w-full">
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-5 sm:p-8 shadow-card space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Secure Citizen Sign In
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-2">Sign In to DevKo</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Access your personalized scheme eligibility dossier and applications.
              </p>
            </div>

            {/* Quick Demo Mode CTA */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Demo Persona Access</span>
                </div>
                <span className="text-[10px] bg-emerald-700 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                  1-Click
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Preloads <strong>Rahul Sharma</strong> (Maharashtra MSME) with 12 schemes, verified certificates, and manual review cases.
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full mt-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 shadow-xs transition-smooth flex items-center justify-center gap-2"
              >
                <span>Instant Demo Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] sm:text-[11px] text-slate-400 uppercase font-mono tracking-wider absolute">
                Or standard sign in
              </span>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleContinue} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number or Email
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@domain.com or +91 98765 43210"
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 transition-smooth shadow-2xs"
                  required
                />
              </div>

              {otpSent && (
                <div className="animate-slide-up space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700">Enter OTP (Demo: 482910)</label>
                    <span className="text-[11px] text-emerald-700 font-bold font-mono">OTP Sent ✓</span>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-2.5 text-xs text-slate-900 font-mono tracking-widest text-center focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2.5 sm:py-3 transition-smooth flex items-center justify-center gap-2"
              >
                <span>{otpSent ? 'Verify OTP & Enter' : 'Continue with OTP'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-1 text-[10px] sm:text-[11px] text-slate-400 flex items-start gap-2 leading-relaxed">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Encrypted session. Documents are evaluated in memory for rule validation and never shared without consent.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
