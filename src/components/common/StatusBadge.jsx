import React from 'react';

export const StatusBadge = ({ status, size = 'md', className = '' }) => {
  const norm = (status || '').toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label = status;

  if (norm.includes('eligible') && !norm.includes('ineligible') && !norm.includes('potentially')) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    dotColor = 'bg-emerald-600';
  } else if (norm.includes('pass')) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    dotColor = 'bg-emerald-600';
  } else if (norm.includes('verified') || norm.includes('active') || norm.includes('resolved') || norm.includes('completed')) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    dotColor = 'bg-emerald-600';
  } else if (norm.includes('ineligible') || norm.includes('fail') || norm.includes('invalid') || norm.includes('expired')) {
    styles = 'bg-rose-50 text-rose-800 border-rose-300';
    dotColor = 'bg-rose-600';
  } else if (norm.includes('review') || norm.includes('amber') || norm.includes('warning') || norm.includes('pending') || norm.includes('high')) {
    styles = 'bg-amber-50 text-amber-800 border-amber-300';
    dotColor = 'bg-amber-600';
  } else if (norm.includes('potential') || norm.includes('processing') || norm.includes('info') || norm.includes('medium')) {
    styles = 'bg-blue-50 text-blue-800 border-blue-300';
    dotColor = 'bg-blue-600';
  } else if (norm.includes('missing')) {
    styles = 'bg-slate-100 text-slate-600 border-slate-300';
    dotColor = 'bg-slate-500';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1 font-bold tracking-tight',
    lg: 'text-xs sm:text-sm px-3.5 py-1.5 font-bold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${styles} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />
      <span>{label}</span>
    </span>
  );
};
