import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Compass,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { SchemeCard } from '../components/schemes/SchemeCard';
import { SearchInput } from '../components/common/SearchInput';
import { EmptyState } from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';

export const SchemesPage = () => {
  const { schemes } = useApp();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'all';

  const [activeTab, setActiveTab] = useState(urlSearch || (urlCategory && urlCategory !== 'all') ? 'all' : 'recommended');
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setActiveTab('all');
    }
    if (urlCategory && urlCategory !== 'all') {
      setSelectedCategory(urlCategory);
      setActiveTab('all');
    }
  }, [urlSearch, urlCategory]);

  const categories = ['all', 'Credit & Subsidies', 'Grants & Subsidies', 'Working Capital Subsidy', 'Early Stage Equity & Seed Grant', 'Capital Subsidy'];
  const levels = ['all', 'Central Government', 'State & Central Joint', 'State & District Panchayat Level'];

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      if (activeTab === 'recommended' && scheme.relevanceScore < 70) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const match =
          scheme.name.toLowerCase().includes(query) ||
          scheme.description.toLowerCase().includes(query) ||
          scheme.department.toLowerCase().includes(query) ||
          scheme.category.toLowerCase().includes(query);
        if (!match) return false;
      }

      if (selectedStatus !== 'all' && scheme.status !== selectedStatus) return false;
      if (selectedLevel !== 'all' && scheme.level !== selectedLevel) return false;
      if (selectedCategory !== 'all') {
        const catQuery = selectedCategory.toLowerCase();
        const schemeCat = scheme.category.toLowerCase();
        if (!schemeCat.includes(catQuery) && !catQuery.includes(schemeCat)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'relevance') return b.relevanceScore - a.relevanceScore;
      if (sortBy === 'benefit') {
        const valA = parseInt(a.benefit.replace(/[^0-9]/g, '')) || 0;
        const valB = parseInt(b.benefit.replace(/[^0-9]/g, '')) || 0;
        return valB - valA;
      }
      if (sortBy === 'missingDocs') return a.missingDocsCount - b.missingDocsCount;
      if (sortBy === 'verified') return b.lastVerified.localeCompare(a.lastVerified);
      return 0;
    });
  }, [schemes, activeTab, searchQuery, selectedStatus, selectedLevel, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedLevel('all');
    setSelectedCategory('all');
    setSortBy('relevance');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-emerald-700" />
            <span>Find Schemes & Subsidies</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover verified Central and State programs matched against your enterprise profile.
          </p>
        </div>

        {/* Top Toggle: Recommended for me vs Browse all */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 w-full sm:w-auto justify-center">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-smooth flex items-center justify-center gap-1.5 ${
              activeTab === 'recommended'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended for Me</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-smooth text-center ${
              activeTab === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Browse All ({schemes.length})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search schemes by name, department, or keywords..."
            className="flex-1"
          />

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold shrink-0 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-medium"
            >
              <option value="relevance">Most Relevant</option>
              <option value="benefit">Highest Potential Benefit</option>
              <option value="missingDocs">Fewest Missing Documents</option>
              <option value="verified">Recently Verified</option>
            </select>
          </div>
        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-bold mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filters:</span>
          </div>

          {/* Status selector */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
          >
            <option value="all">All Statuses</option>
            <option value="Eligible">Eligible</option>
            <option value="Potentially Eligible">Potentially Eligible</option>
            <option value="Manual Review">Manual Review</option>
            <option value="Ineligible">Ineligible</option>
          </select>

          {/* Gov Level selector */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
          >
            <option value="all">All Levels</option>
            <option value="Central Government">Central Government</option>
            <option value="State & Central Joint">State & Central Joint</option>
            <option value="State & District Panchayat Level">District / Panchayat</option>
          </select>

          {/* Category selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
          >
            <option value="all">All Categories</option>
            <option value="Credit & Subsidies">Credit & Subsidies</option>
            <option value="Grants & Subsidies">Grants & Subsidies</option>
            <option value="Working Capital Subsidy">Working Capital</option>
            <option value="Capital Subsidy">Capital Subsidy</option>
            <option value="Early Stage Equity & Seed Grant">Seed Grants</option>
          </select>

          {(searchQuery || selectedStatus !== 'all' || selectedLevel !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 transition-smooth ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              isRecommended={scheme.relevanceScore >= 90}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching schemes found"
          description="Try broadening your search term or filter selection to discover more government programs."
          actionText="Reset All Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
};
