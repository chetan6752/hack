import React from 'react';
import { Drawer } from '../common/Drawer';
import { StatusBadge } from '../common/StatusBadge';
import { FileText, ShieldCheck, Hash, CheckCircle2, AlertTriangle } from 'lucide-react';

export const DocumentPreviewDrawer = ({ document, isOpen, onClose }) => {
  if (!document) return null;

  const isVerified = document.status === 'Verified';
  const isNeedsReview = document.status === 'Needs review';
  const extractedKeys = Object.keys(document.extractedFields || {});

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={document.name}
      subtitle={`Category: ${document.category} • ${document.fileName}`}
      width="max-w-2xl"
    >
      {/* Top Status & Confidence */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-2">
          <StatusBadge status={document.status} size="lg" />
          <span className="text-xs font-semibold text-slate-700">
            OCR Confidence: <strong className="text-slate-900">{document.confidence || '98.5%'}</strong>
          </span>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Ref: {document.id}
        </div>
      </div>

      {/* Document Visual Preview Placeholder */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-6 text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 uppercase font-semibold">
          Digitally Signed Dossier
        </div>

        <div className="mx-auto w-16 h-20 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-500 shadow-xs">
          <FileText className="w-8 h-8 text-emerald-700" />
          <span className="text-[9px] uppercase font-bold mt-1 text-slate-400">PDF DOC</span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">{document.fileName}</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Uploaded: {document.uploadedAt} • File Size: {document.fileSize || '1.8 MB'}
          </p>
        </div>

        {/* Audit Vault Token */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-600 max-w-full truncate shadow-xs">
          <Hash className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">{document.sourceRef || 'SHA256: 8a719bf98...gov.vault'}</span>
        </div>
      </div>

      {/* Extracted Fields Table */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Extracted Key-Value Facts</span>
        </h4>

        {extractedKeys.length > 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden divide-y divide-slate-100 shadow-xs">
            {extractedKeys.map((key) => (
              <div key={key} className="flex items-center justify-between p-3 text-xs hover:bg-slate-50 transition-smooth">
                <span className="font-semibold text-slate-600">{key}</span>
                <span className="font-bold text-slate-900 font-mono text-right">{document.extractedFields[key]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
            No fields extracted yet. Upload this document to trigger OCR.
          </div>
        )}
      </div>

      {/* Verification Notes */}
      {document.verificationNotes && (
        <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
          isNeedsReview
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
        }`}>
          <div className="font-bold uppercase tracking-wider text-[10px] text-slate-500 mb-1 flex items-center gap-1.5">
            {isNeedsReview ? <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            <span>Verification Audit Log</span>
          </div>
          <p>{document.verificationNotes}</p>
        </div>
      )}
    </Drawer>
  );
};
