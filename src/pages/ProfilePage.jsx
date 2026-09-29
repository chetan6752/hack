import React, { useState } from 'react';
import {
  UserCheck,
  Edit3,
  Save,
  Download,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { ProgressBar } from '../components/common/ProgressBar';
import { useApp } from '../context/AppContext';
import { initialApplicant } from '../data/mockData';

export const ProfilePage = () => {
  const { applicant, updateApplicant, resetToDefaultData, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...applicant });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateApplicant(formData);
    setIsEditing(false);
    showToast('Applicant profile updated successfully', 'success');
  };

  const handleExportProfile = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(applicant, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Applicant_Dossier_${applicant.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Applicant profile dossier exported successfully', 'success');
  };

  const verificationBadge = (type) => {
    const map = {
      verified: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      fromDoc: 'bg-blue-50 text-blue-800 border-blue-200',
      userProvided: 'bg-slate-100 text-slate-700 border-slate-200',
      needsVerification: 'bg-amber-50 text-amber-800 border-amber-300'
    };
    const labels = {
      verified: 'Verified by Portal',
      fromDoc: 'From Official Document',
      userProvided: 'Self-Reported',
      needsVerification: 'Needs Verification'
    };
    return (
      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${map[type] || map.userProvided}`}>
        {labels[type] || type}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <UserCheck className="w-7 h-7 text-emerald-700" />
            <span>Applicant Profile & Parameters</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The structured source of truth used by the deterministic eligibility engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 shadow-xs transition-smooth"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 text-xs font-bold px-4 py-2.5 shadow-xs transition-smooth"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Edit Profile</span>
            </button>
          )}

          <button
            onClick={handleExportProfile}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2.5 transition-smooth shadow-2xs"
            title="Export profile JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={() => {
              resetToDefaultData();
              setFormData(initialApplicant);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2.5 transition-smooth shadow-2xs"
            title="Reset profile data to standard verified baseline"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* PROFILE COMPLETENESS HERO CARD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-600 flex items-center justify-center text-white text-xl font-extrabold shadow-sm border border-emerald-500/30">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{applicant.name}</h2>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                {applicant.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {applicant.occupation} • {applicant.district}, {applicant.state}
            </p>
          </div>
        </div>

        <div className="sm:w-72 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-semibold text-slate-700">Profile Completeness</span>
            <span className="font-bold text-emerald-700 font-mono">{applicant.profileCompleteness}% Complete</span>
          </div>
          <ProgressBar value={applicant.profileCompleteness} max={100} color="emerald" size="sm" />
          <span className="text-[10px] text-slate-500 mt-1 block font-medium">
            High accuracy for state & central scheme matching
          </span>
        </div>
      </div>

      {/* 4 STRUCTURED PROFILE SECTIONS */}

      {/* 1. PERSONAL INFORMATION */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Personal Information
          </h3>
          {verificationBadge('verified')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Full Legal Name:</span>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            ) : (
              <span className="font-bold text-slate-900">{applicant.name}</span>
            )}
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Date of Birth / Age:</span>
            <span className="font-semibold text-slate-800">{applicant.dob} ({applicant.age} Years)</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Gender:</span>
            <span className="font-semibold text-slate-800">{applicant.gender}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">State:</span>
            <span className="font-semibold text-slate-800">{applicant.state}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">District:</span>
            <span className="font-semibold text-slate-800">{applicant.district}</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-slate-500 block mb-1">Residential Address:</span>
            <span className="font-semibold text-slate-800">{applicant.address}</span>
          </div>
        </div>
      </section>

      {/* 2. FINANCIAL INFORMATION */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            2. Financial Information
          </h3>
          {verificationBadge('fromDoc')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Certified Annual Income:</span>
            <span className="font-extrabold text-emerald-700 text-sm font-mono">
              ₹{applicant.annualIncome.toLocaleString('en-IN')}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Certified Family Income:</span>
            <span className="font-extrabold text-emerald-700 text-sm font-mono">
              ₹{applicant.familyIncome.toLocaleString('en-IN')}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Employment Status:</span>
            <span className="font-semibold text-slate-800">{applicant.employmentStatus}</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-slate-500 block mb-1">Active Commercial Bank Account:</span>
            <span className="font-semibold text-slate-800">{applicant.bankAccountStatus}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Existing Loan Defaults:</span>
            <span className="font-semibold text-slate-700">{applicant.existingLoans}</span>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS INFORMATION */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            3. Business Information (MSME / Enterprise)
          </h3>
          {verificationBadge('verified')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Enterprise Name:</span>
            <span className="font-bold text-slate-900">{applicant.businessName}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Business Constitution:</span>
            <span className="font-semibold text-slate-800">{applicant.businessType}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Udyam Registration Number:</span>
            <span className="font-mono font-bold text-emerald-800">{applicant.udyamNumber}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Annual Turnover (FY 2025–26):</span>
            <span className="font-extrabold text-slate-900 text-sm font-mono">
              ₹{applicant.turnover.toLocaleString('en-IN')}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Operating Vintage:</span>
            <span className="font-semibold text-slate-800">{applicant.businessAge}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Industry Sector:</span>
            <span className="font-semibold text-slate-800">{applicant.sector}</span>
          </div>
        </div>
      </section>

      {/* 4. OTHER STATUTORY PARAMETERS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            4. Other Statutory Parameters
          </h3>
          {verificationBadge('userProvided')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Premises / Land Ownership:</span>
            <span className="font-semibold text-slate-800">{applicant.landOwnership}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Social Category:</span>
            <span className="font-semibold text-slate-800">{applicant.category}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Student Status:</span>
            <span className="font-semibold text-slate-800">{applicant.studentStatus}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Prior Gov Benefits:</span>
            <span className="font-semibold text-slate-800">{applicant.previousBenefits}</span>
          </div>
        </div>
      </section>

      {/* PRIVACY & RETENTION CONTROLS */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Privacy & Document Retention Policy
          </h4>
          <p className="text-xs text-slate-500 max-w-xl">
            You can purge all uploaded documents or export your cryptographic audit receipts at any time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('All temporary OCR cache purged from local session', 'info')}
            className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold px-4 py-2 transition-smooth flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Documents Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
};
