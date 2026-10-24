import React, { useState } from 'react';
import { FileText, Download, Upload, Eye, CheckCircle2, ShieldCheck, Printer, Stamp } from 'lucide-react';
import { DossierDocument } from '../types';

interface DossiersAffidavitsViewProps {
  documents: DossierDocument[];
  onOpenAffidavitModal: () => void;
}

export const DossiersAffidavitsView: React.FC<DossiersAffidavitsViewProps> = ({
  documents,
  onOpenAffidavitModal
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DossierDocument | null>(documents[0] || null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Statutory Dossiers, e-Stamps & Affidavits</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Legal Undertakings, Tripartite Covenants, Format Affidavit-6 & Bank Counter-Guarantees
          </p>
        </div>

        <button
          onClick={onOpenAffidavitModal}
          className="px-3.5 py-2 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#002546] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Stamp className="w-3.5 h-3.5 text-amber-400" />
          <span>+ Generate New Affidavit-6</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document list */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Repository Documents ({documents.length})
          </h2>

          <div className="space-y-2.5">
            {documents.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#0D3B66] bg-blue-50/50 shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-xs text-slate-900 leading-snug">{doc.title}</span>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        doc.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {doc.verified ? 'Verified' : 'Under Review'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1">{doc.documentType}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                    <span>{doc.uploadDate}</span>
                    <span className="font-mono">{doc.fileSize}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Document Full View */}
        <div className="lg:col-span-2 space-y-4">
          {selectedDoc ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedDoc.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedDoc.documentType} • Signatory: <strong>{selectedDoc.signatory}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                    title="Print"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading: ${selectedDoc.title}`)}
                    className="px-3 py-1.5 bg-[#0D3B66] hover:bg-[#002546] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Signed PDF
                  </button>
                </div>
              </div>

              {/* Simulated PDF Stamp Card */}
              <div className="border-2 border-slate-300 rounded-xl p-8 bg-amber-50/15 font-serif space-y-4">
                <div className="text-center pb-4 border-b border-slate-300">
                  <span className="text-[11px] font-sans font-bold text-[#0D3B66] tracking-widest block uppercase">
                    Government of Maharashtra • Department of Registration and Stamps
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    CERTIFICATE OF STAMP DUTY & STATUTORY AFFIDAVIT
                  </h4>
                  <p className="font-mono text-xs font-bold text-slate-700 mt-1">
                    {selectedDoc.stampValue || 'STAMP-DUTY-MH-2025-99214'}
                  </p>
                </div>

                <div className="text-xs text-slate-800 space-y-2 leading-relaxed font-sans text-justify">
                  <p>
                    This statutory instrument is executed under the mandate of AICTE Act, 1987 and the statutory regulations contained in Approval Process Handbook. The Fixed Deposit Receipt detailed herein has been irrevocably marked with a joint lien in favour of the <strong>Member Secretary, All India Council for Technical Education, New Delhi</strong>.
                  </p>
                  <p>
                    Neither the society/trust nor any bank official is authorized to lift, encash, loan against, or transfer the underlying capital asset without prior express written clearance from the AICTE Bureau of Approval.
                  </p>
                </div>

                <div className="pt-6 flex justify-between items-end text-xs font-sans border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Notarized & Registered by:</span>
                    <strong className="text-slate-900">Chief Metropolitan Notary Desk, Mumbai</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Digitally Signed & Encrypted:</span>
                    <strong className="text-slate-900">Dr. Rajesh K. Sharma (Registrar)</strong>
                    <div className="text-[10px] text-emerald-700 font-bold mt-0.5">SHA-256 Checksum Intact ✓</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
              Select a document from the left to view preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
