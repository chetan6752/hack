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
    <div className={`relative overflow-hidden flex flex-col justify-between rounded-2xl bg-white border transition-lift p-4 sm:p-6 shadow-xs hover:shadow-card-hover min-w-0 ${
      isRecommended
        ? 'border-emerald-300 ring-1 ring-emerald-200/80 bg-gradient-to-b from-emerald-50/25 to-white'
        : 'border-slate-200/90 hover:border-emerald-400/80'
    }`}>
      {/* Signature left accent bar */}
      <div className={`absolute top-0 left-0 bottom-0 w-1 ${
        isRecommended
          ? 'bg-gradient-to-b from-emerald-500 to-teal-400'
          : 'bg-gradient-to-b from-slate-300 to-slate-200 group-hover:from-emerald-400 group-hover:to-green-300'
      } rounded-l-2xl`} />

      {/* Top Meta Header */}
      <div className="pl-1">
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              {scheme.level}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">
              {scheme.category}
            </span>
            {isRecommended && (
              <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>{scheme.relevanceScore}% Match</span>
              </span>
            )}
          </div>

          <button
            onClick={() => toggleBookmark(scheme.id)}
            className={`p-1.5 rounded-xl border transition-smooth shrink-0 ${
              isBookmarked
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Saved to bookmarks' : 'Bookmark scheme'}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Scheme Title & Dept */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-smooth">
          {scheme.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{scheme.department}</span>
        </p>

        {/* Short description */}
        <p className="mt-2.5 sm:mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">
          {scheme.description}
        </p>
      </div>

      {/* Benefits & Status Matrix */}
      <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-slate-100 pl-1">
        <div className="flex items-center justify-between mb-3.5 sm:mb-4 gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Benefit</span>
            <div className="text-lg sm:text-xl font-black text-emerald-700 tracking-tight font-mono">
              {scheme.benefit}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Status</span>
            <StatusBadge status={scheme.status} />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-600 mb-3.5 sm:mb-4 bg-slate-50/80 p-2 sm:p-2.5 rounded-xl border border-slate-200/90">
          <div className="flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium">{scheme.uploadedDocsCount}/{scheme.requiredDocsCount} Docs ready</span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400">Verified: {scheme.lastVerified}</span>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/schemes/${scheme.id}`)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-smooth"
          >
            <span>View Scheme & Eligibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
