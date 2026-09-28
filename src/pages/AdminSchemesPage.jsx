import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  FileText,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Database
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { StatCard } from '../components/common/StatCard';
import { mockPolicyKnowledgeBase } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AdminSchemesPage = () => {
  const { schemes, showToast } = useApp();
  const [selectedScheme, setSelectedScheme] = useState(schemes[0]);

  const rules = selectedScheme?.rules || [];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-emerald-700" />
            <span>Policy & Rule Administration Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transform natural-language Gazette notifications and ministerial circulars into structured deterministic rules.
          </p>
        </div>

        <button
          onClick={() => showToast('New policy ingestion wizard opened (Simulated)', 'info')}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 shadow-xs transition-smooth"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ingest New Policy Circular</span>
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Policies"
          value={schemes.length}
          subtitle="Active in engine"
          icon={Layers}
          color="emerald"
        />
        <StatCard
          title="Active Rules"
          value="48"
          subtitle="Deterministic AST nodes"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Gazette Documents"
          value={mockPolicyKnowledgeBase.length}
          subtitle="Full-text indexed"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Pending Review"
          value="1"
          subtitle="State circular update"
          icon={AlertTriangle}
          color="amber"
        />
      </div>

      {/* SECTION 1: SCHEME SELECTION & STATUS TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Active Scheme Policies</h3>
            <p className="text-xs text-slate-500 mt-0.5">Select a policy to inspect its structured rule AST.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Scheme Name</th>
                <th className="py-3 px-4">Ministry / Department</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Rules Extracted</th>
                <th className="py-3 px-4">Last Verified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schemes.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedScheme(s)}
                  className={`cursor-pointer transition-smooth ${
                    selectedScheme.id === s.id ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <span className={selectedScheme.id === s.id ? 'text-emerald-800 font-extrabold' : ''}>
                      {s.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{s.department}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-semibold">
                      {s.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                    {s.rules.length} Rules
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{s.lastVerified}</td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Policy verification refreshed for ${s.name}`, 'success');
                      }}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: STRUCTURED POLICY RULE BUILDER / VIEWER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Deterministic Rule AST Representation
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {selectedScheme.name}
            </h3>
          </div>
          <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold">
            AST Syntax: Structured Boolean
          </span>
        </div>

        <div className="space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800">{rule.id}</span>
                <span className="text-xs font-bold text-slate-800">{rule.name}</span>
              </div>

              {/* Structured JSON-like breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200 font-mono">
                <div>
                  <span className="text-slate-400 block mb-0.5">Target Field:</span>
                  <span className="text-emerald-700 font-bold">field = "{rule.field}"</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Operator:</span>
                  <span className="text-amber-700 font-bold">operator = "{rule.operator}"</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Expected Value:</span>
                  <span className="text-blue-700 font-bold">threshold = "{rule.expectedValue}"</span>
                </div>
              </div>

              {/* Source Document Citation Panel */}
              <div className="text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>
                    Statutory Source: <strong className="text-slate-800">{rule.sourceDocument}</strong>
                  </span>
                </div>
                <div className="font-mono text-slate-600 text-[11px]">
                  {rule.sourceSection}, {rule.sourcePage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: POLICY SOURCE KNOWLEDGE BASE */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-700" />
              <span>Gazette Knowledge Base Library</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Official ministerial publications and Gazette notifications indexed in the knowledge base.</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {mockPolicyKnowledgeBase.length} Indexed Gazettes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPolicyKnowledgeBase.map((kb) => (
            <div key={kb.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{kb.title}</h4>
                <StatusBadge status="Verified" size="sm" />
              </div>
              <p className="text-[11px] text-slate-600">{kb.summary}</p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-200">
                <span>{kb.version} • {kb.pages} Pages</span>
                <span className="text-emerald-800 font-bold">{kb.extractedRulesCount} Rules Extracted</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
