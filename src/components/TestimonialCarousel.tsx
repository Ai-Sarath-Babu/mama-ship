import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star, ShieldCheck, MapPin, Calendar, Award } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  country: string;
  countryCode: string;
  initials: string;
  consignment: string;
  feedback: string;
  rating: number;
  tags: string[];
  metrics: {
    port: string;
    duration: string;
    volume: string;
  };
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test_1",
    name: "Alastair Vance",
    role: "Procurement Director",
    company: "Vance Hospitality Group",
    location: "London, United Kingdom",
    country: "United Kingdom",
    countryCode: "UK",
    initials: "AV",
    consignment: "Sugarcane Bagasse Tableware (OEM Private Label)",
    feedback: "Yalini Exim has revolutionized our sustainable tableware supply chain. Sourcing custom-embossed sugarcane bagasse plates out of India used to be a documentation nightmare, but Mr. Prabhu's team handled the phytosanitary inspections and UK customs clearance flawlessly. Their biopolymer consistency is world-class, with zero warping under high-heat catering trials.",
    rating: 5,
    tags: ["Sugarcane Bagasse", "OEM Moulding", "UK Customs cleared"],
    metrics: {
      port: "Chennai (INMAA) → London (GBLON)",
      duration: "26 Days Transit",
      volume: "5 x 40ft HQ Containers"
    }
  },
  {
    id: "test_2",
    name: "Li Wei Tan",
    role: "Supply Chain Lead",
    company: "Apex Food Services Ltd",
    location: "Downtown, Singapore",
    country: "Singapore",
    countryCode: "SG",
    initials: "LT",
    consignment: "Mixed-SKU Indian Groceries & Custom PP Takeaway Pack",
    feedback: "Consistency and speed are critical for Singapore's food services. Yalini Exim coordinates weekly vessel loadings from Chennai, meaning we receive fresh, certified FMCG shipments and custom food containers within 6 days. Their ability to consolidate multiple grocery SKUs into single seaworthy container lines saves us immense overhead. Truly transparent trade partners.",
    rating: 5,
    tags: ["FMCG Consolidation", "Weekly Loadings", "Custom Print"],
    metrics: {
      port: "Chennai (INMAA) → Singapore (SGSIN)",
      duration: "6 Days Transit",
      volume: "Weekly 20ft Container Consolidation"
    }
  },
  {
    id: "test_3",
    name: "Sarah Jenkins",
    role: "Senior Director of Sourcing",
    company: "Maple Distribution Inc.",
    location: "Toronto, Canada",
    country: "Canada",
    countryCode: "CA",
    initials: "SJ",
    consignment: "Basmati Rice Consignment & Polished Slabs",
    feedback: "Maple Distribution relies heavily on Yalini Exim for premium long-grain Basmati and architectural granite consignments. The compliance team handles Canadian Food Inspection Agency (CFIA) requirements, pesticide declarations, and heavy stone crate palletizing with unmatched attention to detail. Mr. Prabhu's 24/7 direct communication gives us absolute confidence.",
    rating: 5,
    tags: ["Basmati Grains", "Natural Granite", "CFIA Compliance"],
    metrics: {
      port: "Chennai (INMAA) → Montreal (CAMTR)",
      duration: "32 Days Transit",
      volume: "12 Containers / Year"
    }
  },
  {
    id: "test_4",
    name: "Marcus Broadus",
    role: "Managing Director",
    company: "Pacific Greenwares Ltd",
    location: "Auckland, New Zealand",
    country: "New Zealand",
    countryCode: "NZ",
    initials: "MB",
    consignment: "Biodegradable Corn Starch Cutlery & Clamshells",
    feedback: "We've imported thousands of starch-based tableware lines from various suppliers, but Yalini Exim stands above the rest. Their corn-starch cutlery and takeout boxes hold their structural integrity perfectly under microwave temperatures. Every container arrives with pristine seaworthy packaging, and the full phytosanitary paperwork is always digitally accessible beforehand.",
    rating: 5,
    tags: ["Corn Starch (PLA)", "Phytosanitary Certs", "Fumigated Pallets"],
    metrics: {
      port: "Chennai (INMAA) → Auckland (NZAKL)",
      duration: "23 Days Transit",
      volume: "4 x 20ft Containers"
    }
  }
];

