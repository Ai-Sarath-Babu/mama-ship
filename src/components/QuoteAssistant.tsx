import React, { useState } from "react";
import { PRODUCT_CATEGORIES, PRODUCTS } from "../types";
import { Sparkles, Ship, Clipboard, Download, ArrowRight, Loader2, HelpCircle, ShieldCheck, Mail, Send } from "lucide-react";

interface ConsultResult {
  fallback?: boolean;
  summary: string;
  suggestedIncoterm: string;
  shippingPort: string;
  hsCodeRecommendation: string;
  estimatedMoq: string;
  documentationRequired: string[];
  customsPackagingSuggestions: string;
}

export default function QuoteAssistant() {
  const [formData, setFormData] = useState({
    contactPerson: "",
    companyName: "",
    country: "",
    email: "",
    whatsapp: "",
    productCategory: "",
    specificProduct: "",
    quantity: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [leadLogged, setLeadLogged] = useState(false);

  // Get matching products for selected category to guide user
  const availableProducts = formData.productCategory
    ? PRODUCTS.filter(p => p.category === formData.productCategory)
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset specific product if category changes
      ...(name === "productCategory" ? { specificProduct: "" } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactPerson || !formData.country || !formData.productCategory || !formData.specificProduct || !formData.email || !formData.whatsapp) {
      setError("Please complete all required fields (Contact Person, Country, Email, WhatsApp, Category, Product) to run the AI consultation.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setLeadLogged(false);

    try {
      // 1. Fetch AI Pre-Quotation Consultation
      const consultPromise = fetch("/api/quote-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      // 2. Silently Submit Lead in parallel to persist
      const leadPromise = fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          leadSource: "quote-assistant"
        })
      });

      const [consultRes, leadRes] = await Promise.all([consultPromise, leadPromise]);

      if (!consultRes.ok) {
        throw new Error("Sourcing server could not generate quotation outline. Please try again.");
      }

      const consultData = await consultRes.json();
      setResult(consultData);

      if (leadRes.ok) {
        setLeadLogged(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during quotation processing. Sourcing department was still notified.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote-assistant" className="py-20 bg-brand-dark text-white relative overflow-hidden">
      {/* Background visual geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green-light/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-green-light/10 text-brand-green-light rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-green-light/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-green-light" />
            <span>AI Sourcing consultation engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            Instant B2B Export Quote & Sourcing Assistant
          </h2>
          <p className="text-gray-300">
            Are you planning a bulk import? Settle your logistics parameters in seconds. Our Gemini-powered AI engine reviews customs lists, selects optimal Incoterms, suggests packaging standards, and drafts a commercial pre-quote consultation tailored to your destination port.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Interactive Input Form */}
          <div className="lg:col-span-5 bg-white text-brand-dark p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xl flex flex-col">
            <h3 className="text-xl font-bold font-display tracking-tight mb-2 flex items-center gap-1.5">
              <span>Sourcing Specification Form</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Complete the parameters below to draft your legal trade summary and log your wholesale requirements.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-xs rounded-r-lg font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Contact Name *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Landmark LLC"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+1 555-0199"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Destination Country *</label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g. United Kingdom (London)"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Required Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 50,000 Pcs / 1 Container"
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Product Category Interest *</label>
                <select
                  name="productCategory"
                  required
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200"
                >
                  <option value="">-- Select Product Category --</option>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {formData.productCategory && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Select Specific Product *</label>
                  <select
                    name="specificProduct"
                    required
                    value={formData.specificProduct}
                    onChange={handleInputChange}
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200 animate-slide-down"
                  >
                    <option value="">-- Select Product Variant --</option>
                    {availableProducts.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Custom Specification / OEM Product">Custom Specification / OEM Design</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Special Custom Requirements (e.g., custom print, target CIF rate)</label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter private label details or specific quality specifications required..."
                  className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3.5 rounded-lg text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Custom Sourcing Route...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Run Sourcing Analysis & Quote Draft</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side: Consultation Output Panel */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[500px] justify-center">
            {!loading && !result && (
              <div className="border border-dashed border-gray-700 rounded-2xl p-8 text-center text-gray-400 bg-brand-dark/40 flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-gray-800/60 rounded-full border border-gray-700/60 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-brand-green-light/60" />
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-2">Ready to Draft Your Export Sheet</h3>
                <p className="text-sm max-w-md mx-auto text-gray-400 leading-relaxed mb-6">
                  Provide your target destination and category specifications in the form. The AI Trade Consultant will construct a custom B2B export profile detailing container configs, documentation, and HS codes tailored for your market corridor.
                </p>
                <div className="grid grid-cols-3 gap-4 w-full max-w-md text-left text-xs bg-brand-dark/65 border border-gray-800 p-4 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-brand-green-light font-bold">100% Free</span>
                    <span className="text-gray-400">Custom analysis</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-gray-800 pl-4">
                    <span className="text-brand-green-light font-bold">FOB / CIF</span>
                    <span className="text-gray-400">Incoterm options</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-gray-800 pl-4">
                    <span className="text-brand-green-light font-bold">A-Grade</span>
                    <span className="text-gray-400">Indian standards</span>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="border border-gray-800 bg-brand-dark/60 rounded-2xl p-8 text-center flex flex-col items-center justify-center h-full">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-brand-green/30 border-t-brand-green-light rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Ship className="w-6 h-6 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-2">Analyzing Sourcing Parameters</h3>
                <div className="max-w-md mx-auto space-y-2 mt-4 text-xs text-gray-400 font-mono">
                  <p className="flex items-center justify-center gap-1.5 animate-pulse">
                    <span>✓ Checking HS Code chapters for {formData.productCategory}...</span>
                  </p>
                  <p className="flex items-center justify-center gap-1.5 animation-delay-200 animate-pulse">
                    <span>✓ Configuring sea-freight lanes from Chennai Port (INMAA)...</span>
                  </p>
                  <p className="flex items-center justify-center gap-1.5 animation-delay-400 animate-pulse">
                    <span>✓ Compiling compliance checklists for {formData.country}...</span>
                  </p>
                </div>
              </div>
            )}

            {!loading && result && (
              <div className="bg-white text-brand-dark rounded-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
                {/* Proposal Header Banner */}
                <div className="bg-brand-green text-white p-5 sm:p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                      <Sparkles className="w-5.5 h-5.5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display leading-tight">Pre-Quotation Consultation Sheet</h3>
                      <p className="text-xs text-emerald-200">Sourcing Corridor: India to {formData.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono bg-brand-green-dark px-2.5 py-1 rounded-md border border-emerald-500/20 text-emerald-300 font-bold">
                      Draft ID: {Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                </div>

                {/* Proposal Content */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[500px] overflow-y-auto">
                  {/* Greeting Summary */}
                  <div>
                    <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Executive Consultation Summary</h4>
                    <p className="text-sm text-gray-700 bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  {/* Shipping Parameters Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-gray-100 bg-gray-50 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Suggested Incoterm</span>
                      <span className="text-sm font-bold text-brand-green">{result.suggestedIncoterm}</span>
                    </div>
                    <div className="border border-gray-100 bg-gray-50 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Sourcing Origin Port</span>
                      <span className="text-sm font-bold text-brand-green font-mono">{result.shippingPort}</span>
                    </div>
                    <div className="border border-gray-100 bg-gray-50 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Customs HS Code Class</span>
                      <span className="text-sm font-bold text-brand-green font-mono">{result.hsCodeRecommendation}</span>
                    </div>
                    <div className="border border-gray-100 bg-gray-50 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Viable Logistical MOQ</span>
                      <span className="text-sm font-bold text-brand-green">{result.estimatedMoq}</span>
                    </div>
                  </div>

                  {/* Required Board Clearances */}
                  <div>
                    <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2.5">Statutory Board Documents Required (India/Export Side)</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.documentationRequired.map((doc, idx) => (
                        <span key={idx} className="bg-slate-100 text-brand-dark text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green-light"></span>
                          <span>{doc}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Packaging Standards */}
                  <div>
                    <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Seaworthy Packing Suggestion</h4>
                    <p className="text-sm text-gray-600 bg-emerald-50/20 border border-emerald-100/50 p-4 rounded-xl leading-relaxed">
                      {result.customsPackagingSuggestions}
                    </p>
                  </div>
                </div>

                {/* Proposal Footer Action */}
                <div className="border-t border-gray-100 p-5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry Logged. Sourcing department notified.</span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/919944823311?text=Hi%20Prabhu,%20I%20just%20ran%20an%20AI%20sourcing%20draft%20for%20${encodeURIComponent(formData.specificProduct)}%20to%20${encodeURIComponent(formData.country)}.%20Please%20give%20me%20your%20best%20wholesale%20CIF%20rates.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-colors"
                    >
                      WhatsApp Us
                    </a>
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-light text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
