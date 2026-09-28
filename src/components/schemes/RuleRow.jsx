import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const RuleRow = ({ rule, index, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isPass = rule.result === 'PASS';
  const isFail = rule.result === 'FAIL';
  const isReview = rule.result === 'REVIEW';

  const statusIcons = {
    PASS: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    FAIL: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    REVIEW: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
  };

  const borderStyles = {
    PASS: 'border-slate-200 border-l-4 border-l-emerald-600 bg-white hover:border-slate-300',
    FAIL: 'border-slate-200 border-l-4 border-l-rose-600 bg-white hover:border-slate-300',
    REVIEW: 'border-slate-200 border-l-4 border-l-amber-600 bg-white hover:border-slate-300',
  };

  return (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden shadow-xs ${borderStyles[rule.result] || 'border-slate-200 bg-white'}`}>
      {/* Clickable Summary Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 cursor-pointer flex items-center justify-between gap-4 select-none"
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          {statusIcons[rule.result]}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                {rule.id}
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium truncate">
                {rule.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {rule.description}
            </p>
          </div>
        </div>

        {/* Quick Values & Badges */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:block text-right">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Applicant:</div>
            <div className="text-xs font-bold text-slate-800">{rule.applicantValue}</div>
          </div>
          <StatusBadge status={rule.result} size="sm" />
          <div className="text-slate-400 p-1 rounded-md hover:bg-slate-100 transition-smooth">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expandable Evidence & Explanation Block */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5 space-y-4 animate-slide-up text-slate-700">
          {/* Rule Evaluation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Official Policy Threshold</span>
              <span className="font-bold text-slate-800">{rule.expectedValue}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Applicant Extracted Fact</span>
              <span className="font-bold text-slate-900">{rule.applicantValue}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Rule Engine Result</span>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusBadge status={rule.result} size="sm" />
                <span className="text-[11px] text-slate-500 font-mono">Operator: {rule.operator}</span>
              </div>
            </div>
          </div>

          {/* Plain Language "Why this decision" explanation */}
          <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                {isPass ? 'Why it passed' : isFail ? 'Why it failed' : 'Why manual review is required'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {rule.reason}
            </p>
          </div>

          {/* Auditable Source and Evidence Citation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>
                Evidence: <strong className="text-slate-800 font-mono">{rule.evidenceDocument}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-slate-600">
              <span>{rule.sourceDocument}</span>
              <span>•</span>
              <span className="text-emerald-800 font-semibold">{rule.sourceSection}, {rule.sourcePage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
