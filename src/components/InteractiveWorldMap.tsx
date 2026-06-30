import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, Ship, Clock, AlertCircle, Anchor, MapPin, 
  ArrowRight, ShieldCheck, CheckSquare, Layers, HelpCircle, Flame
} from "lucide-react";

interface PortDetails {
  country: string;
  code: string;
  name: string;
  seaports: string[];
  transitTime: string;
  frequency: string;
  cargoTypes: string[];
  complianceRequirements: string[];
  customsAgent: string;
  marketShare: string;
  coordinates: { x: number; y: number };
}

const REGION_LOGISTICS: Record<string, PortDetails> = {
  GB: {
    country: "United Kingdom",
    code: "GB",
    name: "UK Sourcing Corridor",
    seaports: ["Port of Felixstowe", "London Gateway", "Port of Southampton"],
    transitTime: "24 - 28 Days",
    frequency: "Fortnightly Direct Sailings",
    cargoTypes: ["Sugarcane Bagasse Plates", "PLA Biopolymers", "Custom Embossed OEM Catering Ware"],
    complianceRequirements: [
      "Phytosanitary treatment verification",
      "CE / UKCA packaging standards compliance",
      "Plywood pallet fumigation credentials (ISPM 15)"
    ],
    customsAgent: "Vanguard Maritime UK Ltd",
    marketShare: "32% Sourcing Volume",
    coordinates: { x: 475, y: 135 }
  },
  SG: {
    country: "Singapore",
    code: "SG",
    name: "Singapore Straits Logistics Hub",
    seaports: ["PSA Singapore (Tuas Terminal)", "Keppel Port"],
    transitTime: "5 - 7 Days",
    frequency: "Weekly Express Container Lines",
    cargoTypes: ["FMCG Consolidation", "Hotel Amenities", "Biodegradable Food Cartons"],
    complianceRequirements: [
      "Singapore Food Agency (SFA) custom declarations",
      "Multi-SKU dry food consolidation permits",
      "Rapid Port Authorities clearance certificate"
    ],
    customsAgent: "Straits Cargo Services Singapore",
    marketShare: "24% Sourcing Volume",
    coordinates: { x: 705, y: 310 }
  },
  NZ: {
    country: "New Zealand",
    code: "NZ",
    name: "Oceania Eco-Packaging Route",
    seaports: ["Port of Auckland", "Port of Lyttelton"],
    transitTime: "22 - 25 Days",
    frequency: "Bi-weekly Freight Vesels",
    cargoTypes: ["Corn Starch Cutlery", "Heavy Duty Paper Bowls", "Bulk Agro Spices"],
    complianceRequirements: [
      "MPI Biosecurity inspection protocols",
      "Plastic reduction act conformity auditing",
      "Full organic origin declarations"
    ],
    customsAgent: "Pacific Freight Solutions NZ",
    marketShare: "15% Sourcing Volume",
    coordinates: { x: 840, y: 420 }
  },
  CA: {
    country: "Canada",
    code: "CA",
    name: "North American Atlantic Corridor",
    seaports: ["Port of Montreal", "Port of Vancouver", "Port of Halifax"],
    transitTime: "28 - 34 Days",
    frequency: "Monthly Combined Container Lines",
    cargoTypes: ["Long-grain Basmati Rice", "Polished Granite Slabs", "Agricultural Seed Crops"],
    complianceRequirements: [
      "Canadian Food Inspection Agency (CFIA) clearance",
      "Heavy load crate securement logs",
      "Pesticide-free fumigation certificates"
    ],
    customsAgent: "Maple Leaf Brokerage Services Inc.",
    marketShare: "29% Sourcing Volume",
    coordinates: { x: 260, y: 145 }
  }
};

// Additional corridors that appear as minor markers
const MINOR_CORRIDORS = [
  { country: "United States", code: "US", coordinates: { x: 210, y: 180 }, desc: "FMCG Sourcing & Custom Packaging" },
  { country: "United Arab Emirates", code: "AE", coordinates: { x: 590, y: 220 }, desc: "Agro Seeds & Paper Products" },
  { country: "Australia", code: "AU", coordinates: { x: 790, y: 360 }, desc: "Eco Tableware Sourcing" }
];

