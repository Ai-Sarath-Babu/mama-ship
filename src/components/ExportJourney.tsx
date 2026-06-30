import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, ShieldCheck, ClipboardCheck, Layers, Ship, Anchor, 
  ChevronRight, Calendar, Info, HelpCircle, CheckSquare, Sparkles, MapPin, Globe
} from "lucide-react";

interface JourneyStep {
  stepNumber: number;
  title: string;
  duration: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ReactNode;
  checklists: string[];
  documents: string[];
  stakeholder: string;
  milestoneSymbol: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    stepNumber: 1,
    title: "Inquiry & Digital RFQ Formulation",
    duration: "Within 12-24 Hours",
    shortDesc: "Initial B2B sourcing proposal, custom OEM consultation, and FOB/CIF Incoterm setup.",
    detailedDesc: "The export journey initiates when you submit your cargo specifications through our digital B2B RFQ engine. Director Prabhu and our operations team analyze the target volume, private labeling specifications, and destination seaport requirements to draft a detailed commercial sheet outlining unit prices, customs requirements, and vessel corridors.",
    icon: <FileText className="w-5 h-5 text-brand-green" />,
    checklists: [
      "FOB (Free On Board) or CIF (Cost, Insurance & Freight) selection",
      "Analysis of private logo engraving layouts for sugarcane bagasse tableware",
      "Custom packaging and mixed container SKU configuration checks",
      "Drafting of the formal Proforma Invoice (PI) detailing terms of trade"
    ],
    documents: [
      "Custom RFQ Consult Sheet",
      "Signed Proforma Invoice (PI)",
      "Technical OEM Design Proofs"
    ],
    stakeholder: "Operations Director & Buyer Sourcing Desk",
    milestoneSymbol: "RFQ"
  },
  {
    stepNumber: 2,
    title: "Material Sourcing & OEM Production",
    duration: "7 - 14 Days (Based on SKU volume)",
    shortDesc: "Physical quality audits and rigorous factory batch production to meet global standards.",
    detailedDesc: "Once terms are mutually agreed, production is initialized. For eco dining ware, the factory begins custom mould heat-pressing of raw sugarcane bagasse pulp. For agricultural commodities, our Karaikudi team audits premium harvests, ensuring compliance with strict global standards on size, moisture content, and chemical limits.",
    icon: <Layers className="w-5 h-5 text-brand-green" />,
    checklists: [
      "High-pressure heat-moulding of biopolymer tableware",
      "Physical sizing, color uniformity, and moisture verification audits",
      "Rigorous heat-resistance and waterproofing trials on random samples",
      "Application of food-grade soy ink for private branding impressions"
    ],
    documents: [
      "Factory Quality Assurance (QA) Certificate",
      "Raw Ingredient / Pulp Origin Statement",
      "Pesticide & Chemical Clearance Report"
    ],
    stakeholder: "Factory QA Supervisors & Sourcing Executives",
    milestoneSymbol: "QA/MFG"
  },
  {
    stepNumber: 3,
    title: "Government Audits & Certification",
    duration: "2 - 3 Days",
    shortDesc: "Securing FSSAI clearance, Spice Board permits, and fumigation certifications.",
    detailedDesc: "Compliance is the bedrock of Indian export integrity. During this stage, we interface with central regulatory boards in India to secure all necessary statutory permits. This includes food safety certificates, agricultural commodity inspections, and international biopolymer clearances, ensuring zero clearance delays at the destination port.",
    icon: <ShieldCheck className="w-5 h-5 text-brand-green" />,
    checklists: [
      "Securing the mandatory FSSAI Export clearance verification",
      "Filing with the Spice Board or Coffee Board of India (for FMCG cargo)",
      "Official phytosanitary timber pallet fumigation at government-approved facilities",
      "Generation of Certificate of Origin to enable preferential tariff clearance"
    ],
    documents: [
      "Phytosanitary Fumigation Certificate",
      "Spice Board / Coffee Board Export Permit",
      "Government-issued Certificate of Origin"
    ],
    stakeholder: "Customs Broker & Central Statutory Auditors",
    milestoneSymbol: "GOVT"
  },
  {
    stepNumber: 4,
    title: "Port Consolidation & Seaworthy Packing",
    duration: "2 Days",
    shortDesc: "Consolidation at Chennai Sea Port, heavy timber packing, and container sealing.",
    detailedDesc: "Our cargo is consolidated at our strategic logistical warehouse near Chennai Sea Port (INMAA). The logistics team wraps and palletizes the cartons on fumigated plywood structures to prevent moisture or shifting during rough ocean voyages. Containers are packed under our direct supervision and sealed with high-security locks.",
    icon: <ClipboardCheck className="w-5 h-5 text-brand-green" />,
    checklists: [
      "Carton stabilization using heavy-duty moisture-barrier shrink wraps",
      "Plywood pallet block wrapping for extra seaworthiness and structural safety",
      "Detailed Container Load Plan (CLP) checking to maximize volume efficiency",
      "Securing and photographing high-security container bolt seals"
    ],
    documents: [
      "Detailed Packing List (P/L)",
      "Container Load Plan (CLP)",
      "Fumigation / Cargo Treatment Record"
    ],
    stakeholder: "Chennai Warehouse Cargo Handlers & Seal Inspectors",
    milestoneSymbol: "PORT"
  },
  {
    stepNumber: 5,
    title: "Customs Brokerage & Vessel Boarding",
    duration: "1 - 2 Days",
    shortDesc: "Indian Customs inspection, Shipping Bill clearing, and loading onto ocean liners.",
    detailedDesc: "We coordinate with accredited customs agents at Chennai Port to execute the export examination. Our team clears the Shipping Bill with Indian Customs, coordinates with major global ocean carriers (Maersk, MSC, CMA CGM), and secures the container's berth on the next weekly vessel departing to your region.",
    icon: <Anchor className="w-5 h-5 text-brand-green" />,
    checklists: [
      "Clearing Shipping Bills with Port Customs via electronic EDI portals",
      "Random container customs physical examination and seal validation",
      "Submitting verified gross mass (VGM) and terminal terminal gate-in tickets",
      "Loading the sealed containers on high-speed weekly maritime vessels"
    ],
    documents: [
      "Customs Shipping Bill",
      "Ocean Bill of Lading (B/L) - Express/Draft",
      "Verified Gross Mass (VGM) Certificate"
    ],
    stakeholder: "Licensed Customs Broker & Marine Cargo Surveyor",
    milestoneSymbol: "SAIL"
  },
  {
    stepNumber: 6,
    title: "Ocean Transit & Destination Discharge",
    duration: "6 - 32 Days (Destination-dependent)",
    shortDesc: "Real-time vessel tracking, customs clearance support, and final warehouse delivery.",
    detailedDesc: "The final phase is the ocean voyage. We dispatch the complete physical and digital document package to your bank or importing desk. During transit, you receive regular telemetry updates. Upon vessel arrival, our documentation ensures your local customs broker executes hassle-free discharge and warehouse delivery.",
    icon: <Ship className="w-5 h-5 text-brand-green" />,
    checklists: [
      "Transmitting full tracking telemetry and daily vessel position summaries",
      "Dispatch of original documents via international express couriers",
      "Direct cooperation with importing brokers to prevent port demurrage",
      "Final cargo discharge verification and B2B feedback review"
    ],
    documents: [
      "Original Bill of Lading (B/L) or Sea Waybill",
      "Commercial Export Invoice",
      "Comprehensive Marine Cargo Insurance Certificate"
    ],
    stakeholder: "Marine Carrier Desk & Buyer Sourcing Desk",
    milestoneSymbol: "DISCH"
  }
];

