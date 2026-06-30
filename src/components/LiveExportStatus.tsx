import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Ship, Anchor, Navigation, Compass, MapPin, Activity, 
  PackageCheck, CheckCircle2, RefreshCw, Layers, Sparkles, ArrowRight
} from "lucide-react";

interface Shipment {
  id: string;
  trackingId: string;
  product: string;
  category: string;
  origin: {
    port: string;
    portCode: string;
    city: string;
  };
  destination: {
    port: string;
    portCode: string;
    city: string;
    country: string;
  };
  vessel: string;
  volume: string;
  status: "packing" | "transit" | "customs" | "delivered";
  statusText: string;
  progress: number; // 0 to 100
  departureDate: string;
  arrivalDate: string;
  milestones: string[];
}

const LIVE_SHIPMENTS: Shipment[] = [
  {
    id: "ship_1",
    trackingId: "YX-8802",
    product: "Sugarcane Bagasse 9-inch Clamshells & Dinner Plates",
    category: "Eco Dining Ware",
    origin: {
      port: "Chennai Sea Port",
      portCode: "INMAA",
      city: "Chennai, India"
    },
    destination: {
      port: "Port of Felixstowe",
      portCode: "GBFXT",
      city: "Felixstowe",
      country: "United Kingdom"
    },
    vessel: "MSC VALERIA (Vessel Voyage 264A)",
    volume: "2 x 40ft High-Cube Containers",
    status: "transit",
    statusText: "Vessel in Ocean Transit",
    progress: 72,
    departureDate: "2026-06-12",
    arrivalDate: "2026-07-08",
    milestones: ["Factory Sealed", "Port Terminal Cleared", "Ocean Vessel Boarded", "Suez Transit Completed"]
  },
  {
    id: "ship_2",
    trackingId: "YX-8815",
    product: "Traditional Grains & Premium Spice Board Certified Spices",
    category: "FMCG & Groceries",
    origin: {
      port: "Chennai Sea Port",
      portCode: "INMAA",
      city: "Chennai, India"
    },
    destination: {
      port: "Port of Vancouver",
      portCode: "CAVAN",
      city: "Vancouver",
      country: "Canada"
    },
    vessel: "MAERSK MC-KINNEY MOLLER",
    volume: "1 x 20ft Full Container Load (FCL)",
    status: "delivered",
    statusText: "Successfully Cleared & Discharged",
    progress: 100,
    departureDate: "2026-05-25",
    arrivalDate: "2026-06-28",
    milestones: ["Cargo Discharged", "FDA Import Checked", "Customs Bond Released", "Arrived at Warehouse"]
  },
  {
    id: "ship_3",
    trackingId: "YX-8824",
    product: "Polished Emerald Green & Imperial Red Granite Slabs",
    category: "Natural Stones",
    origin: {
      port: "Chennai Sea Port",
      portCode: "INMAA",
      city: "Chennai, India"
    },
    destination: {
      port: "Port of Singapore",
      portCode: "SGSIN",
      city: "Tuas",
      country: "Singapore"
    },
    vessel: "CMA CGM ANTOINE DE SAINT EXUPERY",
    volume: "3 x 20ft Heavy-Duty Timber Crates",
    status: "customs",
    statusText: "Destination Port Customs Clearance",
    progress: 92,
    departureDate: "2026-06-22",
    arrivalDate: "2026-06-28",
    milestones: ["Vessel Berthed", "Container Unloaded", "SGS Quarantine Hold", "Customs Filing Audited"]
  },
  {
    id: "ship_4",
    trackingId: "YX-8831",
    product: "PLA Corn-Starch Heavy Cutlery & Hot Coffee Containers",
    category: "Custom Printed Containers",
    origin: {
      port: "Chennai Sea Port",
      portCode: "INMAA",
      city: "Chennai, India"
    },
    destination: {
      port: "Port of Auckland",
      portCode: "NZAKL",
      city: "Auckland",
      country: "New Zealand"
    },
    vessel: "OOCL SCANDINAVIA (Vessel Voyage 102N)",
    volume: "1 x 40ft General Purpose Container",
    status: "packing",
    statusText: "Seaworthy Packing & Fumigation",
    progress: 12,
    departureDate: "2026-06-29",
    arrivalDate: "2026-07-22",
    milestones: ["Inventory Checked", "Timber Pallets Fumigated", "PHYTO Certificate Generated", "Moving to Port Terminal"]
  }
];

