import { useState, useMemo } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Check,
  X,
  FileText,
  ChevronDown,
  Printer,
  FileSpreadsheet,
  Search,
  Filter,
  Layers,
  Building,
  Landmark,
  ChevronRight
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY, FORMAT_COMPACT_CURRENCY } from "@data/mockData";

export const BureauScrutinyView = ({
  instruments = [],
  onVerifyInstrument,
  selectedInstrumentId
}) => {
  const [selectedInstId, setSelectedInstId] = useState(
    selectedInstrumentId || instruments[0]?.id || "fdr-1"
  );
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [discrepancyFlagged, setDiscrepancyFlagged] = useState(false);
  const [approvedSuccess, setApprovedSuccess] = useState(false);
  const [activeChecklist, setActiveChecklist] = useState({
    originalFdr: true,
    sfmsLien: true,
    affidavit6: true,
    societyResolution: true,
    stampDuty: true
  });
  const [discrepancyNote, setDiscrepancyNote] = useState("");

  // Target Selector Modal / Drawer State
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectorSearch, setSelectorSearch] = useState("");
  const [selectorFilter, setSelectorFilter] = useState("all"); // 'all', 'discrepancy', 'expiring', 'pending'

  const currentInst = instruments.find((i) => i.id === selectedInstId) || instruments[0] || {};

  const handleVerify = () => {
    setApprovedSuccess(true);
    if (onVerifyInstrument) {
      onVerifyInstrument(currentInst.id);
    }
    setTimeout(() => {
      setApprovedSuccess(false);
    }, 3000);
  };

  const handleFlagDiscrepancy = () => {
    setDiscrepancyFlagged(true);
    setTimeout(() => {
      setDiscrepancyFlagged(false);
    }, 3000);
  };

  // Filter candidates for the target selector
  const selectorCandidates = useMemo(() => {
    return instruments.filter((inst) => {
      if (selectorFilter === "discrepancy" && !inst.hasDiscrepancy) return false;
      if (selectorFilter === "expiring" && inst.remainingDays > 90) return false;
      if (selectorFilter === "pending" && inst.bankConfirmed) return false;

      if (selectorSearch.trim()) {
        const q = selectorSearch.toLowerCase().trim();
        return (
          inst.ref.toLowerCase().includes(q) ||
          inst.instituteName.toLowerCase().includes(q) ||
          inst.instituteCode.toLowerCase().includes(q) ||
          inst.bankName.toLowerCase().includes(q) ||
          inst.discipline.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [instruments, selectorFilter, selectorSearch]);

  // Tabular verification data for the right-side government audit sheet
  const reconciliationCheckpoints = [
    {
      field: "Principal Face Value",
      declared: FORMAT_INDIAN_CURRENCY(currentInst.principalAmount || 0),
      ocr: FORMAT_INDIAN_CURRENCY(currentInst.principalAmount || 0),
      cbs: FORMAT_INDIAN_CURRENCY(currentInst.principalAmount || 0),
      variance: "0.00%",
      status: "MATCH",
      isMatched: true
    },
    {
      field: "Term / Mandatory Tenure",
      declared: `${currentInst.termYears || 8} Years (96 Months)`,
      ocr: `${currentInst.termYears || 8} Years (96 Months)`,
      cbs: `${currentInst.termYears || 8} Years (96 Months)`,
      variance: "0.00%",
      status: "MATCH",
      isMatched: true
    },
    {
      field: "FDR Receipt Serial No.",
      declared: currentInst.fdrReceiptNo || "N/A",
      ocr: currentInst.fdrReceiptNo || "N/A",
      cbs: currentInst.fdrReceiptNo || "N/A",
      variance: "Exact String Match",
      status: "MATCH",
      isMatched: true
    },
    {
      field: "Issuing Bank & Branch IFSC",
      declared: `${currentInst.bankName} (${currentInst.ifsc})`,
      ocr: `${currentInst.bankName} (${currentInst.ifsc})`,
      cbs: `${currentInst.bankName} (${currentInst.ifsc})`,
      variance: "Valid IFSC Checksum",
      status: "MATCH",
      isMatched: true
    },
    {
      field: "Joint Lien Clause Holder",
      declared: "Member Secretary, AICTE",
      ocr: currentInst.hasDiscrepancy ? "Regional Director AICTE (Misworded)" : "Member Secretary, AICTE",
      cbs: "Member Secretary, AICTE",
      variance: currentInst.hasDiscrepancy ? "Text Mismatch Flagged" : "Lien Title Confirmed",
      status: currentInst.hasDiscrepancy ? "DISCREPANCY" : "MATCH",
      isMatched: !currentInst.hasDiscrepancy
    },
    {
      field: "Premature Encashment Lock",
      declared: "Unconditional AICTE Lien",
      ocr: "Unconditional AICTE Lien",
      cbs: currentInst.bankConfirmed ? "Lien Flagged: Code 44" : "Pending CBS Confirmation",
      variance: currentInst.bankConfirmed ? "Lock-in Active" : "Pending Gateway",
      status: currentInst.bankConfirmed ? "MATCH" : "PENDING",
      isMatched: currentInst.bankConfirmed
    },
    {
      field: "e-Stamp Duty / Affidavit-6",
      declared: currentInst.eStampNumber || "N/A",
      ocr: currentInst.eStampNumber || "N/A",
      cbs: "State Treasury e-Stamping OK",
      variance: "Valid Stamp Duty",
      status: "MATCH",
      isMatched: true
    },
    {
      field: "Maturity / Rollover Date",
      declared: currentInst.maturityDate,
      ocr: currentInst.maturityDate,
      cbs: currentInst.maturityDate,
      variance: currentInst.remainingDays <= 45 ? `${currentInst.remainingDays} Days Left` : "Active",
      status: currentInst.remainingDays <= 45 ? "ACTION REQ" : "MATCH",
      isMatched: currentInst.remainingDays > 45
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top Header & Searchable Target Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md bg-[#0B2545] text-white">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-[#0B2545]">
              Dual-Track Scrutiny Desk
            </h1>
            <p className="text-xs text-slate-500">
              Official Document Verification &amp; Dual-Track Discrepancy Reconciliation Desk • National Registry ({instruments.length} Instruments)
            </p>
          </div>
        </div>

        {/* Active Instrument Selector / Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="px-3 py-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md text-xs font-bold text-[#0B2545] flex items-center gap-2 cursor-pointer shadow-2xs"
            title="Search and select from 1,350 instruments"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="truncate max-w-[220px]">
              Target: <strong>{currentInst.ref}</strong> ({currentInst.instituteName?.split(" ")[0]})
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DUAL-PANE SPLIT VIEW: Left Scanned Bank FDR (Realistic) + Right Dense Audit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT PANE (lg:col-span-6): Realistic Scanned Bank FDR Document Viewer */}
        <div className="lg:col-span-6 card-clean rounded-lg bg-slate-900 overflow-hidden flex flex-col h-[740px] border border-slate-800">
          {/* Document Viewer Dark Toolbar */}
          <div className="h-10 bg-slate-950 px-3 flex items-center justify-between text-slate-300 border-b border-slate-800 text-xs select-none">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-mono text-[11px] truncate text-slate-200">
                {currentInst.ref}_SCANNED_FDR_RECEIPT.PDF
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-slate-400 w-10 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <div className="h-4 w-px bg-slate-800 mx-1" />
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Rotate 90°"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-400 ml-1">
                1/1 Scanned Page
              </span>
            </div>
          </div>

          {/* Document Canvas Container with realistic slightly skewed scanned receipt */}
          <div className="flex-1 bg-slate-900/90 p-4 overflow-auto flex items-center justify-center relative">
            {/* The Authentic Scanned Bank FDR Receipt */}
            <div
              className="bg-[#FBF8EF] text-slate-900 w-[500px] min-h-[660px] p-6 shadow-2xl rounded-xs border border-slate-300 relative select-none transition-transform duration-200 origin-center"
              style={{
                transform: `scale(${zoomLevel / 100}) rotate(${rotation - 0.5}deg)`,
                backgroundImage: "radial-gradient(#F3EDE0 15%, transparent 16%)",
                backgroundSize: "16px 16px"
              }}
            >
              {/* Scanner Glass Edge & Barcode Strip */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-400/50 text-[9px] font-mono text-slate-500">
                <span className="tracking-widest">ORIGINAL BANK VOUCHER • SCAN REF #{currentInst.ref}-ORIG</span>
                <span className="bg-slate-800 text-white px-1.5 py-0.2 rounded font-bold">PAGE 01</span>
              </div>

              {/* Watermark in background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <span className="text-5xl font-black rotate-[-30deg] tracking-widest text-slate-900 uppercase">
                  AICTE SECURITY LIEN
                </span>
              </div>

              {/* Bank Header Section */}
              <div className="text-center pb-3 border-b-2 border-slate-800">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-[10px] font-bold">
                    {currentInst.bankName?.substring(0, 3).toUpperCase()}
                  </div>
                  <h2 className="font-serif font-black text-sm tracking-wide text-slate-900 uppercase">
                    {currentInst.bankName}
                  </h2>
                </div>
                <p className="text-[10px] text-slate-700 font-sans tracking-tight">
                  {currentInst.branchName} • IFSC: {currentInst.ifsc}
                </p>
                <div className="mt-1 font-mono font-bold text-[11px] text-slate-900 tracking-wider">
                  SPECIAL TERM DEPOSIT ADVICE / SECURITY DEPOSIT RECEIPT
                </div>
              </div>

              {/* Serial & Registration Row */}
              <div className="grid grid-cols-2 text-[10px] py-2 border-b border-dashed border-slate-400 font-mono">
                <div>
                  <span className="text-slate-500">Receipt No:</span>{" "}
                  <span className="font-bold text-slate-900 bg-yellow-200/90 px-1 py-0.5 border border-yellow-400">
                    {currentInst.fdrReceiptNo}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Date of Deposit:</span>{" "}
                  <span className="font-bold text-slate-900">{currentInst.issueDate}</span>
                </div>
              </div>

              {/* Depositor & Joint Lien Section */}
              <div className="py-2.5 text-[11px] space-y-2 leading-relaxed">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">
                    Account In Name Of (Depositor Trust / Society):
                  </span>
                  <div className="font-bold font-mono text-slate-900">
                    {currentInst.instituteName}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600">
                    PID: {currentInst.instituteCode} • {currentInst.city}, {currentInst.state}
                  </div>
                </div>

                {/* Principal Amount with Yellow OCR Bounding Box */}
                <div className="bg-yellow-200/90 p-2 rounded-xs border-2 border-dashed border-yellow-500 relative">
                  <span className="absolute -top-2.5 right-2 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded font-mono">
                    OCR: {currentInst.ocrConfidence || 98.4}% CONFIDENCE
                  </span>
                  <span className="text-slate-700 text-[10px] font-sans block font-semibold">
                    Statutory Principal Sum Deposited:
                  </span>
                  <span className="font-bold font-mono text-sm text-slate-950">
                    {FORMAT_INDIAN_CURRENCY(currentInst.principalAmount)}
                  </span>
                </div>

                {/* Statutory Joint Lien Clause Highlighted */}
                <div className={`p-2 rounded-xs border-2 border-dashed relative ${
                  currentInst.hasDiscrepancy ? "bg-red-100 border-red-500" : "bg-yellow-200/90 border-yellow-500"
                }`}>
                  <span className={`absolute -top-2.5 right-2 text-white text-[8px] font-bold px-1 rounded font-mono ${
                    currentInst.hasDiscrepancy ? "bg-red-600" : "bg-yellow-600 text-black"
                  }`}>
                    {currentInst.hasDiscrepancy ? "OCR: DISCREPANCY DETECTED" : "OCR: CLAUSE EXTRACTED"}
                  </span>
                  <span className="text-slate-700 text-[10px] font-sans block font-semibold">
                    Mandatory Joint Lien Wording (APH Clause 1.4):
                  </span>
                  <p className="text-[10px] font-serif leading-tight text-slate-950 font-medium">
                    {currentInst.hasDiscrepancy
                      ? `"Pledged in joint lien in favor of the Regional Director, AICTE. Encashment conditional on council review." (Omits Member Secretary)`
                      : `"Pledged in unconditional joint lien in favor of the Member Secretary, All India Council for Technical Education (AICTE), New Delhi. No premature withdrawal, loan, or encumbrance permitted without prior written statutory discharge."`}
                  </p>
                </div>

                {/* Tenure and e-Stamp */}
                <div className="grid grid-cols-2 text-[10px] py-2 border-y border-dashed border-slate-400 font-mono">
                  <div>
                    <span className="text-slate-500">Maturity Date:</span>{" "}
                    <span className="font-bold text-amber-900 bg-yellow-200/90 px-1 py-0.5 border border-yellow-400">
                      {currentInst.maturityDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">e-Stamp Duty No:</span>{" "}
                    <span className="font-bold">{currentInst.eStampNumber}</span>
                  </div>
                </div>
              </div>

              {/* Physical Bank Rubber Stamps & Signatures */}
              <div className="pt-4 mt-2 border-t border-slate-400 flex items-end justify-between text-[9px] text-slate-600">
                <div className="text-center">
                  <div className="font-serif italic font-bold text-slate-800 text-xs mb-1">
                    Dr. R. K. Sharma
                  </div>
                  <div className="border-t border-slate-500 pt-0.5 font-sans">
                    Registrar / Authorized Signatory
                  </div>
                </div>

                {/* Violet Bank Rubber Stamp */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-violet-800/80 text-violet-900 flex flex-col items-center justify-center rotate-[-12deg] text-[7.5px] font-bold p-1 leading-tight text-center bg-violet-50/20">
                  <span>{currentInst.bankName?.toUpperCase()}</span>
                  <span className="text-red-700 font-extrabold text-[8.5px]">LIEN RECORDED</span>
                  <span>M.S. AICTE LIEN</span>
                  <span>{currentInst.issueDate}</span>
                </div>

                <div className="text-center">
                  <div className="font-serif italic font-bold text-slate-800 text-xs mb-1">
                    P. V. Deshmukh
                  </div>
                  <div className="border-t border-slate-500 pt-0.5 font-sans">
                    Branch Manager
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE (lg:col-span-6): High-Density Government Audit Grid (Excel Style) */}
        <div className="lg:col-span-6 card-clean rounded-lg bg-white p-4 flex flex-col justify-between h-[740px] border border-[#E2E8F0]">
          <div className="overflow-y-auto space-y-4 flex-1 pr-1">
            {/* Header: Audit Sheet Identification */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#0B2545]" />
                  <span>Statutory Reconciliation Audit Grid</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  Tri-party cross-validation: Self-Declaration vs OCR Engine vs Core Banking (CBS)
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Reconciliation Score</span>
                <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded border ${
                  currentInst.hasDiscrepancy
                    ? "bg-rose-50 text-[#DC2626] border-rose-200"
                    : "bg-emerald-50 text-[#059669] border-emerald-200"
                }`}>
                  {currentInst.hasDiscrepancy ? "Discrepancy Flagged" : "99.8% Confirmed"}
                </span>
              </div>
            </div>

            {/* Discrepancy Alert Banner if active */}
            {currentInst.hasDiscrepancy && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-md text-xs text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                  <span>OCR Text &amp; Lien Clause Deficiency Flagged</span>
                </div>
                <p className="text-[11px] text-slate-700">
                  {currentInst.discrepancyNote || "Lien clause text in uploaded certificate omits Member Secretary AICTE condition."}
                </p>
              </div>
            )}

            {/* DENSE GOVERNMENT AUDIT TABLE (Excel/High-Density Style) */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-300 text-[10px]">
                    <th className="py-2 px-2 border-r border-slate-200">Checkpoint / Field</th>
                    <th className="py-2 px-2 border-r border-slate-200">Declared (Trust)</th>
                    <th className="py-2 px-2 border-r border-slate-200">OCR Extracted</th>
                    <th className="py-2 px-2 border-r border-slate-200">Core Banking (CBS)</th>
                    <th className="py-2 px-2 text-center">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {reconciliationCheckpoints.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50 ${
                        !row.isMatched ? "bg-amber-50/70" : idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                      }`}
                    >
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-800 border-r border-slate-200">
                        {row.field}
                      </td>
                      <td className="py-1.5 px-2 text-slate-700 border-r border-slate-200 truncate max-w-[110px]">
                        {row.declared}
                      </td>
                      <td className="py-1.5 px-2 text-[#0B2545] font-bold border-r border-slate-200 truncate max-w-[110px]">
                        {row.ocr}
                      </td>
                      <td className="py-1.5 px-2 text-[#059669] font-bold border-r border-slate-200 truncate max-w-[110px]">
                        {row.cbs}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            row.status === "MATCH"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statutory Compliance Checklist (APH Clause Verification) */}
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Statutory Regulatory Checkpoints (Section 1.4)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={activeChecklist.originalFdr}
                    onChange={(e) => setActiveChecklist({ ...activeChecklist, originalFdr: e.target.checked })}
                    className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545]"
                  />
                  <span className="font-medium text-slate-800 text-[11px]">Original Term Deposit Scanned</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={activeChecklist.sfmsLien}
                    onChange={(e) => setActiveChecklist({ ...activeChecklist, sfmsLien: e.target.checked })}
                    className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545]"
                  />
                  <span className="font-medium text-slate-800 text-[11px]">SFMS MT760 Lien Advice</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={activeChecklist.affidavit6}
                    onChange={(e) => setActiveChecklist({ ...activeChecklist, affidavit6: e.target.checked })}
                    className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545]"
                  />
                  <span className="font-medium text-slate-800 text-[11px]">Affidavit-6 on e-Stamp Paper</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={activeChecklist.societyResolution}
                    onChange={(e) => setActiveChecklist({ ...activeChecklist, societyResolution: e.target.checked })}
                    className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545]"
                  />
                  <span className="font-medium text-slate-800 text-[11px]">Trust Society Board Resolution</span>
                </label>
              </div>
            </div>

            {/* Officer Observation / Deficiency Memo Box */}
            <div className="space-y-1 pt-2 border-t border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Official Scrutiny Note / Deficiency Memo
              </span>
              <textarea
                rows={2}
                placeholder="Enter officer notes or document deficiency memo for institution rectification..."
                value={discrepancyNote}
                onChange={(e) => setDiscrepancyNote(e.target.value)}
                className="w-full text-xs p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#0B2545] font-sans"
              />
            </div>
          </div>

          {/* Scrutiny Action Buttons */}
          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <button
              onClick={handleFlagDiscrepancy}
              className="py-2 px-3 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-300 hover:bg-rose-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <AlertCircle className="w-4 h-4 text-rose-700" />
              <span>Flag Document Discrepancy</span>
            </button>

            <button
              onClick={handleVerify}
              className="py-2 px-4 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Affix Statutory Scrutiny Seal &amp; Approve</span>
            </button>
          </div>

          {/* Feedback messages */}
          {approvedSuccess && (
            <div className="mt-2 p-2 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              <span>Statutory Scrutiny Seal Affixed. Instrument status recorded in SHA-256 Ledger.</span>
            </div>
          )}
          {discrepancyFlagged && (
            <div className="mt-2 p-2 bg-rose-50 border border-rose-300 rounded text-xs text-rose-800 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-700" />
              <span>Deficiency Memo dispatched to Trust Chairman and Regional Office.</span>
            </div>
          )}
        </div>
      </div>

      {/* TARGET SELECTOR MODAL / SEARCHABLE QUEUE OVERLAY */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-[#0B2545] text-base">Select Instrument for Scrutiny Desk</h3>
                <p className="text-xs text-slate-500">
                  Search across {instruments.length.toLocaleString('en-IN')} statutory deposits in repository
                </p>
              </div>
              <button
                onClick={() => setIsSelectorOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="p-3 border-b border-slate-200 bg-white space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by PID, Institution Name, FDR Ref, Bank, City..."
                  value={selectorSearch}
                  onChange={(e) => setSelectorSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                {["all", "discrepancy", "expiring", "pending"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectorFilter(f)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                      selectorFilter === f
                        ? "bg-[#0B2545] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {f === "all" ? "All Instruments" : f === "discrepancy" ? "Discrepancies" : f === "expiring" ? "Maturing Soon" : "Pending Bank"}
                  </button>
                ))}
                <span className="ml-auto text-[11px] font-mono text-slate-500">
                  {selectorCandidates.length} matches
                </span>
              </div>
            </div>

            {/* Scrollable Instrument List */}
            <div className="p-3 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100">
              {selectorCandidates.slice(0, 50).map((inst) => {
                const isCurrent = inst.id === selectedInstId;
                return (
                  <div
                    key={inst.id}
                    onClick={() => {
                      setSelectedInstId(inst.id);
                      setIsSelectorOpen(false);
                    }}
                    className={`pt-2 p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? "border-[#0B2545] bg-blue-50/60"
                        : "border-slate-200 hover:border-[#0B2545] hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0B2545]">{inst.ref}</span>
                        {inst.hasDiscrepancy && (
                          <span className="bg-red-100 text-red-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                            Discrepancy
                          </span>
                        )}
                        {inst.remainingDays <= 60 && (
                          <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded">
                            {inst.remainingDays}d Left
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-xs text-slate-800 truncate">
                        {inst.instituteName}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>PID: {inst.instituteCode}</span>
                        <span>•</span>
                        <span>{inst.bankName}</span>
                        <span>•</span>
                        <span className="font-mono font-bold text-slate-700">
                          {FORMAT_INDIAN_CURRENCY(inst.principalAmount)}
                        </span>
                      </div>
                    </div>

                    <button className="px-2.5 py-1 text-xs font-bold text-[#0B2545] bg-white border border-[#0B2545] rounded hover:bg-[#0B2545] hover:text-white transition-colors shrink-0">
                      Select
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Showing top 50 matches. Type to refine query.</span>
              <button
                onClick={() => setIsSelectorOpen(false)}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
