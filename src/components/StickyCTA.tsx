import React from "react";
import { Phone, MessageSquare, FileText, FileDown } from "lucide-react";

interface StickyCTAProps {
  onOpenQuoteModal: () => void;
}

export default function StickyCTA({ onOpenQuoteModal }: StickyCTAProps) {
  return (
    <>
      {/* Mobile Sticky Bottom Bar (Visible on screens < 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/85 grid grid-cols-3 h-14 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] divide-x divide-gray-100 font-sans">
        <a
          href="tel:+919944823311"
          className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-brand-green transition-colors"
        >
          <Phone className="w-4.5 h-4.5 text-brand-green" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Direct Call</span>
        </a>
        <a
          href="https://wa.me/919944823311?text=Hi%20Prabhu,%20I%20visited%20Yalini%20Exim%2520and%2520am%2520interested%2520in%2520wholesale%2520importing%2520from%2520India."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-brand-green transition-colors bg-emerald-50/50"
        >
          <MessageSquare className="w-4.5 h-4.5 text-emerald-600 fill-emerald-600/10" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">WhatsApp</span>
        </a>
        <button
          onClick={onOpenQuoteModal}
          className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-brand-green transition-colors cursor-pointer"
        >
          <FileText className="w-4.5 h-4.5 text-brand-green" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark">Get Quote</span>
        </button>
      </div>

      {/* Desktop Floating CTAs (Visible on screens >= 768px in the bottom corner) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3 font-sans">
        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/919944823311?text=Hi%20Prabhu,%20I%20am%20interested%20in%20importing%20with%20Yalini%20Exim.%20Please%20share%20bulk%20quotes."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5 text-white pl-4 pr-5 py-3 rounded-full font-bold text-sm shadow-lg transition-all duration-150 border border-emerald-500/20 group"
        >
          <MessageSquare className="w-4.5 h-4.5 fill-white/10" />
          <span>Chat on WhatsApp</span>
        </a>

        {/* Catalog Request */}
        <button
          onClick={onOpenQuoteModal}
          className="flex items-center gap-2.5 bg-brand-green hover:bg-brand-green-light hover:-translate-y-0.5 text-white pl-4 pr-5 py-3 rounded-full font-bold text-sm shadow-lg transition-all duration-150 border border-brand-green-light cursor-pointer group"
        >
          <FileDown className="w-4.5 h-4.5 text-white animate-bounce" />
          <span>Download Catalog</span>
        </button>
      </div>
    </>
  );
}
