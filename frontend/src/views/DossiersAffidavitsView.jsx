import { useState, useMemo } from "react";
import { 
  FileText, 
  Download, 
  Printer, 
  Stamp, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  FileCheck2
} from "lucide-react";

export const DossiersAffidavitsView = ({
  documents = [],
  onOpenAffidavitModal
}) => {
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter documents
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      if (categoryFilter === "verified" && !doc.verified) return false;
      if (categoryFilter === "affidavit" && !doc.documentType?.toLowerCase().includes("affidavit")) return false;
      if (categoryFilter === "fdr" && !doc.documentType?.toLowerCase().includes("deposit") && !doc.title?.toLowerCase().includes("fdr")) return false;
      if (categoryFilter === "sfms" && !doc.documentType?.toLowerCase().includes("sfms") && !doc.title?.toLowerCase().includes("sfms")) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        return (
          doc.title?.toLowerCase().includes(q) ||
          doc.fdrRef?.toLowerCase().includes(q) ||
          doc.instituteName?.toLowerCase().includes(q) ||
          doc.signatory?.toLowerCase().includes(q) ||
          doc.stampValue?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [documents, categoryFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedDocs = filteredDocs.slice((safePage - 1) * pageSize, safePage * pageSize);

  const activeDoc = selectedDoc || paginatedDocs[0] || null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002546] text-amber-400">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              Statutory Dossiers, e-Stamps &amp; Affidavits Repository
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Legal Undertakings, Tripartite Covenants, Format Affidavit-6 &amp; Bank Counter-Guarantees ({documents.length.toLocaleString('en-IN')} Documents In Vault)
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (Col 5): Filterable Document list with Pagination */}
        <div className="lg:col-span-5 space-y-3">
          <div className="card-clean rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Vault Documents ({filteredDocs.length.toLocaleString('en-IN')})
              </h2>
              <span className="text-[10px] text-slate-400 font-mono">
                Page {safePage} of {totalPages}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dossiers by title, ref, institute..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#0D3B66]"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
              {[
                { id: "all", label: "All Docs" },
                { id: "affidavit", label: "Affidavits" },
                { id: "fdr", label: "FDR Scans" },
                { id: "sfms", label: "SFMS" },
                { id: "verified", label: "Verified Only" }
              ].map((cf) => (
                <button
                  key={cf.id}
                  onClick={() => {
                    setCategoryFilter(cf.id);
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer shrink-0 ${
                    categoryFilter === cf.id
                      ? "bg-[#0D3B66] text-white font-bold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cf.label}
                </button>
              ))}
            </div>

            {/* Document Cards */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {paginatedDocs.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No documents found matching the filter.
                </div>
              ) : (
                paginatedDocs.map((doc) => {
                  const isSelected = activeDoc?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected 
                          ? "border-[#0D3B66] bg-blue-50/60 shadow-2xs" 
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                          {doc.title}
                        </span>
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            doc.verified 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "bg-sky-100 text-sky-800"
                          }`}
                        >
                          {doc.verified ? "Verified" : "Under Scrutiny"}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1 truncate">
                        {doc.documentType} {doc.fdrRef ? `• ${doc.fdrRef}` : ""}
                      </p>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-100">
                        <span>{doc.uploadDate}</span>
                        <span className="font-mono">{doc.fileSize}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination Controls */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>{filteredDocs.length.toLocaleString('en-IN')} total files</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-semibold">
                  {safePage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right (Col 7): Selected Document Full View */}
        <div className="lg:col-span-7 space-y-4 sticky top-28">
          {activeDoc ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {activeDoc.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeDoc.documentType} • Signatory: <strong>{activeDoc.signatory}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading signed PDF for: ${activeDoc.title}`)}
                    className="px-3 py-1.5 bg-[#0D3B66] hover:bg-[#002546] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Signed PDF</span>
                  </button>
                </div>
              </div>

              {/* Document Overview Metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">STAMP VALUE &amp; NUMBER</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">{activeDoc.stampValue || "₹100 Non-Judicial"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">LINKED FDR REFERENCE</span>
                  <span className="font-mono font-bold text-[#0D3B66] text-[11px]">{activeDoc.fdrRef || "FDR-LINK"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">UPLOAD &amp; TIMESTAMP</span>
                  <span className="text-slate-800 text-[11px]">{activeDoc.uploadDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">CRYPTOGRAPHIC SEAL</span>
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {activeDoc.verified ? "SHA-256 Verified" : "Pending Signature"}
                  </span>
                </div>
              </div>

              {/* Document Preview Box */}
              <div className="p-5 bg-amber-50/40 border border-amber-200 rounded-lg text-xs text-slate-800 space-y-2 font-serif leading-relaxed">
                <div className="text-center font-bold font-sans uppercase tracking-widest text-slate-700 pb-2 border-b border-amber-200 text-xs">
                  CERTIFIED EXTRACT FROM STATUTORY DOSSIER
                </div>
                <p>
                  "BE IT KNOWN TO ALL PERSONS, that the undersigned duly authorized signatory of the Trust/Society, hereby solemnly affirms and declares under penalty of perjury that the Fixed Deposit of statutory value pledged in joint name with <strong>Member Secretary, AICTE New Delhi</strong> is free from all encumbrances, prior liens, court attachments, or third-party claims."
                </p>
                <div className="pt-3 flex justify-between items-center text-[11px] font-sans text-slate-500">
                  <span>Digitally Notarized: First Class Judicial Magistrate</span>
                  <span className="font-mono text-[#0D3B66] font-bold">APH Section 1.4 Format Valid</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-clean rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-500">
              Select a document from the vault to inspect its details and digital signature certificate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
