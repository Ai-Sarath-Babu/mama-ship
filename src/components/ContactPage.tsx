import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, CheckCircle2, Send, Clock, Globe, ArrowRight, Ship } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    country: "",
    email: "",
    whatsapp: "",
    productCategory: "Eco Dining Ware",
    specificProduct: "",
    quantity: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [karaikudiTime, setKaraikudiTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: "Asia/Kolkata" };
      const kolkataDateStr = new Date().toLocaleString("en-US", options);
      const kolkataDate = new Date(kolkataDateStr);
      
      const day = kolkataDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = kolkataDate.getHours();
      
      // Format the time string
      const timeString = kolkataDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });

      // Check availability: Monday (1) to Saturday (6) from 09:00 to 19:00 (7:00 PM)
      const isWorkingDay = day >= 1 && day <= 6;
      const isWorkingHour = hours >= 9 && hours < 19;
      
      setKaraikudiTime(timeString);
      setIsAvailable(isWorkingDay && isWorkingHour);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          leadSource: "contact-page"
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSuccess(true);
      setFormData({
        companyName: "",
        contactPerson: "",
        country: "",
        email: "",
        whatsapp: "",
        productCategory: "Eco Dining Ware",
        specificProduct: "",
        quantity: "",
        message: ""
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow bg-slate-50">
      {/* Page Title */}
      <div className="relative bg-brand-dark py-16 overflow-hidden border-b-4 border-brand-green-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/50 via-brand-dark to-brand-dark"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl font-bold font-display text-white">Contact Our Sourcing Office</h1>
          <p className="mt-3 text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Have an export inquiry or custom OEM design spec? Initiate direct contact with our trade directors in Tamil Nadu, India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Coordinates & Sourcing Headquarters */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-brand-green tracking-wider block">Headquarters</span>
              <h2 className="text-2xl font-bold text-brand-dark font-display leading-tight">Corporate Headquarters & Operations</h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Yalini Exim operates coordinates from both our administrative base in Karaikudi and our shipment consolidation offices in Chennai, India.
              </p>
            </div>

            {/* Address Cards */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200/60 p-5 rounded-xl shadow-2xs flex gap-4">
                <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark mb-1">Administrative Headquarters</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                    No.8, Yalini Illam,<br />
                    Chockalinga nagar 1st street, Burma colony,<br />
                    Karaikudi, Tamil Nadu - 630002, India.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200/60 p-5 rounded-xl shadow-2xs flex gap-4">
                <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full text-left">
                  <h3 className="text-sm font-bold text-brand-dark mb-1">Business Sourcing Hours</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    Monday to Saturday: <strong className="text-brand-dark">09:00 AM - 07:00 PM (IST)</strong><br />
                    B2B Client Services: <strong className="text-brand-dark">24x7 WhatsApp & Email Intake</strong>
                  </p>
                  
                  {/* Real-time Status Card */}
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-lg flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider block">Karaikudi Local Time</span>
                      <span className="text-xs font-mono font-bold text-brand-dark tracking-tight bg-white px-2 py-0.5 rounded border border-gray-200 shadow-3xs inline-block">
                        {karaikudiTime || "Loading..."}
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider block mb-1">Office Status</span>
                      {isAvailable ? (
                        <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Available</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>Offline</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="bg-gradient-to-br from-brand-dark to-emerald-950 text-white rounded-2xl p-6 border border-emerald-800/10 shadow-lg space-y-4">
              <h3 className="text-sm font-bold font-display text-brand-green-light uppercase tracking-wider">Direct Sourcing Links</h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-brand-green-light" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-mono">Mobile & WhatsApp</span>
                    <a href="tel:+919944823311" className="font-bold text-white hover:text-brand-green-light transition-colors text-sm">
                      +91 99448 23311
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-brand-green-light" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-mono">Official Email</span>
                    <a href="mailto:prabhu@yaliniexim.com" className="font-bold text-white hover:text-brand-green-light transition-colors text-sm">
                      prabhu@yaliniexim.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-brand-green-light" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-mono">Corporate Port Gateway</span>
                    <span className="font-bold text-white text-sm">Chennai Sea Port (INMAA), India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: B2B Sourcing Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-brand-dark">Submit an Export Sourcing Request</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Provide your company details, cargo destination, and required quantities. Our logistics team will formulate the FOB/CIF specs and documentation checklist within 12 hours.
                </p>
              </div>

              {success ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark">RFQ Successfully Transmitted!</h4>
                    <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Yalini Exim. Director Prabhu and our export clearance team are reviewing your product request. A complete pre-quote consult sheet and FOB pricing has been scheduled for your inbox.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-1 bg-brand-green hover:bg-brand-green-light text-white font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <span>Submit Another Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  {/* Grid fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Contact Person *</label>
                      <input 
                        type="text" 
                        name="contactPerson"
                        required
                        placeholder="e.g. John Miller"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Company Name</label>
                      <input 
                        type="text" 
                        name="companyName"
                        placeholder="e.g. Miller Logistics Ltd"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Destination Country *</label>
                      <input 
                        type="text" 
                        name="country"
                        required
                        placeholder="e.g. United Kingdom"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="e.g. sourcing@miller.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">WhatsApp / Phone *</label>
                      <input 
                        type="tel" 
                        name="whatsapp"
                        required
                        placeholder="e.g. +44 20 7946 0958"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Product Category *</label>
                      <select 
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white cursor-pointer"
                      >
                        <option value="Eco Dining Ware">Eco Dining Ware (Bagasse & Corn Starch)</option>
                        <option value="FMCG & Groceries">FMCG & Premium Groceries</option>
                        <option value="Custom Printed Containers">Custom Printed Plastic Containers</option>
                        <option value="Natural Stones">Natural Indian Granites & Marbles</option>
                        <option value="Other Wholesale">Other Wholesale Sourcing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Specific Product Details</label>
                      <input 
                        type="text" 
                        name="specificProduct"
                        placeholder="e.g. 9-inch Bagasse 3-comp plates"
                        value={formData.specificProduct}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Target Cargo Quantity</label>
                      <input 
                        type="text" 
                        name="quantity"
                        placeholder="e.g. 50,000 pcs or 1x20ft Container"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-dark uppercase tracking-wider mb-1.5">Custom Packaging / Logistics Requirements</label>
                    <textarea 
                      name="message"
                      rows={4}
                      placeholder="Specify your preferred Incoterm (FOB or CIF), seaport of destination, private labeling design requests, or certifications required."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  {error && (
                    <div className="text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Transmitting RFQ Details...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmitt RFQ & Initiate Sourcing Channel</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Shipment Corridor Section */}
        <div className="mt-16 bg-white border border-gray-200/60 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-brand-green tracking-wider block">Global Sourcing Logistics</span>
              <h3 className="text-lg font-bold font-display text-brand-dark mt-0.5">Maritime Cargo Lanes Out Of Chennai Sea Port (INMAA)</h3>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-brand-green text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
              <Ship className="w-3.5 h-3.5" />
              <span>Direct Ports Network</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
              <span className="text-[10px] font-bold uppercase text-brand-green block mb-1">Lane 1: United Kingdom</span>
              <h4 className="text-sm font-bold text-brand-dark mb-1">INMAA → GBLON</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Port of London & Felixstowe. Estimated Ocean transit: 24-28 days. Full Customs board clearance provided.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
              <span className="text-[10px] font-bold uppercase text-brand-green block mb-1">Lane 2: Singapore</span>
              <h4 className="text-sm font-bold text-brand-dark mb-1">INMAA → SGSIN</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Port of Singapore. Estimated Ocean transit: 5-7 days. Express weekly vessel loading & consolidation.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
              <span className="text-[10px] font-bold uppercase text-brand-green block mb-1">Lane 3: Canada East/West</span>
              <h4 className="text-sm font-bold text-brand-dark mb-1">INMAA → CAVAN</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Port of Vancouver / Toronto. Estimated Ocean transit: 28-35 days. Complete labeling and FDA compliance check.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
              <span className="text-[10px] font-bold uppercase text-brand-green block mb-1">Lane 4: New Zealand</span>
              <h4 className="text-sm font-bold text-brand-dark mb-1">INMAA → NZAKL</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Port of Auckland. Estimated Ocean transit: 21-25 days. Heavy-duty seaworthy plywood pallet packing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
