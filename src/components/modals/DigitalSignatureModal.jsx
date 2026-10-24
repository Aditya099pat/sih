import { useState } from "react";
import { X, Key, ShieldCheck, CheckCircle2, RefreshCw, FileText, Smartphone, Lock } from "lucide-react";

export const DigitalSignatureModal = ({ isOpen, onClose, onSigned }) => {
  const [method, setMethod] = useState("aadhaar"); // "aadhaar" | "dsc"
  const [aadhaarNumber, setAadhaarNumber] = useState("XXXX-XXXX-8921");
  const [otp, setOtp] = useState("");
  const [dscPin, setDscPin] = useState("");
  const [selectedDoc, setSelectedDoc] = useState("Affidavit Format-6 (Joint FDR Declaration)");
  const [step, setStep] = useState("input"); // "input" | "processing" | "completed"
  const [signCertificate, setSignCertificate] = useState(null);

  if (!isOpen) return null;

  const handleSign = () => {
    setStep("processing");
    setTimeout(() => {
      const cert = {
        signer: "Dr. Rajesh K. Sharma (Registrar)",
        organization: "Bharati Vidya Sansthan",
        authority: method === "aadhaar" ? "UIDAI Aadhaar e-Sign Service (ESP: NSDL)" : "e-Mudhra Class-3 Individual CA",
        timestamp: new Date().toLocaleString("en-IN") + " IST",
        sha256Digest: "0x8f" + Math.random().toString(16).substring(2, 14) + "c920",
        document: selectedDoc
      };
      setSignCertificate(cert);
      setStep("completed");
      if (onSigned) onSigned(cert);
    }, 1500);
  };

  const handleReset = () => {
    setStep("input");
    setOtp("");
    setDscPin("");
    setSignCertificate(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0D3B66] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">DigiLocker &amp; Aadhaar e-Sign / Class-3 DSC</h2>
              <p className="text-[11px] text-blue-200">Legal Digital Counter-Signature • IT Act 2000 §3A</p>
            </div>
          </div>
          <button onClick={handleReset} className="p-1 hover:bg-white/10 rounded text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "input" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">
                  Select Target Statutory Document
                </label>
                <select
                  value={selectedDoc}
                  onChange={(e) => setSelectedDoc(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-medium text-[#0F172A]"
                >
                  <option value="Affidavit Format-6 (Joint FDR Declaration)">Affidavit Format-6 (Joint FDR Encumbrance-Free Declaration)</option>
                  <option value="Bank Certificate Format-3">Bank Certificate Format-3 (Joint Lien Confirmation)</option>
                  <option value="Phase 5 Final Discharge Application">Phase 5 Statutory Discharge &amp; Refund Requisition</option>
                </select>
              </div>

              {/* Method Switcher */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                  Select Digital Signature Protocol
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod("aadhaar")}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      method === "aadhaar" 
                        ? "bg-blue-50/70 border-[#0D3B66] text-[#0D3B66] font-bold ring-1 ring-[#0D3B66]" 
                        : "bg-white border-[#E2E8F0] text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Smartphone className="w-4 h-4 text-[#E65100]" />
                      <span className="text-xs">Aadhaar e-Sign</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-normal block">UIDAI OTP Authentication</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("dsc")}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      method === "dsc" 
                        ? "bg-blue-50/70 border-[#0D3B66] text-[#0D3B66] font-bold ring-1 ring-[#0D3B66]" 
                        : "bg-white border-[#E2E8F0] text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Lock className="w-4 h-4 text-[#0D3B66]" />
                      <span className="text-xs">Class-3 DSC Token</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-normal block">ePass2003 / USB Token</span>
                  </button>
                </div>
              </div>

              {method === "aadhaar" ? (
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#64748B]">Registrar Aadhaar Reference:</span>
                    <span className="font-mono font-bold text-slate-800">{aadhaarNumber}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">
                      Enter 6-Digit OTP received on registered mobile
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 582910"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs font-mono font-bold text-center tracking-widest text-[#0F172A]"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Simulated demo: enter any 6 digits</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#64748B]">Detected USB Crypto Token:</span>
                    <span className="font-bold text-[#059669]">ePass2003 (Dr. Rajesh Sharma)</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">
                      Enter Token User PIN
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={dscPin}
                      onChange={(e) => setDscPin(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs font-mono text-center text-[#0F172A]"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSign}
                  className="w-full py-2.5 bg-[#0D3B66] hover:bg-[#092c4d] text-white font-bold rounded-lg transition cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Affix Legal Digital Signature</span>
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#0D3B66] mx-auto" />
              <div className="text-xs font-bold text-[#0F172A]">
                Contacting Certifying Authority (CCA / UIDAI)...
              </div>
              <p className="text-[11px] text-[#64748B]">
                Computing document hash and binding cryptographic certificate timestamp
              </p>
            </div>
          )}

          {step === "completed" && signCertificate && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-emerald-900">
                  Document Digitally Signed &amp; Counter-Stamped
                </h3>
                <p className="text-[11px] text-emerald-700">
                  Legally valid and admissible under Section 3A of the Information Technology Act, 2000.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Signatory Name:</span>
                  <span className="font-bold text-[#0F172A]">{signCertificate.signer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Certifying Authority:</span>
                  <span className="font-semibold text-slate-800">{signCertificate.authority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Timestamp:</span>
                  <span className="font-mono text-slate-800">{signCertificate.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">SHA-256 Digest:</span>
                  <span className="font-mono text-emerald-700 font-bold">{signCertificate.sha256Digest}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2 bg-[#0D3B66] hover:bg-[#092c4d] text-white font-bold rounded-lg transition cursor-pointer"
              >
                Close &amp; Attach to Dossier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
