import React, { useState } from "react";
import {
  X,
  Landmark,
  FileText,
  AlertTriangle,
  PhoneCall,
  Clock,
  Check,
  Eye,
  History,
  ShieldCheck,
  GitCompare,
  ArrowRight,
  ExternalLink,
  Download,
  Search,
  Filter,
  CheckCircle2,
  FileSignature
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const InstrumentDetailModal = ({
  instrument,
  onClose,
  onInitiateRpgf,
  onOpenAffidavit,
  onOpenScrutiny,
  onScrutinize,
  onOpenRenewalComparison
}) => {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "audit" | "renewal"
  const [auditFilter, setAuditFilter] = useState("all");
  const [searchAudit, setSearchAudit] = useState("");
  const [actionToast, setActionToast] = useState(null);

  if (!instrument) return null;

  const handleScrutiny = () => {
    if (onOpenScrutiny) onOpenScrutiny(instrument);
    else if (onScrutinize) onScrutinize(instrument);
  };

  const handleTriggerActionToast = (msg) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  // Detailed, field-level audit trail adhering directly to requirement 3.5:
  // "Show who changed a record, when it changed, what the previous value was, the new value, and any recorded reason."
  const auditTrailRecords = [
    {
      id: "aud-001",
      timestamp: "24 Oct 2026, 14:32 IST",
      actor: "Dr. Rajesh K. Sharma (Registrar / Depositor Trust)",
      category: "compliance",
      field: "Affidavit-6 Encumbrance Declaration",
      previousValue: "Pending Submission",
      newValue: "Digitally Uploaded & Verified (e-Stamp #MH-44029)",
      reason: "Mandatory pre-renewal compliance filing under AICTE APH 2026-27 Clause 1.4.",
      sha256: "0x8f2a...771c99"
    },
    {
      id: "aud-002",
      timestamp: "18 Oct 2026, 11:15 IST",
      actor: "Automated SFMS Gateway Daemon (SBI Nariman Point)",
      category: "bank",
      field: "CBS Core Banking Lien & Balance Status",
      previousValue: "Verification Due (T-60 Trigger)",
      newValue: "CBS Confirmed (Principal ₹35,00,000 Intact, Lien Code 44)",
      reason: "Automated interbank telemetry ping via SFMS MT799 lien confirmation protocol.",
      sha256: "0x33e1...b049d2"
    },
    {
      id: "aud-003",
      timestamp: "05 Aug 2026, 16:40 IST",
      actor: "Smt. Meenakshi S. (Bureau Officer, AICTE HQ)",
      category: "regulatory",
      field: "Phase-5 Release Hold Gate",
      previousValue: "Conditional Verification Hold",
      newValue: "Cleared / Release Petition Eligible",
      reason: "Cross-bureau clearance: EVC compliance certified with zero pending student ombudsman grievances.",
      sha256: "0xaa94...55ef10"
    },
    {
      id: "aud-004",
      timestamp: "15 Dec 2018, 10:00 IST",
      actor: "Regional Officer, WRO Mumbai & MS AICTE",
      category: "creation",
      field: "Security Deposit Creation & Lien Inscription",
      previousValue: "Unpledged Draft Voucher",
      newValue: "Tripartite Joint Lien In-Force (Term: 8 Years / 96 Mo)",
      reason: "Initial statutory security deposit creation for 4-year UG Engineering & PG Tech approval.",
      sha256: "0x17c0...398fae"
    }
  ];

  const filteredAuditRecords = auditTrailRecords.filter((record) => {
    const matchesCategory =
      auditFilter === "all" || record.category === auditFilter;
    const matchesSearch =
      record.field.toLowerCase().includes(searchAudit.toLowerCase()) ||
      record.actor.toLowerCase().includes(searchAudit.toLowerCase()) ||
      record.reason.toLowerCase().includes(searchAudit.toLowerCase()) ||
      record.newValue.toLowerCase().includes(searchAudit.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instrument-drawer-title"
    >
      {/* Right-Side Slideout Drawer */}
      <div className="w-full max-w-[620px] bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-[#E2E8F0]">
        
        {/* Drawer Header */}
        <div className="p-4 lg:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span id="instrument-drawer-title" className="font-mono text-base font-bold text-[#0B2545]">
                  {instrument.ref}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-[#0B2545] border border-blue-200">
                  PID: {instrument.instituteCode || "1-1029384"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    instrument.remainingDays <= 60
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                  }`}
                >
                  {instrument.remainingDays <= 60 ? `Maturing in ${instrument.remainingDays}D` : "Active In-Force"}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1 font-medium truncate max-w-[420px]">
                {instrument.discipline || "Engineering & Technology (UG/PG)"} • {instrument.bankName}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-[#0F172A] hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Tab Navigation */}
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-[#E2E8F0]/70">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#0B2545] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Overview &amp; Bank Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === "audit"
                  ? "bg-[#0B2545] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Audit Trail &amp; Ledger ({auditTrailRecords.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("renewal")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === "renewal"
                  ? "bg-[#0B2545] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Renewal Continuity</span>
            </button>
          </div>
        </div>

        {/* Temporary Notification Toast inside Drawer */}
        {actionToast && (
          <div className="mx-4 mt-3 p-2.5 bg-emerald-50 border border-emerald-300 rounded-md text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionToast}</span>
          </div>
        )}

        {/* Drawer Body (Scrollable) */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-[#0F172A] flex-1">
          
          {/* TAB 1: OVERVIEW & BANK TELEMETRY */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Dual-Source Verification Tag */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-[#E2E8F0] space-y-2">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Dual-Source Verification Status
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <span>🏛️ Institution Self-Declared</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  {instrument.bankConfirmed ? (
                    <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Bank CBS Verified: {instrument.bankName.split(" ")[0]} Gateway</span>
                    </span>
                  ) : (
                    <span className="bg-rose-100 text-rose-900 border border-rose-300 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                      <span>Pending Verification Match</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Statutory Milestone Warning if Maturing Soon */}
              {instrument.remainingDays <= 90 && (
                <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-300 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-900 text-xs">
                      Statutory 8-Year Lock-in Maturing Soon
                    </p>
                    <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed font-medium">
                      Reaches maturity on <strong>{instrument.maturityDate}</strong> ({instrument.remainingDays} days remaining).
                      Under Section 1.4 of the Approval Process Handbook, the institution must execute an Affidavit-6 Rollover or initiate a Phase-5 release petition.
                    </p>
                  </div>
                </div>
              )}

              {/* Key Financial Tiles */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-[#E2E8F0] bg-white">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                    Principal Encumbered
                  </span>
                  <div className="text-xl font-bold text-[#0F172A] mt-1 font-mono tabular-nums">
                    {FORMAT_INDIAN_CURRENCY(instrument.principalAmount)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">100% Unconditional Lien Marked</span>
                </div>

                <div className="p-3 rounded-lg border border-[#E2E8F0] bg-white">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                    Accrued Compound Yield
                  </span>
                  <div className="text-xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
                    +{FORMAT_INDIAN_CURRENCY(instrument.accruedInterest)}
                  </div>
                  <span className="text-[10px] text-[#64748B]">{instrument.interestRate}% Quarterly Compounding</span>
                </div>
              </div>

              {/* Scanned FDR Certificate Preview Card */}
              <div className="border border-[#E2E8F0] rounded-lg p-3.5 bg-[#F8FAFC] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#0B2545]" />
                    Scanned FDR Certificate Preview
                  </span>
                  {(onOpenScrutiny || onScrutinize) && (
                    <button
                      onClick={handleScrutiny}
                      className="text-xs font-semibold text-[#0B2545] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect in Dual-Pane</span>
                    </button>
                  )}
                </div>

                <div className="p-3.5 bg-[#FCFBF7] border border-amber-900/20 rounded-md text-center font-serif text-[11px] text-slate-800 space-y-1.5 shadow-2xs">
                  <div className="font-bold uppercase tracking-wider text-xs text-slate-900">
                    {instrument.bankName}
                  </div>
                  <p className="text-[10px] text-slate-600 font-sans">
                    Receipt Serial No: <span className="font-mono font-bold text-slate-900">{instrument.fdrReceiptNo}</span>
                  </p>
                  <div className="p-1.5 bg-amber-100/90 rounded text-[10px] font-sans text-amber-950 font-medium">
                    Pledged in Joint Lien to Member Secretary, AICTE New Delhi • Term: 8 Years
                  </div>
                </div>
              </div>

              {/* Issuing Bank & Branch Official Contact */}
              <div className="border border-[#E2E8F0] rounded-lg p-4 bg-white space-y-3">
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-1.5 border-b border-[#E2E8F0] flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-[#0B2545]" />
                  Issuing Bank &amp; Branch Official Contact
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-[#64748B] block">Bank &amp; Branch:</span>
                    <span className="font-semibold text-[#0F172A]">{instrument.bankName}</span>
                    <span className="text-[11px] text-[#64748B] block">{instrument.branchName}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#64748B] block">IFSC Code:</span>
                    <span className="font-mono font-bold text-[#0F172A]">{instrument.ifsc}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#64748B] block">Branch Manager:</span>
                    <span className="font-semibold text-[#0F172A]">Sh. P. V. Deshmukh</span>
                    <span className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                      <PhoneCall className="w-3 h-3 text-[#0B2545]" /> +91 22 2289 4400
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#64748B] block">SFMS Gateway Code:</span>
                    <span className="font-mono font-bold text-emerald-700">{instrument.sfmsReference || "SFMS-SBIN-88910"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPLETE AUDIT TRAIL & LEDGER */}
          {activeTab === "audit" && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                    Immutable Field-Level Audit Trail
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Permanent cryptographic state-transition log under AICTE Vigilance Protocol.
                  </p>
                </div>
                <button
                  onClick={() => handleTriggerActionToast("Certified Audit Transcript generated with SHA-256 digital seal.")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>

              {/* Filter Pills & Search */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search modifier, field, or reason..."
                    value={searchAudit}
                    onChange={(e) => setSearchAudit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B2545]"
                  />
                </div>
                <select
                  value={auditFilter}
                  onChange={(e) => setAuditFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value="all">All Changes</option>
                  <option value="compliance">Compliance</option>
                  <option value="bank">Bank Sync</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="creation">Creation</option>
                </select>
              </div>

              {/* Audit Cards List */}
              <div className="space-y-2.5">
                {filteredAuditRecords.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-xs text-[#0B2545] block">
                          {item.field}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Modified by: <strong className="text-slate-800">{item.actor}</strong>
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500 shrink-0 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {item.timestamp}
                      </span>
                    </div>

                    {/* Previous vs New Value Transition */}
                    <div className="p-2 bg-slate-50 rounded border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                          Previous Value:
                        </span>
                        <span className="text-slate-600 line-through truncate block">
                          {item.previousValue}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-emerald-600 block tracking-wider">
                          New Value (Certified):
                        </span>
                        <span className="text-emerald-800 font-semibold truncate block">
                          {item.newValue}
                        </span>
                      </div>
                    </div>

                    {/* Recorded Statutory Reason */}
                    <div className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <span className="font-bold text-slate-800 shrink-0">Reason:</span>
                      <span className="italic">{item.reason}</span>
                    </div>

                    {/* Cryptographic SHA-256 Ledger Stamp */}
                    <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Ledger Stamp: {item.sha256}</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Block Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RENEWAL & ROLLOVER CONTINUITY */}
          {activeTab === "renewal" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg space-y-1">
                <span className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
                  <GitCompare className="w-4 h-4 text-[#0B2545]" />
                  8-Year Rollover Continuity Tracking
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  When an 8-year statutory FDR matures, the institution must submit an unbroken rollover deposit.
                  The portal preserves continuous cryptographic linkage between original deposit #{instrument.ref} and the renewal record.
                </p>
              </div>

              {/* Side-by-Side Snapshot Comparison Card */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 px-3 py-2">
                  <span>Original Record (2018)</span>
                  <span className="text-emerald-800">Renewal Replacement (2026)</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="grid grid-cols-2 p-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">FDR Receipt No:</span>
                      <span className="font-mono font-bold text-slate-800">{instrument.fdrReceiptNo}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 block font-bold">New Rollover Receipt:</span>
                      <span className="font-mono font-bold text-emerald-900">SBI-NMP-9941028</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 p-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Maturity Date:</span>
                      <span className="font-mono text-amber-900 font-bold">{instrument.maturityDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 block font-bold">Extended Lock-in:</span>
                      <span className="font-mono text-emerald-900 font-bold">15 Dec 2034 (+8 Years)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 p-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Yield Rate:</span>
                      <span className="font-mono">{instrument.interestRate}% p.a.</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 block font-bold">Updated Yield:</span>
                      <span className="font-mono text-emerald-900 font-bold">7.10% p.a. (+35 bps)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 p-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Joint Lien Title:</span>
                      <span className="font-semibold text-slate-800">Member Secretary, AICTE</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 block font-bold">Continuity Verified:</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 100% Unbroken Lien
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action Button to Open Full Side-by-Side Desk */}
              {onOpenRenewalComparison && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenRenewalComparison(instrument);
                  }}
                  className="w-full py-2.5 px-3 rounded-md bg-[#0B2545] hover:bg-[#07182D] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <GitCompare className="w-4 h-4 text-amber-400" />
                  <span>Open Full Side-by-Side Comparison Desk &rarr;</span>
                </button>
              )}
            </div>
          )}

        </div>

        {/* Drawer Sticky Footer Actions */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center gap-2">
          {(onOpenScrutiny || onScrutinize) && (
            <button
              onClick={handleScrutiny}
              className="flex-1 py-2.5 px-3 rounded-md bg-[#0B2545] hover:bg-[#07182D] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Dual-Pane Scrutiny</span>
            </button>
          )}

          {onOpenRenewalComparison && (
            <button
              onClick={() => {
                onClose();
                onOpenRenewalComparison(instrument);
              }}
              className="py-2.5 px-3 rounded-md bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <GitCompare className="w-3.5 h-3.5 text-blue-800" />
              <span>Compare Renewal</span>
            </button>
          )}

          {onInitiateRpgf && (
            <button
              onClick={() => onInitiateRpgf(instrument)}
              className="py-2.5 px-3 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Apply Release</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
