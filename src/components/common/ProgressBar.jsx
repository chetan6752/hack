import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'green',
  showLabel = false,
  label = '',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorVariants = {
    green: 'bg-emerald-600',
    emerald: 'bg-emerald-600',
    blue: 'bg-blue-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  const heights = {
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="font-semibold text-slate-700">{label}</span>
          <span className="font-bold text-slate-900">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-500 ease-out ${
            colorVariants[color] || colorVariants.green
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
