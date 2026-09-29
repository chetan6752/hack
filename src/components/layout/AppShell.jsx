import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { Toast } from '../common/Toast';

export const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* 1. Main Navigation Header */}
      <HeaderNav />

      {/* 2. Spacious & Device-Friendly Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <Outlet />
      </main>

      {/* 3. DevKo Independent Platform Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <span>Dev</span><span className="text-emerald-700">Ko</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">Independent</span>
                </h3>
                <p className="text-[11px] text-slate-500">Independent Scheme Discovery & Eligibility Intelligence Platform</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
              <NavLink to="/" className="hover:text-emerald-800 transition-smooth">Home</NavLink>
              <NavLink to="/dashboard" className="hover:text-emerald-800 transition-smooth">Dashboard</NavLink>
              <NavLink to="/schemes" className="hover:text-emerald-800 transition-smooth">Find Schemes</NavLink>
              <NavLink to="/eligibility" className="hover:text-emerald-800 transition-smooth">Eligibility Check</NavLink>
              <NavLink to="/documents" className="hover:text-emerald-800 transition-smooth">Documents</NavLink>
              <NavLink to="/application-guide" className="hover:text-emerald-800 transition-smooth">Helpdesk</NavLink>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 text-center sm:text-left">
            <p>© 2026 DevKo. Independent Financial Policy Discovery Platform. Not affiliated with or endorsed by any government entity.</p>
            <p>Deterministic Rule Engine • Zero Hallucinations</p>
          </div>
        </div>
      </footer>

      {/* Global Toast Alerts */}
      <Toast />
    </div>
  );
};
