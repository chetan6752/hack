import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bell, Sparkles, CheckCheck, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Topbar = () => {
  const { applicant, demoMode, setDemoMode, notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-gov-border bg-gov-dark/95 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left side: Context and identity */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 hidden sm:inline-block">
          DevKo Schemes
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block" />
        <span className="text-xs text-slate-400 font-medium">
          Applicant: <strong className="text-slate-200">{applicant.name}</strong> ({applicant.businessType})
        </span>
      </div>

      {/* Right side: Demo Switcher + Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Verified Persona Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Demo Persona: Rahul (MSME)</span>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono font-bold transition-smooth ${
              demoMode ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {demoMode ? 'Active' : 'Custom'}
          </button>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-smooth border border-transparent hover:border-slate-700"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-gov-surface border border-gov-border shadow-elevated p-4 z-50 animate-slide-up">
              <div className="flex items-center justify-between border-b border-gov-border/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Activity & Alerts</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-smooth"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.link) {
                        navigate(n.link);
                        setShowNotifications(false);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-smooth ${
                      n.read
                        ? 'border-transparent bg-slate-900/40 text-slate-400 hover:bg-slate-900/80'
                        : 'border-blue-500/30 bg-blue-950/20 text-slate-200 hover:bg-blue-950/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span className={n.read ? 'text-slate-300' : 'text-blue-300'}>{n.title}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-gov-border/60 text-center">
                <NavLink
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View all notifications →
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Quick Profile Link */}
        <NavLink
          to="/profile"
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-blue-500/60 transition-smooth"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-glow-sm">
            RS
          </div>
          <span className="text-xs font-semibold text-slate-200 hidden md:inline">Rahul Sharma</span>
        </NavLink>
      </div>
    </header>
  );
};