export default function TestimonialCarousel() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter based on active tab
  const filteredTestimonials = TESTIMONIALS.filter(item => 
    activeTab === "All" || item.countryCode === activeTab
  );

  // If index gets out of range due to tab switching, clamp it
  useEffect(() => {
    if (currentIndex >= filteredTestimonials.length) {
      setCurrentIndex(0);
    }
  }, [activeTab, filteredTestimonials.length, currentIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying && filteredTestimonials.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % filteredTestimonials.length);
      }, 7000); // 7 seconds slide intervals
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, filteredTestimonials.length]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex(prevIndex => (prevIndex + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex(prevIndex => (prevIndex - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  const handleTabChange = (tab: string) => {
    setIsPlaying(false);
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const currentTestimonial = filteredTestimonials[currentIndex] || TESTIMONIALS[0];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-b border-gray-200/50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-950/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-brand-green/20">
            <Award className="w-3.5 h-3.5" />
            <span>International Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-dark tracking-tight">
            Endorsed by Leading Global Partners
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            See how wholesale distributors, packaging firms, and food hospitality enterprises in our primary trade lanes trust Yalini Exim for uncompromised Indian quality and compliance standards.
          </p>
        </div>

        {/* Region / Tab Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-lg mx-auto">
          {["All", "UK", "SG", "CA", "NZ"].map(tab => {
            const label = tab === "All" ? "All Regions" : tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                  activeTab === tab
                    ? "bg-brand-green text-white shadow-md shadow-emerald-900/10 scale-105"
                    : "bg-white text-gray-500 border border-gray-200/80 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Testimonial Active Display Area with Framer Motion Transition */}
        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="relative min-h-[460px] sm:min-h-[380px] md:min-h-[340px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentTestimonial && (
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full bg-white border border-gray-200/70 rounded-2xl shadow-sm p-6 sm:p-8 md:p-10 text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative overflow-hidden"
                >
                  {/* Decorative big quote icon */}
                  <div className="absolute right-4 top-4 text-slate-100 pointer-events-none">
                    <Quote className="w-24 h-24 stroke-[1.5px] opacity-40" />
                  </div>

                  {/* Left Column: Partner Profile Info */}
                  <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                    {/* Circle Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brand-dark to-emerald-950 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center border-4 border-white shadow-md">
                        {currentTestimonial.initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-brand-green text-white p-1 rounded-full border border-white shadow-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Name, Role & Company */}
                    <div>
                      <h4 className="text-base font-black text-brand-dark leading-tight">{currentTestimonial.name}</h4>
                      <p className="text-xs text-brand-green font-bold leading-tight mt-1">{currentTestimonial.role}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{currentTestimonial.company}</p>
                    </div>

                    {/* Country Pin badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs text-gray-500 font-bold border border-gray-200/50">
                      <MapPin className="w-3.5 h-3.5 text-brand-green" />
                      <span>{currentTestimonial.location}</span>
                    </div>

                    {/* Star ratings */}
                    <div className="flex gap-1">
                      {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Review Text & Consignment Parameters */}
                  <div className="md:col-span-8 space-y-5 flex flex-col justify-between h-full text-left">
                    {/* Review text */}
                    <div className="space-y-4">
                      {/* Order verification line */}
                      <div className="inline-flex items-center gap-2 text-xs bg-emerald-50 text-brand-green px-3 py-1.5 rounded-lg font-bold border border-emerald-100/60">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Consignment: {currentTestimonial.consignment}</span>
                      </div>

                      <blockquote className="text-sm sm:text-base italic text-gray-600 font-medium leading-relaxed">
                        "{currentTestimonial.feedback}"
                      </blockquote>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {currentTestimonial.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-gray-500 bg-slate-50 border border-gray-200 px-2.5 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Professional B2B Parameters panel */}
                    <div className="bg-slate-50 border border-gray-150 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Logistics Lane</span>
                        <span className="text-xs font-bold text-brand-dark mt-0.5 block">{currentTestimonial.metrics.port}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Shipment Speed</span>
                        <span className="text-xs font-bold text-brand-dark mt-0.5 block">{currentTestimonial.metrics.duration}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Volume Scale</span>
                        <span className="text-xs font-bold text-brand-dark mt-0.5 block">{currentTestimonial.metrics.volume}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Manual Slider buttons and indicator dots */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto px-4">
            {/* Auto-play Status indicator */}
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5 order-2 sm:order-1">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`}></span>
              <span>{isPlaying ? "Auto-cycling Reviews" : "Carousel Paused"}</span>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 order-1 sm:order-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === index 
                      ? "bg-brand-green w-6 shadow-xs" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex gap-2 order-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-2xs hover:bg-slate-50 text-gray-600 hover:text-brand-green transition-all cursor-pointer flex items-center justify-center"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-2xs hover:bg-slate-50 text-gray-600 hover:text-brand-green transition-all cursor-pointer flex items-center justify-center"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic statistics callout */}
        <div className="mt-16 bg-white border border-gray-100 rounded-2xl p-6 shadow-3xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-3xl font-black text-brand-green">100%</span>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customs clearance rate</p>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-brand-green">98.4%</span>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On-Time Vessel Delivery</p>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-brand-green">24-Hr</span>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">B2B RFQ turnaround</p>
          </div>
        </div>
      </div>
    </section>
  );
}
