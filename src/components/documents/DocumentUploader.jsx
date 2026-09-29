import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Loader2, Sparkles, FileText, FolderOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DocumentUploader = ({ onUploadSuccess }) => {
  const { addDocument } = useApp();
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('Income');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [extractionResult, setExtractionResult] = useState(null);

  const stages = [
    '1. Uploading document...',
    '2. Reading document (OCR & LayoutLM)...',
    '3. Extracting structured key-value fields...',
    '4. Cross-verifying parameters with statutory policy rules...',
    '5. Verification Completed!'
  ];

  const categories = [
    'Identity',
    'Income',
    'Address',
    'Business',
    'Bank',
    'Registration',
    'Certificates'
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSimulateUpload(file.name.replace(/\.[^/.]+$/, ''), file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    }
  };

  const handleSimulateUpload = (docType = 'Income Certificate', customFileName = null, customSize = '1.9 MB') => {
    setIsProcessing(true);
    setProcessingStage(0);
    setExtractionResult(null);

    // 5-stage timer progression
    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage += 1;
      if (currentStage < 5) {
        setProcessingStage(currentStage);
      } else {
        clearInterval(interval);
        setProcessingStage(4);
        setIsProcessing(false);

        const isIncome = docType.toLowerCase().includes('income');
        const result = {
          id: `doc-${Date.now()}`,
          name: customFileName ? customFileName.replace(/\.[^/.]+$/, '') : (isIncome ? 'Income Certificate (FY 2025–26)' : 'GST 3B Return Q1 2026'),
          fileName: customFileName || (isIncome ? 'Income_Certificate_Verified_FY25_26.pdf' : 'GST_3B_Return_Q1_2026.pdf'),
          category: selectedCategory,
          fileSize: customSize,
          uploadedAt: 'Just now',
          status: 'Verified',
          expiryDate: '31 Mar 2027',
          confidence: '99.2%',
          sourceRef: 'Digital Signature & Parameter Hash Validated',
          extractedFields: isIncome ? {
            "Income detected": "₹3,80,000",
            "Financial year": "2025–26",
            "Name matched": "Yes (Rahul Sharma)",
            "Issuing Officer": "Tehsildar Haveli, Pune",
            "Digital Signature": "Verified (Class 3 SHA256)"
          } : {
            "GSTIN": "27ABCPS1234F1Z5",
            "Tax Period": "Q1 2026 (Apr–Jun)",
            "Gross Turnover": "₹18,00,000",
            "Filing Status": "Filed & Active",
            "Tax Paid": "₹1,62,000"
          },
          verificationNotes: "Document parsed and field values bound to applicant profile."
        };

        setExtractionResult(result);
        addDocument(result);
        if (onUploadSuccess) onUploadSuccess(result);
      }
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-emerald-700" />
            <span>Document Intelligence Uploader</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Supported: PDF, JPG, PNG • Max size: 25 MB • Automated OCR Extraction
          </p>
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg bg-slate-50 border border-slate-300 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Drag & drop upload area */}
      <div className="relative rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/30 p-8 text-center hover:bg-emerald-50/50 transition-all duration-200">
        {!isProcessing && !extractionResult && (
          <div className="space-y-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Drag and drop your official certificate or scan here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                OCR pipeline automatically extracts applicant name, dates, income & registration IDs
              </p>
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-smooth"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Browse File from Device</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateUpload('Income Certificate')}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-300 px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-smooth"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Demo OCR (Income Certificate)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateUpload('GST Return')}
                className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-smooth"
              >
                <span>Upload GST-3B (Missing Doc)</span>
              </button>
            </div>
          </div>
        )}

        {/* 5-Stage Processing Animation */}
        {isProcessing && (
          <div className="space-y-4 py-6">
            <div className="mx-auto w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-emerald-900">
                {stages[processingStage]}
              </p>
              <div className="w-full max-w-md mx-auto bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((processingStage + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Running OCR • LayoutLM Parsing • Tamper Hash Calculation
            </p>
          </div>
        )}

        {/* Post-Upload Extraction Display */}
        {extractionResult && (
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-300 text-left animate-slide-up space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Document Verified & Fields Extracted Successfully</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Confidence: {extractionResult.confidence}
              </span>
            </div>

            {/* Exact highlight fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Detected Income</span>
                <span className="text-base font-extrabold text-slate-900">₹3,80,000</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Financial Year</span>
                <span className="text-base font-extrabold text-emerald-700">2025–26</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">Name Matched</span>
                <span className="text-base font-extrabold text-emerald-800">Yes (Rahul Sharma)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setExtractionResult(null)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 px-3 py-1.5"
              >
                Upload Another Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
