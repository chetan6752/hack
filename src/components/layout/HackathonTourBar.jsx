import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const HackathonTourBar = () => {
  const location = useLocation();

  const demoSteps = [
    { path: '/', label: '0. Landing Page' },
    { path: '/dashboard', label: '1. Dashboard' },
    { path: '/schemes', label: '2. Find Schemes' },
    { path: '/schemes/msme-interest-support', label: '3. Scheme Detail' },
    { path: '/eligibility', label: '4. Rule Evidence' },
    { path: '/schemes/msme-interest-support?tab=benefits', label: '5. Benefit Calc' },
    { path: '/missing-documents', label: '6. Missing Docs' },
    { path: '/review', label: '7. Manual Review' },
    { path: '/application-guide', label: '8. App Guide' },
    { path: '/architecture', label: '9. Architecture' },
  ];

  const currentFull = location.pathname + location.search;

  return (
    <div className="bg-emerald-50/70 border-b border-emerald-200/70 px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs overflow-x-auto gap-4 scrollbar-none select-none">
      <div className="flex items-center gap-2 text-emerald-800 font-bold shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span className="uppercase tracking-wider text-[11px]">Evaluation Flow:</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {demoSteps.map((step, idx) => {
          const isBenefitStep = step.path.includes('tab=benefits');
          const isActive = isBenefitStep
            ? currentFull === step.path
            : location.pathname === step.path.split('?')[0] && !location.search.includes('tab=benefits');

          return (
            <React.Fragment key={step.path}>
              <NavLink
                to={step.path}
                className={`px-2.5 py-1 rounded-md font-semibold transition-smooth whitespace-nowrap text-[11px] ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-100/60'
                }`}
              >
                {step.label}
              </NavLink>
              {idx < demoSteps.length - 1 && (
                <span className="text-slate-300 text-[10px] select-none">›</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
