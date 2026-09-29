import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileQuestion,
  UploadCloud,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useApp } from '../context/AppContext';

export const MissingDocsPage = () => {
  const navigate = useNavigate();
  const { documents } = useApp();

  const total = documents.length;
  const verifiedCount = documents.filter((d) => d.status === 'Verified').length;

  const priorityUploads = [
    {
      rank: 1,
      name: "Latest FY 2025-26 CA Turnover Certificate",
      why: "Clears manual review hold on Small Business Working Capital Subsidy (₹1.2L benefit)",
      impact: "High Impact (Unlocks ₹1.2L)",
      action: "Upload Revised Audit"
    },
    {
      rank: 2,
      name: "GST 3B Quarterly Return (Latest Q1 2026)",
      why: "Required for business compliance status under Startup India Seed Fund",
      impact: "Unlocks Seed Program (₹2.0L)",
      action: "Upload GST Return"
    },
    {
      rank: 3,
      name: "DPIIT Startup Recognition Certificate",
      why: "Statutory proof required by Department for Promotion of Industry and Internal Trade",
      impact: "Required for Grant",
      action: "Upload DPIIT Proof"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs">
              <FileQuestion className="w-6 h-6 text-amber-700" />
            </span>
            <span>Document Checklist & Gap Analysis</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Resolve missing or outdated documents to unlock pending government financial assistance.
          </p>
        </div>

        {/* Overall Completion */}
        <div className="relative overflow-hidden p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs w-full sm:w-auto sm:min-w-[280px]">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500 to-green-400" />
          <div className="pl-1">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-slate-700">Overall Completion</span>
              <span className="font-mono font-extrabold text-emerald-700 text-sm">
                {verifiedCount} / {total} Complete
              </span>
            </div>
            <ProgressBar value={verifiedCount} max={total} color="emerald" size="sm" />
          </div>
        </div>
      </div>

      {/* PRIORITY SECTION: “What should I upload next?” */}
      <section className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-amber-50/30 to-white p-4 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-100 text-amber-700">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              What should I upload next? (Highest Benefit Unlock)
            </h2>
          </div>
          <span className="text-[11px] sm:text-xs text-amber-800 font-mono font-bold bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200/60 self-start sm:self-auto">
            Ranked by Subsidy Potential
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {priorityUploads.map((item) => (
            <div
              key={item.rank}
              className="relative overflow-hidden p-5 rounded-2xl border border-amber-200/80 bg-white space-y-3 flex flex-col justify-between shadow-xs transition-lift hover:shadow-card hover:border-amber-300"
            >
              {/* Luminous left accent line and warm glow */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-amber-400/[0.08] to-transparent pointer-events-none" />
              <div className="absolute left-0 top-4 bottom-4 w-1.5 rounded-r-full bg-gradient-to-b from-amber-500 to-yellow-400 shadow-sm" />

              <div className="relative z-10 pl-1.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 text-xs font-black flex items-center justify-center font-mono border border-amber-200/80 shadow-2xs">
                    #{item.rank}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-950 font-mono border border-emerald-200">
                    {item.impact}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.name}</h4>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{item.why}</p>
              </div>

              <button
                onClick={() => navigate('/documents')}
                className="relative z-10 w-full mt-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold py-2.5 shadow-xs transition-smooth flex items-center justify-center gap-1.5"
              >
                <span>{item.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MASTER DOCUMENT AUDIT TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Full Applicant Document Dossier</h3>
            <p className="text-xs text-slate-500 mt-0.5">Categorized requirements across Identity, Income, Business, Bank, and Certificates.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px] text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Requirement / Purpose</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {doc.category}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                    {doc.verificationNotes || 'Statutory verification requirement.'}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={doc.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {doc.status === 'Missing' || doc.status === 'Needs review' ? (
                      <button
                        onClick={() => navigate('/documents')}
                        className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold px-3.5 py-1.5 shadow-xs transition-smooth"
                      >
                        Upload Now
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold font-mono text-[11px] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Verified ✓
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