export default function InteractiveWorldMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("GB");
  const [isPulseActive, setIsPulseActive] = useState(true);

  // Auto-pulse background indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setIsPulseActive(prev => !prev);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const originCoords = { x: 650, y: 245 }; // Chennai, India coordinates

  const currentRegion = hoveredRegion ? REGION_LOGISTICS[hoveredRegion] : REGION_LOGISTICS[selectedRegion];

  // Helper function to create clean curved paths for shipping lanes
  const calculateCurve = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    // Push the control point upwards slightly to create an arc
    const midY = (start.y + end.y) / 2 - Math.abs(start.x - end.x) * 0.15;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <section id="shipping-lanes" className="py-20 bg-slate-900 text-white border-t border-b border-emerald-950 relative overflow-hidden text-left font-sans">
      {/* Dynamic dark radar scan background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_49%,_rgba(16,185,129,0.06)_0%,_transparent_60%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-green/20">
            <Globe className="w-3.5 h-3.5 text-brand-green-light" />
            <span>Interactive Maritime Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Our Global Trade Lanes Network
          </h2>
          <p className="mt-3 text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Direct maritime corridors connecting the major export hub of Chennai, India to critical seaports worldwide. Hover over highlighted regions or click to explore compliance parameters.
          </p>
        </div>

        {/* Map Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SVG Map (Main Column) */}
          <div className="lg:col-span-8 bg-slate-950/80 border border-emerald-900/30 rounded-2xl p-4 sm:p-6 shadow-2xl relative flex flex-col justify-between">
            
            {/* Top Indicator */}
            <div className="flex items-center justify-between gap-4 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping"></span>
                <span className="font-bold text-gray-300">Live Global Ports Active</span>
              </div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest bg-emerald-950/30 px-2.5 py-1 rounded-md border border-emerald-900/20">
                Hub Port: Chennai (INMAA)
              </div>
            </div>

            {/* Interactive World Map SVG */}
            <div className="relative w-full aspect-[2/1] bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-inner">
              
              {/* Grid backdrop */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {/* Simplified stylized outline of continents represented as clean dots or low-opacity polygons */}
              <svg 
                viewBox="0 0 1000 500" 
                className="w-full h-full text-emerald-500/10 fill-current select-none"
              >
                {/* Americas stylized dots block */}
                <g className="opacity-15">
                  <rect x="180" y="80" width="160" height="150" rx="40" />
                  <rect x="220" y="220" width="110" height="200" rx="30" />
                </g>
                
                {/* Europe & Africa stylized block */}
                <g className="opacity-15">
                  <rect x="440" y="80" width="140" height="120" rx="30" />
                  <rect x="460" y="190" width="130" height="210" rx="40" />
                </g>

                {/* Asia stylized block */}
                <g className="opacity-15">
                  <rect x="580" y="60" width="280" height="200" rx="50" />
                  <rect x="660" y="240" width="90" height="90" rx="20" />
                </g>

                {/* Australia & NZ stylized block */}
                <g className="opacity-15">
                  <rect x="740" y="320" width="120" height="100" rx="30" />
                  <rect x="830" y="390" width="40" height="60" rx="15" />
                </g>

                {/* Shipping route lines (glowing curves) */}
                {Object.keys(REGION_LOGISTICS).map((regionCode) => {
                  const reg = REGION_LOGISTICS[regionCode];
                  const isHighlighted = hoveredRegion === regionCode || selectedRegion === regionCode;
                  
                  return (
                    <g key={regionCode}>
                      {/* Interactive Route Path */}
                      <path
                        d={calculateCurve(originCoords, reg.coordinates)}
                        fill="none"
                        stroke={isHighlighted ? "#10b981" : "#065f46"}
                        strokeWidth={isHighlighted ? 2.5 : 1.2}
                        strokeDasharray={isHighlighted ? "4 4" : "none"}
                        className={`transition-all duration-300 ${isHighlighted ? "stroke-emerald-400" : "opacity-40"}`}
                        style={{
                          strokeDashoffset: isHighlighted ? -50 : 0,
                          animation: isHighlighted ? "dash 8s linear infinite" : "none"
                        }}
                      />

                      {/* Moving cargo point along path */}
                      {isHighlighted && (
                        <circle r="4" fill="#34d399" className="shadow-xs">
                          <animateMotion
                            dur="6s"
                            repeatCount="indefinite"
                            path={calculateCurve(originCoords, reg.coordinates)}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Minor corridor path indicator */}
                {MINOR_CORRIDORS.map(m => (
                  <path
                    key={m.code}
                    d={calculateCurve(originCoords, m.coordinates)}
                    fill="none"
                    stroke="#022c22"
                    strokeWidth={0.8}
                    className="opacity-20"
                  />
                ))}

                {/* CHENNAI HUB (ORIGIN NODE) */}
                <g transform={`translate(${originCoords.x}, ${originCoords.y})`}>
                  <circle r="12" className="fill-brand-green/20 stroke-brand-green/40 stroke-2 animate-ping" />
                  <circle r="6" className="fill-brand-green stroke-white stroke-2 shadow-md cursor-pointer" />
                  <text y="-14" className="fill-white font-black text-[9px] tracking-widest text-center" textAnchor="middle">
                    CHENNAI (ORIGIN)
                  </text>
                </g>

                {/* MINOR PORT NODES */}
                {MINOR_CORRIDORS.map((minor) => {
                  return (
                    <g 
                      key={minor.code} 
                      transform={`translate(${minor.coordinates.x}, ${minor.coordinates.y})`}
                      className="group cursor-help"
                    >
                      <circle r="3" className="fill-slate-600 stroke-slate-500 hover:fill-slate-400 transition-colors" />
                      <text y="12" className="fill-gray-500 font-bold text-[8px]" textAnchor="middle">
                        {minor.country}
                      </text>
                    </g>
                  );
                })}

                {/* MAJOR PORT NODES (INTERACTIVE) */}
                {Object.keys(REGION_LOGISTICS).map((regionCode) => {
                  const reg = REGION_LOGISTICS[regionCode];
                  const isHovered = hoveredRegion === regionCode;
                  const isSelected = selectedRegion === regionCode;
                  const isHighlighted = isHovered || isSelected;

                  return (
                    <g 
                      key={regionCode}
                      transform={`translate(${reg.coordinates.x}, ${reg.coordinates.y})`}
                      onClick={() => {
                        setSelectedRegion(regionCode);
                        setHoveredRegion(null);
                      }}
                      onMouseEnter={() => setHoveredRegion(regionCode)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      className="cursor-pointer"
                    >
                      <circle 
                        r={isHighlighted ? 14 : 9} 
                        className={`transition-all fill-brand-green/10 stroke-brand-green-light/40 stroke-[1.5px] ${
                          isHighlighted ? "animate-pulse" : ""
                        }`} 
                      />
                      <circle 
                        r={isHighlighted ? 6 : 4} 
                        className={`transition-all duration-300 ${
                          isHighlighted 
                            ? "fill-brand-green-light stroke-white stroke-2 scale-110" 
                            : "fill-brand-green stroke-slate-900 stroke"
                        }`} 
                      />
                      
                      {/* Name tag on map */}
                      <text 
                        y="-12" 
                        className={`font-black text-[8px] sm:text-[9px] tracking-wider transition-all duration-150 ${
                          isHighlighted ? "fill-brand-green-light scale-105" : "fill-gray-400"
                        }`}
                        textAnchor="middle"
                      >
                        {reg.country.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Styled Key Legend inside the Map */}
              <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-900 rounded-lg p-2.5 space-y-1.5 backdrop-blur-md">
                <span className="text-[8px] uppercase tracking-wider font-bold text-gray-400 block">Sourcing Legend</span>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green inline-block"></span>
                  <span>Origin (Chennai, IN)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green-light inline-block"></span>
                  <span>Primary Trade Lane</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-slate-600 inline-block"></span>
                  <span>Additional Corridor</span>
                </div>
              </div>
            </div>

            {/* Quick Map helper footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 border-t border-slate-900 pt-4">
              <span>Interactive Nodes: Click on a country's port to freeze display</span>
              <div className="flex gap-2">
                {Object.keys(REGION_LOGISTICS).map(code => (
                  <button
                    key={code}
                    onClick={() => setSelectedRegion(code)}
                    className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider cursor-pointer ${
                      selectedRegion === code 
                        ? "bg-brand-green text-white" 
                        : "bg-slate-900 text-gray-400 hover:text-white"
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logistics parameters Panel (Sidebar Column) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="bg-slate-950 border border-emerald-950 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              
              {/* Header card info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-green font-black block uppercase">
                      Port Parameters
                    </span>
                    <h3 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                      {currentRegion.name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-emerald-950/30 border border-brand-green/20 rounded-xl flex items-center justify-center text-brand-green font-black text-lg">
                    {currentRegion.code}
                  </div>
                </div>

                {/* Major parameters list */}
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <Anchor className="w-4.5 h-4.5 text-brand-green flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Consolidated Seaports</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentRegion.seaports.map((port, idx) => (
                          <span key={idx} className="bg-slate-900 border border-slate-800 text-[10px] font-bold text-gray-200 px-2 py-0.5 rounded-md">
                            {port}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-900/50 border border-slate-900 p-3 rounded-xl">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-green" />
                        <span className="text-[9px] text-gray-400 uppercase font-bold">Transit S.L.A.</span>
                      </div>
                      <span className="text-xs font-bold text-white block mt-0.5">{currentRegion.transitTime}</span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] text-gray-400 uppercase font-bold block">Vessel Frequency</span>
                      <span className="text-xs font-bold text-brand-green block mt-0.5">{currentRegion.frequency}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">High-Volume Cargo Classes Sourced</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentRegion.cargoTypes.map((cargo, idx) => (
                        <span key={idx} className="bg-emerald-950/30 border border-emerald-900/40 text-[9px] font-bold text-emerald-300 px-2.5 py-1 rounded-md">
                          {cargo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance checklist card */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Import Clearance & Regulatory Guidelines</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">Full support provided for following statutory parameters:</p>
                </div>

                <ul className="space-y-2 text-xs text-gray-300">
                  {currentRegion.complianceRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{req}</span>
                    </li>
                  ))}
                </ul>

                {/* Local broker partner agency details */}
                <div className="bg-slate-900/40 border border-slate-900 p-3 rounded-xl flex items-center justify-between text-[11px] font-medium text-gray-400">
                  <span>Customs Clearance Desk:</span>
                  <span className="text-white font-bold">{currentRegion.customsAgent}</span>
                </div>
              </div>

              {/* Action RFQ prompt button */}
              <div className="pt-4 border-t border-slate-900 mt-4">
                <button
                  onClick={() => {
                    const element = document.getElementById("quote-assistant");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }
                  }}
                  className="w-full bg-brand-green hover:bg-brand-green-light text-white text-xs font-black uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/30"
                >
                  <span>Request RFQ for {currentRegion.country}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Global Trade stats panel */}
        <div className="mt-12 bg-slate-950/50 border border-emerald-950/40 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl font-black text-brand-green block">99.8%</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Customs Audit Acceptance Rate</span>
          </div>
          <div className="w-full h-px sm:w-px sm:h-10 bg-slate-900 mx-auto"></div>
          <div className="space-y-1">
            <span className="text-2xl font-black text-brand-green block">6-Day Minimum</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Rapid Asian Hub Sourcing Speed</span>
          </div>
          <div className="w-full h-px sm:w-px sm:h-10 bg-slate-900 mx-auto"></div>
          <div className="space-y-1">
            <span className="text-2xl font-black text-brand-green block">ISPM-15 Certified</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Fumigated Seaworthy Pallet Compliance</span>
          </div>
        </div>

      </div>

      {/* Embedded CSS for SVG line dash animation */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>
    </section>
  );
}
