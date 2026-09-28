import React, { useState } from 'react';
import { Calculator, AlertCircle, Info, Layers } from 'lucide-react';

export const BenefitCalculator = ({ calculationData, schemeName }) => {
  if (!calculationData) return null;

  const [simulatedLoanAmount, setSimulatedLoanAmount] = useState(calculationData.eligibleAmount || 3750000);
  const rateMultiplier = parseFloat(calculationData.subsidyRate) / 100 || 0.02;
  const computedBenefit = Math.min(100000, Math.round(simulatedLoanAmount * rateMultiplier));

  return (
    <div className="space-y-6">
      {/* Top Banner & Disclaimer */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-5 h-5 text-emerald-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Official Subsidy Calculation Formula
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Benefit Estimation Engine
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Calculated deterministically using official scheme policy parameters. Never presented as a guarantee.
            </p>
          </div>

          <div className="text-left sm:text-right p-4 rounded-xl bg-white border border-emerald-200 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Estimated Benefit
            </span>
            <span className="text-3xl font-extrabold text-emerald-700 tracking-tight">
              ₹{computedBenefit.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
              Subject to Department Approval
            </span>
          </div>
        </div>
      </div>

      {/* Visual Formula Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Visual Calculation Formula
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
          {/* Box 1: Eligible Amount */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 block mb-1">Eligible Loan Amount</span>
            <span className="text-base font-bold text-slate-900">₹{simulatedLoanAmount.toLocaleString('en-IN')}</span>
          </div>

          {/* Symbol */}
          <div className="text-xl font-extrabold text-slate-400">×</div>

          {/* Box 2: Subsidy Rate */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 block mb-1">Annual Subvention Rate</span>
            <span className="text-base font-bold text-emerald-700">{calculationData.subsidyRate}</span>
          </div>

          {/* Symbol */}
          <div className="text-xl font-extrabold text-slate-400">=</div>

          {/* Box 3: Result */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300">
            <span className="text-[11px] text-emerald-800 font-medium block mb-1">Estimated Annual Benefit</span>
            <span className="text-base font-extrabold text-emerald-800">₹{computedBenefit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Live Interactive Simulator Slider */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-slate-700">Simulate Working Capital / Sanctioned Loan:</span>
            <span className="font-mono font-bold text-emerald-800">₹{simulatedLoanAmount.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="500000"
            max="7500000"
            step="250000"
            value={simulatedLoanAmount}
            onChange={(e) => setSimulatedLoanAmount(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>₹5,00,000</span>
            <span>₹37,50,000 (Current Dossier)</span>
            <span>₹75,00,000 (Max Cap)</span>
          </div>
        </div>
      </div>

      {/* Slabs Table */}
      {calculationData.slabs && calculationData.slabs.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Official Policy Slab Structure</span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase font-semibold bg-slate-50">
                <tr>
                  <th className="py-2.5 px-3">Slab Tier</th>
                  <th className="py-2.5 px-3">Subvention Rate</th>
                  <th className="py-2.5 px-3">Maximum Benefit Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {calculationData.slabs.map((slab, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-slate-800">{slab.slab}</td>
                    <td className="py-3 px-3 text-slate-600 font-semibold">{slab.rate}</td>
                    <td className="py-3 px-3 text-emerald-700 font-mono font-bold">{slab.maxBenefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* What Can Change This Estimate */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>What can change this estimate?</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          {(calculationData.changeFactors || [
            "Final verified income by inspecting officer",
            "Sanctioned working capital ceiling from participating bank",
            "Scheme budgetary cap allocation",
            "Quarterly NPA classification audit"
          ]).map((factor, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-amber-200/80">
              <span className="text-amber-600 font-bold shrink-0">•</span>
              <span>{factor}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-500 italic">
          Disclaimer: This estimation is for discovery & planning. Official disbursement will be decided by the competent sanctioning authority.
        </p>
      </div>
    </div>
  );
};
