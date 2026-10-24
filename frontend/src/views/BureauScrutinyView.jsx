import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Check,
  X,
  ArrowRight,
  Landmark,
  FileText,
  ChevronDown
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";
export const BureauScrutinyView = ({
  instruments,
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
  const [checklist, setChecklist] = useState({
    originalFdr: true,
    sfmsLien: true,
    affidavit6: true,
    societyResolution: true,
    stampDuty: true
  });
  const [discrepancyNote, setDiscrepancyNote] = useState("");
  const currentInst = instruments.find((i) => i.id === selectedInstId) || instruments[0];
  const handleVerify = () => {
    setApprovedSuccess(true);
    onVerifyInstrument(currentInst.id);
    setTimeout(() => {
      setApprovedSuccess(false);
    }, 3e3);
  };
  const handleFlagDiscrepancy = () => {
    setDiscrepancyFlagged(true);
    setTimeout(() => {
      setDiscrepancyFlagged(false);
    }, 3e3);
  };
  return <div className="space-y-4">
      {
    /* Top Header & Instrument Switcher */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-[#0F172A]">
              Statutory Verification & Scrutiny Desk
            </h1>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Regional Scrutiny Desk • Western Regional Office (WRO), Mumbai • Section 1.4 Regulatory Validation
          </p>
        </div>

        {
    /* Instrument Selector Pill */
  }
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B] font-medium hidden sm:inline">Active Instrument:</span>
          <div className="relative">
            <select
    value={selectedInstId}
    onChange={(e) => setSelectedInstId(e.target.value)}
    className="appearance-none bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs font-bold text-[#0D3B66] pr-7 cursor-pointer hover:border-[#0D3B66] focus:outline-none"
  >
              {instruments.map((inst) => <option key={inst.id} value={inst.id}>
                  {inst.ref} ({inst.bankName.split(" ")[0]} - {FORMAT_INDIAN_CURRENCY(inst.principalAmount)})
                </option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B] pointer-events-none" />
          </div>
        </div>
      </div>

      {
    /* DUAL-PANE SPLIT VIEW (50/50 Layout - Exactly from Wireframe 2) */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {
    /* LEFT PANE (lg:col-span-6): High-Fidelity PDF/Document Viewer */
  }
        <div className="lg:col-span-6 card-clean rounded-xl bg-slate-900 overflow-hidden flex flex-col h-[740px] shadow-sm">
          {
    /* Document Viewer Dark Toolbar (from Wireframe 2) */
  }
          <div className="h-11 bg-slate-950 px-3.5 flex items-center justify-between text-slate-300 border-b border-slate-800 text-xs select-none">
            {
    /* Left: Document Title */
  }
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="font-mono text-[11px] truncate text-slate-200">
                {currentInst.ref}_BANK_CERTIFICATE_SCAN.PDF
              </span>
            </div>

            {
    /* Right: Zoom & Control Toolbar */
  }
            <div className="flex items-center gap-2">
              <button
    onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
    className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
    title="Zoom Out"
  >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] text-slate-400 w-10 text-center">
                {zoomLevel}%
              </span>
              <button
    onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
    className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
    title="Zoom In"
  >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-slate-800 mx-1" />
              <button
    onClick={() => setRotation((r) => (r + 90) % 360)}
    className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
    title="Rotate 90°"
  >
                <RotateCw className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-slate-400 ml-1">
                Page 1 of 1
              </span>
            </div>
          </div>

          {
    /* Document Canvas Container with realistic Certificate scan */
  }
          <div className="flex-1 bg-slate-800/80 p-4 overflow-auto flex items-center justify-center relative">
            {
    /* The Actual Bank FDR Certificate Scan (Guilloche Border, Bank Emblem, Highlighted Fields) */
  }
            <div
    className="bg-[#FCFBF7] text-slate-900 w-[500px] min-h-[640px] p-6 shadow-2xl rounded-xs border-8 border-double border-amber-900/30 relative select-none transition-transform duration-200 origin-center"
    style={{
      transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`
    }}
  >
              {
    /* Ornate Inner Border */
  }
              <div className="border border-amber-900/40 p-4 h-full relative">
                
                {
    /* Watermark in background */
  }
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                  <span className="text-6xl font-black rotate-[-35deg] tracking-widest text-slate-900 uppercase">
                    AICTE JOINT LIEN
                  </span>
                </div>

                {
    /* Top Bank Header */
  }
                <div className="text-center pb-3 border-b-2 border-amber-900/30">
                  <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-[#0D3B66] text-white flex items-center justify-center font-bold text-xs ring-2 ring-amber-500/30">
                    <Landmark className="w-5 h-5 text-amber-300" />
                  </div>
                  <h2 className="font-serif font-black text-sm tracking-wider text-slate-900 uppercase">
                    {currentInst.bankName}
                  </h2>
                  <p className="text-[10px] text-slate-600 font-sans tracking-tight">
                    {currentInst.branchName} • IFSC: {currentInst.ifsc}
                  </p>
                  <div className="inline-block px-2.5 py-0.5 mt-1 border border-amber-800/40 font-serif font-bold text-[10px] uppercase text-amber-900 tracking-wider">
                    TERM DEPOSIT RECEIPT / JOINT SECURITY DEPOSIT
                  </div>
                </div>

                {
    /* Metadata Row */
  }
                <div className="grid grid-cols-2 text-[10px] py-2 border-b border-dashed border-amber-900/20 font-mono">
                  <div>
                    <span className="text-slate-500">Receipt No:</span>{" "}
                    <span className="font-bold">{currentInst.fdrReceiptNo}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500">Date of Issue:</span>{" "}
                    <span className="font-bold">{currentInst.issueDate}</span>
                  </div>
                </div>

                {
    /* Depositor & Lien Section */
  }
                <div className="py-3 text-[11px] space-y-2 leading-relaxed">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">
                      Depositor (In Joint Lien with):
                    </span>
                    <div className="font-bold text-slate-900">
                      {currentInst.instituteName || "BHARATI VIDYA SANSTHAN"} A/C {currentInst.jointLienWith.toUpperCase()}
                    </div>
                  </div>

                  {
    /* Principal Amount with Yellow OCR Highlight (from Wireframe 2) */
  }
                  <div className="bg-yellow-200/80 px-2 py-1 rounded border-l-4 border-yellow-500">
                    <span className="text-slate-700 text-[10px] font-sans block font-semibold">
                      Principal Sum Deposited:
                    </span>
                    <span className="font-bold font-mono text-xs text-slate-900">
                      {FORMAT_INDIAN_CURRENCY(currentInst.principalAmount)}
                    </span>
                    <span className="text-[10px] text-slate-700 ml-2 font-serif italic">
                      (Rupees Thirty-Five Lakhs Only)
                    </span>
                  </div>

                  {
    /* Statutory Joint Lien Clause Highlighted in Yellow (from Wireframe 2) */
  }
                  <div className="bg-yellow-200/80 px-2 py-1 rounded border-l-4 border-yellow-500">
                    <span className="text-slate-700 text-[10px] font-sans block font-semibold">
                      Statutory Lien Condition:
                    </span>
                    <p className="text-[10px] font-serif font-medium text-slate-900 leading-snug">
                      &quot;Lien marked unconditionally in favour of MEMBER SECRETARY, AICTE NEW DELHI. The deposit cannot be encashed, pledged or withdrawn without prior written consent of Regional Officer, AICTE WRO.&quot;
                    </p>
                  </div>

                  {
    /* SFMS Code / Transmission Reference */
  }
                  <div className="text-[10px]">
                    <span className="text-slate-500">SFMS Structured Confirmation:</span>{" "}
                    <span className="font-mono font-bold text-slate-800">{currentInst.sfmsReference}</span>
                  </div>

                  {
    /* Discrepancy Highlight Box (if flagged or instrument has discrepancy - Red highlight from Wireframe 2) */
  }
                  {currentInst.hasDiscrepancy && <div className="bg-red-100 px-2 py-1 rounded border-l-4 border-red-600 animate-pulse">
                      <span className="text-red-800 text-[10px] font-sans font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        Discrepancy Detected by OCR:
                      </span>
                      <p className="text-[10px] text-red-900 font-sans mt-0.5">
                        {currentInst.discrepancyNote}
                      </p>
                    </div>}

                  {
    /* Maturity & Interest Details */
  }
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                    <div>
                      <span className="text-slate-500">Period:</span>{" "}
                      <span className="font-bold">{currentInst.termYears} Years (96 Months)</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Interest Rate:</span>{" "}
                      <span className="font-bold">{currentInst.interestRate}% p.a.</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Maturity Date:</span>{" "}
                      <span className="font-bold text-amber-900">{currentInst.maturityDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">e-Stamp No:</span>{" "}
                      <span className="font-mono font-bold">{currentInst.eStampNumber}</span>
                    </div>
                  </div>
                </div>

                {
    /* Signatures & Bank Stamp at Bottom of Certificate */
  }
                <div className="pt-4 mt-2 border-t border-amber-900/30 flex items-end justify-between text-[9px] text-slate-600">
                  <div className="text-center">
                    <div className="font-serif italic font-bold text-slate-800 text-xs mb-1">
                      Rajesh K. Sharma
                    </div>
                    <div className="border-t border-slate-400 pt-0.5">
                      Registrar (Institution)
                    </div>
                  </div>

                  {
    /* Rubber Stamp graphic */
  }
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-700/60 text-red-700/80 flex flex-col items-center justify-center rotate-[-12deg] text-[8px] font-bold p-1">
                    <span>SBI NARIMAN</span>
                    <span>LIEN LOCKED</span>
                    <span>15 DEC 2018</span>
                  </div>

                  <div className="text-center">
                    <div className="font-serif italic font-bold text-slate-800 text-xs mb-1">
                      P. V. Deshmukh
                    </div>
                    <div className="border-t border-slate-400 pt-0.5">
                      Branch Manager, SBI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
    /* RIGHT PANE (lg:col-span-6): Scrutiny Checklist + Auto-Extracted OCR/Bank API Comparison */
  }
        <div className="lg:col-span-6 card-clean rounded-xl bg-white p-5 flex flex-col justify-between h-[740px] shadow-sm">
          <div className="overflow-y-auto pr-1 space-y-4 flex-1">
            
            {
    /* Header: Two-tone Verification Source Tagging (Problem Statement Requirement) */
  }
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                  Verification Source Audit
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {
    /* Institution Tag */
  }
                  <span className="badge-institution text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span>🏛️ Institution Submitted</span>
                  </span>
                  <span className="text-slate-300">vs</span>
                  {
    /* Bank API Tag */
  }
                  <span className="badge-bank-verified text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Bank API Verified: {currentInst.bankName.split(" ")[0]}</span>
                  </span>
                </div>
              </div>

              {
    /* Confidence Score */
  }
              <div className="text-right">
                <span className="text-[10px] text-[#64748B] font-semibold uppercase">OCR Match Score</span>
                <div className="text-base font-bold text-[#059669] font-mono">98.4% Match</div>
              </div>
            </div>

            {
    /* Side-by-Side Comparison Grid (Green tick for match, Red highlight for mismatch) */
  }
            <div>
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
                Side-by-Side Data Reconciliation
              </h3>

              <div className="space-y-2">
                {
    /* Field 1: Principal Amount */
  }
                <div className="p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-[#64748B] font-medium block">Principal Face Value:</span>
                    <span className="font-mono font-bold text-[#0F172A]">
                      {FORMAT_INDIAN_CURRENCY(currentInst.principalAmount)}
                    </span>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-[11px] text-[#64748B] font-medium block">Bank API Confirmed:</span>
                    <span className="font-mono font-bold text-[#059669]">
                      {FORMAT_INDIAN_CURRENCY(currentInst.principalAmount)}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0 ml-2">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                {
    /* Field 2: Joint Lien Beneficiary */
  }
                <div className="p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
                  <div className="space-y-0.5 max-w-[45%]">
                    <span className="text-[11px] text-[#64748B] font-medium block">Declared Lien Beneficiary:</span>
                    <span className="font-semibold text-[#0F172A] truncate block">
                      Member Secretary, AICTE
                    </span>
                  </div>
                  <div className="text-right space-y-0.5 max-w-[45%]">
                    <span className="text-[11px] text-[#64748B] font-medium block">CBS Lien Marked:</span>
                    <span className="font-semibold text-[#059669] truncate block">
                      Member Secretary, AICTE
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0 ml-2">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                {
    /* Field 3: Institution Legal Title (shows mismatch on discrepancy instrument) */
  }
                <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${currentInst.hasDiscrepancy ? "border-red-300 bg-red-50/70" : "border-[#E2E8F0] bg-[#F8FAFC]"}`}>
                  <div className="space-y-0.5 max-w-[45%]">
                    <span className="text-[11px] text-[#64748B] font-medium block">Institution Name:</span>
                    <span className="font-semibold text-[#0F172A] truncate block">
                      Bharati Vidya Sansthan
                    </span>
                  </div>
                  <div className="text-right space-y-0.5 max-w-[45%]">
                    <span className="text-[11px] text-[#64748B] font-medium block">Bank FDR Text:</span>
                    <span className={`font-semibold truncate block ${currentInst.hasDiscrepancy ? "text-[#DC2626]" : "text-[#059669]"}`}>
                      {currentInst.hasDiscrepancy ? "Bharati Trust (Discrepant)" : "Bharati Vidya Sansthan"}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 ${currentInst.hasDiscrepancy ? "bg-red-100 text-[#DC2626]" : "bg-emerald-100 text-[#059669]"}`}>
                    {currentInst.hasDiscrepancy ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {
    /* Field 4: Maturity Date */
  }
                <div className="p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-[#64748B] font-medium block">Declared Maturity:</span>
                    <span className="font-semibold text-[#0F172A]">{currentInst.maturityDate}</span>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-[11px] text-[#64748B] font-medium block">Bank CBS Maturity:</span>
                    <span className="font-semibold text-[#059669]">{currentInst.maturityDate}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0 ml-2">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                {
    /* Field 5: SFMS Transmission Code */
  }
                <div className="p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
                  <div className="space-y-0.5 truncate max-w-[45%]">
                    <span className="text-[11px] text-[#64748B] font-medium block">SFMS 799 Ref:</span>
                    <span className="font-mono font-bold text-[#0F172A] truncate block">{currentInst.sfmsReference}</span>
                  </div>
                  <div className="text-right space-y-0.5 truncate max-w-[45%]">
                    <span className="text-[11px] text-[#64748B] font-medium block">Direct Feed Match:</span>
                    <span className="font-mono font-bold text-[#059669] truncate block">{currentInst.sfmsReference}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0 ml-2">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {
    /* Statutory Checkpoints (Checklist) */
  }
            <div className="pt-2 border-t border-[#E2E8F0]">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                Statutory Scrutiny Checkpoints
              </h3>

              <div className="space-y-1.5 text-xs text-[#0F172A]">
                <label className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <input
    type="checkbox"
    checked={checklist.originalFdr}
    onChange={(e) => setChecklist({ ...checklist, originalFdr: e.target.checked })}
    className="rounded border-[#E2E8F0] text-[#0D3B66] focus:ring-[#0D3B66]"
  />
                  <span>Original Term Deposit certificate scan verified against physical bank seal</span>
                </label>

                <label className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <input
    type="checkbox"
    checked={checklist.sfmsLien}
    onChange={(e) => setChecklist({ ...checklist, sfmsLien: e.target.checked })}
    className="rounded border-[#E2E8F0] text-[#0D3B66] focus:ring-[#0D3B66]"
  />
                  <span>SFMS 799 lien acknowledgement verified with Core Banking System</span>
                </label>

                <label className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <input
    type="checkbox"
    checked={checklist.affidavit6}
    onChange={(e) => setChecklist({ ...checklist, affidavit6: e.target.checked })}
    className="rounded border-[#E2E8F0] text-[#0D3B66] focus:ring-[#0D3B66]"
  />
                  <span>Affidavit 6 notarized on non-judicial stamp paper enclosed</span>
                </label>

                <label className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <input
    type="checkbox"
    checked={checklist.societyResolution}
    onChange={(e) => setChecklist({ ...checklist, societyResolution: e.target.checked })}
    className="rounded border-[#E2E8F0] text-[#0D3B66] focus:ring-[#0D3B66]"
  />
                  <span>Society/Trust resolution authorizing joint lien with Member Secretary verified</span>
                </label>
              </div>
            </div>

            {
    /* Discrepancy Note Area */
  }
            <div className="pt-2 border-t border-[#E2E8F0]">
              <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                Scrutiny Officer Remarks / Deficiency Memo:
              </label>
              <textarea
    rows={2}
    value={discrepancyNote}
    onChange={(e) => setDiscrepancyNote(e.target.value)}
    placeholder="Enter remarks for RO Bureau records or institutional clarification memo..."
    className="w-full text-xs p-2.5 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#0D3B66]"
  />
            </div>

            {
    /* Notification Toasts */
  }
            {approvedSuccess && <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instrument approved & upgraded to Active Encumbrance!</span>
              </div>}

            {discrepancyFlagged && <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Deficiency notice issued to institution & logged in audit trail.</span>
              </div>}
          </div>

          {
    /* STICKY BOTTOM ACTION BAR (Matching Wireframe 2) */
  }
          <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
    /* Action 1: Verify & Approve (Emerald Green) */
  }
            <button
    onClick={handleVerify}
    className="py-2.5 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
  >
              <Check className="w-4 h-4" />
              <span>Verify & Approve</span>
            </button>

            {
    /* Action 2: Flag Discrepancy (Crimson Red) */
  }
            <button
    onClick={handleFlagDiscrepancy}
    className="py-2.5 px-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
  >
              <X className="w-4 h-4" />
              <span>Flag Discrepancy</span>
            </button>

            {
    /* Action 3: Request Replacement / Review (Deep Navy) */
  }
            <button
    onClick={() => alert("Sending replacement notice to Registrar & Branch Manager...")}
    className="py-2.5 px-3 rounded-lg bg-[#0D3B66] hover:bg-[#002546] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
  >
              <ArrowRight className="w-4 h-4" />
              <span>Request Action</span>
            </button>
          </div>
        </div>

      </div>
    </div>;
};
