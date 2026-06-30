import React from "react";
import { ShieldCheck, Leaf, Globe, Sparkles, Building, Award, Landmark, Users } from "lucide-react";
import Certifications from "./Certifications";

export default function AboutPage() {
  return (
    <div className="flex-grow bg-slate-50">
      {/* Hero Banner */}
      <div className="relative bg-brand-dark py-20 overflow-hidden border-b-4 border-brand-green-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/50 via-brand-dark to-brand-dark"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-light/10 text-brand-green-light rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-green-light/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Established 2023</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
            Bridging Global Markets with <span className="text-brand-green-light">Indian Integrity</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Yalini Exim is an elite international trading organization, linking quality-conscious global buyers with finest Indian commodities, biodegradable tableware, and architectural materials.
          </p>
        </div>
      </div>

      {/* Corporate Profile & Director's Address */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-brand-green tracking-wider block">Corporate Profile</span>
              <h2 className="text-3xl font-bold font-display text-brand-dark leading-tight">
                Our Mission: Transparent, Compliant, and High-Fidelity Trade Logistics
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Yalini Exim was founded in Karaikudi, Tamil Nadu, with a resolute charter: to streamline international sourcing from India. We specialize in cross-border trade, helping wholesale distributors, supermarket chains, and construction enterprises procure vetted materials with absolute regulatory clearance.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our headquarters are strategically positioned near Chennai Port (INMAA), a premier high-velocity maritime gateway on India's eastern seaboard. This location allows us to consolidate mixed containers, execute swift export customs inspections, and coordinate weekly vessel departures to the United Kingdom, Singapore, Canada, and the Arabian Gulf.
            </p>

            {/* Corporate Milestones/Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-white border border-gray-150 p-4 rounded-xl shadow-2xs text-center">
                <span className="text-2xl font-black text-brand-green block">2023</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Year Founded</span>
              </div>
              <div className="bg-white border border-gray-150 p-4 rounded-xl shadow-2xs text-center">
                <span className="text-2xl font-black text-brand-green block">10+</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Destinations</span>
              </div>
              <div className="bg-white border border-gray-150 p-4 rounded-xl shadow-2xs text-center">
                <span className="text-2xl font-black text-brand-green block">100%</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">FSSAI Certified</span>
              </div>
              <div className="bg-white border border-gray-150 p-4 rounded-xl shadow-2xs text-center">
                <span className="text-2xl font-black text-brand-green block">A-Grade</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Material Spec</span>
              </div>
            </div>
          </div>

          {/* Director's message Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-dark to-slate-900 text-white rounded-2xl p-8 border border-emerald-800/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl pointer-events-none"></div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-green-light font-bold">Executive Office</span>
            
            <blockquote className="mt-6 text-base italic text-gray-200 leading-relaxed">
              "International commerce isn't merely about moving cargo containers; it's built upon trusted relationships, bulletproof documentation compliance, and unyielding consistency. At Yalini Exim, we act as your direct eyes and hands on the Indian ground, safeguarding your quality parameters and delivery schedules."
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-green text-white font-bold text-lg rounded-full flex items-center justify-center border-2 border-white shadow-md">
                P
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Mr. Prabhu</h4>
                <p className="text-[11px] text-brand-green-light">Managing Director, Yalini Exim</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Karaikudi & Chennai Offices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-brand-green tracking-wider">Values First</span>
            <h2 className="text-3xl font-bold font-display text-brand-dark mt-2">
              Our Professional Sourcing Guidelines
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              We govern every transaction, container loading, and customs filing with four uncompromised trade standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="bg-slate-50 border border-gray-200/60 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-dark mb-2">Uncompromised Quality Vetting</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Every shipment of sugarcane bagasse, packed retail groceries, or granite slabs undergoes physical inspection and batch-testing prior to sealing the container.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-slate-50 border border-gray-200/60 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-dark mb-2">Ecological Commitment</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We actively advocate for zero-plastic commercial solutions, manufacturing state-of-the-art compostable sugarcane fiber and starch-based dining utilities.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-slate-50 border border-gray-200/60 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-dark mb-2">Seamless Multi-Channel Operations</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                From mixed commodity consolidation to complex private label packaging, we align our logistics with your destination port custom requirements.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-slate-50 border border-gray-200/60 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center mb-4">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-brand-dark mb-2">Statutory Transparency</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We are registered under FSSAI, Spice Board of India, Coffee Board, and DGFT, adhering to all central governmental audit schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reuse Certifications section for authority */}
      <div className="py-6">
        <Certifications />
      </div>
    </div>
  );
}
