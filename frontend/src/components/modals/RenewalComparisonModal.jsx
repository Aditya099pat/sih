import { useState } from "react";
import {
  X,
  ArrowRight,
  Landmark,
  Calendar,
  FileCheck2,
  AlertCircle,
  Copy,
  Check,
  RotateCw,
  ShieldCheck,
  FileText
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const RenewalComparisonModal = ({
  isOpen,
  onClose,
  originalInstrument,
  replacementInstrument
}) => {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const original = originalInstrument || {
    ref: "FDR-SBIN-2018-09",
    fdrReceiptNo: "SBI-NMP-8829104",
    principalAmount: 3500000,
    issueDate: "15 Dec 2018",
    maturityDate: "15 Dec 2026",
    tenureYears: 8,
    interestRate: "6.75% p.a.",
    accruedInterest: 648000,
    bankName: "State Bank of India",
    branchName: "Nariman Point Branch, Mumbai",
    ifsc: "SBIN0001234",
    lienHolder: "Member Secretary, AICTE",
    lienMode: "SFMS MT760 e-Lien (Legacy)",
    status: "Maturing in 42 Days"
  };

  const replacement = replacementInstrument || {
    ref: "FDR-SBIN-2026-99-ROLLOVER",
    fdrReceiptNo: "SBI-NMP-9941028",
    principalAmount: 3500000,
    issueDate: "15 Dec 2026",
    maturityDate: "15 Dec 2034",
    tenureYears: 8,
    interestRate: "7.10% p.a. (+0.35%)",
    accruedInterest: 0,
    bankName: "State Bank of India",
    branchName: "Nariman Point Branch, Mumbai",
    ifsc: "SBIN0001234",
    lienHolder: "Member Secretary, AICTE",
    lienMode: "SFMS MT760 e-Lien (Digital API v2)",
    status: "Draft Rollover Instrument"
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const comparisonRows = [
    {
      label: "FDR Reference Number",
      original: original.ref,
      replacement: replacement.ref,
      changed: true,
      highlight: "replacement"
    },
    {
      label: "Bank Deposit Receipt Serial",
      original: original.fdrReceiptNo,
      replacement: replacement.fdrReceiptNo,
      changed: true,
      highlight: "replacement"
    },
    {
      label: "Principal Face Value",
      original: FORMAT_INDIAN_CURRENCY(original.principalAmount),
      replacement: FORMAT_INDIAN_CURRENCY(replacement.principalAmount),
      changed: false,
      note: "Preserved 100% Capital Adequacy"
    },
    {
      label: "Agreed Interest Rate",
      original: original.interestRate || "6.75% p.a.",
      replacement: replacement.interestRate || "7.10% p.a.",
      changed: true,
      highlight: "positive",
      note: "+35 bps Yield Optimization"
    },
    {
      label: "Date of Issue / Deposit",
      original: original.issueDate,
      replacement: replacement.issueDate,
      changed: true
    },
    {
      label: "Statutory Maturity Date",
      original: original.maturityDate,
      replacement: replacement.maturityDate,
      changed: true,
      highlight: "replacement",
      note: "Extended 8 Years (AY 2026-2034)"
    },
    {
      label: "Statutory Tenure",
      original: `${original.tenureYears || 8} Years (APH Mandate)`,
      replacement: `${replacement.tenureYears || 8} Years (APH Mandate)`,
      changed: false
    },
    {
      label: "Joint Lien Beneficiary",
      original: "Member Secretary, AICTE",
      replacement: "Member Secretary, AICTE",
      changed: false,
      note: "Unbroken Joint Lien Title"
    },
    {
      label: "Core Banking Lien Protocol",
      original: "SFMS MT760 (Tri-party Paper Advisory)",
      replacement: "SFMS MT760 (Real-Time API Telemetry)",
      changed: true,
      highlight: "positive"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white px-5 py-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <RotateCw className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold tracking-tight">
                FDR Rollover &amp; Renewal Comparison Audit
              </h2>
              <p className="text-[11px] text-slate-300">
                Side-by-side reconciliation of Original Instrument vs Rollover Replacement Record
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Context Banner */}
        <div className="bg-amber-50/80 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Statutory Continuity Guarantee:</strong> All accrued interest assigned to AICTE Pragati Fund; principal rolled over in unbroken tripartite lien.
            </span>
          </div>
          <span className="font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 text-[10px]">
            LINKED CHAIN ID #LC-2018-2026-09
          </span>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Column Summary Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Original Record */}
            <div className="p-3.5 rounded-md border border-slate-200 bg-slate-50/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Original Maturing Instrument (Parent Record)
                </span>
                <span className="bg-amber-100 text-amber-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  8-YR TERM COMPLETE
                </span>
              </div>
              <div className="text-base font-bold font-mono text-[#0B2545]">
                {original.ref}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {original.bankName} • {original.branchName}
              </div>
            </div>

            {/* Right: Replacement Record */}
            <div className="p-3.5 rounded-md border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Replacement Rollover Instrument (Child Record)
                </span>
                <span className="bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  AY 2026-2034 RENEWAL
                </span>
              </div>
              <div className="text-base font-bold font-mono text-emerald-950">
                {replacement.ref}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {replacement.bankName} • {replacement.branchName}
              </div>
            </div>
          </div>

          {/* Detailed Field-by-Field Reconciliation Table */}
          <div className="border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                  <th className="py-2 px-3 w-1/3">Statutory Specification</th>
                  <th className="py-2 px-3 w-1/3 border-l border-slate-200">Original Record (2018)</th>
                  <th className="py-2 px-3 w-1/3 border-l border-slate-200">Rollover Replacement (2026)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 transition-colors ${
                      row.changed ? "bg-blue-50/20" : "bg-white"
                    }`}
                  >
                    <td className="py-2 px-3 font-semibold text-slate-700">
                      <div>{row.label}</div>
                      {row.note && (
                        <span className="text-[10px] font-mono font-medium text-slate-500">
                          {row.note}
                        </span>
                      )}
                    </td>

                    <td className="py-2 px-3 font-mono text-slate-700 border-l border-slate-200">
                      {row.original}
                    </td>

                    <td className="py-2 px-3 font-mono font-bold border-l border-slate-200">
                      <span
                        className={
                          row.highlight === "positive"
                            ? "text-[#059669] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                            : row.highlight === "replacement"
                            ? "text-[#0B2545] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200"
                            : "text-slate-800"
                        }
                      >
                        {row.replacement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-[#E2E8F0] px-5 py-3 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            SHA-256 Linkage Hash: <span className="text-slate-700 font-bold">0x88f2...41a9</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              Close Comparison
            </button>
            <button
              onClick={() => {
                alert("Certified Rollover Transcripts generated with unbroken cryptographic chain linkage.");
                onClose();
              }}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors cursor-pointer shadow-xs"
            >
              Confirm &amp; Chain Rollover Linkage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
