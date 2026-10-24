import {
  X,
  Landmark,
  FileText,
  AlertTriangle,
  PhoneCall,
  Clock,
  Check,
  Eye
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../../data/mockData";
export const InstrumentDetailModal = ({
  instrument,
  onClose,
  onInitiateRpgf,
  onOpenAffidavit,
  onOpenScrutiny
}) => {
  if (!instrument) return null;
  return <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200 select-none">
      {
    /* Right-Side Slideout Drawer (Width 520px - exactly from prompt specification) */
  }
      <div className="w-full max-w-[540px] bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-[#E2E8F0]">
        
        {
    /* Drawer Header */
  }
        <div className="p-4 lg:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-[#0D3B66]">
                {instrument.ref}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-[#0D3B66] border border-blue-200">
                PID: {instrument.instituteCode || "1-1029384"}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium truncate max-w-[400px]">
              {instrument.discipline}
            </p>
          </div>

          <button
    onClick={onClose}
    className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-200/60 transition-colors cursor-pointer"
    aria-label="Close Drawer"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Drawer Body (Scrollable) */
  }
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-[#0F172A] flex-1">
          
          {
    /* Two-Tone Verification Source Tagging (Problem Statement Item) */
  }
          <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              Dual-Source Verification Status
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-institution text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span>🏛️ Institution Submitted</span>
              </span>
              <span className="text-slate-300">|</span>
              {instrument.bankConfirmed ? <span className="badge-bank-verified text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Bank API Verified: {instrument.bankName.split(" ")[0]} CBS</span>
                </span> : <span className="badge-discrepancy text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Pending Scrutiny Match</span>
                </span>}
            </div>
          </div>

          {
    /* Alert if Maturing Soon */
  }
          {instrument.remainingDays <= 90 && <div className="p-3.5 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#92400E] text-xs">
                  Statutory 8-Year Lock-in Maturing Soon
                </p>
                <p className="text-[#B45309] text-[11px] mt-0.5 leading-relaxed">
                  Reaches maturity on <strong>{instrument.maturityDate}</strong> ({instrument.remainingDays} days remaining). Submit Phase-5 release or renewal affidavit.
                </p>
              </div>
            </div>}

          {
    /* Key Financial Tiles Strip */
  }
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-[#E2E8F0] bg-white">
              <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                Principal Encumbered
              </span>
              <div className="text-xl font-bold text-[#0F172A] mt-1 font-mono tabular-nums">
                {FORMAT_INDIAN_CURRENCY(instrument.principalAmount)}
              </div>
              <span className="text-[10px] text-[#059669] font-medium">100% Lien Marked</span>
            </div>

            <div className="p-3 rounded-xl border border-[#E2E8F0] bg-white">
              <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                Accrued Yield
              </span>
              <div className="text-xl font-bold text-[#059669] mt-1 font-mono tabular-nums">
                +{FORMAT_INDIAN_CURRENCY(instrument.accruedInterest)}
              </div>
              <span className="text-[10px] text-[#64748B]">{instrument.interestRate}% Quarterly Comp.</span>
            </div>
          </div>

          {
    /* Scanned FDR Certificate Preview (from Drawer Specification) */
  }
          <div className="border border-[#E2E8F0] rounded-xl p-3 bg-[#F8FAFC] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0D3B66]" />
                Scanned FDR Certificate Preview
              </span>
              {onOpenScrutiny && <button
    onClick={() => onOpenScrutiny(instrument)}
    className="text-xs font-semibold text-[#0D3B66] hover:underline flex items-center gap-1 cursor-pointer"
  >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect in Dual-Pane</span>
                </button>}
            </div>

            <div className="p-3 bg-[#FCFBF7] border border-amber-900/20 rounded-lg text-center font-serif text-[11px] text-slate-800 space-y-1 shadow-2xs">
              <div className="font-bold uppercase tracking-wider text-xs text-slate-900">
                {instrument.bankName}
              </div>
              <p className="text-[10px] text-slate-500 font-sans">
                Receipt No: <span className="font-mono font-bold text-slate-800">{instrument.fdrReceiptNo}</span>
              </p>
              <div className="p-1 bg-yellow-100 rounded text-[10px] font-sans text-amber-950 font-medium">
                Pledged to Member Secretary, AICTE New Delhi • Term: 8 Years
              </div>
            </div>
          </div>

          {
    /* Issuing Bank & Branch Contact Details (Drawer Specification) */
  }
          <div className="border border-[#E2E8F0] rounded-xl p-4 bg-white space-y-2.5">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-1.5 border-b border-[#E2E8F0] flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#0D3B66]" />
              Issuing Bank & Branch Official Contact
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[11px] text-[#64748B] block">Bank & Branch:</span>
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
                <span className="text-[11px] text-[#64748B] block flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-[#0D3B66]" /> +91 22 2289 4400
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#64748B] block">SFMS Gateway Code:</span>
                <span className="font-mono font-bold text-[#059669]">{instrument.sfmsReference}</span>
              </div>
            </div>
          </div>

          {
    /* Complete Audit & Renewal Stepper Timeline */
  }
          <div className="border border-[#E2E8F0] rounded-xl p-4 bg-white space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-1.5 border-b border-[#E2E8F0] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0D3B66]" />
              Statutory Lifecycle & Audit Trail
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-[#0F172A]">Instrument Registered</span>
                  <p className="text-[11px] text-[#64748B]">Issue Date: {instrument.issueDate} • Term: 8 Years</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-[#0F172A]">SFMS Tripartite Lien Marked</span>
                  <p className="text-[11px] text-[#64748B]">Direct CBS sync completed with bank gateway</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  !
                </div>
                <div>
                  <span className="font-bold text-[#D97706]">Maturity Milestone (Current)</span>
                  <p className="text-[11px] text-[#92400E]">Maturity Date: {instrument.maturityDate} ({instrument.remainingDays} days left)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {
    /* Drawer Sticky Footer Actions */
  }
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center gap-2">
          {onOpenScrutiny && <button
    onClick={() => onOpenScrutiny(instrument)}
    className="flex-1 py-2.5 px-3 rounded-lg bg-[#0D3B66] hover:bg-[#002546] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
  >
              <Eye className="w-3.5 h-3.5" />
              <span>Open in Dual-Pane Scrutiny</span>
            </button>}

          {onInitiateRpgf && <button
    onClick={() => onInitiateRpgf(instrument)}
    className="py-2.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#D97706] border border-amber-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
  >
              <span>Apply Release</span>
            </button>}
        </div>

      </div>
    </div>;
};
