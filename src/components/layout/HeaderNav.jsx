import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  CheckCircle2,
  ChevronDown,
  User,
  ShieldCheck,
  Search,
  Sparkles,
  Layers,
  Cpu,
  FileQuestion,
  HelpCircle,
  FileCheck2,
  FileText,
  Clock,
  Compass,
  Landmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeaderNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { applicant, notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const mainLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/schemes', label: 'Find Schemes' },
    { to: '/eligibility', label: 'Eligibility' },
    { to: '/documents', label: 'Documents' },
    { to: '/missing-documents', label: 'Missing Docs' },
    { to: '/review', label: 'Manual Review' },
    { to: '/application-guide', label: 'App Guide' },
    { to: '/tracking', label: 'Tracking' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Policy Hub', icon: ShieldCheck },
    { to: '/architecture', label: 'System Architecture', icon: Layers },
    { to: '/rag-demo', label: 'Policy RAG Flow', icon: Cpu },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-4">
          {/* Brand Logo (myScheme official style) */}
          <NavLink to="/dashboard" className="flex items-center gap-3 shrink-0 group">
            {/* Gov Emblem / Green Seal */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-600 flex items-center justify-center text-white shadow-sm border border-emerald-500/30">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  my<span className="text-emerald-700">Scheme</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                  Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                National Policy & Scheme Discovery Platform
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold transition-smooth whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* More (Admin / Architecture / RAG) Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-emerald-800 hover:bg-slate-50 transition-smooth"
              >
                <span>Tech Hub</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-card border border-slate-200 p-2 z-50 animate-slide-up"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setMoreDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-smooth"
                      >
                        <Icon className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{link.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons: Profile & Notifications */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-smooth relative border border-slate-200"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-elevated p-4 z-50 animate-slide-up">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Alerts & Updates</h4>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.link) {
                            navigate(n.link);
                            setNotificationsOpen(false);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-smooth ${
                          n.read
                            ? 'border-slate-100 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                            : 'border-emerald-200 bg-emerald-50/40 text-slate-800 hover:bg-emerald-50'
                        }`}
                      >
                        <div className="flex justify-between items-center font-semibold mb-1">
                          <span className={n.read ? 'text-slate-700' : 'text-emerald-900 font-bold'}>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{n.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                    <NavLink
                      to="/notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
                    >
                      View all notifications →
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            {/* Citizen Persona Card / Profile Pill */}
            <NavLink
              to="/profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100/60 transition-smooth"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                RS
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">{applicant.name}</span>
                <span className="text-[10px] text-emerald-800 font-semibold leading-none">MSME • {applicant.state}</span>
              </div>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Device Friendly) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-slide-up shadow-elevated">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Navigation Menu
          </p>
          <div className="grid grid-cols-1 gap-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-smooth flex items-center justify-between text-emerald-800 bg-emerald-50 border border-emerald-200"
            >
              <span>← Back to Landing Page</span>
            </NavLink>
            {mainLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl text-xs font-bold transition-smooth flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}

            <div className="pt-2 border-t border-slate-100 my-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Technical Architecture & RAG
              </p>
              {adminLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg"
                  >
                    <Icon className="w-4 h-4 text-emerald-700" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
