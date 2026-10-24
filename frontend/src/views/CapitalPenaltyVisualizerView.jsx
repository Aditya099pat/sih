import { useState, useEffect } from "react";
import { 
  Calculator, 
  Percent, 
  Building2, 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  HelpCircle,
  FileCheck2,
  TrendingDown,
  RefreshCw
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";

export const CapitalPenaltyVisualizerView = () => {
  const [discipline, setDiscipline] = useState("Engineering & Technology");
  const [intake, setIntake] = useState(60);
  const [isLeasehold, setIsLeasehold] = useState(false);
  const [isConcessionEligible, setIsConcessionEligible] = useState(false);
  const [concessionType, setConcessionType] = useState("women");
  
  // Forfeiture Slider State (10% to 50%)
  const [forfeiturePercent, setForfeiturePercent] = useState(25);
  const [grossDepositForRefund, setGrossDepositForRefund] = useState(3500000);
  const [closureReason, setClosureReason] = useState("unapproved_closure");

  // Computed results from state or API
  const [calcResult, setCalcResult] = useState({
    baseAmount: 3500000,
    concessionDeduction: 0,
    leaseMultiplier: 1,
    finalRequiredDeposit: 3500000,
    statutoryTenureYears: 8,
    breakdownNote: "Standard Freehold campus, 60 Intake UG Tech Program."
  });

  const [forfeitureResult, setForfeitureResult] = useState({
    grossDeposit: 3500000,
    forfeiturePercent: 25,
    forfeitedAmount: 875000,
    netRefundableAmount: 2625000
  });

  // Calculate live required capital
  useEffect(() => {
    fetch("/api/calculator/compute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discipline,
        intake,
        isLeasehold,
        isConcessionEligible,
        concessionCategory: concessionType
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCalcResult(data.data);
        }
      })
      .catch(err => {
        // Fallback local computation
        let base = 3500000;
        if (discipline.includes("Pharmacy")) base = 2500000;
        else if (discipline.includes("Management") || discipline.includes("MCA")) base = 1500000;
        else if (discipline.includes("Architecture")) base = 2000000;
        
        let finalAmt = base;
        if (isConcessionEligible) finalAmt = finalAmt * 0.5;
        if (isLeasehold) finalAmt = finalAmt * 2.0;

        setCalcResult({
          baseAmount: base,
          concessionDeduction: isConcessionEligible ? base * 0.5 : 0,
          leaseMultiplier: isLeasehold ? 2.0 : 1.0,
          finalRequiredDeposit: finalAmt,
          statutoryTenureYears: 8
        });
      });
  }, [discipline, intake, isLeasehold, isConcessionEligible, concessionType]);

  // Calculate live forfeiture
  useEffect(() => {
    fetch("/api/calculator/forfeiture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grossDeposit: grossDepositForRefund,
        forfeiturePercent: forfeiturePercent,
        reason: closureReason
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setForfeitureResult(data.data);
        }
      })
      .catch(err => {
        const forfeited = (grossDepositForRefund * forfeiturePercent) / 100;
        setForfeitureResult({
          grossDeposit: grossDepositForRefund,
          forfeiturePercent,
          forfeitedAmount: forfeited,
          netRefundableAmount: grossDepositForRefund - forfeited
        });
      });
  }, [grossDepositForRefund, forfeiturePercent, closureReason]);

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
              <Calculator className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0F172A]">
                APH Table 1.4 Dynamic Capital & Calibrated Penalty Visualizer
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#0D3B66] border border-blue-200">
                USP 4
              </span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Statutory AICTE Approval Process Handbook (APH) Table 1.4 calculation engine with affirmative concessions & forfeiture slider
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
          <span className="text-[#64748B]">Regulatory Gazette:</span>
          <span className="font-bold text-[#0D3B66]">APH 2025-26 Ed.</span>
        </div>
      </div>

      {/* Main 2-Column Split: Part A (Dynamic Table 1.4 Calculator) + Part B (Officer Penalty Slider) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Table 1.4 Dynamic Capital Computation */}
        <div className="lg:col-span-7 space-y-5">
          <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0D3B66]" />
                <h2 className="text-sm font-bold text-[#0F172A]">
                  Part A: Table 1.4 Statutory Deposit Slabs
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Live Engine
              </span>
            </div>

            <div className="space-y-4 pt-4">
              {/* Discipline Selector */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  Approved Academic Discipline / Faculty
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
                >
                  <option value="Engineering & Technology">Engineering & Technology (UG / PG) - Base: ₹35.00 Lakhs</option>
                  <option value="Pharmacy">Pharmacy (B.Pharm / M.Pharm) - Base: ₹25.00 Lakhs</option>
                  <option value="Management">Management (MBA / PGDM) - Base: ₹15.00 Lakhs</option>
                  <option value="MCA / Computer Applications">Computer Applications (MCA) - Base: ₹15.00 Lakhs</option>
                  <option value="Architecture & Planning">Architecture & Town Planning - Base: ₹20.00 Lakhs</option>
                  <option value="Hotel Management & Catering">Hotel Management & Catering Tech - Base: ₹15.00 Lakhs</option>
                  <option value="Applied Arts & Crafts">Applied Arts & Crafts - Base: ₹15.00 Lakhs</option>
                </select>
              </div>

              {/* Intake & Tenure Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">
                    Approved Annual Intake
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="600"
                    step="30"
                    value={intake}
                    onChange={(e) => setIntake(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Standard 60 seats/division</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">
                    Mandatory Lock-in Tenure
                  </label>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-bold text-[#0D3B66]">
                    {calcResult.statutoryTenureYears || 8} Years (RPGF Lock-in)
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">AICTE Regulation Clause 1.4(b)</span>
                </div>
              </div>

              {/* Statutory Concession & Lease Toggles */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-[#0D3B66] uppercase tracking-wide block">
                  Statutory Multipliers & Affirmative Concessions
                </span>

                {/* Leasehold 2x Multiplier */}
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-bold text-[#0F172A] block">
                      Campuses on Leasehold Land (2.0x Multiplier)
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      APH Regulation 1.4 requires 200% security deposit for leasehold properties vs owned freehold land.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={isLeasehold}
                      onChange={(e) => setIsLeasehold(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0D3B66]"></div>
                  </label>
                </div>

                {/* 50% Statutory Affirmative Concession */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-bold text-[#0F172A] block">
                      Affirmative Category 50% Concession
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      50% statutory reduction for Women-only institutions, PwD, North East, and J&K/Ladakh.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={isConcessionEligible}
                      onChange={(e) => setIsConcessionEligible(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E65100]"></div>
                  </label>
                </div>

                {isConcessionEligible && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">
                      Concession Category
                    </label>
                    <select
                      value={concessionType}
                      onChange={(e) => setConcessionType(e.target.value)}
                      className="w-full bg-white border border-amber-300 rounded px-2.5 py-1.5 text-xs font-semibold text-amber-900"
                    >
                      <option value="women">Exclusively for Women Institution (50% Concession)</option>
                      <option value="pwd">Persons with Disabilities (PwD) Focused (50% Concession)</option>
                      <option value="north_east">North Eastern States (NER) Priority (50% Concession)</option>
                      <option value="jk_ladakh">Union Territories of J&K / Ladakh (50% Concession)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Dynamic Capital Output Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0D3B66] to-[#082440] text-white space-y-3">
                <div className="flex items-center justify-between text-xs text-blue-200">
                  <span>STATUTORY MANDATORY JOINT DEPOSIT</span>
                  <span className="font-mono">APH 2025-26 TABLE 1.4</span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                    {FORMAT_INDIAN_CURRENCY(calcResult.finalRequiredDeposit)}
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-amber-300 font-bold block">
                      {isConcessionEligible ? "50% Concession Applied" : "Standard Tariff"}
                    </span>
                    <span className="text-slate-300 text-[10px]">
                      {isLeasehold ? "2.0x Lease Multiplier" : "1.0x Owned Land"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-400/30 grid grid-cols-3 text-center text-xs">
                  <div>
                    <span className="text-blue-200 text-[10px] block">Base Slab</span>
                    <span className="font-mono font-bold text-white">{FORMAT_INDIAN_CURRENCY(calcResult.baseAmount)}</span>
                  </div>
                  <div>
                    <span className="text-blue-200 text-[10px] block">Concession</span>
                    <span className="font-mono font-bold text-amber-300">
                      {calcResult.concessionDeduction > 0 ? `-${FORMAT_INDIAN_CURRENCY(calcResult.concessionDeduction)}` : "None"}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-200 text-[10px] block">Lease Factor</span>
                    <span className="font-mono font-bold text-white">{calcResult.leaseMultiplier}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Officer Delinquent Forfeiture Penalty Slider */}
        <div className="lg:col-span-5 space-y-5">
          <div className="card-clean rounded-xl border border-red-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-600" />
                <h2 className="text-sm font-bold text-[#0F172A]">
                  Part B: Calibrated Forfeiture Slider
                </h2>
              </div>
              <span className="text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-200">
                Officer Desk
              </span>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-xs text-[#64748B] leading-relaxed">
                When an institution closes prematurely, defaults on student obligations, or violates regulatory covenants, AICTE officers enforce a calibrated forfeiture deduction of <strong>10% to 50%</strong> on the pledged capital.
              </p>

              {/* Gross Deposit input */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  Gross Matured Pledged Deposit (₹)
                </label>
                <input
                  type="number"
                  step="100000"
                  value={grossDepositForRefund}
                  onChange={(e) => setGrossDepositForRefund(Number(e.target.value))}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-bold font-mono text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
                />
              </div>

              {/* Closure Breach Reason */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  Statutory Grounds for Penalty Assessment
                </label>
                <select
                  value={closureReason}
                  onChange={(e) => setClosureReason(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
                >
                  <option value="unapproved_closure">Unapproved Premature Closure (Clause 2.15)</option>
                  <option value="student_fee_default">Unpaid Student Fee / Scholarship Default</option>
                  <option value="faculty_salary_arrears">Non-Payment of 7th CPC Faculty Arrears</option>
                  <option value="infrastructure_deficiency">Severe EVC Infrastructure Delinquency</option>
                </select>
              </div>

              {/* The Forfeiture Slider (10% - 50%) */}
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-900">
                    Statutory Forfeiture Deduction Rate:
                  </span>
                  <span className="text-base font-black font-mono text-red-700 bg-white px-2.5 py-0.5 rounded border border-red-300">
                    {forfeiturePercent}%
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={forfeiturePercent}
                  onChange={(e) => setForfeiturePercent(Number(e.target.value))}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />

                <div className="flex justify-between text-[10px] font-mono font-bold text-red-700">
                  <span>10% (Minor Breach)</span>
                  <span>25% (Standard)</span>
                  <span>50% (Max Statutory)</span>
                </div>
              </div>

              {/* Resulting Distribution Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[#64748B]">Forfeited to AICTE Welfare Fund:</span>
                  <span className="font-mono font-bold text-red-700">
                    {FORMAT_INDIAN_CURRENCY(forfeitureResult.forfeitedAmount)}
                  </span>
                </div>

                <div className="flex justify-between p-2 rounded bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-800 font-semibold">Net Liquid Refund to Trust:</span>
                  <span className="font-mono font-black text-emerald-700 text-sm">
                    {FORMAT_INDIAN_CURRENCY(forfeitureResult.netRefundableAmount)}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Statutory Note:</strong> Forfeited proceeds are automatically transferred to the National Technical Education Scholarship Fund (Pragati &amp; Saksham schemes) under Section 10(g) of the AICTE Act.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
