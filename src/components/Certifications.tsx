import React from "react";
import { CERTIFICATIONS } from "../types";
import { Award, ShieldCheck, CheckCircle, FileText, Landmark, FileCheck } from "lucide-react";

export default function Certifications() {
  const getIcon = (id: string) => {
    switch (id) {
      case "fssai":
        return <Landmark className="w-8 h-8 text-emerald-600" />;
      case "spiceboard":
        return <Award className="w-8 h-8 text-emerald-600" />;
      case "coffee-board":
        return <Award className="w-8 h-8 text-emerald-600" />;
      case "iec":
        return <FileCheck className="w-8 h-8 text-emerald-600" />;
      case "fieo":
        return <ShieldCheck className="w-8 h-8 text-emerald-600" />;
      default:
        return <FileText className="w-8 h-8 text-emerald-600" />;
    }
  };

  const getBadgeColors = (type: string) => {
    switch (type) {
      case "green":
        return {
          bg: "bg-emerald-50/75 border-emerald-100",
          tag: "bg-emerald-100 text-emerald-800",
          ring: "ring-emerald-500/10"
        };
      case "gold":
        return {
          bg: "bg-green-50/75 border-green-150",
          tag: "bg-green-100 text-green-800",
          ring: "ring-green-500/10"
        };
      default:
        return {
          bg: "bg-teal-50/75 border-teal-150",
          tag: "bg-teal-100 text-teal-850",
          ring: "ring-teal-500/10"
        };
    }
  };

  return (
    <section id="certifications" className="py-20 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Government Compliant & Registered Exporter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight mb-4">
            Official Government Registrations & Certifications
          </h2>
          <p className="text-gray-600">
            Yalini Exim operates in strict accordance with Indian export regulations and global standards. We are fully registered with central ministries and statutory commodity boards to ensure 100% legal compliance and seamless custom clearances worldwide.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert) => {
            const colors = getBadgeColors(cert.badgeType);
            return (
              <div 
                key={cert.id}
                className={`relative flex flex-col p-6 rounded-xl border ${colors.bg} ring-4 ${colors.ring} hover:shadow-lg transition-all duration-300 group overflow-hidden`}
              >
                {/* Official Stamp Decorative Effect */}
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gray-900/5 rounded-full border-4 border-dashed border-gray-900/10 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-bold rotate-12 tracking-widest uppercase">Verified</span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-xs border border-gray-100 flex-shrink-0">
                    {getIcon(cert.id)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark leading-snug group-hover:text-brand-green transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-green uppercase tracking-wider mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                  {cert.description}
                </p>

                {/* License Code Display */}
                <div className="bg-white/90 backdrop-blur-xs border border-gray-200/60 rounded-lg p-3 flex items-center justify-between text-xs font-mono text-gray-700">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase font-sans font-bold tracking-wider">License / Reg Code</span>
                    <span className="font-semibold tracking-wide">{cert.displayId}</span>
                  </div>
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Verification Summary */}
        <div className="mt-12 p-6 bg-slate-50 border border-gray-200/60 rounded-xl text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-sm font-bold text-brand-dark flex items-center gap-1.5">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
              Guaranteed Customs Clearance Documentation
            </h4>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              Every shipment is backed by clean certificates of origin, certified packing lists, and board certifications to prevent customs clearance bottlenecks at UK, Canada, New Zealand, Singapore, and global ports.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-green bg-brand-green/5 border border-brand-green/20 px-4 py-2 rounded-lg">
            <span>Verified Status: active</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
