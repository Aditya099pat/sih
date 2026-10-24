import { useState } from "react";
import {
  FolderPlus,
  Landmark,
  Upload,
  ArrowRight,
  ArrowLeft,
  FileText,
  Trash2,
  Eye,
  Building,
  Calculator
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";
export const RegisterDepositView = ({
  onAddInstrument,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [discipline, setDiscipline] = useState("B.Tech Artificial Intelligence & Data Science (New Program)");
  const [disciplineCategory, setDisciplineCategory] = useState("engineering");
  const [bankName, setBankName] = useState("State Bank of India");
  const [branchName, setBranchName] = useState("Bandra Kurla Complex Br.");
  const [ifsc, setIfsc] = useState("SBIN0004521");
  const [fdrReceiptNo, setFdrReceiptNo] = useState("SBI-FD-" + Math.floor(1e7 + Math.random() * 9e7));
  const [principalAmount, setPrincipalAmount] = useState(35e5);
  const [termYears, setTermYears] = useState(8);
  const [interestRate, setInterestRate] = useState(7.2);
  const [intakeCapacity, setIntakeCapacity] = useState(60);
  const [custodyMode, setCustodyMode] = useState("SFMS e-Lien Registered");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: "f-1", name: "ORIGINAL_TERM_DEPOSIT_RECEIPT.PDF", size: "2.4 MB", progress: 100, status: "Uploaded" },
    { id: "f-2", name: "AFFIDAVIT_6_NOTARIZED_STAMP.PDF", size: "1.8 MB", progress: 100, status: "Uploaded" },
    { id: "f-3", name: "SFMS_799_BANK_TRANSMISSION.PDF", size: "890 KB", progress: 85, status: "Syncing" }
  ]);
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFiles((prev) => [
        ...prev,
        {
          id: "f-" + Date.now(),
          name: file.name.toUpperCase(),
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          progress: 100,
          status: "Uploaded"
        }
      ]);
    }
  };
  const handleDeleteFile = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const issueYear = (/* @__PURE__ */ new Date()).getFullYear();
    const maturityYear = issueYear + termYears;
    const refCode = `FDR-${bankName.includes("Punjab") ? "PNB" : "SBIN"}-${issueYear}-${Math.floor(10 + Math.random() * 89)}`;
    const newInst = {
      id: "fdr-" + Date.now(),
      ref: refCode,
      instituteCode: "1-1029384",
      instituteName: "Bharati Vidya Sansthan",
      discipline,
      disciplineCategory,
      disciplineCode: "UG-ENGG-AIDS",
      dotColor: "#059669",
      type: "Joint Fixed Deposit",
      custodyMode,
      bankName,
      branchName,
      ifsc,
      principalAmount,
      accruedInterest: 0,
      interestRate,
      issueDate: `01 Aug ${issueYear}`,
      maturityDate: `31 Jul ${maturityYear}`,
      remainingDays: termYears * 365,
      termYears,
      verificationSource: "Trust Declared & SFMS e-Lien",
      bankApiStatus: "SBI CBS \u2713",
      bankConfirmed: true,
      bankConfirmedBy: "State Bank of India CBS",
      statutoryStatus: "Active (>180 Days)",
      statusType: "success",
      jointLienWith: "Member Secretary, AICTE New Delhi",
      fdrReceiptNo,
      sfmsReference: `SFMS/${issueYear}/L799/${Math.floor(1e5 + Math.random() * 9e5)}`,
      eStampNumber: `IN-MH${Math.floor(1e9 + Math.random() * 9e9)}D`,
      intakeCapacity,
      approvedYear: `${issueYear}-${issueYear + 1}`
    };
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onAddInstrument(newInst);
    }, 1200);
  };
  return <div className="space-y-6">
      {
    /* Title */
  }
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
              <FolderPlus className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-[#0F172A]">
              Register New Statutory Security Deposit / Joint FDR
            </h1>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            AICTE Approval Process Handbook (APH 2025-26 Table 1.4) • Joint Lien Pledge with Member Secretary
          </p>
        </div>

        <button
    onClick={onCancel}
    className="px-3 py-1.5 text-xs font-semibold text-[#0F172A] border border-[#E2E8F0] rounded-lg hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
  >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {
    /* TOP HORIZONTAL STEPPER (from Wireframe 3) */
  }
      <div className="card-clean rounded-xl p-4 bg-white">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {
    /* Step 1 */
  }
          <div className="flex items-center gap-2">
            <button
    onClick={() => setCurrentStep(1)}
    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${currentStep >= 1 ? "bg-[#0D3B66] text-white" : "bg-slate-100 text-slate-400"}`}
  >
              1
            </button>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-[#0F172A]">Program & Intake</span>
              <span className="block text-[10px] text-[#64748B]">Table 1.4 Rate</span>
            </div>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${currentStep >= 2 ? "bg-[#0D3B66]" : "bg-slate-200"}`} />

          {
    /* Step 2 */
  }
          <div className="flex items-center gap-2">
            <button
    onClick={() => setCurrentStep(2)}
    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${currentStep >= 2 ? "bg-[#0D3B66] text-white" : "bg-slate-100 text-slate-400"}`}
  >
              2
            </button>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-[#0F172A]">Deposit Details</span>
              <span className="block text-[10px] text-[#64748B]">Bank & Term</span>
            </div>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${currentStep >= 3 ? "bg-[#0D3B66]" : "bg-slate-200"}`} />

          {
    /* Step 3 */
  }
          <div className="flex items-center gap-2">
            <button
    onClick={() => setCurrentStep(3)}
    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${currentStep >= 3 ? "bg-[#0D3B66] text-white" : "bg-slate-100 text-slate-400"}`}
  >
              3
            </button>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-[#0F172A]">Upload Instruments</span>
              <span className="block text-[10px] text-[#64748B]">Scans & SFMS</span>
            </div>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${currentStep >= 4 ? "bg-[#0D3B66]" : "bg-slate-200"}`} />

          {
    /* Step 4 */
  }
          <div className="flex items-center gap-2">
            <button
    onClick={() => setCurrentStep(4)}
    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${currentStep >= 4 ? "bg-[#0D3B66] text-white" : "bg-slate-100 text-slate-400"}`}
  >
              4
            </button>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-[#0F172A]">Verification Seal</span>
              <span className="block text-[10px] text-[#64748B]">Joint Lien Stamp</span>
            </div>
          </div>
        </div>
      </div>

      {
    /* DUAL SECTION (from Wireframe 3) */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {
    /* LEFT SECTION (lg:col-span-7): Form & Calculation Widgets */
  }
        <div className="lg:col-span-7 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {
    /* Step 1 & 2 Inputs */
  }
            <div className="card-clean rounded-xl p-5 bg-white space-y-4">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-[#E2E8F0] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#0D3B66]" />
                <span>1. Academic Program & Intake Capacity</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Discipline / Course Title
                  </label>
                  <input
    type="text"
    value={discipline}
    onChange={(e) => setDiscipline(e.target.value)}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-semibold text-[#0F172A]"
  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Discipline Category
                  </label>
                  <select
    value={disciplineCategory}
    onChange={(e) => setDisciplineCategory(e.target.value)}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-semibold text-[#0F172A]"
  >
                    <option value="engineering">Engineering & Technology (UG)</option>
                    <option value="management">Management Studies (PG/MBA)</option>
                    <option value="other">Polytechnic / Pharmacy / Applied Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Approved Annual Intake Seats
                  </label>
                  <input
    type="number"
    value={intakeCapacity}
    onChange={(e) => setIntakeCapacity(Number(e.target.value))}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-semibold text-[#0F172A]"
  />
                </div>
              </div>

              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pt-3 pb-2 border-b border-[#E2E8F0] flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#0D3B66]" />
                <span>2. Scheduled Commercial Bank & Term Deposit Receipt</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Issuing Scheduled Bank
                  </label>
                  <select
    value={bankName}
    onChange={(e) => setBankName(e.target.value)}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-semibold text-[#0F172A]"
  >
                    <option value="State Bank of India">State Bank of India (Public)</option>
                    <option value="Punjab National Bank">Punjab National Bank (Public)</option>
                    <option value="Canara Bank">Canara Bank (Public)</option>
                    <option value="Bank of Baroda">Bank of Baroda (Public)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Branch Name & Location
                  </label>
                  <input
    type="text"
    value={branchName}
    onChange={(e) => setBranchName(e.target.value)}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-semibold text-[#0F172A]"
  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Principal Face Value Amount (₹)
                  </label>
                  <input
    type="number"
    step={1e5}
    value={principalAmount}
    onChange={(e) => setPrincipalAmount(Number(e.target.value))}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-bold text-[#0F172A] font-mono"
  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Statutory Tenor (APH Mandated 8 Years)
                  </label>
                  <select
    value={termYears}
    onChange={(e) => setTermYears(Number(e.target.value))}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-semibold text-[#0F172A]"
  >
                    <option value={8}>8 Years (Mandatory Statutory Term)</option>
                    <option value={10}>10 Years (Extended Institution Choice)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    IFSC Code
                  </label>
                  <input
    type="text"
    value={ifsc}
    onChange={(e) => setIfsc(e.target.value)}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-mono font-bold text-[#0F172A]"
  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-semibold mb-1">
                    Custody & Transmission Mode
                  </label>
                  <select
    value={custodyMode}
    onChange={(e) => setCustodyMode(e.target.value)}
    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:bg-white text-xs font-semibold text-[#0F172A]"
  >
                    <option value="SFMS e-Lien Registered">SFMS e-Lien (Direct Core Bank API)</option>
                    <option value="Physical Custody @ AICTE HQ">Physical Custody (Treasury Locker)</option>
                  </select>
                </div>
              </div>
            </div>

            {
    /* Live Calculation Widget (from Wireframe 3) */
  }
            <div className="card-clean rounded-xl p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 border border-blue-200 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#0D3B66] uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Table 1.4 Statutory RPGF Quota Requirement
                </span>
                <p className="text-xs text-[#64748B]">
                  Regulatory Security Deposit for Engineering (General): ₹35.00 Lakhs
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#059669] font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Quota Fully Covered (100%)
                </span>
                <div className="text-xl font-bold font-mono text-[#0F172A] mt-0.5">
                  {FORMAT_INDIAN_CURRENCY(principalAmount)}
                </div>
              </div>
            </div>

            {
    /* Sticky/Bottom Navigation Controls */
  }
            <div className="pt-2 flex items-center justify-between">
              <button
    type="button"
    onClick={onCancel}
    className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 cursor-pointer"
  >
                Save Draft
              </button>

              <div className="flex items-center gap-2">
                <button
    type="submit"
    disabled={isSubmitting}
    className="px-6 py-2.5 bg-[#0D3B66] hover:bg-[#002546] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
  >
                  {isSubmitting ? <span>Dispatching SFMS Lien...</span> : <>
                      <span>Submit for Bank Verification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>}
                </button>
              </div>
            </div>
          </form>
        </div>

        {
    /* RIGHT SECTION (lg:col-span-5): Upload Dropzones & File Chips (from Wireframe 3) */
  }
        <div className="lg:col-span-5 space-y-4">
          
          {
    /* Dropzone 1: Scanned FDR Receipt */
  }
          <div className="card-clean rounded-xl p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Upload Scanned FDR Document
              </span>
              <span className="text-[10px] text-[#64748B]">PDF / TIFF up to 15MB</span>
            </div>

            {
    /* Drag & Drop Box */
  }
            <label className="border-2 border-dashed border-[#CBD5E1] hover:border-[#0D3B66] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#F8FAFC]">
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.png,.jpg" />
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0D3B66] flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0F172A]">
                Click or drag FDR certificate scan here
              </span>
              <span className="text-[11px] text-[#64748B] mt-0.5">
                Must clearly show joint lien clause and bank seal
              </span>
            </label>
          </div>

          {
    /* Uploaded Documents List with Progress Bars & Actions (from Wireframe 3) */
  }
          <div className="card-clean rounded-xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Attached Statutory Artifacts ({uploadedFiles.length})
              </span>
              <span className="text-[10px] text-[#059669] font-semibold">Ready for OCR</span>
            </div>

            <div className="space-y-2.5">
              {uploadedFiles.map((file) => <div
    key={file.id}
    className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] space-y-2"
  >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-7 h-7 rounded bg-blue-100 text-[#0D3B66] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="font-mono text-xs font-bold text-[#0F172A] block truncate">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-[#64748B]">{file.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
    type="button"
    onClick={() => alert(`Previewing ${file.name}`)}
    className="p-1 text-slate-500 hover:text-[#0D3B66] rounded cursor-pointer"
    title="Preview"
  >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
    type="button"
    onClick={() => handleDeleteFile(file.id)}
    className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
    title="Delete"
  >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {
    /* Progress Bar */
  }
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
    className={`h-1.5 rounded-full ${file.progress === 100 ? "bg-[#059669]" : "bg-[#0D3B66]"}`}
    style={{ width: `${file.progress}%` }}
  />
                  </div>
                </div>)}
            </div>
          </div>

        </div>

      </div>
    </div>;
};
