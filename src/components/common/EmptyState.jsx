import React from 'react';
import { HelpCircle } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = HelpCircle,
  title = 'No schemes found',
  description = 'Try adjusting your search query or filter tags to discover more official opportunities.',
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-10 sm:p-14 text-center shadow-xs">
      <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700 mb-4 border border-emerald-100">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-smooth"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
