import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import { OfficialGovHeader } from './OfficialGovHeader';
import { HeaderNav } from './HeaderNav';
import { HackathonTourBar } from './HackathonTourBar';
import { Toast } from '../common/Toast';

export const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* 1. Official National Gov Bar */}
      <OfficialGovHeader />

      {/* 2. Main Portal Responsive Navigation Header */}
      <HeaderNav />

      {/* 3. Demo / Evaluation Roadmap Ribbon */}
      <HackathonTourBar />

      {/* 4. Spacious & Device-Friendly Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <Outlet />
      </main>

      {/* 5. Official Gov Footer (myScheme style) */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">myScheme - Financial Policy & Assistance Portal</h3>
                <p className="text-[11px] text-slate-500">Ministry of Electronics & IT, National e-Governance Division (NeGD)</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <NavLink to="/" className="hover:text-emerald-800">Landing Page</NavLink>
              <NavLink to="/dashboard" className="hover:text-emerald-800">Dashboard</NavLink>
              <NavLink to="/schemes" className="hover:text-emerald-800">Find Schemes</NavLink>
              <NavLink to="/eligibility" className="hover:text-emerald-800">Eligibility Check</NavLink>
              <NavLink to="/application-guide" className="hover:text-emerald-800">Helpdesk</NavLink>
              <NavLink to="/architecture" className="hover:text-emerald-800">Architecture</NavLink>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>© 2026 Government of India. Designed & Developed for National Hackathon Evaluation.</p>
            <p>Certified Deterministic Evaluation Engine • Zero Hallucinations</p>
          </div>
        </div>
      </footer>

      {/* Global Toast Alerts */}
      <Toast />
    </div>
  );
};
