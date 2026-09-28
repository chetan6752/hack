import React, { useState } from 'react';
import { Drawer } from '../common/Drawer';
import { StatusBadge } from '../common/StatusBadge';
import { CheckCircle, XCircle, FileQuestion, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CaseReviewDrawer = ({ reviewCase, isOpen, onClose }) => {
  const { updateReviewCaseStatus } = useApp();
  const [officerNote, setOfficerNote] = useState('');

  if (!reviewCase) return null;

  const handleAction = (status) => {
    updateReviewCaseStatus(reviewCase.id, status, officerNote);
    setOfficerNote('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Review Case: ${reviewCase.id}`}
      subtitle={`${reviewCase.schemeName} • Applicant: ${reviewCase.applicantName}`}
      width="max-w-3xl"
    >
      {/* Case Header & Flags */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Flagged Issue</span>
          <p className="text-sm font-bold text-amber-950 mt-0.5">{reviewCase.reason}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={reviewCase.priority} size="sm" />
          <StatusBadge status={reviewCase.status} size="sm" />
        </div>
      </div>

      {/* Side-by-Side: Applicant Evidence vs Official Rule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT: Applicant Evidence */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Applicant Evidence
            </span>
            <span className="text-[10px] font-mono text-slate-500">{reviewCase.applicantEvidence.uploadedDate}</span>
          </div>

          <div className="text-xs space-y-2">
            <div>
              <span className="text-slate-500 block mb-0.5">Uploaded File:</span>
              <span className="font-mono font-semibold text-slate-900">{reviewCase.applicantEvidence.documentName}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">OCR Extracted Finding:</span>
              <span className="font-mono font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                {reviewCase.applicantEvidence.extractedValue}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Applicant Self-Reported:</span>
              <span className="font-semibold text-slate-800">{reviewCase.applicantEvidence.selfReportedTurnover}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 text-slate-700">
              <span className="text-[10px] font-bold text-slate-500 block mb-1">Discrepancy Note:</span>
              <p className="text-[11px] leading-relaxed text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                {reviewCase.applicantEvidence.discrepancyNote}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Official Policy Rule */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Official Scheme Rule
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">{reviewCase.officialRule.ruleId}</span>
          </div>

          <div className="text-xs space-y-2">
            <div>
              <span className="text-slate-500 block mb-0.5">Mandatory Requirement:</span>
              <p className="font-semibold text-slate-800 leading-snug">
                {reviewCase.officialRule.requirement}
              </p>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Statutory Source:</span>
              <span className="font-mono text-emerald-800 text-[11px] font-semibold">
                {reviewCase.officialRule.policySource}
              </span>
            </div>
            <div className="pt-2 border-t border-emerald-200/80">
              <span className="text-[10px] font-bold text-slate-500 block mb-1">Recommended Resolution:</span>
              <p className="text-[11px] leading-relaxed text-emerald-900 bg-white p-2.5 rounded-lg border border-emerald-200">
                {reviewCase.officialRule.actionNeeded}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Automatic Decision was Blocked */}
      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 text-xs">
        <div className="flex items-center gap-2 mb-1 font-bold text-rose-800 uppercase tracking-wide">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Why Automatic Decision was Blocked</span>
        </div>
        <p className="text-slate-700 leading-relaxed">
          {reviewCase.blockedReason}
        </p>
      </div>

      {/* Reviewer Action Console */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Caseworker Adjudication Console
        </h4>

        <div>
          <label className="text-xs text-slate-600 block mb-1.5 font-medium">
            Officer Evaluation Note / Clarification Request:
          </label>
          <textarea
            value={officerNote}
            onChange={(e) => setOfficerNote(e.target.value)}
            placeholder="e.g. Verified with GST portal reconciliation or Requested FY 2025-26 CA certificate..."
            className="w-full rounded-xl bg-white border border-slate-300 p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 h-20 resize-none shadow-xs"
          />
        </div>

        {/* 5 Caseworker Actions */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => handleAction('Resolved')}
            className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-smooth shadow-xs"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Verify</span>
          </button>

          <button
            onClick={() => handleAction('Documents Requested')}
            className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-smooth shadow-xs"
          >
            <FileQuestion className="w-3.5 h-3.5" />
            <span>Request Doc</span>
          </button>

          <button
            onClick={() => handleAction('Ineligible')}
            className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-smooth shadow-xs"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Ineligible</span>
          </button>

          <button
            onClick={() => handleAction('Eligible')}
            className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-smooth shadow-xs"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Eligible</span>
          </button>

          <button
            onClick={() => handleAction('Escalated')}
            className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-smooth shadow-xs"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Escalate</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
};