export default function ExportJourney() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section className="py-20 bg-slate-50 border-b border-gray-200/50 relative overflow-hidden text-left">
      {/* Decorative background details */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-950/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-light/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-brand-green/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-dark tracking-tight">
            The Yalini Export Journey
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Sourcing internationally shouldn't be complex. Walk through our step-by-step interactive timeline to see how we manage cargo vetting, statutory clearing, and port logistics from India.
          </p>
        </div>

        {/* Timeline Stepper Header */}
        <div className="bg-white border border-gray-200 shadow-3xs rounded-2xl p-4 sm:p-6 mb-10">
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0">
            {/* Background Line (visible on desktop) */}
            <div className="absolute left-[34px] md:left-4 md:right-4 top-4 md:top-1/2 md:-translate-y-1/2 h-full md:h-1 bg-gray-100 -z-10 hidden md:block"></div>
            
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex md:flex-col items-center gap-4 md:gap-2.5 flex-1 relative z-10 cursor-pointer text-left md:text-center focus:outline-hidden group"
                >
                  {/* Circle number */}
                  <div 
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                      isActive 
                        ? "bg-brand-green text-white border-brand-green shadow-md shadow-emerald-950/15 scale-110" 
                        : isPast 
                          ? "bg-emerald-50 text-brand-green border-brand-green" 
                          : "bg-white text-gray-400 border-gray-200 group-hover:border-gray-400 group-hover:text-gray-700"
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  {/* Quick label text */}
                  <div className="flex flex-col text-left md:text-center">
                    <span className={`text-xs font-black uppercase tracking-wider block transition-colors leading-none md:mt-1 ${
                      isActive ? "text-brand-green" : "text-gray-500 group-hover:text-brand-dark"
                    }`}>
                      {step.milestoneSymbol}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold block leading-tight mt-0.5 max-w-[130px] truncate md:max-w-none md:line-clamp-1">
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detailed Grid View */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden min-h-[480px]">
          {/* Decorative backdrop indicator */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-brand-green/[0.02] rounded-full blur-2xl pointer-events-none"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Side: Step summary, details and metrics */}
              <div className="lg:col-span-7 space-y-6">
                {/* Meta header */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center">
                    {activeStep.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-green font-black block uppercase">
                      Export Step 0{activeStep.stepNumber} of 06
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-dark leading-tight mt-0.5">
                      {activeStep.title}
                    </h3>
                  </div>
                </div>

                {/* Duration banner */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-gray-200">
                  <Calendar className="w-4 h-4 text-brand-green" />
                  <span>Target Timeline: <strong className="text-brand-dark font-black">{activeStep.duration}</strong></span>
                </div>

                {/* Detailed narrative */}
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                  <p>{activeStep.detailedDesc}</p>
                </div>

                {/* Active Stakeholder Badge */}
                <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl inline-flex items-center gap-2">
                  <Info className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-[10px] uppercase font-bold text-gray-500">
                    Primary Sourcing Stakeholder: <strong className="text-brand-dark">{activeStep.stakeholder}</strong>
                  </span>
                </div>
              </div>

              {/* Right Side: Compliance check and statutory documentation list */}
              <div className="lg:col-span-5 space-y-6">
                {/* Compliance checklist */}
                <div className="bg-slate-50/70 border border-gray-200 p-5 rounded-2xl space-y-3.5">
                  <h4 className="text-xs uppercase font-black text-brand-dark tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                    <CheckSquare className="w-4 h-4 text-brand-green" />
                    <span>Yalini Compliance Checks</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    {activeStep.checklists.map((check, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0"></span>
                        <span className="leading-relaxed">{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Document clearance list */}
                <div className="bg-brand-dark text-white p-5 rounded-2xl space-y-4 border border-emerald-950 shadow-md relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-white/[0.03] pointer-events-none">
                    <FileText className="w-24 h-24 stroke-[1.5px]" />
                  </div>
                  
                  <div>
                    <h4 className="text-[11px] uppercase font-bold text-brand-green-light tracking-widest block">
                      Required Document Pack
                    </h4>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Cleared & delivered during this stage</span>
                  </div>

                  <div className="space-y-2 text-xs font-semibold">
                    {activeStep.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl text-gray-200">
                        <FileText className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick interactive navigation footer within the card */}
          <div className="mt-12 pt-6 border-t border-gray-150 flex items-center justify-between">
            <button
              onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
              disabled={activeStepIndex === 0}
              className="text-xs font-bold text-gray-500 hover:text-brand-dark transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              ← Previous Step
            </button>

            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider hidden sm:block">
              Stage {activeStep.stepNumber} of 6
            </span>

            <button
              onClick={() => setActiveStepIndex(prev => Math.min(JOURNEY_STEPS.length - 1, prev + 1))}
              disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:text-brand-green-light transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global SLA Guarantee callout */}
        <div className="mt-12 text-center text-xs text-gray-400 max-w-lg mx-auto font-semibold bg-white border border-gray-200/60 py-3.5 px-6 rounded-full shadow-3xs flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-green flex-shrink-0" />
          <span>SLA Promise: Full transparency & documentation dispatched with absolute fidelity.</span>
        </div>
      </div>
    </section>
  );
}
