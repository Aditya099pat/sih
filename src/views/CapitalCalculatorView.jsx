import { useState } from "react";
import { Calculator, Download, Info, ArrowRight } from "lucide-react";
import { TABLE_1_4_RATES, FORMAT_INDIAN_CURRENCY } from "../data/mockData";
export const CapitalCalculatorView = () => {
  const [selectedProgram, setSelectedProgram] = useState(TABLE_1_4_RATES[0].program);
  const [categoryType, setCategoryType] = useState("unreserved");
  const [institutionType, setInstitutionType] = useState("new");
  const [intakeSeats, setIntakeSeats] = useState(60);
  const currentRate = TABLE_1_4_RATES.find((r) => r.program === selectedProgram) || TABLE_1_4_RATES[0];
  let baseRate = categoryType === "unreserved" ? currentRate.unreserved : currentRate.minorityWomen;
  if (categoryType === "ner") baseRate = Math.round(baseRate * 0.75);
  if (institutionType === "expansion") {
    baseRate = Math.round(baseRate * 0.5);
  }
  return <div className="space-y-6">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <Calculator className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Capital Calculator (AICTE APH Table 1.4)</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statutory Security Deposit & RPGF Requirement Estimator for New Approvals & Intake Expansion
          </p>
        </div>

        <button
    onClick={() => alert("Downloading AICTE Table 1.4 Statutory Schedule (PDF)...")}
    className="px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
  >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Table 1.4 Schedule PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {
    /* Left 2 Cols: Form options */
  }
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Technical Discipline & Level
            </h2>

            <div className="space-y-2 text-xs">
              <label className="block text-slate-700 font-semibold">Select Discipline & Degree Level</label>
              <select
    value={selectedProgram}
    onChange={(e) => setSelectedProgram(e.target.value)}
    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900"
  >
                {TABLE_1_4_RATES.map((rate) => <option key={rate.program} value={rate.program}>
                    {rate.program}
                  </option>)}
              </select>
            </div>

            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pt-2 border-t border-slate-100">
              2. Institution Classification & Statutory Concessions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
    onClick={() => setCategoryType("unreserved")}
    className={`p-3 rounded-xl border cursor-pointer transition-all ${categoryType === "unreserved" ? "border-[#0D3B66] bg-blue-50/50 ring-1 ring-[#0D3B66]" : "border-slate-200 hover:border-slate-300"}`}
  >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">General / Unreserved</span>
                  <input
    type="radio"
    name="category"
    checked={categoryType === "unreserved"}
    onChange={() => setCategoryType("unreserved")}
    className="text-[#0D3B66]"
  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Standard AICTE regulatory rate</p>
              </div>

              <div
    onClick={() => setCategoryType("minority")}
    className={`p-3 rounded-xl border cursor-pointer transition-all ${categoryType === "minority" ? "border-[#0D3B66] bg-blue-50/50 ring-1 ring-[#0D3B66]" : "border-slate-200 hover:border-slate-300"}`}
  >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Minority / Women / PwD</span>
                  <input
    type="radio"
    name="category"
    checked={categoryType === "minority"}
    onChange={() => setCategoryType("minority")}
    className="text-[#0D3B66]"
  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Concessional Table 1.4 security deposit</p>
              </div>

              <div
    onClick={() => setCategoryType("ner")}
    className={`p-3 rounded-xl border cursor-pointer transition-all ${categoryType === "ner" ? "border-[#0D3B66] bg-blue-50/50 ring-1 ring-[#0D3B66]" : "border-slate-200 hover:border-slate-300"}`}
  >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">NER / J&K / Ladakh / Hill States</span>
                  <input
    type="radio"
    name="category"
    checked={categoryType === "ner"}
    onChange={() => setCategoryType("ner")}
    className="text-[#0D3B66]"
  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Special regional 25% waiver</p>
              </div>

              <div
    onClick={() => setCategoryType("women")}
    className={`p-3 rounded-xl border cursor-pointer transition-all ${categoryType === "women" ? "border-[#0D3B66] bg-blue-50/50 ring-1 ring-[#0D3B66]" : "border-slate-200 hover:border-slate-300"}`}
  >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Exclusive Women's College</span>
                  <input
    type="radio"
    name="category"
    checked={categoryType === "women"}
    onChange={() => setCategoryType("women")}
    className="text-[#0D3B66]"
  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Concessional deposit tranche</p>
              </div>
            </div>

            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pt-2 border-t border-slate-100">
              3. Approval Type
            </h2>

            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 flex-1 cursor-pointer">
                <input
    type="radio"
    name="approvalType"
    checked={institutionType === "new"}
    onChange={() => setInstitutionType("new")}
    className="text-[#0D3B66]"
  />
                <span className="font-medium text-slate-800">Establishment of New Institution (Full Mandate)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 flex-1 cursor-pointer">
                <input
    type="radio"
    name="approvalType"
    checked={institutionType === "expansion"}
    onChange={() => setInstitutionType("expansion")}
    className="text-[#0D3B66]"
  />
                <span className="font-medium text-slate-800">Extension of Approval (EoA) / Additional Intake</span>
              </label>
            </div>
          </div>
        </div>

        {
    /* Right Col: Calculation Result Card */
  }
        <div className="space-y-4">
          <div className="bg-[#002546] text-white rounded-xl p-5 shadow-md space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Mandatory Security Deposit
            </span>

            <div>
              <div className="text-3xl font-extrabold tracking-tight tabular-nums font-mono text-white">
                {FORMAT_INDIAN_CURRENCY(baseRate)}
              </div>
              <p className="text-xs text-slate-300 mt-1">Fixed Deposit under Joint Lien with AICTE</p>
            </div>

            <div className="pt-3 border-t border-white/20 space-y-2 text-xs text-slate-200">
              <div className="flex justify-between">
                <span>Lock-in Duration:</span>
                <span className="font-bold text-white">8 Continuous Years</span>
              </div>
              <div className="flex justify-between">
                <span>Custody Protocol:</span>
                <span className="font-semibold text-white">SFMS e-Lien (MT760)</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Accrual:</span>
                <span className="font-semibold text-white">Compounded Quarterly</span>
              </div>
              <div className="flex justify-between">
                <span>Release Condition:</span>
                <span className="font-semibold text-amber-300">Phase-5 RPGF Settlement</span>
              </div>
            </div>

            <button
    onClick={() => alert(`Initiating registration for deposit of ${FORMAT_INDIAN_CURRENCY(baseRate)}`)}
    className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
  >
              <span>Create Joint FDR Draft</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs space-y-2 text-slate-600">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold">
              <Info className="w-4 h-4 text-[#0D3B66]" />
              AICTE Compliance Note
            </div>
            <p className="text-[11px] leading-relaxed">
              In terms of Regulation 4(2) of AICTE Regulations 2025, default or delay in submitting the requisite joint FDR within 30 days of Letter of Intent (LoI) results in automatic revocation of approval.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
