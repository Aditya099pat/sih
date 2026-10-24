import React from 'react';
import { RotateCcw, Calendar, CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { FDRInstrument } from '../types';
import { FORMAT_INDIAN_CURRENCY } from '../data/mockData';

interface RpgfTrackerViewProps {
  instruments: FDRInstrument[];
  onInitiateRelease: (inst: FDRInstrument) => void;
}

export const RpgfTrackerView: React.FC<RpgfTrackerViewProps> = ({
  instruments,
  onInitiateRelease
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <RotateCcw className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">RPGF & Phase Release Lifecycle Tracker</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Refundable Performance Guaranty Fund • 8-Year Statutory Lock-in Lifecycle & Phased Settlement
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 1 Due for Settlement (Dec 2026)
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Security Capital</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">₹1,05,00,000</div>
          <p className="text-xs text-slate-500 mt-0.5">3 Active Program Instruments</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Eligible for Phase-5 Release</span>
          <div className="text-xl font-extrabold text-amber-700 mt-1">₹35,00,000</div>
          <p className="text-xs text-amber-800 font-medium mt-0.5">+₹6,48,200 Cumulative Yield</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student Protection Fund</span>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">100% Protected</div>
          <p className="text-xs text-slate-500 mt-0.5">Indemnity Reserve Maintained</p>
        </div>
      </div>

      {/* 8-Year Timeline Cards for Each Instrument */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Multi-Year Maturity Timelines & Status
        </h3>

        {instruments.map((inst) => {
          const isMaturingSoon = inst.remainingDays <= 90;
          return (
            <div
              key={inst.id}
              className={`bg-white rounded-xl border p-5 shadow-2xs space-y-4 transition-all ${
                isMaturingSoon ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-slate-900">{inst.ref}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isMaturingSoon ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {inst.statutoryStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{inst.discipline}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Principal + Yield</span>
                  <span className="text-base font-bold font-mono text-slate-900">
                    {FORMAT_INDIAN_CURRENCY(inst.principalAmount + inst.accruedInterest)}
                  </span>
                </div>
              </div>

              {/* Progress Milestones (Year 1 to Year 8) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Issued: {inst.issueDate}</span>
                  <span className="font-bold text-slate-800">Term: 8 Years</span>
                  <span>Maturity: {inst.maturityDate}</span>
                </div>

                {/* Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isMaturingSoon ? 'bg-amber-500 w-[98%]' : 'bg-[#0D3B66] w-[65%]'
                    }`}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>Phase-1 (Yr 2)</span>
                  <span>Phase-2 (Yr 4)</span>
                  <span>Phase-3 (Yr 6)</span>
                  <span>Phase-4 (Yr 7)</span>
                  <span className="font-bold text-slate-700">Phase-5 Final (Yr 8)</span>
                </div>
              </div>

              {/* Action Banner if Maturing */}
              {isMaturingSoon && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Mandatory 8-year lock-in expiring in <strong>{inst.remainingDays} days</strong>. Apply before 15 Nov 2026.
                    </span>
                  </div>

                  <button
                    onClick={() => onInitiateRelease(inst)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    Apply Phase-5 Release <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
