import React from 'react';
import { X, BookOpen, Download, ExternalLink, ShieldCheck } from 'lucide-react';

interface HandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandbookModal: React.FC<HandbookModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#0D3B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">AICTE Approval Process Handbook (APH 2025-26)</h2>
              <p className="text-[11px] text-slate-300">Chapter 1.4: Security Deposit & RPGF Mandate</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
            <h3 className="font-bold text-xs uppercase tracking-wide">Key Statutory Directives (APH 2025-26)</h3>
            <p className="text-[11px] leading-relaxed">
              Every Technical Institution granting degrees or diplomas must pledge security deposits under joint custody with the Member Secretary, AICTE New Delhi for a minimum term of 8 continuous years.
            </p>
          </div>

          <div className="space-y-3">
            <div className="border border-slate-200 rounded-lg p-3">
              <h4 className="font-bold text-slate-900 text-xs">Section 1.4.1: Mode of Custody</h4>
              <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                Security deposits must be created as Fixed Deposit Receipts in any Scheduled Commercial Bank in the joint names of the Trust/Society and Member Secretary, AICTE. Banks must register SFMS e-Lien confirmation (MT760).
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <h4 className="font-bold text-slate-900 text-xs">Section 1.4.2: Interest Treatment & Yield Assignment</h4>
              <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                Cumulative accrued interest remains locked with principal until the completion of the 8-year term. In cases of closure or student transfer due to institution default, the interest is utilized for student rehabilitation.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <h4 className="font-bold text-slate-900 text-xs">Section 1.4.3: RPGF Phased Release Window</h4>
              <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                Upon completion of 8 years, if NBA accreditation is achieved or the institution demonstrates clean compliance without complaints or salary arrears, the FDR is refunded in full or rolled over without penalty.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official AICTE Gazette Notification
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert('Downloading Official AICTE APH 2025-26 PDF Handbook (4.2 MB)...');
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Download Full PDF Handbook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
