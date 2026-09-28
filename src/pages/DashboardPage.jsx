import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UploadCloud,
  ChevronRight,
  FileCheck2,
  Compass,
  FileQuestion
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { SchemeCard } from '../components/schemes/SchemeCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { useApp } from '../context/AppContext';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { applicant, schemes, documents } = useApp();

  const recommendedSchemes = schemes.slice(0, 3);

  const eligibleCount = schemes.filter((s) => s.status === 'Eligible').length;
  const potentialCount = schemes.filter((s) => s.status === 'Potentially Eligible').length;
  const reviewCount = schemes.filter((s) => s.status === 'Manual Review').length;
  const ineligibleCount = schemes.filter((s) => s.status === 'Ineligible').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner / Header (Clean myScheme Gov Style) */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-xs">
              <span>National Single Window Citizen Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good morning, {applicant.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Based on your registered MSME profile in <strong>{applicant.state}</strong>, you have verified government assistance schemes ready for application.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl px-4 py-3 border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-100 block">Estimated Benefit</span>
              <span className="text-2xl font-black text-white">₹2.45 Lakhs</span>
            </div>
            <button
              onClick={() => navigate('/schemes')}
              className="rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 px-5 py-3 text-xs font-bold transition-smooth shadow-sm flex items-center gap-2"
            >
              <span>Explore Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* TOP KPI ROW (5 distinct cards as specified in Prompt 02 - Clean & Uncrowded) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Applicant Financial Assistance Overview
          </h2>
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Last updated: 24 Sep 2026
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Potential Schemes"
            value="12"
            subtitle="Matched from 42 policies"
            icon={Compass}
            color="green"
            onClick={() => navigate('/schemes')}
          />
          <StatCard
            title="Eligible"
            value="4"
            subtitle="100% verified rules"
            icon={CheckCircle2}
            color="emerald"
            onClick={() => navigate('/eligibility')}
          />
          <StatCard
            title="Needs Review"
            value="3"
            subtitle="Outdated / ambiguous docs"
            icon={AlertTriangle}
            color="amber"
            onClick={() => navigate('/review')}
          />
          <StatCard
            title="Missing Documents"
            value="5"
            subtitle="Blocks ₹3.2L assistance"
            icon={FileQuestion}
            color="rose"
            onClick={() => navigate('/missing-documents')}
          />
          <StatCard
            title="Estimated Benefits"
            value="₹2.45L"
            subtitle="Direct subvention & grants"
            icon={TrendingUp}
            color="green"
            onClick={() => navigate('/schemes/msme-interest-support?tab=benefits')}
          />
        </div>
      </div>

      {/* SECTION A — Recommended for You */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Recommended Schemes for You</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Top curated opportunities based on your enterprise profile and verified documents.
            </p>
          </div>
          <button
            onClick={() => navigate('/schemes')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-smooth"
          >
            <span>View all 12 schemes</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} isRecommended={true} />
          ))}
        </div>
      </section>

      {/* SECTION B & C: Two-Column Split (Eligibility Overview + Action Required) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION B — Eligibility Breakdown */}
        <section className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              <span>Eligibility Status Stack</span>
            </h3>
            <button
              onClick={() => navigate('/eligibility')}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
            >
              Full Matrix →
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  Eligible (Direct Apply)
                </span>
                <span className="font-bold text-emerald-700">{eligibleCount} schemes</span>
              </div>
              <ProgressBar value={eligibleCount} max={12} color="emerald" size="sm" />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  Potentially Eligible (Needs Docs)
                </span>
                <span className="font-bold text-blue-700">{potentialCount} schemes</span>
              </div>
              <ProgressBar value={potentialCount} max={12} color="blue" size="sm" />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Manual Review Required
                </span>
                <span className="font-bold text-amber-700">{reviewCount} schemes</span>
              </div>
              <ProgressBar value={reviewCount} max={12} color="amber" size="sm" />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Ineligible (Criteria Mismatch)
                </span>
                <span className="font-bold text-rose-700">{ineligibleCount} schemes</span>
              </div>
              <ProgressBar value={ineligibleCount} max={12} color="rose" size="sm" />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
            All 12 schemes evaluated against deterministic statutory rules using your verified documents.
          </p>
        </section>

        {/* SECTION C — Action Required */}
        <section className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Pending Action Items</span>
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              3 Tasks Required
            </span>
          </div>

          <div className="space-y-3">
            {/* Task 1 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-smooth flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Upload latest FY 2025-26 CA Turnover Certificate</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Required to clear manual review hold for Small Business Working Capital Subsidy (₹1.2L).
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/documents')}
                className="shrink-0 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-smooth"
              >
                Upload
              </button>
            </div>

            {/* Task 2 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-smooth flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Upload GST 3B Return Q1 2026</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Unlocks eligibility for Startup India Seed Fund Assistance (₹2.0L grant).
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/missing-documents')}
                className="shrink-0 text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-smooth"
              >
                Resolve
              </button>
            </div>

            {/* Task 3 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-smooth flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Complete MSME Champions Application Step 3</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Dossier prepared and verified. Proceed to official portal submission.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/application-guide')}
                className="shrink-0 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-lg transition-smooth shadow-xs"
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION D — Recent Activity Timeline */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Recent Verification Activity</span>
          </h3>
          <span className="text-xs text-slate-400">Past 7 days</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          {[
            { title: 'Income Cert Uploaded', desc: '₹3,80,000 extracted & verified', time: '18 Sep', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { title: '4 Schemes Matched', desc: 'Cross-referenced with rules', time: '20 Sep', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { title: 'Eligibility Evaluated', desc: 'MSME subvention 100% pass', time: '21 Sep', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { title: 'Document Flagged', desc: 'CA turnover FY23-24 outdated', time: '22 Sep', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            { title: 'App Guide Opened', desc: 'Dossier ready for official portal', time: '24 Sep', color: 'bg-slate-50 text-slate-700 border-slate-200' },
          ].map((item, i) => (
            <div key={i} className={`p-3.5 rounded-xl border ${item.color} space-y-1`}>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Milestone 0{i + 1}</span>
                <span>{item.time}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
              <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
