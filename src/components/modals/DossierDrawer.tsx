import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, Upload, Eye, ShieldCheck, Clock } from 'lucide-react';
import { DossierDocument } from '../../types';

interface DossierDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DossierDocument[];
  onUploadDocument?: (doc: Partial<DossierDocument>) => void;
}

export const DossierDrawer: React.FC<DossierDrawerProps> = ({
  isOpen,
  onClose,
  documents,
  onUploadDocument
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DossierDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        if (onUploadDocument) {
          onUploadDocument({
            id: 'doc-' + Date.now(),
            title: e.target.files![0].name,
            documentType: 'Uploaded Statutory Instrument',
            uploadDate: 'Just now',
            signatory: 'Dr. Rajesh K. Sharma',
            fileSize: '1.8 MB (PDF)',
            verified: true,
            status: 'Verified & Encrypted'
          });
        }
        setTimeout(() => setUploadSuccess(false), 3000);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 lg:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
                <FileText className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900">Institutional Dossier Drawer</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory Security Deposit Repository • PID: 1-1029384
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Upload New Document Box */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-[#0D3B66] transition-colors bg-slate-50/50">
            <input
              type="file"
              id="dossier-upload"
              className="hidden"
              onChange={handleSimulateUpload}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <label htmlFor="dossier-upload" className="cursor-pointer block">
              <Upload className="w-6 h-6 mx-auto text-slate-400 mb-1.5" />
              <span className="text-xs font-semibold text-[#0D3B66] block">
                {isUploading ? 'Encrypting & Uploading...' : 'Upload New Statutory Document / FDR Scan'}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                PDF/A, Scanned FDR Receipt, ₹100 e-Stamp (Max 15MB)
              </span>
            </label>
            {uploadSuccess && (
              <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 py-1 px-2 rounded-md">
                ✓ Document uploaded and registered to blockchain ledger!
              </div>
            )}
          </div>

          {/* Document List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Enclosed Statutory Instruments ({documents.length})
            </h3>

            {documents.map((doc) => (
              <div
                key={doc.id}
                className="border border-slate-200 rounded-xl p-3.5 hover:border-slate-300 transition-all bg-white shadow-2xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-[#0D3B66] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{doc.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.documentType}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                      doc.verified
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>

                {doc.stampValue && (
                  <p className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded-md">
                    {doc.stampValue}
                  </p>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Signatory: {doc.signatory}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                    <button
                      onClick={() => alert(`Downloading signed copy of: ${doc.title}`)}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Doc Preview Modal Overlay if selected */}
          {selectedDoc && (
            <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                  <h3 className="font-bold text-sm text-slate-900 truncate">{selectedDoc.title}</h3>
                  <button onClick={() => setSelectedDoc(null)} className="p-1 hover:bg-slate-100 rounded-md">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <div className="border border-slate-300 rounded-lg p-6 bg-amber-50/20 text-center space-y-3 font-serif">
                  <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#0D3B66] flex items-center justify-center text-[#0D3B66] font-bold text-xs">
                    GOVT SEAL
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 uppercase">Government of Maharashtra</h4>
                  <p className="text-xs text-slate-600">e-Stamp Statutory Non-Judicial Legal Certificate</p>
                  <p className="font-mono text-xs font-bold text-[#0D3B66]">{selectedDoc.stampValue || 'CERT-STAMP-AICTE-WRO-2025'}</p>
                  <div className="text-left text-[11px] text-slate-600 space-y-1 font-sans border-t pt-3">
                    <p><strong>First Party:</strong> Bharati Vidya Sansthan (Trust Reg. 1860)</p>
                    <p><strong>Second Party:</strong> Member Secretary, AICTE New Delhi</p>
                    <p><strong>Duty Amount:</strong> ₹100.00 (Stamp Duty Paid Online)</p>
                    <p><strong>Affidavit Type:</strong> APH Format Affidavit-6 (No Prior Lien / Defaulter Affirmation)</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="px-4 py-1.5 text-xs font-semibold bg-[#0D3B66] text-white rounded-lg"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Central Cryptographic Repository
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
