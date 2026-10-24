import { useState, useEffect } from "react";
import { 
  MapPin, 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  RefreshCw, 
  Layers,
  ChevronRight,
  Info
} from "lucide-react";
import { FORMAT_INDIAN_CURRENCY } from "../data/mockData";

export const GeospatialMapView = () => {
  const [regionalData, setRegionalData] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState("WRO");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/regional-map")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRegionalData(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-[#0D3B66] font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E65100]" />
          Rendering Geospatial AICTE Regional Compliance Topology...
        </div>
      </div>
    );
  }

  const activeRegion = regionalData.find(r => r.id === selectedRegionId) || regionalData[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0D3B66] text-white">
              <MapPin className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0F172A]">
                Geospatial Regional Compliance Map
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#0D3B66] border border-blue-200">
                National Pan-India Heatmap
              </span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time concentration of active FDR capital, regional compliance percentages, and default clusters across Regional Offices
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
          <span className="text-[#64748B]">Regional Jurisdictions:</span>
          <span className="font-bold text-[#0D3B66]">{regionalData.length} Bureaus</span>
        </div>
      </div>

      {/* Main 2-Column Grid: SVG Map Visualizer (Left) + Region Detail Breakdown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT (Col 7): Interactive Regional Map Representation */}
        <div className="lg:col-span-7 card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
            <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0D3B66]" />
              <span>Pan-India Regional Office Network</span>
            </h2>
            <span className="text-[10px] text-slate-500">Click a regional bureau to inspect</span>
          </div>

          {/* SVG Map of India Schematic Zones */}
          <div className="relative bg-slate-900 rounded-xl p-6 text-white min-h-[420px] flex flex-col justify-between overflow-hidden">
            {/* Background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            {/* Title overlay */}
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-widest">
                  AICTE REGIONAL TOPOLOGY
                </span>
                <div className="text-xs text-slate-300">
                  Total Liquid Capital Under Pledgement: <strong>₹1,897.40 Cr</strong>
                </div>
              </div>
              <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded border border-slate-700">
                SFMS CBS SYNCED
              </span>
            </div>

            {/* Regional Nodes Layout */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
              {regionalData.map((reg) => {
                const isSelected = selectedRegionId === reg.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegionId(reg.id)}
                    className={`p-3 rounded-lg text-left transition-all cursor-pointer border ${
                      isSelected 
                        ? "bg-[#0D3B66] border-amber-400 shadow-lg ring-2 ring-amber-400/30" 
                        : "bg-slate-800/90 border-slate-700 hover:bg-slate-700/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-black text-xs text-amber-300">{reg.id}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        reg.complianceRate >= 94 ? "bg-emerald-950 text-emerald-300" : "bg-amber-950 text-amber-300"
                      }`}>
                        {reg.complianceRate}%
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white truncate">{reg.city}</div>
                    <div className="text-[10px] text-slate-300 truncate font-mono mt-0.5">
                      {FORMAT_INDIAN_CURRENCY(reg.totalCapital)}
                    </div>

                    <div className="mt-2 text-[9px] text-slate-400 flex items-center justify-between">
                      <span>{reg.activeInstitutes} Inst.</span>
                      <span className={reg.delinquentCount > 0 ? "text-red-400 font-bold" : "text-slate-400"}>
                        {reg.delinquentCount} at risk
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>&gt; 94% Compliant</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>90-94% Standard</span>
                </span>
              </div>
              <span>Authority: AICTE Statistical Bureau</span>
            </div>
          </div>
        </div>

        {/* RIGHT (Col 5): Selected Regional Office Deep Dive */}
        <div className="lg:col-span-5 space-y-4">
          {activeRegion && (
            <div className="card-clean rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {activeRegion.name} ({activeRegion.id})
                  </h3>
                  <span className="text-xs text-[#64748B]">Headquarters: {activeRegion.city}</span>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-blue-50 text-[#0D3B66] border border-blue-200">
                  {activeRegion.complianceRate}% Rate
                </span>
              </div>

              <div className="space-y-4 pt-3 text-xs">
                {/* Jurisdictional coverage */}
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-bold mb-1">
                    Territorial Jurisdiction
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeRegion.states.map((st, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-medium">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Capital & Count Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-[#64748B] font-bold uppercase block">Pledged FDR Capital</span>
                    <span className="text-base font-black font-mono text-[#0D3B66]">
                      {FORMAT_INDIAN_CURRENCY(activeRegion.totalCapital)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-[#64748B] font-bold uppercase block">Registered Colleges</span>
                    <span className="text-base font-black font-mono text-[#0F172A]">
                      {activeRegion.activeInstitutes} PIDs
                    </span>
                  </div>
                </div>

                {/* Delinquent Cluster */}
                <div className="p-3 rounded-lg bg-red-50/70 border border-red-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-900 block">
                      Default &amp; Escalation Cluster
                    </span>
                    <p className="text-[11px] text-red-700 mt-0.5 leading-snug">
                      <strong>{activeRegion.delinquentCount} institutions</strong> currently overdue or un-renewed past T-0 deadline. Scheduled for statutory Show-Cause hearing.
                    </p>
                  </div>
                </div>

                {/* Regional Director Contact */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] space-y-1">
                  <span className="font-bold text-[#0F172A] block">Regional Director In-Charge:</span>
                  <div className="text-slate-700">{activeRegion.officer}</div>
                  <div className="text-slate-500 font-mono">{activeRegion.email}</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
