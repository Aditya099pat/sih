import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  TrendingUp, 
  Award, 
  Users, 
  Lightbulb, 
  Coins, 
  RefreshCw, 
  CheckCircle2, 
  Download,
  BookOpen
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";

export const ScholarshipAnalyticsView = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/yield")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnalytics(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-[#0D3B66] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E65100]" />
          Aggregating Council FDR Accrued Yield &amp; Scholarship Distributions...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0F172A]">
                Yield &amp; Reinvestment Analytics Module
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                National Social Impact
              </span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Tracking cumulative interest yield accrued on joint FDRs assigned to AICTE for funding national scholarships (Pragati, Saksham) &amp; ATAL research
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#0D3B66] text-xs font-bold text-[#0F172A] flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Gazette Yield Report</span>
          </button>
        </div>
      </div>

      {/* Top Aggregated KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-clean p-5 rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-semibold">
            <span>TOTAL IMMOBILIZED CAPITAL</span>
            <Coins className="w-4 h-4 text-[#0D3B66]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#0F172A]">
            {FORMAT_INDIAN_CURRENCY(analytics.totalImmobilizedCapital)}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Across 5,420 Accredited Technical Institutes
          </div>
        </div>

        <div className="card-clean p-5 rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-semibold">
            <span>ANNUAL ACCRUED INTEREST REINVESTED</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-700">
            {FORMAT_INDIAN_CURRENCY(analytics.totalAnnualAccruedInterest)}
          </div>
          <div className="text-[11px] text-[#64748B] mt-1">
            Weighted Average Rate: 7.15% p.a.
          </div>
        </div>

        <div className="card-clean p-5 rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-semibold">
            <span>TOTAL SCHOLARSHIP RECIPIENTS</span>
            <Users className="w-4 h-4 text-[#E65100]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#E65100]">
            37,800 Students
          </div>
          <div className="text-[11px] text-[#64748B] mt-1">
            100% Direct Benefit Transfer (DBT) via PFMS
          </div>
        </div>
      </div>

      {/* 4 National Welfare Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {analytics.yieldSchemes.map((scheme, idx) => (
          <div 
            key={idx}
            className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0D3B66] flex items-center justify-center font-bold">
                    {idx === 0 ? <Award className="w-5 h-5 text-[#E65100]" /> : 
                     idx === 1 ? <Users className="w-5 h-5 text-[#0D3B66]" /> : 
                     idx === 2 ? <BookOpen className="w-5 h-5 text-emerald-600" /> : 
                     <Lightbulb className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0F172A]">{scheme.name}</h3>
                    <span className="text-[10px] text-[#64748B] font-mono">Allocation Share: {scheme.percentage}%</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-[#0D3B66] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {FORMAT_INDIAN_CURRENCY(scheme.allocatedSum)}
                </span>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                {scheme.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[#64748B]">
                {scheme.studentsSupported ? "Empowered Beneficiaries:" : 
                 scheme.programsFunded ? "FDPs Conducted:" : "Startups Incubated:"}
              </span>
              <span className="font-bold text-emerald-700 font-mono text-sm">
                {scheme.studentsSupported ? `${scheme.studentsSupported.toLocaleString('en-IN')} Students` :
                 scheme.programsFunded ? `${scheme.programsFunded} Faculty Programs` :
                 `${scheme.grantsIssued} Campus Ventures`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quarterly Yield Accrual Schedule */}
      <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">
          Quarterly Yield Accrual &amp; Disbursement Schedule (AY 2025-26)
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analytics.quarterlyYieldHistory.map((q, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[#0D3B66] font-mono">{q.quarter}</span>
                <span className="text-[10px] text-emerald-700 font-semibold">{q.status}</span>
              </div>
              <div className="text-base font-black font-mono text-[#0F172A]">
                {FORMAT_INDIAN_CURRENCY(q.accrued)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Disbursed to: {q.beneficiary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
