import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Table as TableIcon, 
  LayoutGrid, 
  Eye, 
  FileText, 
  MoreVertical, 
  Check, 
  Landmark, 
  ShieldCheck, 
  Clock, 
  Building 
} from 'lucide-react';
import { FDRInstrument } from '../types';
import { FORMAT_INDIAN_CURRENCY } from '../data/mockData';

interface InstrumentsTableProps {
  instruments: FDRInstrument[];
  onViewInstrument: (instrument: FDRInstrument) => void;
  onViewDocuments: (instrument: FDRInstrument) => void;
  onInitiateRpgf?: (instrument: FDRInstrument) => void;
}

export const InstrumentsTable: React.FC<InstrumentsTableProps> = ({
  instruments,
  onViewInstrument,
  onViewDocuments,
  onInitiateRpgf
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['fdr-1']);
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'engineering' | 'management' | 'maturing'>('all');
  const [bankFilter, setBankFilter] = useState<string>('all');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // Filter instruments
  const filteredInstruments = instruments.filter((inst) => {
    // Filter tab
    if (activeFilterTab === 'engineering' && inst.disciplineCategory !== 'engineering') return false;
    if (activeFilterTab === 'management' && inst.disciplineCategory !== 'management') return false;
    if (activeFilterTab === 'maturing' && inst.remainingDays > 90) return false;

    // Bank filter
    if (bankFilter !== 'all') {
      if (!inst.bankName.toLowerCase().includes(bankFilter.toLowerCase())) return false;
    }

    // Search query
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      const match =
        inst.ref.toLowerCase().includes(q) ||
        inst.discipline.toLowerCase().includes(q) ||
        inst.bankName.toLowerCase().includes(q) ||
        inst.ifsc.toLowerCase().includes(q) ||
        inst.fdrReceiptNo.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInstruments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInstruments.map((i) => i.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const totalFilteredFaceValue = filteredInstruments.reduce((sum, item) => sum + item.principalAmount, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Top Filter and Controls Toolbar */}
      <div className="p-3 lg:p-4 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Quick Search */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search table..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0D3B66] focus:bg-white text-slate-800"
            />
          </div>

          {/* Bank Dropdown Filter */}
          <div className="relative">
            <select
              value={bankFilter}
              onChange={(e) => setBankFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0D3B66]"
            >
              <option value="all">All Banks (SBI, PNB, BoB)</option>
              <option value="state bank of india">State Bank of India</option>
              <option value="punjab national bank">Punjab National Bank</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>

          {/* View Switcher */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-[#0D3B66]' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Table view"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-[#0D3B66]' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setActiveFilterTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeFilterTab === 'all'
                ? 'bg-[#002546] text-white shadow-xs'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            All Disciplines ({instruments.length})
          </button>

          <button
            onClick={() => setActiveFilterTab('engineering')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeFilterTab === 'engineering'
                ? 'bg-[#002546] text-white shadow-xs font-semibold'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            Engineering & Tech ({instruments.filter((i) => i.disciplineCategory === 'engineering').length})
          </button>

          <button
            onClick={() => setActiveFilterTab('management')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeFilterTab === 'management'
                ? 'bg-[#002546] text-white shadow-xs font-semibold'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            Management / MBA ({instruments.filter((i) => i.disciplineCategory === 'management').length})
          </button>

          <button
            onClick={() => setActiveFilterTab('maturing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeFilterTab === 'maturing'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            Maturing Soon (&lt;90d)
          </button>
        </div>
      </div>

      {/* Main Content Area: Table View or Grid View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredInstruments.length && filteredInstruments.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded text-[#0D3B66] focus:ring-[#0D3B66] h-3.5 w-3.5 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-3">INSTRUMENT REF & DISCIPLINE</th>
                <th className="py-3 px-3">TYPE & CUSTODY MODE</th>
                <th className="py-3 px-3">ISSUING BANK & BRANCH (IFSC)</th>
                <th className="py-3 px-3 text-right">PRINCIPAL AMOUNT</th>
                <th className="py-3 px-3">TERM & MATURITY DATE</th>
                <th className="py-3 px-3">VERIFICATION SOURCES</th>
                <th className="py-3 px-3 text-center">STATUTORY STATUS</th>
                <th className="py-3 px-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
              {filteredInstruments.map((inst) => {
                const isSelected = selectedIds.includes(inst.id);
                return (
                  <tr
                    key={inst.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50/20' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(inst.id)}
                        className="rounded text-[#0D3B66] focus:ring-[#0D3B66] h-3.5 w-3.5 cursor-pointer"
                      />
                    </td>

                    {/* Reference & Discipline */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <button
                          onClick={() => onViewInstrument(inst)}
                          className="font-bold text-slate-900 font-mono hover:text-[#0D3B66] hover:underline text-left text-xs cursor-pointer flex items-center gap-1.5"
                        >
                          {inst.ref}
                        </button>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: inst.dotColor }}
                          />
                          <span className="text-[11px] text-slate-600 truncate max-w-[200px]" title={inst.discipline}>
                            {inst.discipline}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type & Custody Mode */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-xs">{inst.type}</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">{inst.custodyMode}</span>
                      </div>
                    </td>

                    {/* Issuing Bank & Branch (IFSC) */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{inst.bankName}</span>
                        <span className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {inst.branchName} • {inst.ifsc}
                        </span>
                      </div>
                    </td>

                    {/* Principal Amount */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-slate-900 tabular-nums text-xs">
                          {FORMAT_INDIAN_CURRENCY(inst.principalAmount)}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 tabular-nums mt-0.5">
                          +{FORMAT_INDIAN_CURRENCY(inst.accruedInterest)} accrued
                        </span>
                      </div>
                    </td>

                    {/* Term & Maturity Date */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                          {inst.maturityDate}
                          {inst.remainingDays <= 90 && (
                            <span className="text-amber-700 font-semibold ml-1">
                              ({inst.remainingDays} Days)
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">
                          Issued: {inst.issueDate} ({inst.termYears} Yrs)
                        </span>
                      </div>
                    </td>

                    {/* Verification Sources */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col gap-1 text-[11px]">
                        <span className="inline-flex items-center gap-1 text-slate-600">
                          <Landmark className="w-3 h-3 text-slate-400" />
                          {inst.verificationSource}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200/60 w-fit">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Bank API: {inst.bankApiStatus}
                        </span>
                      </div>
                    </td>

                    {/* Statutory Status */}
                    <td className="py-3.5 px-3 text-center">
                      {inst.statusType === 'warning' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                          <Clock className="w-3 h-3" />
                          {inst.statutoryStatus}
                        </span>
                      )}
                      {inst.statusType === 'success' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669] border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          {inst.statutoryStatus}
                        </span>
                      )}
                      {inst.statusType === 'info' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F9FF] text-[#0284C7] border border-sky-200">
                          <Clock className="w-3 h-3" />
                          {inst.statutoryStatus}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="relative inline-flex items-center gap-1 justify-end">
                        <button
                          onClick={() => onViewInstrument(inst)}
                          className="p-1 rounded-md text-slate-500 hover:text-[#0D3B66] hover:bg-slate-100 transition-colors cursor-pointer"
                          title="View Instrument Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onViewDocuments(inst)}
                          className="p-1 rounded-md text-slate-500 hover:text-[#0D3B66] hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Statutory Documents & Affidavits"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setOpenActionMenuId(openActionMenuId === inst.id ? null : inst.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="More Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {openActionMenuId === inst.id && (
                          <div className="absolute right-0 top-8 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-20 text-left text-xs">
                            <button
                              onClick={() => {
                                onViewInstrument(inst);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 hover:bg-slate-50 rounded-md text-slate-700 transition-colors flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              View Complete Dossier
                            </button>
                            <button
                              onClick={() => {
                                onViewDocuments(inst);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 hover:bg-slate-50 rounded-md text-slate-700 transition-colors flex items-center gap-2"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              Affidavit & e-Stamp
                            </button>
                            {inst.remainingDays <= 90 && (
                              <button
                                onClick={() => {
                                  onInitiateRpgf && onInitiateRpgf(inst);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full text-left px-2.5 py-1.5 hover:bg-amber-50 text-amber-800 rounded-md font-medium transition-colors flex items-center gap-2"
                              >
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                Initiate RPGF Phase Release
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid / Card View */
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInstruments.map((inst) => (
            <div
              key={inst.id}
              className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-slate-900 text-xs">{inst.ref}</span>
                  {inst.statusType === 'warning' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                      {inst.statutoryStatus}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-emerald-200">
                      {inst.statutoryStatus}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: inst.dotColor }} />
                  <span className="text-xs text-slate-700 font-medium">{inst.discipline}</span>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Bank & Branch</span>
                    <span className="font-semibold text-slate-800">{inst.bankName}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Principal Amount</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {FORMAT_INDIAN_CURRENCY(inst.principalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Maturity Date</span>
                    <span className="font-medium text-slate-800">{inst.maturityDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onViewInstrument(inst)}
                  className="text-xs font-semibold text-[#0D3B66] hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> View Details
                </button>
                <button
                  onClick={() => onViewDocuments(inst)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" /> Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Footer with Counts and Pagination */}
      <div className="p-3.5 lg:px-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 bg-white">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-slate-900">{filteredInstruments.length}</strong> of{' '}
            <strong className="text-slate-900">{instruments.length}</strong> Statutory Instruments
          </span>
          <span className="text-slate-300">•</span>
          <span>
            Total Face Value:{' '}
            <strong className="font-bold font-mono text-slate-900">
              {FORMAT_INDIAN_CURRENCY(totalFilteredFaceValue)}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-1 self-end sm:self-center">
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer disabled:opacity-50">
            Previous
          </button>
          <button className="px-2.5 py-1 rounded bg-[#0D3B66] text-white font-semibold cursor-pointer">
            1
          </button>
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
