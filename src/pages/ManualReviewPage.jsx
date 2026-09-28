import React, { useState } from 'react';
import {
  AlertOctagon,
  Clock,
  CheckCircle2,
  FileQuestion,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { StatCard } from '../components/common/StatCard';
import { CaseReviewDrawer } from '../components/review/CaseReviewDrawer';
import { useApp } from '../context/AppContext';

export const ManualReviewPage = () => {
  const { reviewCases } = useApp();
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const pendingCount = reviewCases.filter((c) => c.status === 'Pending').length;
  const inReviewCount = reviewCases.filter((c) => c.status === 'In Review').length;
  const resolvedCount = reviewCases.filter((c) => c.status === 'Resolved').length;
  const docsRequestedCount = reviewCases.filter((c) => c.status === 'Documents Requested').length;

  const filteredCases = statusFilter === 'all'
    ? reviewCases
    : reviewCases.filter((c) => c.status.toLowerCase() === statusFilter.toLowerCase());

  const handleRowClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <AlertOctagon className="w-7 h-7 text-amber-600" />
          <span>Manual Review Center</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Cases with unclear, conflicting, or outdated evidence routed for human-in-the-loop caseworker adjudication.
        </p>
      </div>

      {/* TOP STATS (4 Pillars) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Pending"
          value={pendingCount}
          subtitle="Awaiting officer inspection"
          icon={Clock}
          color="amber"
          active={statusFilter === 'Pending'}
          onClick={() => setStatusFilter(statusFilter === 'Pending' ? 'all' : 'Pending')}
        />
        <StatCard
          title="In Review"
          value={inReviewCount}
          subtitle="Currently under examination"
          icon={AlertTriangle}
          color="blue"
          active={statusFilter === 'In Review'}
          onClick={() => setStatusFilter(statusFilter === 'In Review' ? 'all' : 'In Review')}
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          subtitle="Adjudicated cases"
          icon={CheckCircle2}
          color="emerald"
          active={statusFilter === 'Resolved'}
          onClick={() => setStatusFilter(statusFilter === 'Resolved' ? 'all' : 'Resolved')}
        />
        <StatCard
          title="Documents Requested"
          value={docsRequestedCount}
          subtitle="Notice issued to applicant"
          icon={FileQuestion}
          color="indigo"
          active={statusFilter === 'Documents Requested'}
          onClick={() => setStatusFilter(statusFilter === 'Documents Requested' ? 'all' : 'Documents Requested')}
        />
      </div>

      {/* REVIEW CASES TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Active Discrepancy Queue</h3>
            <p className="text-xs text-slate-500 mt-0.5">Click any case row to inspect side-by-side evidence diffs and take action.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg bg-slate-50 border border-slate-300 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-medium"
            >
              <option value="all">All Cases ({reviewCases.length})</option>
              <option value="Pending">Pending Only</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Documents Requested">Docs Requested</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Case ID</th>
                <th className="py-3.5 px-4">Applicant</th>
                <th className="py-3.5 px-4">Scheme</th>
                <th className="py-3.5 px-4">Flagged Reason</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Created</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => handleRowClick(c)}
                  className="hover:bg-slate-50 cursor-pointer transition-smooth group"
                >
                  <td className="py-4 px-4 font-mono font-bold text-emerald-800">
                    {c.id}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {c.applicantName}
                    <span className="block text-[10px] text-slate-400 font-mono font-normal">{c.applicantId}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium max-w-xs truncate">
                    {c.schemeName}
                  </td>
                  <td className="py-4 px-4 text-amber-900 font-medium max-w-sm">
                    {c.reason}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={c.priority} size="sm" />
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                    {c.createdAt}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(c);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900 hover:underline"
                    >
                      <span>Review Diff</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CASE REVIEW DRAWER */}
      <CaseReviewDrawer
        reviewCase={selectedCase}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
