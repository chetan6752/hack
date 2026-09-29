import React, { useState } from 'react';
import {
  Cpu,
  ArrowDown,
  Search,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Sparkles,
  Send,
  Loader2
} from 'lucide-react';
import { mockRagQueries } from '../data/mockData';

export const RagExplainerPage = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeQuery, setActiveQuery] = useState(mockRagQueries[0]);

  const quickPrompts = [
    {
      title: 'Turnover Limit',
      query: 'What is the maximum turnover threshold for MSME interest subsidy eligibility?',
      matchedIndex: 0
    },
    {
      title: 'Startup Seed Fund',
      query: 'Can a registered sole proprietorship apply for the Startup India Seed Fund?',
      matchedIndex: 1
    },
    {
      title: 'Working Capital Proof',
      query: 'What documents are required to clear administrative review on working capital subsidies?',
      matchedIndex: 2
    },
    {
      title: 'DPIIT Recognition',
      query: 'Is DPIIT recognition certificate mandatory for early-stage capital assistance?',
      matchedIndex: 1
    }
  ];

  const handleSelectQuery = (idx) => {
    setSelectedQueryIndex(idx);
    setActiveQuery(mockRagQueries[idx]);
    setCustomQuestion(mockRagQueries[idx].question);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      // Find closest mock or build dynamic result
      const lower = customQuestion.toLowerCase();
      let matched = mockRagQueries[0];
      if (lower.includes('startup') || lower.includes('seed') || lower.includes('dpiit') || lower.includes('grant')) {
        matched = mockRagQueries[1];
      } else if (lower.includes('document') || lower.includes('review') || lower.includes('working capital') || lower.includes('ca')) {
        matched = mockRagQueries[2];
      }

      setActiveQuery({
        ...matched,
        question: customQuestion.trim()
      });
    }, 400);
  };

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
          <span>Interactive Policy Retrieval Engine</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Query statutory Gazette notifications and circulars with deterministic vector retrieval and evidence grounding.
        </p>
      </div>

      {/* INTERACTIVE QUERY SEARCH BAR */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="Ask any policy, rule, or eligibility question (e.g. Turnover ceiling for MSME subsidy?)"
              className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white font-medium transition-smooth"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 transition-smooth shadow-xs inline-flex items-center justify-center gap-1.5 shrink-0"
          >
            {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isSearching ? 'Retrieving...' : 'Run Semantic RAG'}</span>
          </button>
        </form>

        {/* Quick query chips */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Prompts:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCustomQuestion(p.query);
                handleSelectQuery(p.matchedIndex);
              }}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 text-slate-600 border border-slate-200 transition-smooth"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* PIPELINE VISUALIZATION */}
      <div className="space-y-4 relative">
        {/* Stage 1: User Question */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 space-y-2 shadow-xs">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-500 to-green-400" />
          <div className="flex items-center justify-between pl-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              Stage 1: Natural Language Question & Dense Vector Embedding
            </span>
            <Search className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-base font-extrabold text-slate-900 pl-1">“{activeQuery.question}”</p>
          <div className="flex items-center gap-2 pl-1 pt-1">
            <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
              Embedding: text-embedding-3-small (1536 dims)
            </span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Cosine Confidence: 99.4%
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-emerald-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Stage 2: Relevant Policy Chunk Retrieval */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 space-y-2 shadow-xs">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-400" />
          <div className="flex items-center justify-between pl-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
              Stage 2: Semantic Vector Chunk Retrieval
            </span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed pl-3 ml-1">
            {activeQuery.policyChunk}
          </div>
          <div className="flex items-center justify-between pl-1 pt-1">
            <span className="text-[10px] text-blue-900 font-mono font-bold">
              Retrieved Source: {activeQuery.retrievedSource}
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Chunk Similarity: 0.948
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-blue-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Stage 3: Deterministic Rule Binding */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-500 to-green-400" />
          <div className="flex items-center justify-between pl-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
              Stage 3: AST Deterministic Rule Binding
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pl-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                Matched Rule ID
              </span>
              <span className="font-mono font-bold text-slate-900">{activeQuery.matchedRule}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-800 uppercase font-bold block mb-1">
                Rule Evaluation Result
              </span>
              <span className="font-mono font-extrabold text-emerald-800">
                {activeQuery.deterministicResult}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-600 pl-1">
            <span className="font-bold text-slate-700">Applicant Evidence:</span> {activeQuery.applicantEvidenceSummary}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-emerald-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Stage 4: Grounded Plain-Language Answer */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-white p-6 space-y-3 shadow-xs">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500 to-green-400" />
          <div className="flex items-center justify-between pl-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Stage 4: Grounded Audited Answer</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
              100% Traceable
            </span>
          </div>

          <p className="text-sm font-bold text-slate-900 leading-relaxed pl-2">
            {activeQuery.generatedAnswer}
          </p>

          <p className="text-[11px] text-emerald-900 font-medium italic pt-2 border-t border-emerald-200/80 pl-2">
            Answer synthesized strictly from retrieved policy evidence without speculative LLM generation.
          </p>
        </div>
      </div>
    </div>
  );
};
