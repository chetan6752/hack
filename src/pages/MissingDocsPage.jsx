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
            <FileQuestion className="w-7 h-7 text-amber-600" />
            <span>Document Checklist & Gap Analysis</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Resolve missing or outdated documents to unlock pending government financial assistance.
          </p>
        </div>

        {/* Overall Completion */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs min-w-[280px]">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-semibold text-slate-700">Overall Completion</span>
            <span className="font-bold text-emerald-700 font-mono">
              {verifiedCount} / {total} Complete
            </span>
          </div>
          <ProgressBar value={verifiedCount} max={total} color="emerald" size="sm" />
        </div>
      </div>

      {/* PRIORITY SECTION: “What should I upload next?” */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              What should I upload next? (Highest Benefit Unlock)
            </h2>
          </div>
          <span className="text-xs text-amber-800 font-mono font-bold">
            Ranked by Subsidy Potential
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {priorityUploads.map((item) => (
            <div
              key={item.rank}
              className="p-4 rounded-xl border border-amber-200 bg-white space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center font-mono">
                    {item.rank}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono">
                    {item.impact}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{item.why}</p>
              </div>

              <button
                onClick={() => navigate('/documents')}
                className="w-full mt-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 shadow-xs transition-smooth flex items-center justify-center gap-1.5"
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
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Full Applicant Document Dossier</h3>
            <p className="text-xs text-slate-500 mt-0.5">Categorized requirements across Identity, Income, Business, Bank, and Certificates.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
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
                        className="rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 shadow-xs transition-smooth"
                      >
                        Upload Now
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold font-mono text-[11px]">
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
