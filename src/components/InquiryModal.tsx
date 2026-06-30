import React, { useState, useEffect } from "react";
import { PRODUCT_CATEGORIES, PRODUCTS, Product } from "../types";
import { X, CheckCircle, Send, Loader2, Globe, ShieldCheck, Mail, Phone } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProduct?: Product | null;
}

export default function InquiryModal({ isOpen, onClose, preSelectedProduct }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    country: "",
    email: "",
    whatsapp: "",
    productCategory: "",
    specificProduct: "",
    quantity: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill fields if a specific product was clicked
  useEffect(() => {
    if (preSelectedProduct) {
      setFormData({
        companyName: "",
        contactPerson: "",
        country: "",
        email: "",
        whatsapp: "",
        productCategory: preSelectedProduct.category,
        specificProduct: preSelectedProduct.name,
        quantity: "",
        message: `Inquiry regarding: ${preSelectedProduct.name}. Sizing required, please share FOB prices and MOQ shipping constraints.`
      });
    } else {
      // Clear form except user identity if modal is opened generic
      setFormData(prev => ({
        ...prev,
        productCategory: "",
        specificProduct: "",
        quantity: "",
        message: ""
      }));
    }
  }, [preSelectedProduct, isOpen]);

  if (!isOpen) return null;

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
    if (!formData.contactPerson || !formData.country || !formData.email || !formData.whatsapp) {
      setError("Please fill out all required fields marked with *");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          leadSource: preSelectedProduct ? "product-inquiry" : "direct"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit B2B inquiry. Please verify credentials.");
      }

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please contact our support.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
  };

  const selectedCategoryProducts = formData.productCategory
    ? PRODUCTS.filter(p => p.category === formData.productCategory)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Banner */}
        <div className="bg-brand-green text-white p-6 relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs font-mono uppercase tracking-widest text-brand-green-light font-bold mb-1">
            B2B RFQ | Export Board
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">
            Request Export Quotation
          </h3>
          <p className="text-xs text-emerald-200 mt-1"> Sourcing directly from certified Indian manufacturers.</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[75vh]">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-brand-dark font-display">Inquiry Registered Successfully!</h4>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                Thank you for choosing Yalini Exim. Our Export Sourcing Director, **Mr. Prabhu**, has received your wholesale RFQ. We will compile the FOB/CIF rates, check shipping line availability, and send a structured commercial quote to **{formData.email}** within 12 hours.
              </p>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs text-left max-w-sm mx-auto space-y-1">
                <p className="font-semibold text-brand-dark">Instant WhatsApp Sourcing Escalation:</p>
                <p className="text-gray-500">Need pricing immediately? Skip wait times by forwarding your query directly on WhatsApp:</p>
                <a
                  href={`https://wa.me/919944823311?text=Hi%20Prabhu,%20I%20just%20submitted%20a%20B2B%20export%20inquiry%20from%20${encodeURIComponent(formData.companyName || "my company")}%20regarding%20${encodeURIComponent(formData.specificProduct || "your products")}.%20Please%20expedite.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-bold text-xs shadow-xs"
                >
                  Message Prabhu Directly
                </a>
              </div>

              <button
                onClick={handleClose}
                className="mt-6 bg-brand-green hover:bg-brand-green-light text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-800 text-xs rounded-r-lg font-medium">
                  {error}
                </div>
              )}

              {/* Identity fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="e.g. Prabhu Dev"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Elite Imports Ltd"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="buyer@domain.com"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="e.g. +44 7911 123456"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Destination & Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Target Country *</label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g. Canada (Toronto)"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Required Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 1x20ft FCL container"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Product selectors */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Product Category *</label>
                <select
                  name="productCategory"
                  required
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                >
                  <option value="">-- Select Category --</option>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Specific Product *</label>
                {formData.productCategory ? (
                  <select
                    name="specificProduct"
                    required
                    value={formData.specificProduct}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                  >
                    <option value="">-- Select Product --</option>
                    {selectedCategoryProducts.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Custom OEM Specification">Custom Sizing / OEM Sourcing</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="specificProduct"
                    required
                    value={formData.specificProduct}
                    onChange={handleInputChange}
                    placeholder="Please select a category first..."
                    className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-hidden text-gray-400 cursor-not-allowed"
                    disabled
                  />
                )}
              </div>

              {/* message */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Message / Port / Sizing details</label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter specific custom configurations, brand logo print requirements, or preferred delivery ports..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all resize-none"
                />
              </div>

              {/* B2B compliance highlights */}
              <div className="bg-slate-50 border border-gray-200/50 rounded-lg p-3 text-[11px] text-gray-500 space-y-1">
                <p className="font-semibold text-brand-dark">✓ Sourcing Protocol Integrity</p>
                <p>By submitting this RFQ, Yalini Exim prepares standard commercial documents for custom borders of UK, Canada, NZ, and Singapore as required.</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-brand-dark font-semibold py-3 rounded-lg text-sm cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Logging RFQ...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
