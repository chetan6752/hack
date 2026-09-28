import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const DocumentCard = ({ document, onPreview }) => {
  const isMissing = document.status === 'Missing';
  const isNeedsReview = document.status === 'Needs review';
  const extractedKeys = Object.keys(document.extractedFields || {});

  return (
    <div className={`flex flex-col justify-between rounded-2xl bg-white border transition-all duration-200 p-5 shadow-xs hover:shadow-card ${
      isMissing
        ? 'border-dashed border-slate-300 bg-slate-50/50'
        : isNeedsReview
        ? 'border-amber-300 ring-1 ring-amber-200'
        : 'border-slate-200 hover:border-emerald-300'
    }`}>
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-xl border ${
              isMissing
                ? 'bg-slate-100 text-slate-400 border-slate-200'
                : isNeedsReview
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {document.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                {document.name}
              </h4>
            </div>
          </div>

          <StatusBadge status={document.status} size="sm" />
        </div>

        {/* File Meta info */}
        <div className="text-xs text-slate-600 space-y-1 mb-4">
          <div className="flex justify-between">
            <span className="text-slate-400">File:</span>
            <span className="font-mono text-slate-700 truncate max-w-[180px] font-medium">{document.fileName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Uploaded:</span>
            <span className="text-slate-700">{document.uploadedAt}</span>
          </div>
          {document.expiryDate && (
            <div className="flex justify-between">
              <span className="text-slate-400">Validity:</span>
              <span className={`font-semibold ${isNeedsReview ? 'text-amber-700' : 'text-slate-700'}`}>
                {document.expiryDate}
              </span>
            </div>
          )}
        </div>

        {/* Extracted Fields Preview Pills */}
        {!isMissing && extractedKeys.length > 0 && (
          <div className="mb-4 pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Extracted Facts ({document.confidence || '98%'} confidence)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {extractedKeys.slice(0, 3).map((key) => (
                <span
                  key={key}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-mono"
                >
                  {key}: <strong className="text-slate-900">{document.extractedFields[key]}</strong>
                </span>
              ))}
              {extractedKeys.length > 3 && (
                <span className="text-[11px] px-1.5 py-0.5 text-emerald-700 font-bold">
                  +{extractedKeys.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        {!isMissing ? (
          <button
            onClick={() => onPreview && onPreview(document)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 py-2 px-3 text-xs font-bold text-slate-700 transition-smooth border border-slate-200"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-700" />
            <span>Inspect Extracted Data</span>
          </button>
        ) : (
          <button
            onClick={() => onPreview && onPreview(document)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 py-2 px-3 text-xs font-bold text-white shadow-xs transition-smooth"
          >
            <span>Upload Document</span>
          </button>
        )}
      </div>
    </div>
  );
};
