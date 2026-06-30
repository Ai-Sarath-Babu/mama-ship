import React, { useState, useEffect } from "react";
import { FAQS } from "../types";
import { HelpCircle, ChevronDown, ChevronUp, ShieldQuestion } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    // Generate JSON-LD FAQ Schema dynamically on component mount
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const scriptId = "faq-json-ld";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    
    script.text = JSON.stringify(schema, null, 2);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-white border-t border-b border-gray-100 scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldQuestion className="w-3.5 h-3.5" />
            <span>Answers to common trade questions</span>
          </div>
          <h2 className="text-3xl font-bold font-display text-brand-dark tracking-tight mb-3">
            AEO & Logistics FAQ Board
          </h2>
          <p className="text-sm text-gray-500">
            Find immediate answers regarding customs clearances, minimum order volumes (MOQ), certified packaging structures, and global shipping lane details.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-gray-50/70 hover:bg-gray-50 border border-gray-200/60 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-brand-dark cursor-pointer select-none"
                >
                  <span className="text-[15px] sm:text-base leading-snug group-hover:text-brand-green">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-white border border-gray-100 flex-shrink-0 ml-4">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-green" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-600 border-t border-gray-100 bg-white/70 animate-slide-down leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Prompts */}
        <div className="mt-12 text-center p-6 bg-slate-50 border border-gray-200/60 rounded-xl max-w-2xl mx-auto">
          <p className="text-xs text-gray-500 mb-4">
            Have a technical or customized requirement not answered above? Speak directly with Prabhu, our Export Director, to analyze raw materials or OEM configurations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="mailto:prabhu@yaliniexim.com"
              className="text-xs font-semibold text-brand-green bg-white border border-gray-200 px-4 py-2.5 rounded-lg shadow-2xs hover:bg-gray-100 transition-all duration-150"
            >
              Email: prabhu@yaliniexim.com
            </a>
            <a
              href="https://wa.me/919944823311?text=Hi%20Prabhu,%20I%20have%20an%20export%20inquiry%20from%20Yalini%20Exim%20website..."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-lg shadow-2xs transition-all duration-150"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