export default function LiveExportStatus() {
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");
  const [lastSynced, setLastSynced] = useState<string>("Just now");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refresh simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLastSynced(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 120000); // refresh time text every 2 mins

    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastSynced(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
  };

  const filteredShipments = LIVE_SHIPMENTS.filter(ship => {
    if (filter === "all") return true;
    if (filter === "active") return ship.status !== "delivered";
    if (filter === "delivered") return ship.status === "delivered";
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "packing":
        return "bg-amber-50 text-amber-800 border-amber-200/50";
      case "transit":
        return "bg-cyan-50 text-cyan-800 border-cyan-200/50";
      case "customs":
        return "bg-indigo-50 text-indigo-800 border-indigo-200/50";
      case "delivered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200/50";
      default:
        return "bg-slate-50 text-slate-800 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "packing":
        return <Layers className="w-4 h-4 animate-pulse" />;
      case "transit":
        return <Ship className="w-4 h-4 animate-bounce" style={{ animationDuration: "3s" }} />;
      case "customs":
        return <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} />;
      case "delivered":
        return <PackageCheck className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-gray-200/50 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-light/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-brand-green-light/20">
            <Activity className="w-3.5 h-3.5 animate-pulse text-brand-green" />
            <span>Maritime Sourcing Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-dark tracking-tight">
            Live Global Export Corridor
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Real-time visual monitoring of active cargo vessels carrying Yalini Exim consignments from Chennai, India to international destination ports worldwide.
          </p>
        </div>

        {/* Live Controls and Status Bar */}
        <div className="bg-slate-50 border border-gray-150 rounded-2xl p-4 sm:p-6 mb-10 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Sourcing State Indicators */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute"></span>
              <span className="text-brand-dark pl-2">4 Freight Corridors Online</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
            <div className="text-gray-400">
              Last Synced: <span className="text-brand-dark font-semibold">{lastSynced}</span>
            </div>
          </div>

          {/* Filtering buttons */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 shadow-3xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-brand-green text-white"
                  : "text-gray-500 hover:text-brand-dark"
              }`}
            >
              All Freight
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === "active"
                  ? "bg-brand-green text-white"
                  : "text-gray-500 hover:text-brand-dark"
              }`}
            >
              Active Transit
            </button>
            <button
              onClick={() => setFilter("delivered")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === "delivered"
                  ? "bg-brand-green text-white"
                  : "text-gray-500 hover:text-brand-dark"
              }`}
            >
              Discharged
            </button>
          </div>

          {/* Manual sync reload */}
          <div>
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-green bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-200/50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync Port Authority"}</span>
            </button>
          </div>
        </div>

        {/* Shipments Grid */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredShipments.map((ship) => (
                <motion.div
                  key={ship.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200/80 rounded-2xl shadow-2xs hover:shadow-md transition-shadow p-5 sm:p-6 text-left flex flex-col justify-between space-y-5 relative"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold block uppercase">
                        Consignment #{ship.trackingId}
                      </span>
                      <h3 className="text-sm font-bold text-brand-dark leading-snug line-clamp-2">
                        {ship.product}
                      </h3>
                    </div>

                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(ship.status)}`}>
                      {getStatusIcon(ship.status)}
                      <span>{ship.statusText}</span>
                    </span>
                  </div>

                  {/* Ports Line visualization */}
                  <div className="bg-slate-50/50 border border-gray-150/70 p-4 rounded-xl space-y-4">
                    <div className="flex items-center justify-between gap-4 text-xs font-semibold">
                      {/* Port of Origin */}
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-bold text-gray-400 block">Origin Port</span>
                        <span className="text-brand-dark block">{ship.origin.portCode}</span>
                        <span className="text-[10px] text-gray-500 font-normal block">{ship.origin.city}</span>
                      </div>

                      {/* Progress ship line */}
                      <div className="flex-grow relative px-2 flex items-center justify-center">
                        <div className="w-full h-1 bg-gray-200 rounded-full absolute"></div>
                        <div 
                          className="h-1 bg-brand-green rounded-full absolute left-0"
                          style={{ width: `${ship.progress}%` }}
                        ></div>
                        {/* Shifting boat marker */}
                        <div 
                          className="absolute bg-white border border-brand-green text-brand-green p-1 rounded-full shadow-xs"
                          style={{ left: `calc(${ship.progress}% - 12px)` }}
                        >
                          <Ship className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                      </div>

                      {/* Destination Port */}
                      <div className="space-y-0.5 text-right">
                        <span className="text-[9px] uppercase font-bold text-gray-400 block">Destination</span>
                        <span className="text-brand-dark block">{ship.destination.portCode}</span>
                        <span className="text-[10px] text-gray-500 font-normal block">{ship.destination.country}</span>
                      </div>
                    </div>

                    {/* Estimated Dates */}
                    <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-200/50 pt-2 font-semibold">
                      <span>Shipped: <strong className="text-gray-600">{new Date(ship.departureDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</strong></span>
                      <span>ETA Port: <strong className="text-brand-green">{new Date(ship.arrivalDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</strong></span>
                    </div>
                  </div>

                  {/* Vessel voyage details */}
                  <div className="text-xs space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-brand-green flex-shrink-0" />
                      <div>
                        <span className="text-[9px] text-gray-400 block uppercase font-bold">Ocean Carrier Line</span>
                        <span className="font-semibold text-brand-dark">{ship.vessel}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-brand-green flex-shrink-0" />
                      <div>
                        <span className="text-[9px] text-gray-400 block uppercase font-bold">Cargo Volumetrics</span>
                        <span className="font-semibold text-brand-dark">{ship.volume}</span>
                      </div>
                    </div>
                  </div>

                  {/* Milestones stepper */}
                  <div className="pt-3 border-t border-gray-150">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block mb-2 tracking-wide">Transit Clearance Milestones</span>
                    <div className="flex gap-1">
                      {ship.milestones.map((m, idx) => {
                        const isCompleted = idx < Math.ceil((ship.progress / 100) * ship.milestones.length);
                        return (
                          <div key={idx} className="flex-1 space-y-1">
                            <div className={`h-1.5 rounded-full transition-all ${isCompleted ? "bg-brand-green" : "bg-gray-100"}`}></div>
                            <span className={`text-[8px] font-bold block leading-tight truncate px-0.5 ${isCompleted ? "text-brand-green" : "text-gray-400"}`}>
                              {m}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Global Sourcing Guarantee Block */}
        <div className="mt-16 bg-gradient-to-br from-brand-dark to-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-emerald-800/20 shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-green/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="space-y-3 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1 text-[10px] text-brand-green-light font-bold bg-brand-green-light/10 border border-brand-green-light/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full statutory clearance guaranteed</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">Are you preparing to import to Europe, Singapore, or the Americas?</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Yalini Exim operates in strict adherence to international export customs criteria. We ensure complete FSSAI license compliance, phytosanitary fumigation certification, and maritime insurance backing for every single consignment.
            </p>
          </div>

          <div className="flex-shrink-0 relative z-10">
            <button
              onClick={() => {
                const element = document.getElementById("quote-assistant");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }
              }}
              className="bg-brand-green hover:bg-brand-green-light text-white font-bold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md hover:-translate-y-0.5"
            >
              <span>Consult Export assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
