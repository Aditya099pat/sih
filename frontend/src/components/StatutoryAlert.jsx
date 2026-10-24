import { useState } from "react";
import {
  Bell,
  FileSignature,
  CalendarCheck,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Clock,
  User,
  Building,
  ArrowRight
} from "lucide-react";

export const StatutoryAlert = ({
  instruments = [],
  onScheduleVerification,
  onPrepareAffidavit,
  onOpenPhaseRelease,
  onViewInstrument,
  onRecordFollowUp
}) => {
  const [followUpRecorded, setFollowUpRecorded] = useState(false);

  // Identify affected critical instrument (e.g., maturing in <= 60 days)
  const affectedInstrument =
    instruments.find((i) => i.remainingDays <= 60) || instruments[0] || {
      ref: "FDR-SBIN-2018-09",
      bankName: "State Bank of India",
      maturityDate: "15 Dec 2026",
      remainingDays: 42,
      principalAmount: 3500000
    };

  const isCriticalOverdue = affectedInstrument.remainingDays <= 15;
  const isActionRequired = affectedInstrument.remainingDays <= 60;

  const handleRecordFollowUp = () => {
    setFollowUpRecorded(true);
    if (onRecordFollowUp) {
      onRecordFollowUp(affectedInstrument);
    }
    setTimeout(() => setFollowUpRecorded(false), 3500);
  };

  return (
    <div
      className={`rounded-lg p-4 lg:p-5 border shadow-none transition-all ${
        isCriticalOverdue
          ? "bg-rose-50/80 border-rose-300 text-rose-950"
          : "bg-amber-50/80 border-amber-300 text-amber-950"
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Severity Indicator & Case Context */}
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2.5 rounded-md shrink-0 mt-0.5 ${
              isCriticalOverdue ? "bg-rose-200 text-rose-900" : "bg-amber-200 text-amber-900"
            }`}
          >
            {isCriticalOverdue ? (
              <AlertTriangle className="w-5 h-5 text-rose-800 animate-pulse" />
            ) : (
              <Bell className="w-5 h-5 text-amber-800" />
            )}
          </div>

          <div className="space-y-1.5">
            {/* Severity Pill & Instrument Tag */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${
                  isCriticalOverdue
                    ? "bg-rose-100 text-rose-900 border-rose-300"
                    : "bg-amber-100 text-amber-900 border-amber-300"
                }`}
              >
                {isCriticalOverdue ? "SEVERITY: CRITICAL OVERDUE (T-15)" : "SEVERITY: UPCOMING DEADLINE (T-60)"}
              </span>

              <span className="font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-900">
                AFFECTED: {affectedInstrument.ref}
              </span>

              <span className="text-slate-400">•</span>

              <span className="text-xs font-semibold text-slate-700">
                {affectedInstrument.bankName} (₹35.00 L)
              </span>
            </div>

            {/* Structured Statutory Context */}
            <p className="text-xs text-slate-800 leading-relaxed max-w-3xl font-medium">
              Instrument reaches mandatory 8-year lock-in term on{" "}
              <strong className="text-slate-900 font-mono font-bold underline decoration-amber-500">
                {affectedInstrument.maturityDate} (42 Days Remaining)
              </strong>
              . Under AICTE Regulation 2025, the trust must submit the Phase-5 RPGF Rollover or Statutory Refund Application before{" "}
              <strong className="text-amber-900 font-mono font-bold">15 Nov 2026</strong> to avoid provisional intake freeze.
            </p>

            {/* Ownership & Next Required Action Metadata */}
            <div className="flex items-center gap-4 text-[11px] text-slate-600 flex-wrap pt-0.5">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-slate-500" />
                <span>
                  Owner: <strong>WRO Mumbai / Dr. Rajesh K. Sharma</strong>
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-700" />
                <span>
                  Next Action: <strong>Submit Affidavit-6 Rollover or Refund Petition</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actionable Links & Triggers */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center flex-wrap">
          {/* View Instrument Link */}
          <button
            onClick={() => onViewInstrument && onViewInstrument(affectedInstrument)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Inspect full FDR details & history"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>View Instrument</span>
          </button>

          {/* Record Follow-up Action */}
          <button
            onClick={handleRecordFollowUp}
            className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Log compliance follow-up notice sent to trust"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
            <span>{followUpRecorded ? "Follow-up Recorded ✓" : "Record Follow-up"}</span>
          </button>

          {/* Prepare Affidavit Renewal */}
          <button
            onClick={onPrepareAffidavit}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
          >
            <FileSignature className="w-3.5 h-3.5 text-amber-400" />
            <span>Prepare Affidavit-6</span>
          </button>
        </div>
      </div>
    </div>
  );
};
