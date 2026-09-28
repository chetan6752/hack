import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, Sparkles, Landmark } from 'lucide-react';
import { OfficialGovHeader } from '../components/layout/OfficialGovHeader';
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
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 selection:bg-emerald-600">
      <OfficialGovHeader />

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 sm:p-8 max-w-6xl mx-auto w-full gap-8 my-auto">
        {/* Left Side: Product story & Trust */}
        <div className="md:w-1/2 space-y-6 max-w-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-600 flex items-center justify-center text-white shadow-xs">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-2xl tracking-tight">
                my<span className="text-emerald-700">Scheme</span>
              </span>
              <p className="text-xs text-slate-500 font-semibold">National Scheme Discovery & Eligibility Assistant</p>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Discover government schemes you're eligible for.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Verify your statutory eligibility with authentic document evidence, estimate government subsidies, and receive step-by-step guidance to apply.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Direct linking with official Ministry Gazette circulars</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% deterministic rule evaluation (Zero AI hallucinations)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Integrated with MeriPehchaan (National Single Sign-On)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean White Auth Card */}
        <div className="md:w-1/2 max-w-md w-full">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                MeriPehchaan SSO
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-2">Citizen Sign In</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your registered mobile or email to access your scheme dossier.
              </p>
            </div>

            {/* Quick Demo Mode CTA for Judges */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Hackathon Demo Access</span>
                </div>
                <span className="text-[10px] bg-emerald-700 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                  1-Click
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
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
              <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-mono tracking-wider absolute">
                Or standard sign in
              </span>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleContinue} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number / Email / MeriPehchaan ID
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@domain.com or +91 XXXXX XXXXX"
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 transition-smooth shadow-2xs"
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
                className="w-full rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-3 transition-smooth flex items-center justify-center gap-2"
              >
                <span>{otpSent ? 'Verify OTP & Enter' : 'Continue with OTP'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-400 flex items-start gap-2 leading-relaxed">
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
