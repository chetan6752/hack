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
      accent: 'from-emerald-500 to-green-400',
      wash: 'from-emerald-500/[0.07]',
      activeRing: 'ring-2 ring-emerald-500/80',
      iconBg: 'bg-emerald-100/80 text-emerald-700',
      valueColor: 'text-emerald-950',
      borderHover: 'hover:border-emerald-300',
    },
    blue: {
      accent: 'from-blue-500 to-indigo-400',
      wash: 'from-blue-500/[0.07]',
      activeRing: 'ring-2 ring-blue-500/80',
      iconBg: 'bg-blue-100/80 text-blue-700',
      valueColor: 'text-slate-900',
      borderHover: 'hover:border-blue-300',
    },
    emerald: {
      accent: 'from-emerald-500 to-teal-400',
      wash: 'from-emerald-500/[0.07]',
      activeRing: 'ring-2 ring-emerald-500/80',
      iconBg: 'bg-emerald-100/80 text-emerald-700',
      valueColor: 'text-emerald-900',
      borderHover: 'hover:border-emerald-300',
    },
    amber: {
      accent: 'from-amber-500 to-yellow-400',
      wash: 'from-amber-500/[0.07]',
      activeRing: 'ring-2 ring-amber-500/80',
      iconBg: 'bg-amber-100/80 text-amber-700',
      valueColor: 'text-slate-900',
      borderHover: 'hover:border-amber-300',
    },
    rose: {
      accent: 'from-rose-500 to-pink-400',
      wash: 'from-rose-500/[0.07]',
      activeRing: 'ring-2 ring-rose-500/80',
      iconBg: 'bg-rose-100/80 text-rose-700',
      valueColor: 'text-slate-900',
      borderHover: 'hover:border-rose-300',
    },
    indigo: {
      accent: 'from-indigo-500 to-purple-400',
      wash: 'from-indigo-500/[0.07]',
      activeRing: 'ring-2 ring-indigo-500/80',
      iconBg: 'bg-indigo-100/80 text-indigo-700',
      valueColor: 'text-slate-900',
      borderHover: 'hover:border-indigo-300',
    },
  };

  const scheme = colorMap[color] || colorMap.green;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 bg-gradient-to-r ${scheme.wash} via-transparent to-transparent p-3.5 sm:p-5 transition-lift shadow-xs hover:shadow-card ${scheme.borderHover} min-w-0 ${
        active ? scheme.activeRing : ''
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Signature vertical left accent bar */}
      <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${scheme.accent} rounded-l-2xl`} />

      <div className="flex items-start justify-between gap-2 sm:gap-3 pl-1">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
            {title}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
            <span className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-mono ${scheme.valueColor}`}>
              {value}
            </span>
            {trend && (
              <span className="text-[10px] sm:text-xs font-bold text-emerald-700">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`rounded-xl p-2 sm:p-2.5 shrink-0 ${scheme.iconBg} shadow-2xs`}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        )}
      </div>
    </div>
  );
};
