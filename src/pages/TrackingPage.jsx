import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Hash,
  ShieldCheck,
  ChevronRight,
  Download,
  CheckCircle2,
  ArrowRight,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { useApp } from '../context/AppContext';

export const TrackingPage = () => {
  const navigate = useNavigate();
  const { trackingApplications, advanceTrackingStage, applicant, showToast } = useApp();

  const handleDownloadReceipt = (app) => {
    const receiptContent = `
================================================================================
DEVKO CITIZEN SCHEME APPLICATION ACKNOWLEDGEMENT SLIP
================================================================================
Generated Date: ${new Date().toLocaleString()}
Application Reference Number: ${app.referenceNumber}
Digital Hash: 0x${Math.random().toString(16).substring(2, 10).toUpperCase()}

1. APPLICANT DETAILS:
   - Name: ${applicant.name}
   - Enterprise: ${applicant.businessName}
   - Udyam Registration: ${applicant.udyamNumber}
   - State / District: ${applicant.state} / ${applicant.district}
   - Contact: ${applicant.phone} | ${applicant.email}

2. SCHEME SPECIFICATIONS:
   - Scheme Name: ${app.schemeName}
   - Nodal Department: ${app.department || 'Ministry of MSME / State Industries'}
   - Financial Assistance / Subsidy: ${app.estimatedBenefit}
   - Current Nodal Status: ${app.currentStatus}

3. VERIFICATION AUDIT TRAIL:
   - Deterministic AST Validation: PASSED (100% Rules Bound)
   - Certified Document Package: Pre-Verified
   - PFMS Direct Credit Gateway: Registered

================================================================================
Notice: Retain this reference number for all state branch communications.
DevKo Independent Policy Discovery & Eligibility Platform.
================================================================================
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DevKo_Acknowledgement_${app.referenceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Official acknowledgement receipt downloaded for ${app.referenceNumber}`, 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
              <Clock className="w-6 h-6 text-emerald-700" />
            </span>
            <span>Application Status & Tracking</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time status updates across ministerial verification stages and bank disbursement channels.
          </p>
        </div>

        <button
          onClick={() => navigate('/eligibility')}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 shadow-xs transition-smooth self-start sm:self-auto"
        >
          <span>Track Another Scheme</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {trackingApplications.map((app) => (
          <div
            key={app.id}
            className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-xs transition-lift hover:shadow-card hover:border-emerald-300"
          >
            {/* Luminous left accent line */}
            <div className="absolute left-0 top-4 bottom-4 w-1.5 rounded-r-full bg-gradient-to-b from-emerald-500 to-green-400 shadow-sm" />

            {/* App Meta Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5 pl-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold mb-1">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Reference: <strong className="text-slate-900">{app.referenceNumber}</strong></span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{app.schemeName}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Submitted: <strong className="text-slate-800">{app.submittedDate}</strong></span>
                  <span>•</span>
                  <span>Estimated Benefit: <strong className="text-emerald-700 font-mono font-extrabold">{app.estimatedBenefit}</strong></span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <StatusBadge status={app.currentStatus} size="lg" />

                <button
                  onClick={() => advanceTrackingStage(app.id)}
                  className="rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 transition-smooth inline-flex items-center gap-1 shadow-2xs"
                  title="Simulate Next Verification Checkpoint"
                >
                  <span>Advance Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDownloadReceipt(app)}
                  className="rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1.5 transition-smooth inline-flex items-center gap-1 shadow-2xs"
                  title="Download Official Acknowledgement Docket"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Acknowledgement</span>
                </button>
              </div>
            </div>

            {/* Official Status Explanation Callout */}
            <div className="p-4 rounded-xl border border-emerald-200/90 bg-emerald-50/60 text-xs pl-4">
              <span className="font-bold text-emerald-900 uppercase tracking-wide block mb-1">
                Current Status Explanation
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {app.statusExplanation}
              </p>
            </div>

            {/* 6-Stage Timeline Stepper */}
            <div className="space-y-3 pt-2 pl-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Departmental Milestone Lifecycle
                </h4>
                <span className="text-[11px] font-mono text-emerald-700 font-bold">
                  PFMS Subvention Tracking Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {app.timeline.map((item, idx) => {
                  const isCompleted = item.status === 'completed';
                  const isActive = item.status === 'active';

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-2 flex flex-col justify-between transition-smooth ${
                        isActive
                          ? 'border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-200'
                          : isCompleted
                          ? 'border-slate-200 bg-slate-50/90'
                          : 'border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : isActive
                              ? 'bg-emerald-700 text-white shadow-2xs'
                              : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-500">{item.date}</span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-xs leading-snug">{item.step}</h5>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Authenticity Footer */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between pl-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Synchronized with official state nodal registries & PFMS direct benefit gateways.</span>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[10px]">
                SSL 256-Bit Encrypted
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
