import React from 'react';
import {
  Layers,
  ArrowDown,
  ShieldCheck
} from 'lucide-react';
import { systemArchitectureLayers } from '../data/mockData';

export const ArchitecturePage = () => {
  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            DevKo Core Engineering Architecture
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Layers className="w-7 h-7 text-emerald-700" />
          <span>System Architecture & Technical Stack</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          End-to-end decoupled pipeline uniting document OCR, semantic policy RAG, deterministic AST evaluation, and human-in-the-loop review.
        </p>
      </div>

      {/* ARCHITECTURE FLOW CARDS */}
      <div className="space-y-4">
        {systemArchitectureLayers.map((layer, idx) => (
          <React.Fragment key={idx}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-emerald-300 transition-smooth">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Layer 0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {layer.layer}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    Technology Stack
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 inline-block">
                    {layer.tech}
                  </span>
                </div>
              </div>
            </div>

            {idx < systemArchitectureLayers.length - 1 && (
              <div className="flex justify-center text-slate-400">
                <ArrowDown className="w-4 h-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* SYSTEM DESIGN PRINCIPLES */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Core Engineering Safeguards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-emerald-800 block">Deterministic AST Over LLMs</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Eligibility is executed with pure Boolean and mathematical AST operators. LLMs are never used for final approval decisions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-amber-800 block">Fail-Safe Human Escalation</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              When documents are outdated or conflict across fiscal years, the system routes cases to caseworker review rather than hallucinating an approval.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-blue-800 block">Verifiable Source Citation</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Every pass or fail metric attaches an auditable link to official Gazette clauses and extracted applicant file checksums.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
