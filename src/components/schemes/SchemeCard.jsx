import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, FileCheck, ArrowRight, Building, Sparkles } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';

export const SchemeCard = ({ scheme, isRecommended = false }) => {
  const navigate = useNavigate();
  const { bookmarkedSchemes, toggleBookmark } = useApp();
  const isBookmarked = bookmarkedSchemes.includes(scheme.id);

  return (
    <div className={`relative flex flex-col justify-between rounded-2xl bg-white border transition-all duration-200 p-6 shadow-xs hover:shadow-card ${
      isRecommended
        ? 'border-emerald-300 ring-1 ring-emerald-200/80 bg-gradient-to-b from-emerald-50/20 to-white'
        : 'border-slate-200 hover:border-emerald-400'
    }`}>
      {/* Top Meta Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              {scheme.level}
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              {scheme.category}
            </span>
            {isRecommended && (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                {scheme.relevanceScore}% Match
              </span>
            )}
          </div>

          <button
            onClick={() => toggleBookmark(scheme.id)}
            className={`p-1.5 rounded-lg border transition-smooth ${
              isBookmarked
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Saved to bookmarks' : 'Bookmark scheme'}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Scheme Title & Dept */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-smooth">
          {scheme.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{scheme.department}</span>
        </p>

        {/* Short description */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">
          {scheme.description}
        </p>
      </div>

      {/* Benefits & Status Matrix */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Benefit</span>
            <div className="text-xl font-extrabold text-emerald-700 tracking-tight">
              {scheme.benefit}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Status</span>
            <StatusBadge status={scheme.status} />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{scheme.uploadedDocsCount}/{scheme.requiredDocsCount} Docs ready</span>
          </div>
          <span className="text-[11px] text-slate-400">Verified: {scheme.lastVerified}</span>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/schemes/${scheme.id}`)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-smooth"
          >
            <span>View Scheme & Eligibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
