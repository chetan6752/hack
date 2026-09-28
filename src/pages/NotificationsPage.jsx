import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filterType, setFilterType] = useState('all');

  const todayNotifs = notifications.filter(
    (n) => n.timeGroup === 'Today' && (filterType === 'all' || n.type === filterType)
  );

  const earlierNotifs = notifications.filter(
    (n) => n.timeGroup === 'Earlier' && (filterType === 'all' || n.type === filterType)
  );

  const typeIcons = {
    action: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
  };

  const typeBorders = {
    action: 'border-amber-200 bg-amber-50/40',
    info: 'border-blue-200 bg-blue-50/40',
    success: 'border-emerald-200 bg-emerald-50/40',
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-emerald-700" />
            <span>Notifications & Action Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time policy alerts, document gap notices, and caseworker updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 transition-smooth"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Priority Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mr-2">
          Filter by:
        </span>
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'action', label: 'Action Required' },
          { id: 'success', label: 'Verified & Success' },
          { id: 'info', label: 'Information' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilterType(btn.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-smooth ${
              filterType === btn.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* TODAY GROUP */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Today</span>
        </h3>

        {todayNotifs.length > 0 ? (
          <div className="space-y-2.5">
            {todayNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.link) navigate(n.link);
                }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 shadow-xs ${
                  n.read ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50' : `${typeBorders[n.type]} text-slate-800`
                } hover:shadow-card`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5">{typeIcons[n.type]}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-400 mt-2 block font-mono">{n.timestamp}</span>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400 group-hover:text-slate-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-400 text-center">
            No alerts for today matching this filter.
          </div>
        )}
      </div>

      {/* EARLIER GROUP */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span>Earlier</span>
        </h3>

        {earlierNotifs.length > 0 ? (
          <div className="space-y-2.5">
            {earlierNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.link) navigate(n.link);
                }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 shadow-xs ${
                  n.read ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50' : `${typeBorders[n.type]} text-slate-800`
                } hover:shadow-card`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5">{typeIcons[n.type]}</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-400 mt-2 block font-mono">{n.timestamp}</span>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-400 text-center">
            No earlier alerts matching this filter.
          </div>
        )}
      </div>
    </div>
  );
};
