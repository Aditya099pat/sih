import { useState } from "react";
import {
  Search,
  ChevronDown,
  Eye,
  Check,
  Landmark,
  Clock,
  AlertCircle,
  Layers
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "@data/mockData";

export const InstrumentsTable = ({
  instruments = [],
  onViewInstrument,
  onViewDocuments,
  onInitiateRpgf,
  onOpenDrawer
}) => {
  const [selectedIds, setSelectedIds] = useState(["fdr-1"]);
  const [activeFilterTab, setActiveFilterTab] = useState("all");
  const [bankFilter, setBankFilter] = useState("all");
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [tableSearch, setTableSearch] = useState("");

  const filteredInstruments = instruments.filter((inst) => {
    if (activeFilterTab === "verified" && !inst.bankConfirmed) return false;
    if (activeFilterTab === "expiring" && inst.remainingDays > 90) return false;
    if (activeFilterTab === "discrepancy" && !inst.hasDiscrepancy) return false;
    if (bankFilter !== "all") {
      if (!inst.bankName.toLowerCase().includes(bankFilter.toLowerCase())) return false;
    }
    if (expiryFilter === "30" && inst.remainingDays > 30) return false;
    if (expiryFilter === "60" && inst.remainingDays > 60) return false;
    if (expiryFilter === "90" && inst.remainingDays > 90) return false;
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      const match =
        inst.ref.toLowerCase().includes(q) ||
        inst.discipline.toLowerCase().includes(q) ||
        (inst.instituteCode && inst.instituteCode.toLowerCase().includes(q)) ||
        (inst.instituteName && inst.instituteName.toLowerCase().includes(q)) ||
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

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="card-clean rounded-lg bg-white border border-[#E2E8F0] overflow-hidden">
      {/* Table Toolbar & Filters */}
      <div className="p-3.5 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
        {/* Left: Filter Tabs & Search */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search PID, FDR Ref, Bank, IFSC..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B2545] focus:bg-white text-[#0F172A]"
            />
          </div>

          {/* Filter Pills */}
          <div className="inline-flex rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 text-xs">
            <button
              onClick={() => setActiveFilterTab("all")}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer ${
                activeFilterTab === "all"
                  ? "bg-white text-[#0B2545] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Instruments ({instruments.length})
            </button>
            <button
              onClick={() => setActiveFilterTab("verified")}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeFilterTab === "verified"
                  ? "bg-white text-[#059669] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              Bank Verified
            </button>
            <button
              onClick={() => setActiveFilterTab("expiring")}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeFilterTab === "expiring"
                  ? "bg-white text-[#D97706] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="w-3 h-3 text-[#D97706]" />
              Expiring &lt; 90D
            </button>
            <button
              onClick={() => setActiveFilterTab("discrepancy")}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 ${
                activeFilterTab === "discrepancy"
                  ? "bg-white text-[#DC2626] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <AlertCircle className="w-3 h-3 text-[#DC2626]" />
              Discrepancy
            </button>
          </div>
        </div>

        {/* Right: Dropdown Filters */}
        <div className="flex items-center gap-2">
          {/* Expiry Range Filter */}
          <div className="relative">
            <select
              value={expiryFilter}
              onChange={(e) => setExpiryFilter(e.target.value)}
              className="appearance-none bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2.5 py-1.5 text-xs text-[#0F172A] pr-6 focus:outline-none focus:border-[#0B2545] cursor-pointer"
            >
              <option value="all">Expiry: All Dates</option>
              <option value="30">Matures in 30 Days</option>
              <option value="60">Matures in 60 Days</option>
              <option value="90">Matures in 90 Days</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>

          {/* Bank Filter */}
          <div className="relative">
            <select
              value={bankFilter}
              onChange={(e) => setBankFilter(e.target.value)}
              className="appearance-none bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2.5 py-1.5 text-xs text-[#0F172A] pr-6 focus:outline-none focus:border-[#0B2545] cursor-pointer"
            >
              <option value="all">Bank: All Banks</option>
              <option value="State Bank">State Bank of India</option>
              <option value="Punjab">Punjab National Bank</option>
              <option value="Canara">Canara Bank</option>
              <option value="Baroda">Bank of Baroda</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Full-Width Data Table with 52px row height */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredInstruments.length && filteredInstruments.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545] cursor-pointer"
                />
              </th>
              <th className="py-3 px-3">Institution &amp; PID</th>
              <th className="py-3 px-3">FDR Reference No.</th>
              <th className="py-3 px-3">Issuing Bank &amp; Branch</th>
              <th className="py-3 px-3">Verification Source</th>
              <th className="py-3 px-3 text-right">Amount (₹)</th>
              <th className="py-3 px-3">Maturity Date</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {filteredInstruments.map((inst) => {
              const isSelected = selectedIds.includes(inst.id);
              return (
                <tr
                  key={inst.id}
                  className={`table-row-52 transition-colors hover:bg-[#F8FAFC] ${
                    isSelected ? "bg-blue-50/40" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(inst.id)}
                      className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545] cursor-pointer"
                    />
                  </td>

                  {/* Institution & PID */}
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[#0F172A] truncate max-w-[200px]">
                      {inst.instituteName || "Bharati Vidya Sansthan"}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 font-medium">
                      PID: {inst.instituteCode || "1-1029384"}
                    </div>
                  </td>

                  {/* FDR Reference */}
                  <td className="py-2.5 px-3">
                    <button
                      onClick={() => (onOpenDrawer ? onOpenDrawer(inst) : onViewInstrument(inst))}
                      className="font-mono font-bold text-[#0B2545] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{inst.ref}</span>
                    </button>
                    <div className="text-[11px] text-slate-500 truncate max-w-[170px]">
                      {inst.discipline}
                    </div>
                  </td>

                  {/* Issuing Bank & Branch */}
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
                      <span>{inst.bankName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {inst.branchName} • <span className="font-mono">{inst.ifsc}</span>
                    </div>
                  </td>

                  {/* Two-Tone Verification Source Tagging */}
                  <td className="py-2.5 px-3">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="badge-institution text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span>🏛️ Trust Declared</span>
                      </span>

                      {inst.bankConfirmed ? (
                        <span className="badge-bank-verified text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-[#059669]" />
                          <span>Bank API Verified: {inst.bankName.split(" ")[0]}</span>
                        </span>
                      ) : inst.hasDiscrepancy ? (
                        <span className="badge-discrepancy text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5 text-[#DC2626]" />
                          <span>Discrepancy Flagged</span>
                        </span>
                      ) : (
                        <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-sky-600" />
                          <span>Pending Bank Confirmation</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Amount (₹) - Right Aligned & Tabular Nums */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="font-bold text-[#0F172A] font-mono text-[13px] tabular-nums">
                      {FORMAT_INDIAN_CURRENCY(inst.principalAmount)}
                    </div>
                    <div className="text-[11px] text-[#059669] font-mono tabular-nums">
                      +{FORMAT_INDIAN_CURRENCY(inst.accruedInterest)} yield
                    </div>
                  </td>

                  {/* Maturity Date */}
                  <td className="py-2.5 px-3">
                    <div className="font-mono text-[#0F172A] tabular-nums">
                      {inst.maturityDate}
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${
                        inst.remainingDays <= 45 ? "text-[#D97706]" : "text-slate-500"
                      }`}
                    >
                      {inst.remainingDays <= 45
                        ? `⚠️ ${inst.remainingDays} days left`
                        : `${inst.remainingDays} days remaining`}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-2.5 px-3 text-center">
                    {inst.hasDiscrepancy ? (
                      <span className="badge-discrepancy inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                        <AlertCircle className="w-3 h-3 text-[#DC2626]" />
                        Discrepancy
                      </span>
                    ) : inst.remainingDays <= 45 ? (
                      <span className="badge-expiring inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                        <Clock className="w-3 h-3 text-[#D97706]" />
                        Maturing Soon
                      </span>
                    ) : (
                      <span className="badge-bank-verified inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                        <Check className="w-3 h-3 text-[#059669]" />
                        Bank Verified
                      </span>
                    )}
                  </td>

                  {/* Quick Actions */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewInstrument(inst)}
                        title="Open Dual-Pane Scrutiny"
                        className="p-1.5 text-xs font-semibold text-[#0B2545] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">Scrutiny</span>
                      </button>

                      <button
                        onClick={() => (onOpenDrawer ? onOpenDrawer(inst) : onViewDocuments(inst))}
                        title="Open Document Drawer"
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong>{filteredInstruments.length}</strong> of <strong>{instruments.length}</strong> statutory instruments
          </span>
          <span className="text-slate-300">•</span>
          <span>{selectedIds.length} row(s) selected</span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            Total Pledged Value:{" "}
            <strong className="text-[#0F172A] font-mono">
              {FORMAT_INDIAN_CURRENCY(filteredInstruments.reduce((s, i) => s + i.principalAmount, 0))}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
