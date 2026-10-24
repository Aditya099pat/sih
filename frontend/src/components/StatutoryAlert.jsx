import { Bell, FileSignature, CalendarCheck } from "lucide-react";
export const StatutoryAlert = ({
  instruments,
  onScheduleVerification,
  onPrepareAffidavit,
  onOpenPhaseRelease
}) => {
  return <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 lg:p-5 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {
    /* Left: Icon and Notice */
  }
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-[#FEF3C7] text-[#D97706] shrink-0 mt-0.5">
            <Bell className="w-5 h-5 text-[#D97706]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold tracking-wider text-[#92400E] uppercase">
                STATUTORY LOCK-IN EXPIRY ALERT
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                FDR-SBIN-2018-09
              </span>
            </div>

            <p className="text-xs lg:text-[13px] text-slate-700 leading-relaxed max-w-3xl">
              Instrument reaches mandatory 8-year lock-in term on <strong className="text-slate-900 font-semibold">15 Dec 2026</strong>. 
              Under AICTE Regulation 2025, the trust must submit the Phase-5 RPGF Rollover or Statutory Refund Application before <strong className="text-amber-900 font-semibold">15 Nov 2026</strong> to avoid provisional intake freeze.
            </p>
          </div>
        </div>

        {
    /* Right: Actions */
  }
        <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
          <button
    onClick={onScheduleVerification}
    className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
  >
            <CalendarCheck className="w-3.5 h-3.5 text-slate-600" />
            Schedule Bank Verification
          </button>

          <button
    onClick={onPrepareAffidavit}
    className="px-4 py-2 text-xs font-semibold text-white bg-[#002546] hover:bg-[#0D3B66] rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
  >
            <FileSignature className="w-3.5 h-3.5 text-amber-400" />
            Prepare Affidavit-6 Renewal
          </button>
        </div>
      </div>
    </div>;
};
