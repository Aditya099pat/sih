import React, { useState } from 'react';
import { X, Download, Printer, CheckCircle2, FileSpreadsheet, FileText } from 'lucide-react';
import { FDRInstrument } from '../../types';
import { FORMAT_INDIAN_CURRENCY } from '../../data/mockData';
import { AicteLogo } from '../AicteLogo';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  instruments: FDRInstrument[];
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  isOpen,
  onClose,
  instruments
}) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'xlsx'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  if (!isOpen) return null;

  const totalPrincipal = instruments.reduce((sum, item) => sum + item.principalAmount, 0);
  const totalAccrued = instruments.reduce((sum, item) => sum + item.accruedInterest, 0);

  const handleTriggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadReady(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#002546] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">Export Certified Statutory Dossier</h2>
              <p className="text-[11px] text-slate-300">Council Regulation Compliance • Official Transcript</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExportFormat('pdf')}
              className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                exportFormat === 'pdf'
                  ? 'border-[#0D3B66] bg-blue-50 text-[#0D3B66] font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Certified PDF Report (with QR & Hash)</span>
            </button>
            <button
              onClick={() => setExportFormat('xlsx')}
              className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                exportFormat === 'xlsx'
                  ? 'border-[#0D3B66] bg-blue-50 text-[#0D3B66] font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Audit Spreadsheet (XLSX / CSV)</span>
            </button>
          </div>

          {/* Printable Report Preview */}
          <div className="border border-slate-300 rounded-xl p-5 bg-white space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <AicteLogo size={36} />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase">
                    All India Council for Technical Education
                  </h3>
                  <p className="text-[10px] text-slate-500">Ministry of Education, Government of India</p>
                </div>
              </div>
              <div className="text-right text-[10px] font-mono text-slate-500">
                <p>CERT: AICTE-CERT-2025-9921</p>
                <p>DATE: {new Date().toLocaleDateString('en-GB')}</p>
              </div>
            </div>

            <div className="text-[11px] space-y-1">
              <p><strong>Institution:</strong> Bharti Institute of Technology & Research (PID: 1-1029384)</p>
              <p><strong>Regional Office:</strong> Western Regional Office (WRO), Mumbai</p>
              <p><strong>Trust/Society:</strong> Bharati Vidya Sansthan</p>
              <p><strong>Statutory Compliance:</strong> Chapter 1.4 APH 2025-26 (100% Pledged Capital Active)</p>
            </div>

            {/* Micro Table */}
            <table className="w-full text-left border-collapse text-[11px] border border-slate-200">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-600">
                <tr>
                  <th className="p-1.5">FDR Ref</th>
                  <th className="p-1.5">Bank & Branch</th>
                  <th className="p-1.5 text-right">Principal</th>
                  <th className="p-1.5 text-right">Yield</th>
                  <th className="p-1.5">Maturity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {instruments.map((inst) => (
                  <tr key={inst.id}>
                    <td className="p-1.5 font-mono font-medium">{inst.ref}</td>
                    <td className="p-1.5">{inst.bankName}</td>
                    <td className="p-1.5 text-right font-mono">{FORMAT_INDIAN_CURRENCY(inst.principalAmount)}</td>
                    <td className="p-1.5 text-right font-mono text-emerald-700">+{FORMAT_INDIAN_CURRENCY(inst.accruedInterest)}</td>
                    <td className="p-1.5">{inst.maturityDate}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={2} className="p-1.5">Total Portfolio Pledged</td>
                  <td className="p-1.5 text-right font-mono">{FORMAT_INDIAN_CURRENCY(totalPrincipal)}</td>
                  <td className="p-1.5 text-right font-mono text-emerald-700">+{FORMAT_INDIAN_CURRENCY(totalAccrued)}</td>
                  <td className="p-1.5">Active</td>
                </tr>
              </tfoot>
            </table>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] text-slate-500">
              <span>SHA-256 Digest: 8f2a9910e5bc...771c99</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Digitally Certified
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg flex items-center gap-1.5 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5" /> Print Certified Copy
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={handleTriggerExport}
              disabled={isExporting}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#002546] hover:bg-[#0D3B66] rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              {isExporting ? 'Generating Bundle...' : downloadReady ? 'Download File Again' : `Export ${exportFormat.toUpperCase()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
