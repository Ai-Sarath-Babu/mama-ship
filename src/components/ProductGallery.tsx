import React, { useState, useEffect } from "react";
import { PRODUCT_CATEGORIES, PRODUCTS, Product } from "../types";
import { Filter, Eye, FileText, ArrowRight, X, ChevronRight, ShieldCheck, Download } from "lucide-react";
import { translations, Language } from "../lib/translations";

interface ProductGalleryProps {
  onInquireProduct: (product: Product) => void;
  onOpenQuoteModal: () => void;
  detectedCountry: { name: string; code: string; category: string } | null;
  lang: Language;
}

export default function ProductGallery({ 
  onInquireProduct, 
  onOpenQuoteModal,
  detectedCountry,
  lang 
}: ProductGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (detectedCountry && detectedCountry.category) {
      setSelectedCategory(detectedCountry.category);
    }
  }, [detectedCountry]);

  const filteredProducts = selectedCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-gray-55 bg-gray-50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5 text-brand-green" />
              <span>Sourcing & Sizing Sheet Available</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight mb-2">
              B2B International Product Catalog
            </h2>
            <p className="text-gray-600">
              Browse our diverse, premium selection of Indian-sourced products exported worldwide. Sourced directly from manufacturers with rigorous quality controls and certified packing.
            </p>
          </div>
          <button 
            onClick={onOpenQuoteModal}
            className="flex-shrink-0 flex items-center gap-2 bg-brand-green hover:bg-brand-green-light text-white px-5 py-3 rounded-lg font-bold text-sm shadow-sm transition-all duration-200 cursor-pointer border border-transparent"
          >
            <Download className="w-4.5 h-4.5" />
            <span>Request Full Catalog & Pricelist</span>
          </button>
        </div>

        {/* Dynamic country targeting optimizer alert */}
        {detectedCountry && (
          <div className="mb-8 p-4 bg-emerald-50/70 border border-brand-green/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in text-left">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {detectedCountry.code}
              </span>
              <div>
                <p className="text-sm font-bold text-brand-dark">
                  {translations[lang].sourcingOptimizationText} <span className="text-brand-green font-black">{detectedCountry.name}</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {translations[lang].recommendedCategoriesText}
                </p>
              </div>
            </div>
            
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-md border border-gray-150">
              Target active: ?country={detectedCountry.code}
            </div>
          </div>
        )}

        {/* Category Quick Filter Grid */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-brand-green text-white shadow-md shadow-emerald-900/10"
                  : "bg-white text-gray-600 hover:bg-gray-100 hover:text-brand-dark border border-gray-200/60"
              }`}
            >
              All Categories ({PRODUCTS.length})
            </button>
            {PRODUCT_CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-brand-green text-white shadow-md shadow-emerald-900/10"
                      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-brand-dark border border-gray-200/60"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const categoryObj = PRODUCT_CATEGORIES.find(c => c.id === product.category);
            return (
              <div 
                key={product.id}
                className="bg-white rounded-xl border border-gray-200/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden"
              >
                {/* Visual Category Banner Header instead of mock images for premium design */}
                <div className={`h-28 ${categoryObj?.imagePlaceholder || 'bg-brand-green'} p-5 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-8 -translate-y-8 pointer-events-none"></div>
                  <span className="text-[10px] bg-white/20 backdrop-blur-md text-white font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm self-start">
                    {categoryObj?.name || "Premium Export"}
                  </span>
                  <div className="mt-auto">
                    <span className="text-xs font-mono text-white/80">HS Code: {product.specifications.hsCode.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-green transition-colors leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights or specs preview */}
                  <div className="border-t border-b border-gray-100 py-3.5 mb-6 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Export Port:</span>
                      <span className="font-semibold text-brand-dark font-mono text-[11px]">Chennai Port (INMAA)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Standard MOQ:</span>
                      <span className="font-bold text-brand-green">{product.specifications.moq}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2.5 mt-auto">
                    <button
                      onClick={() => setActiveProduct(product)}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-brand-dark font-semibold text-xs py-2.5 px-3 rounded-lg transition-all duration-150 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Specifications</span>
                    </button>
                    <button
                      onClick={() => onInquireProduct(product)}
                      className="flex-1 inline-flex items-center justify-center gap-1 bg-brand-green hover:bg-brand-green-light text-white font-semibold text-xs py-2.5 px-3 rounded-lg transition-all duration-150 cursor-pointer shadow-xs shadow-emerald-950/20"
                    >
                      <span>Inquire Bulk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Specifications Modal Popup */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-brand-green text-white p-6 relative">
              <button 
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-xs font-mono text-white/75 uppercase tracking-wider font-semibold mb-1">
                Technical Specification Sheet
              </div>
              <h3 className="text-2xl font-bold font-display leading-tight">
                {activeProduct.name}
              </h3>
              <p className="text-xs text-brand-green-light font-semibold tracking-wider mt-1 uppercase">
                Category: {PRODUCT_CATEGORIES.find(c => c.id === activeProduct.category)?.name}
              </p>
            </div>

            {/* Spec Sheet Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Item Overview</h4>
                <p className="text-sm text-brand-dark leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {activeProduct.description}
                </p>
              </div>

              {/* Data Specifications Table */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3">Custom Sourcing Specifications</h4>
                <div className="border border-gray-200/60 rounded-xl overflow-hidden font-sans text-sm">
                  <div className="grid grid-cols-3 border-b border-gray-100">
                    <div className="col-span-1 bg-slate-50 p-3 font-semibold text-brand-dark border-r border-gray-100">Material</div>
                    <div className="col-span-2 p-3 text-gray-700">{activeProduct.specifications.material}</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-100">
                    <div className="col-span-1 bg-slate-50 p-3 font-semibold text-brand-dark border-r border-gray-100">Export Sizes</div>
                    <div className="col-span-2 p-3 text-gray-700">
                      <div className="flex flex-wrap gap-1.5">
                        {activeProduct.specifications.sizes.map((s, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-100">
                    <div className="col-span-1 bg-slate-50 p-3 font-semibold text-brand-dark border-r border-gray-100">Packaging Specs</div>
                    <div className="col-span-2 p-3 text-gray-700">{activeProduct.specifications.packaging}</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-100">
                    <div className="col-span-1 bg-slate-50 p-3 font-semibold text-brand-dark border-r border-gray-100">Export HS Code</div>
                    <div className="col-span-2 p-3 font-mono text-xs text-brand-green font-bold">{activeProduct.specifications.hsCode}</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-100">
                    <div className="col-span-1 bg-slate-50 p-3 font-semibold text-brand-dark border-r border-gray-100">Sourcing Port</div>
                    <div className="col-span-2 p-3 text-gray-700 font-mono text-xs">{activeProduct.specifications.originPort}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="col-span-1 bg-slate-50 p-3 font-semibold text-brand-dark border-r border-gray-100">Standard MOQ</div>
                    <div className="col-span-2 p-3 font-bold text-brand-green">{activeProduct.specifications.moq}</div>
                  </div>
                </div>
              </div>

              {/* B2B Export Features */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3">Key Sourcing Advantages</h4>
                <ul className="space-y-2">
                  {activeProduct.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-gray-100 p-5 bg-slate-55 bg-slate-50/50 flex gap-3">
              <button
                onClick={() => setActiveProduct(null)}
                className="flex-1 bg-white hover:bg-gray-50 border border-gray-200/80 rounded-lg py-3 text-sm font-semibold text-brand-dark cursor-pointer transition-colors"
              >
                Close Specs
              </button>
              <button
                onClick={() => {
                  const prod = activeProduct;
                  setActiveProduct(null);
                  onInquireProduct(prod);
                }}
                className="flex-1 bg-brand-green hover:bg-brand-green-light text-white rounded-lg py-3 text-sm font-bold shadow-md shadow-emerald-950/20 cursor-pointer hover:-translate-y-0.5 transition-all duration-150 border border-transparent hover:border-white"
              >
                Inquire For FOB/CIF Price
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
