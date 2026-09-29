import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { DocumentCard } from '../components/documents/DocumentCard';
import { DocumentUploader } from '../components/documents/DocumentUploader';
import { DocumentPreviewDrawer } from '../components/documents/DocumentPreviewDrawer';
import { ProgressBar } from '../components/common/ProgressBar';
import { useApp } from '../context/AppContext';

export const DocumentsPage = () => {
  const { documents } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories = ['all', 'Identity', 'Income', 'Business', 'Bank', 'Address', 'Registration', 'Certificates'];

  const uploadedCount = documents.filter((d) => d.status !== 'Missing').length;
  const totalRequired = documents.length;

  const filteredDocs = selectedCategory === 'all'
    ? documents
    : documents.filter((d) => d.category.toLowerCase() === selectedCategory.toLowerCase());

  const handlePreview = (doc) => {
    setPreviewDoc(doc);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* MAIN HERO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-emerald-700" />
            <span>Citizen Documents Repository</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Documents help verify eligibility deterministically and identify missing statutory certificates.
          </p>
        </div>

        {/* TOP: Document completeness progress */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs w-full sm:w-auto sm:min-w-[280px]">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-semibold text-slate-700">Document Completeness</span>
            <span className="font-bold text-emerald-700 font-mono">
              {uploadedCount} of {totalRequired} Available
            </span>
          </div>
          <ProgressBar value={uploadedCount} max={totalRequired} color="emerald" size="sm" />
        </div>
      </div>

      {/* UPLOAD AREA with 5-stage animation */}
      <DocumentUploader
        onUploadSuccess={(doc) => {
          handlePreview(doc);
        }}
      />

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-smooth ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Documents' : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Showing {filteredDocs.length} files
        </span>
      </div>

      {/* DOCUMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {/* DOCUMENT PREVIEW DRAWER */}
      <DocumentPreviewDrawer
        document={previewDoc}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
