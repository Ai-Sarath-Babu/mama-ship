import React, { useState, useEffect } from "react";
import { X, CheckCircle, Sparkles, Send, Loader2, ArrowRight } from "lucide-react";

interface ExitIntentPopupProps {
  onOpenInquiry: () => void;
}

export default function ExitIntentPopup({ onOpenInquiry }: ExitIntentPopupProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    requirement: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check local storage so we only show it once per session
    const shownSession = sessionStorage.getItem("exit_popup_shown");
    if (shownSession) {
      setDismissed(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If cursor leaves through the top margin (y < 20)
      if (e.clientY < 20 && !dismissed && !show) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    // Mobile fallback timer (45 seconds)
    const mobileTimer = setTimeout(() => {
      if (!dismissed && !show) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [dismissed, show]);

  if (!show || dismissed) return null;

  const handleClose = () => {
    setDismissed(true);
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.country || !formData.requirement) return;

    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactPerson: "Prospect (Exit Capture)",
          email: formData.email,
          country: formData.country,
          whatsapp: "Not Provided / Pending Email Contact",
          productCategory: "General Inquiry",
          specificProduct: formData.requirement,
          quantity: "Bulk Inquiry",
          message: "Lead submitted via exit intent capture board. Requires immediate catalog pricing sent to their email.",
          leadSource: "exit-intent"
        })
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Exit lead logging failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border-4 border-brand-green overflow-hidden flex flex-col p-6 sm:p-8">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-brand-dark cursor-pointer hover:bg-gray-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle className="w-9 h-9 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark font-display leading-tight">Catalog Access Approved!</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We have received your email request. A link to download the **Yalini Exim Export Catalog**, alongside current wholesale price sheets and shipping schedules for **{formData.country}**, has been dispatched to **{formData.email}**.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-2.5 rounded-lg text-xs cursor-pointer transition-colors"
            >
              Back to Browsing
            </button>
          </div>
        ) : (
          <div className="space-y-4 font-sans text-sm">
            
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-brand-green-light bg-brand-green-light/10 px-2 py-0.5 rounded-sm">
                <Sparkles className="w-3 h-3" />
                <span>Special B2B Export Rates</span>
              </div>
              <h3 className="text-2xl font-black font-display text-brand-dark tracking-tight leading-none mt-2">
                Need Bulk Export Pricing?
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Before you go, get our official export brochure, MOQ specifications, and immediate FOB/CIF container quotes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Your Business Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder="e.g. buyer@wholesale.com"
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Target Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={e => setFormData(p => ({ ...p, country: e.target.value }))}
                    placeholder="e.g. United Kingdom"
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Item of Interest *</label>
                  <input
                    type="text"
                    required
                    value={formData.requirement}
                    onChange={e => setFormData(p => ({ ...p, requirement: e.target.value }))}
                    placeholder="e.g. Sugarcane Plates"
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing RFQ Request...</span>
                  </>
                ) : (
                  <>
                    <span>Download Brochure & Price Sheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onOpenInquiry();
                }}
                className="text-[11px] text-brand-green hover:text-brand-green-light font-bold underline cursor-pointer"
              >
                Or submit a detailed custom container RFQ instead
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
