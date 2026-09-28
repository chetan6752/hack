import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { Drawer } from '../components/common/Drawer';
import { RuleRow } from '../components/schemes/RuleRow';
import { useApp } from '../context/AppContext';

export const EligibilityPage = () => {
  const navigate = useNavigate();
  const { schemes } = useApp();
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const eligibleCount = schemes.filter((s) => s.status === 'Eligible').length;
  const potentialCount = schemes.filter((s) => s.status === 'Potentially Eligible').length;
  const reviewCount = schemes.filter((s) => s.status === 'Manual Review').length;
  const ineligibleCount = schemes.filter((s) => s.status === 'Ineligible').length;

  const handleRowClick = (scheme) => {
    setSelectedScheme(scheme);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <FileCheck2 className="w-7 h-7 text-emerald-700" />
          <span>Eligibility Decision Center</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Every result is evaluated against verified statutory policy rules and applicant documents. Zero probabilistic guesswork.
        </p>
      </div>

      {/* SUMMARY PANEL (4 Pillar Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-emerald-200 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Eligible</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{eligibleCount}</div>
          <p className="text-[11px] text-emerald-700 mt-1 font-medium">All rules verified & active</p>
        </div>

        <div className="p-5 rounded-2xl border border-blue-200 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Potentially Eligible</span>
            <HelpCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{potentialCount}</div>
          <p className="text-[11px] text-blue-700 mt-1 font-medium">Likely match, pending docs</p>
        </div>

        <div className="p-5 rounded-2xl border border-amber-200 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Manual Review</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{reviewCount}</div>
          <p className="text-[11px] text-amber-700 mt-1 font-medium">Conflicting / outdated proof</p>
        </div>

        <div className="p-5 rounded-2xl border border-rose-200 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Ineligible</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{ineligibleCount}</div>
          <p className="text-[11px] text-rose-700 mt-1 font-medium">Statutory criteria mismatch</p>
        </div>
      </div>

      {/* SCHEME-BY-SCHEME ANALYSIS TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Scheme Evaluation Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">Click any row to open rule-by-rule explainability and citations.</p>
          </div>
          <span className="text-xs text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-bold">
            {schemes.length} Schemes Analyzed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Scheme</th>
                <th className="py-3.5 px-4">Eligibility</th>
                <th className="py-3.5 px-4">Rules Checked</th>
                <th className="py-3.5 px-4">Evidence Completeness</th>
                <th className="py-3.5 px-4">Missing Docs</th>
                <th className="py-3.5 px-4">Potential Benefit</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schemes.map((scheme) => (
                <tr
                  key={scheme.id}
                  onClick={() => handleRowClick(scheme)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-smooth group"
                >
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="group-hover:text-emerald-800 transition-smooth">{scheme.name}</div>
                    <span className="text-[11px] text-slate-500 font-normal">{scheme.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={scheme.status} />
                  </td>
                  <td className="py-4 px-4 font-mono font-semibold text-slate-700">
                    {scheme.rules.length} Rules
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-700 font-medium">{scheme.evidenceCompleteness}</span>
                  </td>
                  <td className="py-4 px-4">
                    {scheme.missingDocsCount > 0 ? (
                      <span className="font-bold text-amber-700">{scheme.missingDocsCount} Missing</span>
                    ) : (
                      <span className="text-emerald-700 font-bold">None ✓</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-emerald-700 font-mono text-sm">
                    {scheme.benefit}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(scheme);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900 hover:underline"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STATUS LOGIC EXPLANATION */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Statutory Decision Classification Logic</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-emerald-700 block">ELIGIBLE</span>
            <p className="text-[11px] text-slate-600">All mandatory statutory conditions mathematically & factually verified.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-blue-700 block">POTENTIALLY ELIGIBLE</span>
            <p className="text-[11px] text-slate-600">Candidate satisfies available rules, pending missing document upload.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-amber-700 block">MANUAL REVIEW</span>
            <p className="text-[11px] text-slate-600">Ambiguity, conflicting proof or outdated certificate requiring caseworker review.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-rose-700 block">INELIGIBLE</span>
            <p className="text-[11px] text-slate-600">At least one mandatory condition clearly and definitively fails.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block">INSUFFICIENT INFO</span>
            <p className="text-[11px] text-slate-600">Crucial applicant parameter not recorded in dossier.</p>
          </div>
        </div>
      </div>

      {/* DETAILED ANALYSIS DRAWER */}
      {selectedScheme && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={`Eligibility Audit: ${selectedScheme.name}`}
          subtitle={`${selectedScheme.department} • Status: ${selectedScheme.status}`}
          width="max-w-3xl"
        >
          {/* Top Status & Confidence */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Audited Decision
              </span>
              <StatusBadge status={selectedScheme.status} size="lg" />
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Estimated Benefit
              </span>
              <span className="text-xl font-extrabold text-emerald-700">{selectedScheme.benefit}</span>
            </div>
          </div>

          {/* Rules breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Rule Evaluation Breakdown</span>
              <span className="font-mono text-slate-500 font-normal">{selectedScheme.rules.length} Rules</span>
            </h4>

            {selectedScheme.rules.map((rule, idx) => (
              <RuleRow key={rule.id} rule={rule} index={idx} defaultOpen={true} />
            ))}
          </div>

          {/* Recommended Next Action */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs space-y-2">
            <span className="font-bold text-emerald-800 uppercase tracking-wide">Recommended Next Action</span>
            <p className="text-slate-700 leading-relaxed">
              {selectedScheme.status === 'Eligible'
                ? 'Your dossier is fully verified. Open the Application Guide to complete submission on the official portal.'
                : selectedScheme.status === 'Manual Review'
                ? 'Check the Manual Review Center or upload the requested updated financial year turnover certificate.'
                : selectedScheme.status === 'Potentially Eligible'
                ? 'Upload the missing GST 3B or registration certificate to convert this scheme to Eligible.'
                : 'Review the statutory criterion that failed above to evaluate if your enterprise structure can be updated.'}
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate(`/schemes/${selectedScheme.id}`);
                }}
                className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 transition-smooth shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Open Scheme Full Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
