import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'green',
  onClick,
  active = false
}) => {
  const colorMap = {
    green: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      activeRing: 'ring-2 ring-emerald-600',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    blue: {
      bg: 'bg-blue-50 text-blue-800 border-blue-100',
      activeRing: 'ring-2 ring-blue-600',
      iconBg: 'bg-blue-100 text-blue-700',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      activeRing: 'ring-2 ring-emerald-600',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-800 border-amber-100',
      activeRing: 'ring-2 ring-amber-600',
      iconBg: 'bg-amber-100 text-amber-700',
    },
    rose: {
      bg: 'bg-rose-50 text-rose-800 border-rose-100',
      activeRing: 'ring-2 ring-rose-600',
      iconBg: 'bg-rose-100 text-rose-700',
    },
    indigo: {
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-100',
      activeRing: 'ring-2 ring-indigo-600',
      iconBg: 'bg-indigo-100 text-indigo-700',
    },
  };

  const scheme = colorMap[color] || colorMap.green;

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white border border-slate-200/90 p-3.5 sm:p-5 transition-lift shadow-xs hover:shadow-card hover:border-emerald-300 min-w-0 ${
        active ? scheme.activeRing : ''
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">{title}</p>
          <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            {trend && (
              <span className="text-[10px] sm:text-xs font-bold text-emerald-700">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className={`rounded-xl p-2 sm:p-3 shrink-0 ${scheme.iconBg}`}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        )}
      </div>
    </div>
  );
};
