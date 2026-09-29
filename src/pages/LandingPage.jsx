import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Building,
  Briefcase,
  GraduationCap,
  Landmark,
  Coins,
  ChevronRight,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  ChevronDown,
  Layers,
  Heart,
  Home,
  Laptop,
  Users,
  Award,
  ExternalLink,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quick Demographic Match state
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedAge, setSelectedAge] = useState('29');
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedOccupation, setSelectedOccupation] = useState('MSME Owner');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  const categories = [
    { title: 'Business & Entrepreneurship', count: '14 Schemes', icon: Briefcase, color: 'bg-emerald-50 text-emerald-800 border-emerald-200', filter: 'Credit & Subsidies' },
    { title: 'Banking, Finance & Insurance', count: '8 Schemes', icon: Landmark, color: 'bg-blue-50 text-blue-800 border-blue-200', filter: 'Working Capital Subsidy' },
    { title: 'Grants, Subsidies & Credit', count: '12 Schemes', icon: Coins, color: 'bg-amber-50 text-amber-800 border-amber-200', filter: 'Grants & Subsidies' },
    { title: 'Education & Learning', count: '6 Schemes', icon: GraduationCap, color: 'bg-purple-50 text-purple-800 border-purple-200', filter: 'Early Stage Equity & Seed Grant' },
    { title: 'Skills & Employment', count: '9 Schemes', icon: Award, color: 'bg-indigo-50 text-indigo-800 border-indigo-200', filter: 'Credit & Subsidies' },
    { title: 'Health & Wellness', count: '5 Schemes', icon: Heart, color: 'bg-rose-50 text-rose-800 border-rose-200', filter: 'Grants & Subsidies' },
    { title: 'Science, IT & Modernization', count: '7 Schemes', icon: Laptop, color: 'bg-teal-50 text-teal-800 border-teal-200', filter: 'Capital Subsidy' },
    { title: 'Social Welfare & Empowerment', count: '11 Schemes', icon: Users, color: 'bg-orange-50 text-orange-800 border-orange-200', filter: 'Working Capital Subsidy' },
  ];

  const faqs = [
    {
      q: 'What is DevKo and how does it work?',
      a: 'DevKo is an independent discovery and eligibility intelligence platform for financial policies, grants, and subsidies. DevKo is not affiliated with or bound to any government department or third-party portal. It evaluates your enterprise parameters against publicly published statutory criteria using deterministic rules.'
    },
    {
      q: 'How does DevKo verify my eligibility?',
      a: 'The platform evaluates verified key-value facts (such as annual turnover, certified income, Udyam registration ID, and state domicile) from your documents against deterministic Boolean rules cited directly from official circulars. It does not use speculative generative AI to guess eligibility.'
    },
    {
      q: 'Can small businesses and MSME proprietors find schemes on DevKo?',
      a: 'Yes. DevKo features comprehensive coverage for MSME interest subventions, technology modernization incentives, capital subsidies, and working capital relief programs.'
    },
    {
      q: 'What should I do if a document is outdated or flagged?',
      a: 'If a document requires clarification (such as a prior-year CA turnover audit), the case is seamlessly highlighted in the Review Center with specific instructions on required updates.'
    },
    {
      q: 'Do I have to pay any fee to use DevKo?',
      a: 'No. DevKo is a free, independent platform built to make financial policy discovery and eligibility criteria transparent and accessible to every citizen and entrepreneur.'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/schemes');
    }
  };

  const handleQuickMatch = (e) => {
    e.preventDefault();
    navigate('/eligibility');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-600 font-sans">
      {/* 1. Main Navigation Bar (Modern Frosted Glass) */}
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-md sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo: DevKo */}
          <NavLink to="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-500 flex items-center justify-center text-white shadow-xs border border-emerald-400/30 group-hover:scale-105 transition-smooth">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                  Dev<span className="text-emerald-700">Ko</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                  Schemes
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Independent Policy & Eligibility Intelligence</p>
            </div>
          </NavLink>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs font-semibold text-slate-600">
            <NavLink to="/" className="text-emerald-800 font-bold px-3 py-1.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">Home</NavLink>
            <NavLink to="/schemes" className="hover:text-emerald-800 hover:bg-slate-100/70 px-3 py-1.5 rounded-lg transition-smooth">Find Schemes</NavLink>
            <NavLink to="/eligibility" className="hover:text-emerald-800 hover:bg-slate-100/70 px-3 py-1.5 rounded-lg transition-smooth">Check Eligibility</NavLink>
            <NavLink to="/documents" className="hover:text-emerald-800 hover:bg-slate-100/70 px-3 py-1.5 rounded-lg transition-smooth">Documents</NavLink>
            <NavLink to="/application-guide" className="hover:text-emerald-800 hover:bg-slate-100/70 px-3 py-1.5 rounded-lg transition-smooth">Application Guide</NavLink>
            <NavLink to="/architecture" className="hover:text-emerald-800 hover:bg-slate-100/70 px-3 py-1.5 rounded-lg transition-smooth hidden lg:inline-block">Architecture</NavLink>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <NavLink
              to="/login"
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-xl transition-smooth border border-slate-200"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/dashboard"
              className="rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white text-xs font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-xs transition-smooth flex items-center gap-1.5"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </NavLink>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-smooth"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 animate-slide-up shadow-elevated">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Navigation Menu
            </p>
            <div className="grid grid-cols-1 gap-1 text-xs font-bold text-slate-700">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-emerald-950 bg-emerald-50 border border-emerald-200 flex items-center justify-between"
              >
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/schemes"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Find Schemes</span>
              </NavLink>
              <NavLink
                to="/eligibility"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Check Eligibility</span>
              </NavLink>
              <NavLink
                to="/documents"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Documents Hub</span>
              </NavLink>
              <NavLink
                to="/application-guide"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Application Guide</span>
              </NavLink>
              <NavLink
                to="/architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between"
              >
                <span>System Architecture</span>
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100 flex items-center justify-between mt-2"
              >
                <span>Citizen Sign In →</span>
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Modern, spacious, clean aesthetic) */}
      <section className="pt-6 sm:pt-12 pb-12 sm:pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-b from-emerald-500/[0.06] via-emerald-500/[0.01] to-white border border-emerald-200/70 p-5 sm:p-10 lg:p-14 shadow-card text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200/90 text-emerald-800 text-[11px] sm:text-xs font-bold shadow-2xs max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Independent Platform for Financial Schemes & Subsidies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Find the right schemes you qualify for,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-green-600">
              with verified rule evidence.
            </span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover Central and State financial policies, verify exactly why you qualify, estimate potential subsidies, and obtain clear guidance to apply.
          </p>

          {/* Central Search Bar (Floating Modern Card) */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2 w-full">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center shadow-lg shadow-emerald-950/[0.03] rounded-2xl bg-white border border-emerald-200/80 hover:border-emerald-500 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-500/10 p-1.5 transition-smooth gap-2 sm:gap-0">
              <div className="flex items-center flex-1 min-w-0 px-2 sm:px-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search schemes (e.g. MSME Interest Support, Working Capital)..."
                  className="w-full bg-transparent py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none min-w-0"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 shadow-xs transition-smooth shrink-0"
              >
                Search
              </button>
            </div>

            {/* Popular search tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-400 text-[10px] sm:text-[11px]">Popular:</span>
              {['MSME Subvention', 'Working Capital', 'Startup Seed Fund', 'Women Entrepreneurship', 'Technology Upgradation'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    navigate('/schemes');
                  }}
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-800 text-[10px] sm:text-[11px] font-medium transition-smooth shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>

          {/* Interactive "Find Schemes for You" Demographic Quick Selector */}
          <div className="mt-8 sm:mt-12 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 p-5 sm:p-7 max-w-4xl mx-auto shadow-card text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3.5 mb-4 gap-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Instant Eligibility Assessment</h3>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Demo Profile Loaded: Rahul Sharma (MSME)</span>
            </div>

            <form onSubmit={handleQuickMatch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
              <div>
                <label className="text-slate-500 block mb-1 font-semibold text-[11px] sm:text-xs">Your State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-slate-800 font-medium focus:outline-none focus:border-emerald-600 text-xs"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-semibold text-[11px] sm:text-xs">Applicant Age</label>
                <input
                  type="number"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-slate-800 font-medium focus:outline-none focus:border-emerald-600 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-semibold text-[11px] sm:text-xs">Category / Sector</label>
                <select
                  value={selectedOccupation}
                  onChange={(e) => setSelectedOccupation(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-300 p-2.5 text-slate-800 font-medium focus:outline-none focus:border-emerald-600 text-xs"
                >
                  <option value="MSME Owner">Micro / Small Enterprise</option>
                  <option value="Individual">Individual Entrepreneur</option>
                  <option value="Self Employed">Self-Employed Professional</option>
                  <option value="Student">Student / Innovator</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white font-bold py-2.5 px-4 shadow-xs transition-smooth flex items-center justify-center gap-1.5 text-xs"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Key Discovery Metrics Counter Strip */}
      <section className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight font-mono">4,700+</span>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Central & State Schemes</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">28+</span>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">States & Regions Covered</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight font-mono">₹2.45L</span>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Identified MSME Benefits</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">100%</span>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Deterministic Rule Audit</p>
          </div>
        </div>
      </section>

      {/* 4. Scheme Categories */}
      <section className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Sectors & Departments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
            Explore Schemes by Sector
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse targeted financial assistance, subventions, and capital subsidies across key industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                onClick={() => navigate(`/schemes?category=${encodeURIComponent(c.filter)}`)}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-card hover:-translate-y-1 transition-all duration-300 cursor-pointer space-y-3 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${c.color} group-hover:scale-105 transition-smooth`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-smooth">
                  {c.title}
                </h3>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium block">{c.count}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. How DevKo Works (4 Simple Steps) */}
      <section className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Transparent Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
            How DevKo Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Four transparent steps from document verification to official portal submission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">01</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Upload Documents</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your financial statements, caste, address, or Udyam certificates. Document OCR securely extracts applicant fields.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">02</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Deterministic Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Applicant facts are evaluated against official Gazette rules using mathematical AST operators without AI hallucination.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">03</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Benefit Estimation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              View transparent mathematical formulas, subvention slab rates, and factors that could influence disbursement.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">04</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Apply with Checklist</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Follow step-by-step guidance and submit your pre-verified dossier directly on the official portal with full confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Featured Schemes Preview */}
      <section className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verified active financial assistance programs for micro and small enterprises.
            </p>
          </div>
          <button
            onClick={() => navigate('/schemes')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all schemes</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-emerald-300 ring-1 ring-emerald-200/80 shadow-xs space-y-4 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Central Government
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                  98% Match
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">MSME Interest Support Scheme</h3>
              <p className="text-xs text-slate-500 mt-0.5">Ministry of MSME</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                2% per annum interest subvention on fresh or incremental working capital loans for registered micro units.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Benefit</span>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">₹75,000</span>
              </div>
              <button
                onClick={() => navigate('/schemes/msme-interest-support')}
                className="rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white text-xs font-bold px-3.5 py-2 transition-smooth shadow-xs"
              >
                View Rules
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Joint State & Central
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Manual Review
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Small Business Working Capital Support</h3>
              <p className="text-xs text-slate-500 mt-0.5">Ministry of Commerce & State Directorate</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Working capital margin assistance for light engineering enterprises facing raw material inflation.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Benefit</span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">₹1,20,000</span>
              </div>
              <button
                onClick={() => navigate('/schemes/working-capital-subsidy')}
                className="rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 text-xs font-bold px-3.5 py-2 transition-smooth"
              >
                View Rules
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Central Government
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                  94% Match
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">PM Technology Upgradation Incentive</h3>
              <p className="text-xs text-slate-500 mt-0.5">Ministry of Heavy Industries</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                15% capital subsidy on procurement of advanced CNC machinery, automation tooling, and clean energy fixtures.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Benefit</span>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">₹1,10,000</span>
              </div>
              <button
                onClick={() => navigate('/schemes/tech-upgradation-subsidy')}
                className="rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white text-xs font-bold px-3.5 py-2 transition-smooth shadow-xs"
              >
                View Rules
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (Accordion) */}
      <section className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Answers & Clarity
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Common questions regarding DevKo, eligibility verification, and application guidelines.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-smooth"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 sm:gap-4 select-none hover:bg-slate-50/70 transition-smooth"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-emerald-700 shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-6 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white shadow-card space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            Ready to find the schemes you qualify for?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto leading-relaxed">
            Experience Rahul Sharma's pre-loaded MSME case or test custom document uploads and policy evaluations.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs sm:text-sm font-bold px-7 py-3.5 shadow-sm transition-smooth inline-flex items-center justify-center gap-2"
            >
              <span>Launch Demo Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/schemes')}
              className="w-full sm:w-auto rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-6 py-3.5 border border-white/20 transition-smooth"
            >
              Search All Schemes
            </button>
          </div>
        </div>
      </section>

      {/* 9. DevKo Independent Platform Footer */}
      <footer className="bg-white border-t border-slate-200 mt-8 sm:mt-14 py-8 sm:py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-6 sm:pb-8 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shrink-0 shadow-xs border border-emerald-500/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Dev</span><span className="text-emerald-700">Ko</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Independent</span>
                </h3>
                <p className="text-[11px] text-slate-500">Independent Scheme Discovery & Eligibility Intelligence Platform</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-semibold text-slate-600">
              <NavLink to="/" className="hover:text-emerald-800 transition-smooth">Home</NavLink>
              <NavLink to="/schemes" className="hover:text-emerald-800 transition-smooth">Find Schemes</NavLink>
              <NavLink to="/eligibility" className="hover:text-emerald-800 transition-smooth">Eligibility Check</NavLink>
              <NavLink to="/documents" className="hover:text-emerald-800 transition-smooth">Documents</NavLink>
              <NavLink to="/application-guide" className="hover:text-emerald-800 transition-smooth">Application Guide</NavLink>
              <NavLink to="/architecture" className="hover:text-emerald-800 transition-smooth">Architecture</NavLink>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
            <p>© 2026 DevKo. Independent Financial Policy Discovery Platform. Not affiliated with or endorsed by any government entity.</p>
            <p>Deterministic Rule Engine • Zero Hallucinations • Privacy-Preserving</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
