import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Download, Printer, Shield } from 'lucide-react';
import { FDRInstrument } from '../../types';

interface AffidavitRenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrument: FDRInstrument | null;
}

export const AffidavitRenewalModal: React.FC<AffidavitRenewalModalProps> = ({
  isOpen,
  onClose,
  instrument
}) => {
  const [eStampNumber, setEStampNumber] = useState('IN-MH889210947721A');
  const [notaryAdvocate, setNotaryAdvocate] = useState('Adv. K. R. Deshmukh (Reg: BOM-4410/2012)');
  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen) return null;

  const fdrRef = instrument?.ref || 'FDR-SBIN-2018-09';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#002546] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">Prepare Statutory Affidavit-6 (Renewal)</h2>
              <p className="text-[11px] text-slate-300">Under AICTE Approval Process Handbook (Format Affidavit-6)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">e-Stamp Certificate No.</label>
              <input
                type="text"
                value={eStampNumber}
                onChange={(e) => setEStampNumber(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Notary / Oath Commissioner</label>
              <input
                type="text"
                value={notaryAdvocate}
                onChange={(e) => setNotaryAdvocate(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Legal Text Certificate Preview */}
          <div className="p-6 border-2 border-slate-300 rounded-xl bg-amber-50/20 space-y-3 font-serif">
            <div className="text-center pb-3 border-b border-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-500 font-sans tracking-widest block">
                AFFIDAVIT-6 (ON ₹100 NON-JUDICIAL STAMP PAPER)
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 uppercase">
                BEFORE THE NOTARY PUBLIC / OATH COMMISSIONER, MUMBAI
              </h3>
              <p className="text-[10.5px] font-mono text-[#0D3B66] mt-0.5">e-Stamp ID: {eStampNumber}</p>
            </div>

            <p className="text-justify text-[11px] text-slate-800 leading-relaxed indent-6">
              I, <strong>Dr. Rajesh K. Sharma</strong>, son of Shri K. N. Sharma, aged 54 years, Registrar and Authorized Signatory of <strong>Bharati Vidya Sansthan</strong>, having Permanent Institute ID <strong>1-1029384</strong>, do hereby solemnly affirm and declare on oath as follows:
            </p>

            <ol className="list-decimal pl-5 space-y-1.5 text-[11px] text-slate-800">
              <li>
                That the Fixed Deposit Receipt bearing reference <strong>{fdrRef}</strong> of face value <strong>₹35,00,000</strong> held with State Bank of India, Nariman Point, has been pledged exclusively with the Member Secretary, AICTE New Delhi as statutory security deposit.
              </li>
              <li>
                That no prior mortgage, hypothecation, encumbrance, or third-party claim exists on the aforesaid FDR, and the same has not been pledged with any other authority or financial institution.
              </li>
              <li>
                That the society/trust undertakes not to withdraw, encash, or alter the joint lien covenant without the prior express written clearance of AICTE Council.
              </li>
            </ol>

            <div className="pt-4 flex justify-between items-end text-[11px] text-slate-700 font-sans border-t border-slate-200">
              <div>
                <p className="text-[10px] text-slate-400">Attested by Notary:</p>
                <p className="font-semibold text-slate-800">{notaryAdvocate}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">Deponent (Registrar):</p>
                <p className="font-semibold text-slate-800">Dr. Rajesh K. Sharma</p>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded-sm">DSC Signed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg flex items-center gap-1.5 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5" /> Print Draft
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsGenerated(true);
                setTimeout(() => {
                  alert('Affidavit-6 signed and registered in Dossier!');
                  onClose();
                }, 1000);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              {isGenerated ? 'Generating & Attesting...' : 'Digitally Sign & Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
