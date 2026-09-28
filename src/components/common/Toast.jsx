import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white shadow-elevated text-emerald-950',
    warning: 'border-amber-200 bg-white shadow-elevated text-amber-950',
    error: 'border-rose-200 bg-white shadow-elevated text-rose-950',
    info: 'border-blue-200 bg-white shadow-elevated text-blue-950'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-md w-full">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border ${
          borders[toast.type] || borders.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <div className="flex-1 text-xs sm:text-sm font-semibold leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
