import React from 'react';
import {
  Clock,
  Hash,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { useApp } from '../context/AppContext';

export const TrackingPage = () => {
  const { trackingApplications } = useApp();

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Clock className="w-7 h-7 text-emerald-700" />
          <span>Application Status & Tracking</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor submitted scheme dossiers and departmental verification stages. Simulated for demo prototype.
        </p>
      </div>

      {/* Applications List */}
      <div className="space-y-8">
        {trackingApplications.map((app) => (
          <div
            key={app.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs"
          >
            {/* App Meta Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold mb-1">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Reference: <strong>{app.referenceNumber}</strong></span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{app.schemeName}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Submitted: <strong className="text-slate-800">{app.submittedDate}</strong></span>
                  <span>•</span>
                  <span>Estimated Benefit: <strong className="text-emerald-700 font-mono font-bold">{app.estimatedBenefit}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={app.currentStatus} size="lg" />
              </div>
            </div>

            {/* Official Status Explanation Callout */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs">
              <span className="font-bold text-emerald-900 uppercase tracking-wide block mb-1">
                Current Status Explanation
              </span>
              <p className="text-slate-700 leading-relaxed">
                {app.statusExplanation}
              </p>
            </div>

            {/* 6-Stage Timeline Stepper */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Departmental Milestone Lifecycle
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {app.timeline.map((item, idx) => {
                  const isCompleted = item.status === 'completed';
                  const isActive = item.status === 'active';

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-2 flex flex-col justify-between ${
                        isActive
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-200'
                          : isCompleted
                          ? 'border-slate-200 bg-slate-50/80'
                          : 'border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : isActive
                              ? 'bg-emerald-700 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{item.date}</span>
                        </div>
                        <h5 className="font-bold text-slate-800 text-xs leading-snug">{item.step}</h5>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-snug">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transparency Note */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Demonstration status engine. Production version connects to official state PFMS & API gateways.
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
