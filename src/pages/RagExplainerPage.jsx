import React, { useState } from 'react';
import {
  Cpu,
  ArrowDown,
  Search,
  CheckCircle2,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { mockRagQueries } from '../data/mockData';

export const RagExplainerPage = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const activeQuery = mockRagQueries[selectedQueryIndex];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            DevKo Policy RAG & Retrieval Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Cpu className="w-7 h-7 text-emerald-700" />
          <span>Policy RAG & Retrieval Explainer</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Visualizing the deterministic policy retrieval and evidence grounding pipeline.
        </p>
      </div>

      {/* Query Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Select Evaluation Question:
        </span>
        <div className="flex flex-wrap gap-2">
          {mockRagQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedQueryIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-smooth ${
                selectedQueryIndex === idx
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Demo Query 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* PIPELINE VISUALIZATION */}
      <div className="space-y-4 relative">
        {/* Stage 1: User Question */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              Stage 1: Natural Language Question
            </span>
            <Search className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-base font-bold text-slate-900">“{activeQuery.question}”</p>
          <span className="text-[10px] text-slate-400 font-mono">
            Embedded via text-embedding-3-small (1536 dims)
          </span>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-emerald-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Stage 2: Relevant Policy Chunk Retrieval */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
              Stage 2: Semantic Vector Chunk Retrieval
            </span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed">
            {activeQuery.policyChunk}
          </div>
          <span className="text-[10px] text-blue-800 font-mono block font-semibold">
            Retrieved Source: {activeQuery.retrievedSource}
          </span>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-blue-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Stage 3: Deterministic Rule Binding */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
              Stage 3: AST Deterministic Rule Binding
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                Matched Rule ID
              </span>
              <span className="font-mono font-bold text-slate-900">{activeQuery.matchedRule}</span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-800 uppercase font-bold block mb-1">
                Rule Evaluation Result
              </span>
              <span className="font-mono font-extrabold text-emerald-800">
                {activeQuery.deterministicResult}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-700">Applicant Evidence:</span> {activeQuery.applicantEvidenceSummary}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-emerald-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Stage 4: Grounded Plain-Language Answer */}
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Stage 4: Grounded Audited Answer</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
              100% Traceable
            </span>
          </div>

          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
            {activeQuery.generatedAnswer}
          </p>

          <p className="text-[11px] text-emerald-800 italic pt-2 border-t border-emerald-200/80">
            Answer synthesized strictly from retrieved policy evidence without speculative LLM generation.
          </p>
        </div>
      </div>
    </div>
  );
};
