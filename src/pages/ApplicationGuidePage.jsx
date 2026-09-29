import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ApplicationGuidePage = () => {
  const navigate = useNavigate();
  const { schemes } = useApp();
  const [selectedSchemeId, setSelectedSchemeId] = useState('msme-interest-support');

  const scheme = schemes.find((s) => s.id === selectedSchemeId) || schemes[0];

  const steps = [
    {
      step: 1,
      title: 'Check Eligibility & Verify Rules',
      status: 'completed',
      whatToDo: 'Run deterministic rule engine against verified applicant parameters and enterprise classification.',
      documentsNeeded: 'Udyam Registration, Aadhaar Card, Income Certificate',
      commonMistake: 'Applying under General category when MSME micro-enterprise quota provides higher subvention.',
      linkPlaceholder: 'DevKo Eligibility Engine (Completed)',
    },
    {
      step: 2,
      title: 'Prepare & Bundle Certified Documents',
      status: 'completed',
      whatToDo: 'Ensure all required documents are digitally signed, in valid date range, and under 25 MB PDF size.',
      documentsNeeded: 'Tehsildar Income Cert (FY 25-26), 6-Month Current Account Statement',
      commonMistake: 'Uploading expired prior-fiscal year CA certificates or blurred unmasked Aadhaar scans.',
      linkPlaceholder: 'Dossier Ready (8 of 10 available)',
    },
    {
      step: 3,
      title: 'Register on Official Government Portal',
      status: 'active',
      whatToDo: 'Visit the official MSME Champions / National Portal. Authenticate using Udyam Registration number and mobile OTP.',
      documentsNeeded: 'Active Mobile phone linked with Aadhaar, Udyam Number',
      commonMistake: 'Creating a duplicate fresh registration instead of linking existing Udyam ID credentials.',
      linkPlaceholder: 'https://champions.gov.in/msme-subvention-demo',
      isOfficialUrl: true
    },
    {
      step: 4,
      title: 'Complete Scheme Application Form',
      status: 'pending',
      whatToDo: 'Select active working capital facility, scheduled commercial bank branch (HDFC Bank), and IFSC code.',
      documentsNeeded: 'Bank Loan Sanction Letter, Branch Code',
      commonMistake: 'Entering savings account details instead of commercial enterprise current/loan account.',
      linkPlaceholder: 'Portal Form Section 2',
    },
    {
      step: 5,
      title: 'Upload Verified Extracted Dossier',
      status: 'pending',
      whatToDo: 'Attach the pre-verified document bundle directly into the portal attachment repository.',
      documentsNeeded: 'Standard PDF Dossier compiled by DevKo',
      commonMistake: 'Attaching password-protected PDF files which fail automated departmental OCR.',
      linkPlaceholder: 'Portal Upload Tab',
    },
    {
      step: 6,
      title: 'Submit & Generate Acknowledgement',
      status: 'pending',
      whatToDo: 'Review summary affidavit, digitally sign or e-Sign with Aadhaar, and click final submit.',
      documentsNeeded: 'Aadhaar OTP for e-Signature',
      commonMistake: 'Closing the browser before receiving the final confirmation screen and receipt token.',
      linkPlaceholder: 'Final Submission Screen',
    },
    {
      step: 7,
      title: 'Save Official Reference Number',
      status: 'pending',
      whatToDo: 'Store acknowledgement slip and reference ID (e.g. MSME-SUB-2026-MH-09821) in your tracking dashboard.',
      documentsNeeded: 'Downloaded PDF Acknowledgement Receipt',
      commonMistake: 'Losing reference number, making bank branch reconciliation slower.',
      linkPlaceholder: 'DevKo Tracking Auto-Sync',
    },
    {
      step: 8,
      title: 'Track Bank Branch Verification & Disbursement',
      status: 'pending',
      whatToDo: 'Monitor 14-day statutory timeline for bank branch manager inspection and PFMS subvention credit.',
      documentsNeeded: 'Tracking Token ID',
      commonMistake: 'Not responding promptly if branch credit officer raises a document clarification request.',
      linkPlaceholder: 'PFMS Direct Benefit Portal',
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-emerald-700" />
            <span>Official Application Roadmap</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Step-by-step verified instructions to navigate official government portals without errors.
          </p>
        </div>

        {/* Scheme Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider shrink-0">Scheme:</span>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="rounded-xl bg-white border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold shadow-xs"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Scheme Banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/90 via-emerald-50/40 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-emerald-500 to-green-400" />
        <div className="pl-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Selected Program Roadmap</span>
          <h2 className="text-lg font-extrabold text-slate-900 mt-1">{scheme.name}</h2>
          <p className="text-xs text-slate-600 mt-0.5">{scheme.department} • Benefit: <span className="font-mono font-bold text-emerald-700">{scheme.benefit}</span></p>
        </div>

        <a
          href={scheme.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white text-xs font-bold px-5 py-3 shadow-xs transition-smooth shrink-0"
        >
          <span>Open Official Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* 8-STEP ROADMAP STEPPER */}
      <div className="space-y-4">
        {steps.map((s) => {
          const isCompleted = s.status === 'completed';
          const isActive = s.status === 'active';

          return (
            <div
              key={s.step}
              className={`relative overflow-hidden rounded-2xl border transition-lift shadow-xs ${
                isActive
                  ? 'border-emerald-500/80 bg-white ring-2 ring-emerald-100/70 shadow-glow-mint'
                  : isCompleted
                  ? 'border-slate-200 bg-white hover:border-emerald-300'
                  : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              {/* Luminous left accent line and ambient wash */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r pointer-events-none ${
                  isActive
                    ? 'from-emerald-500/[0.09] via-emerald-500/[0.02] to-transparent'
                    : isCompleted
                    ? 'from-emerald-500/[0.04] to-transparent'
                    : 'transparent'
                }`}
              />
              <div
                className={`absolute left-0 top-4 bottom-4 w-1.5 rounded-r-full shadow-xs ${
                  isActive
                    ? 'bg-gradient-to-b from-emerald-500 to-green-400'
                    : isCompleted
                    ? 'bg-emerald-500'
                    : 'bg-slate-300'
                }`}
              />

              <div className="relative z-10 p-5 sm:p-6 space-y-4 pl-6 sm:pl-7">
                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isActive
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-700" /> : s.step}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Step 0{s.step}
                        </span>
                        {isActive && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider">
                            Current Action
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider">
                            Ready
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">{s.title}</h3>
                    </div>
                  </div>

                  {/* Portal Link / Status */}
                  <div>
                    {s.isOfficialUrl ? (
                      <a
                        href={s.linkPlaceholder}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-smooth"
                      >
                        <span>Open Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                        {s.linkPlaceholder}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      What To Do
                    </span>
                    <p className="text-slate-700 leading-relaxed">{s.whatToDo}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Documents Needed
                    </span>
                    <p className="text-slate-700 leading-relaxed font-mono font-medium">{s.documentsNeeded}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Common Mistake to Avoid
                    </span>
                    <p className="text-amber-900 leading-relaxed">{s.commonMistake}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
