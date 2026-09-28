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
      className={`rounded-2xl bg-white border border-slate-200/90 p-5 transition-all duration-200 shadow-xs hover:shadow-card hover:border-emerald-300 ${
        active ? scheme.activeRing : ''
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            {trend && (
              <span className="text-xs font-bold text-emerald-700">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 font-medium">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className={`rounded-xl p-3 shrink-0 ${scheme.iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};
