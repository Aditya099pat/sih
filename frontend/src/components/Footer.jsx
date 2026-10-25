import {
  Shield,
  ShieldCheck,
  Building2,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  Lock,
  FileText,
  Clock,
  CheckCircle2,
  Award,
  Globe2,
  Server
} from "lucide-react";
import { AicteLogo } from "./AicteLogo";

export const Footer = ({ onSelectTab }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#081B33] text-slate-300 font-sans border-t border-[#0F2D54] select-none mt-auto">
      {/* Top National Tricolor Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Main Government Portal Footer Body */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-slate-700/60">
          {/* Column 1: Council Identity & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-1.5 rounded-lg border border-white/15">
                <AicteLogo size={36} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-wide">
                  AICTE · अभातशिप
                </h3>
                <p className="text-[11px] text-amber-400 font-medium">
                  अखिल भारतीय तकनीकी शिक्षा परिषद
                </p>
                <p className="text-[10px] text-slate-400">
                  All India Council for Technical Education
                </p>
              </div>
            </div>

            <p className="text-[11.5px] text-slate-300 leading-relaxed">
              Statutory regulatory body established under the AICTE Act, 1987 (Act 52 of 1987), Department of Higher Education, Ministry of Education, Government of India.
            </p>

            <div className="space-y-2 text-[11.5px] text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Toll-Free Helpline: <strong className="text-white">1800-11-3355</strong> (09:30 - 17:30 IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:fdr-support@aicte-india.org" className="hover:text-white transition">
                  fdr-support@aicte-india.org
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Regulatory Directives & Handbook */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-700/60 pb-2">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Statutory Directives</span>
            </h4>
            <ul className="space-y-2 text-[11.5px]">
              <li>
                <a
                  href="#aph"
                  onClick={(e) => { e.preventDefault(); onSelectTab && onSelectTab("calculator"); }}
                  className="text-slate-300 hover:text-amber-300 transition flex items-center justify-between"
                >
                  <span>Approval Process Handbook (APH 2025-26)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="#table14"
                  onClick={(e) => { e.preventDefault(); onSelectTab && onSelectTab("calculator"); }}
                  className="text-slate-300 hover:text-amber-300 transition flex items-center justify-between"
                >
                  <span>Table 1.4 Security Deposit Norms</span>
                  <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">Mandatory</span>
                </a>
              </li>
              <li>
                <a
                  href="#affidavit"
                  onClick={(e) => { e.preventDefault(); onSelectTab && onSelectTab("dossiers"); }}
                  className="text-slate-300 hover:text-amber-300 transition flex items-center justify-between"
                >
                  <span>Format Affidavit-6 (Tripartite Joint Lien)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="#release"
                  onClick={(e) => { e.preventDefault(); onSelectTab && onSelectTab("dashboard"); }}
                  className="text-slate-300 hover:text-amber-300 transition flex items-center justify-between"
                >
                  <span>Phase-5 Deposit Release Procedure</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="#rpgf"
                  onClick={(e) => { e.preventDefault(); onSelectTab && onSelectTab("rpgf"); }}
                  className="text-slate-300 hover:text-amber-300 transition flex items-center justify-between"
                >
                  <span>Reserve Price Guarantee Fund (RPGF) Rules</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="#scholarships"
                  onClick={(e) => { e.preventDefault(); onSelectTab && onSelectTab("scholarships"); }}
                  className="text-slate-300 hover:text-amber-300 transition flex items-center justify-between"
                >
                  <span>PRAGATI &amp; SAKSHAM Yield Reinvestment</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: AICTE 8 Regional Bureaus */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-700/60 pb-2">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Regional Jurisdictions</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>WRO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Mumbai</span>
                </div>
                <div className="text-[10px] text-slate-400">MH, Goa, Gujarat</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>NRO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Kanpur</span>
                </div>
                <div className="text-[10px] text-slate-400">UP, Uttarakhand</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>SRO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Chennai</span>
                </div>
                <div className="text-[10px] text-slate-400">TN, Puducherry</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>SWRO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Bengaluru</span>
                </div>
                <div className="text-[10px] text-slate-400">KA, Kerala</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>CRO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Bhopal</span>
                </div>
                <div className="text-[10px] text-slate-400">MP, Chhattisgarh</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>ERO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Kolkata</span>
                </div>
                <div className="text-[10px] text-slate-400">WB, Bihar, Odisha, NE</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>NWRO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Chandigarh</span>
                </div>
                <div className="text-[10px] text-slate-400">PB, HR, HP, J&amp;K, DL</div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 hover:border-white/15 transition">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>SCRO</span>
                  <span className="text-[9px] text-emerald-400 font-mono">Hyderabad</span>
                </div>
                <div className="text-[10px] text-slate-400">TS, Andhra Pradesh</div>
              </div>
            </div>
          </div>

          {/* Column 4: Cryptographic & Core Banking Standards */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-700/60 pb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gateway Security &amp; Audit</span>
            </h4>
            <div className="space-y-2.5 text-[11px]">
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded p-2.5 flex items-start gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-300 text-[11px]">
                    SHA-256 Chained Audit Trail
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Immutable genesis-to-head ledger ensuring 100% CVC inspection compliance.
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/40 border border-blue-500/30 rounded p-2.5 flex items-start gap-2">
                <Server className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-300 text-[11px]">
                    RBI-SFMS INFINET Protocol
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Straight-through MT760/MT799 telemetry with 8 Scheduled Commercial Banks.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Gateway Status: <strong>Fully Operational (100% Uptime)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* National Initiatives & Compliance Badges */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400 border-b border-slate-700/60">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Globe2 className="w-4 h-4 text-amber-400" />
              <span>Digital India Initiative</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>National Cyber Security Certified</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Smart India Hackathon (SIH)</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>NeSL e-Stamping Integrated</span>
            </span>
          </div>

          <div className="text-[10.5px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            National Repository: <strong className="text-white">1,350 Active Instruments</strong> · ₹331.40 Cr
          </div>
        </div>

        {/* Bottom Legal, Copyright & Portal Metadata Strip */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <div>
              Copyright &copy; {currentYear} <strong>All India Council for Technical Education (AICTE)</strong>. All Rights Reserved.
            </div>
            <div className="text-[10px] text-slate-500">
              Designed &amp; Developed for AICTE Regulation Bureau · Content Managed by Regulation Bureau &amp; Core Banking Gateway
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[10.5px]">
            <a href="#terms" className="hover:text-amber-300 transition">Terms of Use</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-amber-300 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#disclaimer" className="hover:text-amber-300 transition">Disclaimer</a>
            <span>•</span>
            <a href="#accessibility" className="hover:text-amber-300 transition">Accessibility Statement</a>
            <span>•</span>
            <span className="font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">v2.8.4-PROD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
