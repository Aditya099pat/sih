import { useState, useEffect } from "react";
import { X, Printer, Download, ShieldAlert, CheckCircle2, FileText, AlertTriangle } from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../../data/mockData";

export const ShowCauseNoticeModal = ({ isOpen, onClose, instrumentId = "fdr-5" }) => {
  const [noticeData, setNoticeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch(`/api/escalation/generate-scn/${instrumentId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setNoticeData(data.data);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, instrumentId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-[#E2E8F0] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0D3B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold tracking-wide">
                STATUTORY SHOW-CAUSE NOTICE (SCN) GENERATOR
              </h2>
              <p className="text-[11px] text-blue-200">
                Rule 2.18 AICTE Approval Process Handbook (APH) 2025-26
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: The Official Legal Document */}
        <div className="p-6 bg-slate-100 max-h-[75vh] overflow-y-auto">
          {loading || !noticeData ? (
            <div className="text-center py-12 text-sm text-[#0D3B66]">
              Synthesizing Official Show-Cause Gazette Order...
            </div>
          ) : (
            <div className="bg-[#FCFBF7] p-8 shadow-md border border-slate-300 rounded-sm font-serif text-slate-900 text-xs leading-relaxed space-y-4">
              
              {/* National Emblem & AICTE Header */}
              <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                <div className="text-sm font-bold tracking-widest uppercase">
                  अखिल भारतीय तकनीकी शिक्षा परिषद
                </div>
                <div className="text-base font-black tracking-wider uppercase">
                  ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                </div>
                <div className="text-[11px] font-sans text-slate-600">
                  (A Statutory Body of the Government of India)
                </div>
                <div className="text-[10px] font-sans text-slate-600">
                  Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070 | www.aicte-india.org
                </div>
              </div>

              {/* Reference & Date */}
              <div className="flex justify-between font-mono text-[11px] pt-2">
                <div>
                  <strong>Ref. No:</strong> {noticeData.noticeNumber}
                </div>
                <div>
                  <strong>Dated:</strong> {noticeData.dispatchDate}
                </div>
              </div>

              {/* Addressee */}
              <div className="font-sans text-[11px] space-y-0.5 pt-2">
                <div>To,</div>
                <div className="font-bold">The Chairman / Secretary,</div>
                <div>Bharati Vidya Sansthan (Trust Reg. No. E-14920/MUM)</div>
                <div>PID: 1-1029384</div>
                <div>Bandra Kurla Campus, Mumbai - 400051</div>
              </div>

              {/* Subject */}
              <div className="bg-red-50 border-l-4 border-red-600 p-2 font-sans text-xs">
                <strong>SUBJECT: </strong>
                <span className="font-bold text-red-900">
                  SHOW-CAUSE NOTICE FOR FAILURE TO RENEW STATUTORY JOINT SECURITY DEPOSIT UNDER APH 2025-26 - CONSEQUENCE OF WITHDRAWAL OF APPROVAL.
                </span>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-3 text-justify text-[11px] font-serif leading-normal">
                <p>
                  <strong>WHEREAS</strong>, approval was granted by AICTE to your institution under Permanent Institute ID (PID) <strong>1-1029384</strong> for conducting approved technical courses subject to statutory compliance including maintenance of an unencumbered Joint Fixed Deposit Receipt (FDR) in favour of Member Secretary, AICTE New Delhi;
                </p>
                <p>
                  <strong>AND WHEREAS</strong>, the term deposit instrument referenced <strong>{noticeData.instrumentRef}</strong> (Principal Sum: <strong>{FORMAT_INDIAN_CURRENCY(noticeData.principalAmount)}</strong>) held at <strong>{noticeData.bank}</strong> has matured on <strong>{noticeData.defaultDetails.maturedOn}</strong> and stands un-renewed for more than <strong>{noticeData.defaultDetails.daysElapsed} days</strong>, in direct contravention of Section 1.4 of the Approval Process Handbook;
                </p>
                <p>
                  <strong>NOW THEREFORE</strong>, you are hereby called upon to <strong>SHOW CAUSE</strong> within <strong>{noticeData.complianceDeadline}</strong> from the receipt of this notice as to why punitive regulatory action, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 font-sans text-[11px] text-slate-800">
                  <li>Reduction in approved student intake capacity by 50% for Academic Year 2026-27;</li>
                  <li>Placement of the institution under &apos;No Admission&apos; category; and</li>
                  <li>Encashment and forfeiture of accrued interest to the Council.</li>
                </ul>
                <p>
                  should not be initiated against your institution. Failure to submit compliance or an extended rollover joint FDR certificate on or before the deadline shall lead to ex-parte statutory penalties.
                </p>
              </div>

              {/* Signature block */}
              <div className="pt-6 flex justify-between items-end font-sans">
                <div className="text-[10px] text-slate-500 font-mono">
                  <div>Digital Hash: {noticeData.digitalHash}</div>
                  <div>Issued through AICTE Core SFMS Gateway Engine</div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-bold text-xs text-[#0D3B66]">
                    (Dr. Rameshwar V. Rao)
                  </div>
                  <div className="text-[11px] text-slate-700">
                    Regional Officer & Director
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Western Regional Office (WRO), AICTE Mumbai
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Official Legal Draft generated directly by AICTE Policy Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 border border-[#E2E8F0] hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#0D3B66] hover:bg-[#092c4d] text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
