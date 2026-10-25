import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  Check,
  Landmark,
  Clock,
  AlertCircle,
  Layers,
  RotateCcw,
  Download,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  FileSpreadsheet,
  Radio,
  CheckSquare,
  Square
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY, FORMAT_COMPACT_CURRENCY } from "@data/mockData";

export const InstrumentsTable = ({
  instruments = [],
  onViewInstrument,
  onViewDocuments,
  onInitiateRpgf,
  onOpenDrawer,
  externalFilter = "all",
  onClearExternalFilter
}) => {
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Filters
  const [activeFilterTab, setActiveFilterTab] = useState(externalFilter || "all");
  const [bankFilter, setBankFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [disciplineFilter, setDisciplineFilter] = useState("all");
  const [expiryWindow, setExpiryWindow] = useState("all"); // 'all', '15', '30', '45', '60', '90'
  const [tableSearch, setTableSearch] = useState("");
  
  // Sorting
  const [sortField, setSortField] = useState("remainingDays");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'

  // Pagination & Layout Density
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [isCompact, setIsCompact] = useState(false);
  const [jumpPageInput, setJumpPageInput] = useState("");

  // Sync external filter from StatCards
  useEffect(() => {
    if (externalFilter) {
      setActiveFilterTab(externalFilter);
      if (externalFilter === "expiring") {
        setExpiryWindow("60");
      }
      setCurrentPage(1);
    }
  }, [externalFilter]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [tableSearch, activeFilterTab, bankFilter, regionFilter, disciplineFilter, expiryWindow]);

  // Filter logic
  const filteredInstruments = useMemo(() => {
    return instruments.filter((inst) => {
      // Primary Tab Filter
      if (activeFilterTab === "verified" && !inst.bankConfirmed) return false;
      if (activeFilterTab === "expiring" && inst.remainingDays > 90) return false;
      if (activeFilterTab === "discrepancy" && !inst.hasDiscrepancy) return false;
      if (activeFilterTab === "pending" && inst.bankConfirmed) return false;
      if (activeFilterTab === "release" && !(inst.phaseReleaseEligible || inst.remainingDays <= 60)) return false;

      // Bank Filter
      if (bankFilter !== "all") {
        if (!inst.bankName.toLowerCase().includes(bankFilter.toLowerCase())) return false;
      }

      // Region Filter
      if (regionFilter !== "all") {
        if (inst.region !== regionFilter) return false;
      }

      // Discipline Filter
      if (disciplineFilter !== "all") {
        if (inst.disciplineCategory !== disciplineFilter) return false;
      }

      // Expiry Window Filter
      if (expiryWindow === "15" && inst.remainingDays > 15) return false;
      if (expiryWindow === "30" && inst.remainingDays > 30) return false;
      if (expiryWindow === "45" && inst.remainingDays > 45) return false;
      if (expiryWindow === "60" && inst.remainingDays > 60) return false;
      if (expiryWindow === "90" && inst.remainingDays > 90) return false;

      // Search Query
      if (tableSearch.trim()) {
        const q = tableSearch.toLowerCase().trim();
        const match =
          inst.ref.toLowerCase().includes(q) ||
          inst.discipline.toLowerCase().includes(q) ||
          (inst.instituteCode && inst.instituteCode.toLowerCase().includes(q)) ||
          (inst.instituteName && inst.instituteName.toLowerCase().includes(q)) ||
          (inst.city && inst.city.toLowerCase().includes(q)) ||
          (inst.state && inst.state.toLowerCase().includes(q)) ||
          inst.bankName.toLowerCase().includes(q) ||
          inst.ifsc.toLowerCase().includes(q) ||
          inst.fdrReceiptNo.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [instruments, activeFilterTab, bankFilter, regionFilter, disciplineFilter, expiryWindow, tableSearch]);

  // Sorting logic
  const sortedInstruments = useMemo(() => {
    const list = [...filteredInstruments];
    list.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "principalAmount" || sortField === "remainingDays" || sortField === "accruedInterest") {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = (aVal || "").toString().toLowerCase();
        bVal = (bVal || "").toString().toLowerCase();
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredInstruments, sortField, sortOrder]);

  // Pagination calculation
  const totalItems = sortedInstruments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedInstruments = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return sortedInstruments.slice(startIndex, startIndex + pageSize);
  }, [sortedInstruments, safePage, pageSize]);

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Selection handlers
  const isAllCurrentPageSelected =
    paginatedInstruments.length > 0 &&
    paginatedInstruments.every((i) => selectedIds.includes(i.id));

  const toggleSelectAllCurrentPage = () => {
    if (isAllCurrentPageSelected) {
      const pageIds = new Set(paginatedInstruments.map((i) => i.id));
      setSelectedIds((prev) => prev.filter((id) => !pageIds.has(id)));
    } else {
      const newIds = new Set([...selectedIds, ...paginatedInstruments.map((i) => i.id)]);
      setSelectedIds(Array.from(newIds));
    }
  };

  const selectAllFiltered = () => {
    setSelectedIds(filteredInstruments.map((i) => i.id));
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  // CSV Export handler
  const exportToCsv = (itemsToExport, filenamePrefix = "AICTE_FDR_Registry") => {
    const rows = itemsToExport.length > 0 ? itemsToExport : sortedInstruments;
    if (rows.length === 0) return;

    const headers = [
      "PID",
      "Institution Name",
      "City",
      "State",
      "Region",
      "FDR Reference",
      "Discipline",
      "Bank Name",
      "Branch",
      "IFSC",
      "Principal Amount (INR)",
      "Accrued Interest (INR)",
      "Issue Date",
      "Maturity Date",
      "Remaining Days",
      "Statutory Status",
      "Bank API Status",
      "SFMS Reference",
      "Receipt No"
    ];

    const csvContent = [
      headers.join(","),
      ...rows.map((r) =>
        [
          `"${r.instituteCode || ''}"`,
          `"${(r.instituteName || '').replace(/"/g, '""')}"`,
          `"${r.city || ''}"`,
          `"${r.state || ''}"`,
          `"${r.region || ''}"`,
          `"${r.ref}"`,
          `"${(r.discipline || '').replace(/"/g, '""')}"`,
          `"${r.bankName}"`,
          `"${(r.branchName || '').replace(/"/g, '""')}"`,
          `"${r.ifsc}"`,
          r.principalAmount,
          r.accruedInterest,
          `"${r.issueDate}"`,
          `"${r.maturityDate}"`,
          r.remainingDays,
          `"${r.statutoryStatus}"`,
          `"${r.bankApiStatus}"`,
          `"${r.sfmsReference || ''}"`,
          `"${r.fdrReceiptNo || ''}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filenamePrefix}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters =
    activeFilterTab !== "all" ||
    bankFilter !== "all" ||
    regionFilter !== "all" ||
    disciplineFilter !== "all" ||
    expiryWindow !== "all" ||
    tableSearch.trim() !== "";

  const resetAllFilters = () => {
    setActiveFilterTab("all");
    setBankFilter("all");
    setRegionFilter("all");
    setDisciplineFilter("all");
    setExpiryWindow("all");
    setTableSearch("");
    if (onClearExternalFilter) onClearExternalFilter();
  };

  // Generate windowed page numbers
  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      let start = Math.max(2, safePage - 1);
      let end = Math.min(totalPages - 1, safePage + 1);

      if (safePage <= 3) {
        end = 4;
      } else if (safePage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) items.push("...");
      for (let i = start; i <= end; i++) items.push(i);
      if (end < totalPages - 1) items.push("...");
      items.push(totalPages);
    }
    return items;
  };

  return (
    <div className="card-clean rounded-lg bg-white border border-[#E2E8F0] overflow-hidden shadow-2xs">
      {/* 1. TOP TOOLBAR & MULTI-DIMENSIONAL FILTERS */}
      <div className="p-3.5 border-b border-[#E2E8F0] space-y-3 bg-white">
        
        {/* Row A: Primary Tabs & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Quick Search & Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {/* Quick Search */}
            <div className="relative min-w-[240px] flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search PID, Institution, FDR Ref, Bank, IFSC, City..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B2545] focus:bg-white text-[#0F172A]"
              />
              {tableSearch && (
                <button
                  onClick={() => setTableSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Primary Filter Tabs */}
            <div className="inline-flex rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 text-xs overflow-x-auto max-w-full">
              <button
                onClick={() => {
                  setActiveFilterTab("all");
                  setExpiryWindow("all");
                  if (onClearExternalFilter) onClearExternalFilter();
                }}
                className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer shrink-0 ${
                  activeFilterTab === "all"
                    ? "bg-white text-[#0B2545] shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({instruments.length.toLocaleString("en-IN")})
              </button>
              <button
                onClick={() => setActiveFilterTab("verified")}
                className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeFilterTab === "verified"
                    ? "bg-white text-[#059669] shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                Bank Verified
              </button>
              <button
                onClick={() => {
                  setActiveFilterTab("expiring");
                  setExpiryWindow("60");
                }}
                className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeFilterTab === "expiring"
                    ? "bg-white text-[#D97706] shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Clock className="w-3 h-3 text-[#D97706]" />
                Maturing &lt; 90d
              </button>
              <button
                onClick={() => setActiveFilterTab("discrepancy")}
                className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeFilterTab === "discrepancy"
                    ? "bg-white text-[#DC2626] shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <AlertCircle className="w-3 h-3 text-[#DC2626]" />
                Discrepancy
              </button>
              <button
                onClick={() => setActiveFilterTab("pending")}
                className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeFilterTab === "pending"
                    ? "bg-white text-sky-700 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                Under Scrutiny
              </button>
              <button
                onClick={() => setActiveFilterTab("release")}
                className={`px-2.5 py-1 font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeFilterTab === "release"
                    ? "bg-white text-[#059669] shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <RotateCcw className="w-3 h-3 text-[#059669]" />
                Release Ready
              </button>
            </div>
          </div>

          {/* Right: Export & Density Switch */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            {/* Density Mode */}
            <div className="flex items-center border border-[#E2E8F0] rounded-md overflow-hidden bg-[#F8FAFC]">
              <button
                onClick={() => setIsCompact(false)}
                className={`px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                  !isCompact ? "bg-white text-[#0B2545] shadow-2xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Comfortable Row Height"
              >
                Normal
              </button>
              <button
                onClick={() => setIsCompact(true)}
                className={`px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                  isCompact ? "bg-white text-[#0B2545] shadow-2xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Compact Row Height (Audit Density)"
              >
                Compact
              </button>
            </div>

            {/* Export CSV */}
            <button
              onClick={() => exportToCsv(sortedInstruments, "AICTE_FDR_Filter_Export")}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-[#E2E8F0] rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Export currently filtered instruments to CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Row B: Secondary Granular Dropdown Filters */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filters:
            </span>

            {/* Bank Filter */}
            <div className="relative">
              <select
                value={bankFilter}
                onChange={(e) => setBankFilter(e.target.value)}
                className="appearance-none bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2.5 py-1 text-xs text-[#0F172A] pr-6 focus:outline-none focus:border-[#0B2545] cursor-pointer"
              >
                <option value="all">Bank: All Banks</option>
                <option value="State Bank">State Bank of India</option>
                <option value="Punjab">Punjab National Bank</option>
                <option value="Canara">Canara Bank</option>
                <option value="Baroda">Bank of Baroda</option>
                <option value="Union">Union Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Region Filter */}
            <div className="relative">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="appearance-none bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2.5 py-1 text-xs text-[#0F172A] pr-6 focus:outline-none focus:border-[#0B2545] cursor-pointer"
              >
                <option value="all">AICTE Bureau: All Regions</option>
                <option value="WRO">Western (WRO Mumbai)</option>
                <option value="NRO">Northern (NRO Kanpur)</option>
                <option value="SRO">Southern (SRO Chennai)</option>
                <option value="SWRO">South-Western (SWRO Bengaluru)</option>
                <option value="CRO">Central (CRO Bhopal)</option>
                <option value="ERO">Eastern (ERO Kolkata)</option>
                <option value="NWRO">North-Western (NWRO Chandigarh)</option>
                <option value="SCRO">South-Central (SCRO Hyderabad)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Discipline Category Filter */}
            <div className="relative">
              <select
                value={disciplineFilter}
                onChange={(e) => setDisciplineFilter(e.target.value)}
                className="appearance-none bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2.5 py-1 text-xs text-[#0F172A] pr-6 focus:outline-none focus:border-[#0B2545] cursor-pointer"
              >
                <option value="all">Program: All Disciplines</option>
                <option value="engineering">Engineering &amp; Technology</option>
                <option value="management">Management / MBA / PGDM</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="architecture">Architecture &amp; Planning</option>
                <option value="other">Polytechnic / Other</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Maturity Window Buttons */}
            <div className="flex items-center gap-1 text-[11px] font-semibold bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md">
              <span className="text-slate-500 text-[10px] uppercase">Maturity:</span>
              {["all", "15", "30", "45", "60", "90"].map((w) => (
                <button
                  key={w}
                  onClick={() => setExpiryWindow(w)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                    expiryWindow === w
                      ? "bg-[#0B2545] text-white font-bold"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {w === "all" ? "All" : `<${w}d`}
                </button>
              ))}
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="px-2 py-0.5 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Quick Result Counter */}
          <div className="text-slate-500 font-mono text-[11px]">
            Found <strong>{totalItems.toLocaleString("en-IN")}</strong> matching records
          </div>
        </div>
      </div>

      {/* 2. BATCH OPERATIONS FLOATING BAR (Shown when rows are selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-[#0B2545] text-white px-4 py-2 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="font-bold flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>{selectedIds.length} row(s) selected</span>
            </span>
            <span className="text-slate-400">|</span>
            <button
              onClick={selectAllFiltered}
              className="text-amber-300 hover:underline cursor-pointer font-medium"
            >
              Select all {totalItems.toLocaleString("en-IN")} matching records
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const selectedItems = instruments.filter((i) => selectedIds.includes(i.id));
                exportToCsv(selectedItems, "AICTE_FDR_Selected");
              }}
              className="px-3 py-1 bg-white text-[#0B2545] rounded font-bold hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer text-[11px]"
            >
              <Download className="w-3 h-3" />
              <span>Export Selected ({selectedIds.length})</span>
            </button>
            <button
              onClick={clearSelection}
              className="px-2.5 py-1 text-slate-300 hover:text-white cursor-pointer text-[11px]"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN FULL-WIDTH DATA TABLE WITH SORTABLE HEADERS */}
      <div className="overflow-x-auto relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider select-none sticky top-0 z-10">
              {/* Checkbox */}
              <th className="py-2.5 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllCurrentPageSelected}
                  onChange={toggleSelectAllCurrentPage}
                  className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545] cursor-pointer"
                  title="Select all on this page"
                />
              </th>

              {/* Institution & PID */}
              <th
                onClick={() => handleSort("instituteName")}
                className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Institution &amp; PID</span>
                  {sortField === "instituteName" && (
                    sortOrder === "asc" ? <ChevronUp className="w-3.5 h-3.5 text-[#0B2545]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#0B2545]" />
                  )}
                </div>
              </th>

              {/* FDR Reference */}
              <th
                onClick={() => handleSort("ref")}
                className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>FDR Ref &amp; Program</span>
                  {sortField === "ref" && (
                    sortOrder === "asc" ? <ChevronUp className="w-3.5 h-3.5 text-[#0B2545]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#0B2545]" />
                  )}
                </div>
              </th>

              {/* Bank & Branch */}
              <th
                onClick={() => handleSort("bankName")}
                className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Issuing Bank &amp; Branch</span>
                  {sortField === "bankName" && (
                    sortOrder === "asc" ? <ChevronUp className="w-3.5 h-3.5 text-[#0B2545]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#0B2545]" />
                  )}
                </div>
              </th>

              {/* Verification Telemetry */}
              <th className="py-2.5 px-3">
                <span>Verification Telemetry</span>
              </th>

              {/* Amount (Numerical Sort) */}
              <th
                onClick={() => handleSort("principalAmount")}
                className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Pledged Capital (₹)</span>
                  {sortField === "principalAmount" && (
                    sortOrder === "asc" ? <ChevronUp className="w-3.5 h-3.5 text-[#0B2545]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#0B2545]" />
                  )}
                </div>
              </th>

              {/* Maturity Date & Remaining Days (Sort) */}
              <th
                onClick={() => handleSort("remainingDays")}
                className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Maturity Window</span>
                  {sortField === "remainingDays" && (
                    sortOrder === "asc" ? <ChevronUp className="w-3.5 h-3.5 text-[#0B2545]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#0B2545]" />
                  )}
                </div>
              </th>

              {/* Status */}
              <th
                onClick={() => handleSort("statusType")}
                className="py-2.5 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Statutory Status</span>
                  {sortField === "statusType" && (
                    sortOrder === "asc" ? <ChevronUp className="w-3.5 h-3.5 text-[#0B2545]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#0B2545]" />
                  )}
                </div>
              </th>

              {/* Actions */}
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {paginatedInstruments.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-slate-500">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <div className="font-semibold text-sm text-slate-700">No matching instruments found</div>
                  <p className="text-xs text-slate-400 mt-1">Try clearing some filters or searching with a different term.</p>
                  <button
                    onClick={resetAllFilters}
                    className="mt-3 px-3 py-1 bg-[#0B2545] text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </td>
              </tr>
            ) : (
              paginatedInstruments.map((inst) => {
                const isSelected = selectedIds.includes(inst.id);
                return (
                  <tr
                    key={inst.id}
                    className={`transition-colors hover:bg-[#F8FAFC] ${
                      isSelected ? "bg-blue-50/50" : ""
                    } ${isCompact ? "py-1.5" : "py-2.5"}`}
                  >
                    {/* Checkbox */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(inst.id)}
                        className="rounded border-slate-300 text-[#0B2545] focus:ring-[#0B2545] cursor-pointer"
                      />
                    </td>

                    {/* Institution & PID */}
                    <td className="py-2 px-3">
                      <div className="font-semibold text-[#0F172A] truncate max-w-[220px]" title={inst.instituteName}>
                        {inst.instituteName}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                        <span>PID: {inst.instituteCode}</span>
                        {inst.region && (
                          <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-sans font-bold border border-slate-200">
                            {inst.region}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* FDR Reference & Discipline */}
                    <td className="py-2 px-3">
                      <button
                        onClick={() => (onOpenDrawer ? onOpenDrawer(inst) : onViewInstrument(inst))}
                        className="font-mono font-bold text-[#0B2545] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{inst.ref}</span>
                      </button>
                      <div className="text-[11px] text-slate-500 truncate max-w-[190px]" title={inst.discipline}>
                        {inst.discipline}
                      </div>
                    </td>

                    {/* Issuing Bank & Branch */}
                    <td className="py-2 px-3">
                      <div className="font-semibold text-[#0F172A] flex items-center gap-1.5 truncate max-w-[180px]">
                        <Landmark className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
                        <span className="truncate">{inst.bankName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                        {inst.branchName} • <span className="font-mono">{inst.ifsc}</span>
                      </div>
                    </td>

                    {/* Telemetry Badge */}
                    <td className="py-2 px-3">
                      <div className="flex flex-col gap-1 items-start">
                        {inst.bankConfirmed ? (
                          <span className="badge-bank-verified text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 text-[#059669]" />
                            <span>Verified: {inst.bankName.split(" ")[0]}</span>
                          </span>
                        ) : inst.hasDiscrepancy ? (
                          <span className="badge-discrepancy text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <AlertCircle className="w-2.5 h-2.5 text-[#DC2626]" />
                            <span>Discrepancy Flagged</span>
                          </span>
                        ) : (
                          <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-sky-600" />
                            <span>Pending CBS Confirmation</span>
                          </span>
                        )}
                        {!isCompact && (
                          <span className="text-[9px] text-slate-400 font-mono">
                            SFMS Ref: {inst.sfmsReference || "Direct CBS"}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Amount (₹) */}
                    <td className="py-2 px-3 text-right">
                      <div className="font-bold text-[#0F172A] font-mono text-[13px] tabular-nums">
                        {FORMAT_INDIAN_CURRENCY(inst.principalAmount)}
                      </div>
                      {!isCompact && (
                        <div className="text-[11px] text-[#059669] font-mono tabular-nums">
                          +{FORMAT_INDIAN_CURRENCY(inst.accruedInterest)} yield
                        </div>
                      )}
                    </td>

                    {/* Maturity Window */}
                    <td className="py-2 px-3">
                      <div className="font-mono text-[#0F172A] tabular-nums font-medium text-[11px]">
                        {inst.maturityDate}
                      </div>
                      <div
                        className={`text-[11px] font-semibold ${
                          inst.remainingDays <= 15
                            ? "text-rose-700 font-bold"
                            : inst.remainingDays <= 45
                            ? "text-amber-800"
                            : "text-slate-500"
                        }`}
                      >
                        {inst.remainingDays <= 15
                          ? `🚨 ${inst.remainingDays}d (URGENT)`
                          : inst.remainingDays <= 60
                          ? `⚠️ ${inst.remainingDays}d left`
                          : `${inst.remainingDays}d remaining`}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-2 px-3 text-center">
                      {inst.hasDiscrepancy ? (
                        <span className="badge-discrepancy inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          <AlertCircle className="w-3 h-3 text-[#DC2626]" />
                          Discrepancy
                        </span>
                      ) : inst.remainingDays <= 45 ? (
                        <span className="badge-expiring inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          <Clock className="w-3 h-3 text-[#D97706]" />
                          Maturing Soon
                        </span>
                      ) : !inst.bankConfirmed ? (
                        <span className="bg-sky-50 text-sky-800 border border-sky-200 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          <Clock className="w-3 h-3 text-sky-600" />
                          Under Scrutiny
                        </span>
                      ) : (
                        <span className="badge-bank-verified inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          <Check className="w-3 h-3 text-[#059669]" />
                          Bank Verified
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewInstrument(inst)}
                          title="Open Dual-Pane Scrutiny Desk"
                          className="p-1.5 text-xs font-semibold text-[#0B2545] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden xl:inline">Scrutiny</span>
                        </button>

                        <button
                          onClick={() => (onOpenDrawer ? onOpenDrawer(inst) : onViewDocuments(inst))}
                          title="Open Legal Dossier Drawer"
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 4. PAGINATION CONTROLS & BOTTOM SUMMARY */}
      <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col md:flex-row md:items-center justify-between text-xs text-slate-600 gap-3">
        {/* Left: Item Range & Page Size */}
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            Showing{" "}
            <strong>
              {totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(safePage * pageSize, totalItems)}
            </strong>{" "}
            of <strong>{totalItems.toLocaleString("en-IN")}</strong> records
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-[#E2E8F0] rounded px-2 py-0.5 text-xs text-[#0F172A] cursor-pointer focus:outline-none"
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Capital Sum */}
          <div className="hidden sm:inline-flex items-center gap-1 font-mono text-slate-700">
            <span className="text-slate-400">|</span>
            <span>Total Filtered Capital:</span>
            <strong className="text-[#0B2545]">
              {FORMAT_COMPACT_CURRENCY(filteredInstruments.reduce((s, i) => s + (i.principalAmount || 0), 0))}
            </strong>
          </div>
        </div>

        {/* Right: Numbered Pagination Buttons */}
        <div className="flex items-center gap-1 self-center md:self-auto">
          {/* First Page */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={safePage === 1}
            className="p-1.5 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="First Page"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>

          {/* Prev Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-1.5 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPaginationItems().map((item, idx) => {
              if (item === "...") {
                return (
                  <span key={`dots-${idx}`} className="px-1.5 text-slate-400 select-none">
                    ...
                  </span>
                );
              }
              const isCurrent = item === safePage;
              return (
                <button
                  key={`page-${item}`}
                  onClick={() => setCurrentPage(item)}
                  className={`min-w-[28px] h-7 px-1.5 rounded text-xs font-semibold font-mono transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-[#0B2545] text-white font-bold"
                      : "bg-white border border-[#E2E8F0] text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Next Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="p-1.5 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Last Page */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={safePage === totalPages}
            className="p-1.5 rounded border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Last Page"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>

          {/* Jump to page */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const target = parseInt(jumpPageInput, 10);
              if (!isNaN(target) && target >= 1 && target <= totalPages) {
                setCurrentPage(target);
                setJumpPageInput("");
              }
            }}
            className="hidden lg:flex items-center gap-1 ml-2"
          >
            <span className="text-[11px] text-slate-400">Go:</span>
            <input
              type="text"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              placeholder="p#"
              className="w-10 px-1.5 py-0.5 text-xs text-center border border-[#E2E8F0] rounded bg-white font-mono focus:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
