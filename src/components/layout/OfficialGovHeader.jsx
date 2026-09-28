import React, { useState } from 'react';
import { Globe, HelpCircle, PhoneCall } from 'lucide-react';

export const OfficialGovHeader = () => {
  const [lang, setLang] = useState('English');
  const [fontSize, setFontSize] = useState('normal');

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    if (size === 'small') {
      document.documentElement.style.fontSize = '14px';
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  };

  return (
    <div className="bg-[#f0fdf4] border-b border-emerald-100 text-xs text-slate-700 py-1.5 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Official Gov India declaration */}
        <div className="flex items-center gap-2">
          {/* Subtle Indian Tricolor Pill */}
          <div className="flex h-3 w-4.5 rounded-sm overflow-hidden border border-slate-300 shadow-xs">
            <span className="w-1/3 bg-[#FF9933]" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-[#138808]" />
          </div>
          <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">
            भारत सरकार <span className="text-slate-400 font-normal">|</span> Government of India
          </span>
          <span className="hidden md:inline-block text-[11px] text-slate-500 font-medium">
            (Ministry of Electronics & Information Technology / Digital India)
          </span>
        </div>

        {/* Right: Language, Accessibility, Help */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          {/* Language selector */}
          <button
            onClick={() => setLang(lang === 'English' ? 'हिंदी' : 'English')}
            className="flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 transition-smooth"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang}</span>
          </button>

          <span className="text-slate-300">|</span>

          {/* Font size toggles */}
          <div className="hidden sm:flex items-center gap-1 font-bold text-slate-600">
            <button
              onClick={() => handleFontSizeChange('small')}
              className={`px-1.5 py-0.5 rounded text-[10px] transition-smooth ${fontSize === 'small' ? 'bg-emerald-300 text-emerald-950 font-black' : 'hover:bg-emerald-200/70 text-slate-700'}`}
              title="Smaller text"
            >
              A-
            </button>
            <button
              onClick={() => handleFontSizeChange('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] transition-smooth ${fontSize === 'normal' ? 'bg-emerald-300 text-emerald-950 font-black' : 'hover:bg-emerald-200/70 text-slate-700'}`}
              title="Default text size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`px-1.5 py-0.5 rounded text-xs transition-smooth ${fontSize === 'large' ? 'bg-emerald-300 text-emerald-950 font-black' : 'hover:bg-emerald-200/70 text-slate-700'}`}
              title="Larger text"
            >
              A+
            </button>
          </div>

          <span className="hidden sm:inline-block text-slate-300">|</span>

          <span className="hidden lg:inline-flex items-center gap-1 text-slate-600">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            Toll Free: <strong className="text-slate-800">1800-111-555</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
