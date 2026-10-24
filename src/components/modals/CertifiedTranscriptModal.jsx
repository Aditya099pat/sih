import { useState } from "react";
import { X, Printer, Download, QrCode, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../../data/mockData";

export const CertifiedTranscriptModal = ({ isOpen, onClose, instrument }) => {
  if (!isOpen) return null;

  const inst = instrument || {
    ref: "FDR-SBI-2025-88",
    instituteCode: "1-1029384",
    instituteName: "Bharati Vidya Sansthan",
    discipline: "Undergraduate Engineering & Technology",
    bankName: "State Bank of India",
    branchName: "Bandra Kurla Br.",
    ifsc: "SBIN0004521",
    principalAmount: 3500000,
    fdrReceiptNo: "SBI-FD-49102938",
    sfmsReference: "SFMS/2025/L799/992014",
    issueDate: "01 Aug 2025",
    maturityDate: "31 Jul 2033",
    statutoryStatus: "Active (>180 Days)"
  };

  const verificationUrl = `https://portal.aicte-india.org/verify/fdr?ref=${inst.ref}&pid=${inst.instituteCode}&v=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-[#E2E8F0] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0D3B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">CERTIFIED INSTITUTIONAL TRANSCRIPT WITH DYNAMIC QR</h2>
              <p className="text-[11px] text-blue-200">On-the-spot Authentication for Physical EVC Inspection Committees</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body (Clean Printable Format) */}
        <div className="p-6 bg-slate-100 max-h-[75vh] overflow-y-auto">
          <div className="bg-[#FCFBF7] p-8 shadow-sm border border-slate-300 rounded-sm font-serif text-slate-900 text-xs leading-relaxed space-y-4">
            
            {/* AICTE Header */}
            <div className="text-center border-b-2 border-slate-900 pb-3 space-y-0.5">
              <div className="text-xs font-bold tracking-widest uppercase">
                अखिल भारतीय तकनीकी शिक्षा परिषद
              </div>
              <div className="text-sm font-black tracking-wider uppercase">
                ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
              </div>
              <div className="text-[10px] font-sans text-slate-600">
                STATUTORY DEPOSIT CERTIFICATION TRANSCRIPT (APH 2025-26)
              </div>
            </div>

            {/* Split top: PID & Dynamic QR Code */}
            <div className="flex justify-between items-start font-sans pt-2 border-b border-dashed border-slate-300 pb-4">
              <div className="space-y-1">
                <div><strong>Permanent Institute ID (PID):</strong> <span className="font-mono text-blue-900 font-bold">{inst.instituteCode}</span></div>
                <div><strong>Institution Name:</strong> {inst.instituteName}</div>
                <div><strong>Approved Discipline:</strong> {inst.discipline}</div>
                <div><strong>Regional Office:</strong> Western Regional Office (WRO), Mumbai</div>
              </div>

              {/* Dynamic QR Code Box */}
              <div className="p-2.5 bg-white border-2 border-slate-900 rounded text-center shrink-0">
                {/* SVG QR Code Simulation */}
                <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corner squares */}
                  <rect x="5" y="5" width="25" height="25" fill="#0D3B66" />
                  <rect x="9" y="9" width="17" height="17" fill="white" />
                  <rect x="13" y="13" width="9" height="9" fill="#0D3B66" />

                  <rect x="70" y="5" width="25" height="25" fill="#0D3B66" />
                  <rect x="74" y="9" width="17" height="17" fill="white" />
                  <rect x="78" y="13" width="9" height="9" fill="#0D3B66" />

                  <rect x="5" y="70" width="25" height="25" fill="#0D3B66" />
                  <rect x="9" y="74" width="17" height="17" fill="white" />
                  <rect x="13" y="78" width="9" height="9" fill="#0D3B66" />

                  {/* Matrix pattern elements */}
                  <rect x="35" y="10" width="5" height="15" fill="#0D3B66" />
                  <rect x="45" y="5" width="15" height="5" fill="#0D3B66" />
                  <rect x="35" y="35" width="10" height="10" fill="#0D3B66" />
                  <rect x="55" y="35" width="15" height="5" fill="#0D3B66" />
                  <rect x="50" y="50" width="10" height="10" fill="#0D3B66" />
                  <rect x="10" y="45" width="15" height="5" fill="#0D3B66" />
                  <rect x="75" y="45" width="10" height="15" fill="#0D3B66" />
                  <rect x="40" y="70" width="15" height="10" fill="#0D3B66" />
                  <rect x="65" y="75" width="20" height="10" fill="#0D3B66" />
                </svg>
                <span className="text-[9px] font-mono text-slate-500 block mt-1">
                  Scan for Live EVC Verification
                </span>
              </div>
            </div>

            {/* Instrument Detailed Table */}
            <div className="font-sans text-xs space-y-2">
              <span className="font-bold text-[#0D3B66] uppercase text-[11px] block">
                Pledged Security Deposit Details
              </span>
              <table className="w-full border-collapse border border-slate-300 text-[11px]">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold w-1/3">Instrument Ref / Receipt:</td>
                    <td className="p-2 font-mono font-bold text-slate-900">{inst.ref} ({inst.fdrReceiptNo})</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold">Principal Sum Pledged:</td>
                    <td className="p-2 font-mono font-bold text-emerald-800 text-sm">
                      {FORMAT_INDIAN_CURRENCY(inst.principalAmount)}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold">Depository Bank &amp; Branch:</td>
                    <td className="p-2">{inst.bankName} ({inst.branchName}) • IFSC: {inst.ifsc}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold">Tenure &amp; Validity:</td>
                    <td className="p-2">{inst.issueDate} to {inst.maturityDate} (8 Years Lock-in)</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 bg-slate-50 font-semibold">SFMS Electronic Lien Advice:</td>
                    <td className="p-2 font-mono text-purple-900">{inst.sfmsReference}</td>
                  </tr>
                  <tr>
                    <td className="p-2 bg-slate-50 font-semibold">Statutory Lien Status:</td>
                    <td className="p-2 text-emerald-700 font-bold">Unencumbered Joint Lien in favour of Member Secretary, AICTE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Endorsement Note */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-[10px] font-sans text-amber-900 leading-normal">
              <strong>STATUTORY CERTIFICATION:</strong> This is an electronically generated and certified dossier certified directly from the AICTE Central SFMS Gateway under SHA-256 tamper-proof ledger. Physical inspection committees can scan the dynamic QR above to authenticate real-time Core Banking balance status.
            </div>

            {/* Signature Block */}
            <div className="pt-4 flex justify-between items-end font-sans">
              <div className="text-[10px] text-slate-500 font-mono">
                Verification Token: #{inst.ref.replace(/-/g, "")}-AICTE
              </div>
              <div className="text-right">
                <div className="font-bold text-xs text-[#0D3B66]">Member Secretary</div>
                <div className="text-[10px] text-slate-600">All India Council for Technical Education</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {verificationUrl.substring(0, 48)}...
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 border border-[#E2E8F0] hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#0D3B66] hover:bg-[#092c4d] text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
