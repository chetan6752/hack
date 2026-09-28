import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  FileCheck2,
  FileText,
  AlertOctagon,
  FileQuestion,
  HelpCircle,
  Clock,
  UserCheck,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const { applicant, reviewCases, documents } = useApp();

  const pendingReviewsCount = reviewCases.filter((c) => c.status === 'Pending' || c.status === 'In Review').length;
  const missingDocsCount = documents.filter((d) => d.status === 'Missing').length;

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/schemes', label: 'Find Schemes', icon: Compass },
    { to: '/eligibility', label: 'My Eligibility', icon: FileCheck2 },
    { to: '/documents', label: 'My Documents', icon: FileText },
    { to: '/missing-documents', label: 'Missing Documents', icon: FileQuestion, badge: missingDocsCount > 0 ? missingDocsCount : null, badgeColor: 'bg-amber-500/20 text-amber-400' },
    { to: '/review', label: 'Manual Review', icon: AlertOctagon, badge: pendingReviewsCount > 0 ? pendingReviewsCount : null, badgeColor: 'bg-rose-500/20 text-rose-400' },
    { to: '/application-guide', label: 'Application Guide', icon: HelpCircle },
    { to: '/tracking', label: 'Track Applications', icon: Clock },
    { to: '/profile', label: 'Applicant Profile', icon: UserCheck },
  ];

  const adminNavItems = [
    { to: '/admin', label: 'Admin Policy Hub', icon: ShieldCheck },
    { to: '/architecture', label: 'System Architecture', icon: Layers },
    { to: '/rag-demo', label: 'Policy RAG Flow', icon: Cpu },
  ];

  return (
    <aside className="w-64 bg-gov-dark border-r border-gov-border flex flex-col shrink-0 h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-gov-border/70 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center shadow-glow-sm border border-blue-400/30 shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              GovAssist AI
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">PRO</span>
          </div>
          <p className="text-xs text-slate-400 truncate font-medium">Policy & Subsidy Engine</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Applicant Portal
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-smooth ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-glow-sm'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Governance & Evaluation
          </p>
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-smooth ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-glow-sm'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Applicant Card Summary in Footer */}
      <div className="p-3 border-t border-gov-border/70 bg-gov-surface/40">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-smooth group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-blue-400 font-bold text-xs group-hover:border-blue-500/50">
            RS
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate">{applicant.name}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">{applicant.profileCompleteness}%</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">MSME • {applicant.state}</p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
