import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Globe, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { FAQS } from "../types";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Map FAQS with categories to make the page highly professional
  const categorizedFaqs = useMemo(() => {
    return FAQS.map((faq, index) => {
      let category = "General";
      const q = faq.question.toLowerCase();
      
      if (q.includes("biodegradable") || q.includes("bagasse") || q.includes("compostable") || q.includes("starch")) {
        category = "Eco Dining Ware";
      } else if (q.includes("fmcg") || q.includes("spice") || q.includes("food") || q.includes("grocery")) {
        category = "Groceries & Spices";
      } else if (q.includes("moq") || q.includes("labeling") || q.includes("oem")) {
        category = "Custom OEM & MOQs";
      } else if (q.includes("country") || q.includes("countries") || q.includes("documentation") || q.includes("port") || q.includes("shipping") || q.includes("incoterm")) {
        category = "Logistics & Clearance";
      }
      return { ...faq, category, globalIndex: index };
    });
  }, []);

  const categories = ["All", "Eco Dining Ware", "Groceries & Spices", "Custom OEM & MOQs", "Logistics & Clearance"];

  const filteredFaqs = useMemo(() => {
    return categorizedFaqs.filter(faq => {
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categorizedFaqs, selectedCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex-grow bg-slate-50">
      {/* Hero Banner */}
      <div className="relative bg-brand-dark py-16 overflow-hidden border-b-4 border-brand-green-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/50 via-brand-dark to-brand-dark"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1 bg-brand-green-light/10 text-brand-green-light px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support Headquarters</span>
          </div>
          <h1 className="text-4xl font-bold font-display text-white">B2B Knowledge & FAQ Database</h1>
          <p className="mt-3 text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Search our comprehensive, statutory trade guides regarding customs clearance, sugarcane material tolerances, and freight structures.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Search & Category Tabs Row */}
        <div className="space-y-6 mb-10">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              placeholder="Search trade terms, packing criteria, FDA checks, or specific port info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 shadow-sm rounded-xl pl-11 pr-4 py-3.5 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? "bg-brand-green text-white shadow-md shadow-emerald-950/15" 
                    : "bg-white text-gray-600 border border-gray-200/85 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count indicator */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4 font-semibold px-1">
          <span>Found {filteredFaqs.length} active trade questions</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="text-brand-green hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="bg-white border border-gray-200/60 rounded-2xl shadow-2xs overflow-hidden divide-y divide-gray-150">
            {filteredFaqs.map((faq) => {
              const isOpen = openIndex === faq.globalIndex;
              return (
                <div key={faq.globalIndex} className="transition-all hover:bg-slate-50/40">
                  {/* Question Header */}
                  <button
                    onClick={() => toggleAccordion(faq.globalIndex)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-brand-green tracking-wider bg-brand-green/10 px-2 py-0.5 rounded-sm">
                        {faq.category}
                      </span>
                      <h3 className="text-sm font-bold text-brand-dark leading-snug pt-1">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="p-1 rounded-full bg-slate-100 text-gray-500 mt-3">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Answer Content */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs text-gray-600 leading-relaxed bg-slate-50/30">
                      <div className="p-4 bg-emerald-50/20 border-l-4 border-brand-green rounded-r-xl">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-gray-200/60 rounded-2xl p-12 text-center space-y-3">
            <div className="text-gray-300 text-5xl font-light">?</div>
            <h4 className="text-sm font-bold text-brand-dark">No Sourcing Q&A Found</h4>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              We couldn't find any guidelines matching "<strong>{searchQuery}</strong>". Try searching for generic keywords like <i>MOQ</i>, <i>bagasse</i>, <i>FOB</i>, or <i>spice board</i>.
            </p>
          </div>
        )}

        {/* Dynamic Consultation CTA Card */}
        <div className="mt-12 bg-gradient-to-br from-brand-dark to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800/20 shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-left">
          <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops)) from-brand-green/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10">
            <h3 className="text-lg font-bold font-display">Still have unanswered regulatory or pricing queries?</h3>
            <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
              Ask our B2B trade assistant right away, or request our director, Mr. Prabhu, to review your specialized sourcing requirements.
            </p>
          </div>

          <div className="flex-shrink-0 relative z-10">
            <button
              onClick={() => {
                const element = document.getElementById("quote-assistant");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  // Fallback: trigger custom event or open modal
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }
              }}
              className="bg-brand-green hover:bg-brand-green-light text-white font-bold px-5 py-3 rounded-lg text-xs cursor-pointer transition-all flex items-center justify-center gap-1 hover:-translate-y-0.5 border border-transparent hover:border-white/30"
            >
              <span>Consult AI Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
