import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Building,
  Bookmark,
  ArrowLeft,
  FileCheck2,
  FileText,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { RuleRow } from '../components/schemes/RuleRow';
import { BenefitCalculator } from '../components/schemes/BenefitCalculator';
import { useApp } from '../context/AppContext';

export const SchemeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { schemes, bookmarkedSchemes, toggleBookmark } = useApp();

  const scheme = schemes.find((s) => s.id === id) || schemes[0];
  const isBookmarked = bookmarkedSchemes.includes(scheme.id);

  const initialTab = searchParams.get('tab') || 'eligibility';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  const tabs = [
    { id: 'overview', label: '1. Overview' },
    { id: 'eligibility', label: '2. Eligibility & Rules' },
    { id: 'benefits', label: '3. Benefit Calculation' },
    { id: 'documents', label: '4. Documents' },
    { id: 'application', label: '5. Application Steps' },
    { id: 'evidence', label: '6. Official Evidence' }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/schemes')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-800 transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Schemes Directory</span>
        </button>
      </div>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                {scheme.level}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {scheme.category}
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500">
                Last Verified: <strong className="text-slate-800">{scheme.lastVerified}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {scheme.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{scheme.department}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleBookmark(scheme.id)}
              className={`p-3 rounded-xl border transition-smooth ${
                isBookmarked
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Save bookmark'}
            >
              <Bookmark className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/application-guide')}
              className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-3 shadow-xs transition-smooth flex items-center gap-2"
            >
              <span>Application Guide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HERO SUMMARY (4 KPI Pillars) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Estimated Benefit
            </span>
            <span className="text-xl font-extrabold text-emerald-700">{scheme.benefit}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Eligibility Status
            </span>
            <StatusBadge status={scheme.status} />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Documents Required
            </span>
            <span className="text-sm font-bold text-slate-900">
              {scheme.uploadedDocsCount} / {scheme.requiredDocsCount} Ready
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Application Mode
            </span>
            <span className="text-xs font-semibold text-slate-700 truncate block">
              {scheme.applicationMode}
            </span>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition-smooth border-b-2 -mb-[1px] ${
              activeTab === tab.id
                ? 'border-emerald-700 text-emerald-800 bg-emerald-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs animate-slide-up">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Program Overview & Purpose</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{scheme.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Target Beneficiaries</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered micro and small enterprises with active Udyam IDs, valid bank accounts in scheduled commercial banks, and compliant tax filings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Disbursement Mechanism</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct Benefit Transfer (DBT) subvention credited directly into the applicant's commercial loan account via Public Financial Management System (PFMS).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. ELIGIBILITY & RULES */}
      {activeTab === 'eligibility' && (
        <div className="space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Deterministic Rule Evaluation</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every statutory condition is evaluated against applicant evidence. Click any rule to audit source citations.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              {scheme.rules.length} Rules Checked
            </span>
          </div>

          <div className="space-y-3">
            {scheme.rules.map((rule, idx) => (
              <RuleRow key={rule.id} rule={rule} index={idx} defaultOpen={idx === 0} />
            ))}
          </div>
        </div>
      )}

      {/* 3. BENEFITS */}
      {activeTab === 'benefits' && (
        <div className="animate-slide-up">
          <BenefitCalculator
            calculationData={scheme.benefitCalculation}
            schemeName={scheme.name}
          />
        </div>
      )}

      {/* 4. DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Required Document Checklist</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Documents needed to verify and complete official application submission.
              </p>
            </div>
            <button
              onClick={() => navigate('/documents')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              Open Documents Hub →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheme.requiredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                    <span className="text-[10px] text-slate-500">
                      {doc.isMandatory ? 'Mandatory Requirement' : 'Optional Supporting'}
                    </span>
                  </div>
                </div>
                <StatusBadge status={doc.status} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. APPLICATION STEPS */}
      {activeTab === 'application' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Application Roadmap</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Step-by-step guidance to submit on the official portal.
              </p>
            </div>
            <a
              href={scheme.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-lg shadow-xs transition-smooth"
            >
              <span>Official Portal (Demo Link)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            {scheme.applicationSteps.map((s) => (
              <div
                key={s.step}
                className={`p-4 rounded-xl border flex items-start gap-4 transition-smooth ${
                  s.active
                    ? 'border-emerald-400 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-300'
                    : s.done
                    ? 'border-slate-200 bg-white'
                    : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  s.done
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : s.active
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {s.done ? '✓' : s.step}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                    {s.active && (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900 font-bold uppercase tracking-wider">
                        Current Step
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. EVIDENCE */}
      {activeTab === 'evidence' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs animate-slide-up">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Auditable Statutory Evidence Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Exact references to official Gazette notifications, ministerial circulars, and verified applicant dossiers.
            </p>
          </div>

          <div className="space-y-4">
            {scheme.rules.map((rule) => (
              <div key={rule.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-800">{rule.id}</span>
                  <StatusBadge status={rule.result} size="sm" />
                </div>
                <p className="text-xs font-bold text-slate-900">{rule.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Policy Source Citation</span>
                    <p className="text-slate-800 font-mono font-semibold">{rule.sourceDocument}</p>
                    <span className="text-[11px] text-emerald-800 font-bold">{rule.sourceSection}, {rule.sourcePage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Applicant Evidence Document</span>
                    <p className="text-slate-800 font-mono font-semibold">{rule.evidenceDocument}</p>
                    <span className="text-[11px] text-emerald-700 font-bold">Verified on {rule.verifiedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
