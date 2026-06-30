import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
// @ts-ignore
import yaliniLogo from "./assets/images/yalini_logo_1782803904536.jpg";
import Certifications from "./components/Certifications";
import ProductGallery from "./components/ProductGallery";
import QuoteAssistant from "./components/QuoteAssistant";
import FAQSection from "./components/FAQSection";
import StickyCTA from "./components/StickyCTA";
import InquiryModal from "./components/InquiryModal";
import ExitIntentPopup from "./components/ExitIntentPopup";
import AdminPanel from "./components/AdminPanel";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import FAQPage from "./components/FAQPage";
import BlogPage from "./components/BlogPage";
import TestimonialCarousel from "./components/TestimonialCarousel";
import LiveExportStatus from "./components/LiveExportStatus";
import ExportJourney from "./components/ExportJourney";
import InteractiveWorldMap from "./components/InteractiveWorldMap";
import { Product, PRODUCTS, COUNTRIES_SERVED } from "./types";
import { translations, Language } from "./lib/translations";
import { 
  Ship, ShieldCheck, BadgeDollarSign, Truck, FileText, Settings, Sparkles, 
  ChevronRight, Phone, Mail, MapPin, Globe, CheckCircle, ArrowRight, Download, Clock 
} from "lucide-react";

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'faqs' | 'blog'>('home');
  const [lang, setLang] = useState<Language>("en");
  const [detectedCountry, setDetectedCountry] = useState<{ name: string; code: string; category: string } | null>(null);
  const [karaikudiTime, setKaraikudiTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: "Asia/Kolkata" };
      const kolkataDateStr = new Date().toLocaleString("en-US", options);
      const kolkataDate = new Date(kolkataDateStr);
      
      const day = kolkataDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = kolkataDate.getHours();
      
      const timeString = kolkataDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });

      const isWorkingDay = day >= 1 && day <= 6;
      const isWorkingHour = hours >= 9 && hours < 19;
      
      setKaraikudiTime(timeString);
      setIsAvailable(isWorkingDay && isWorkingHour);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryCodeParam = params.get("country")?.toUpperCase() || params.get("region")?.toUpperCase();
    
    if (countryCodeParam) {
      // Find matches in COUNTRIES_SERVED or map manually
      const matched = COUNTRIES_SERVED.find(c => c.code === countryCodeParam);
      let name = matched ? matched.name : "";
      let code = countryCodeParam;
      
      if (!name) {
        if (code === "QA") name = "Qatar";
        else if (code === "BH") name = "Bahrain";
        else if (code === "UK") { code = "GB"; name = "United Kingdom"; }
        else if (code === "UAE") { code = "AE"; name = "United Arab Emirates"; }
        else name = code;
      }

      // Map to optimized categories
      let category = "all";
      if (["GB", "UK"].includes(code)) category = "biodegradable";
      else if (["SG"].includes(code)) category = "fmcg";
      else if (["NZ"].includes(code)) category = "cornstarch";
      else if (["CA"].includes(code)) category = "grocery-supermarket";
      else if (["AE", "SA", "OM", "KW", "QA", "BH", "GCC", "UAE"].includes(code)) category = "fmcg";
      else if (["US", "USA"].includes(code)) category = "biodegradable";
      else if (["AU"].includes(code)) category = "biodegradable";
      
      setDetectedCountry({ name, code, category });
      
      // Auto toggle to Arabic if the region matches GCC markets
      if (["AE", "SA", "OM", "KW", "QA", "BH", "GCC", "UAE"].includes(code)) {
        setLang("ar");
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Dynamic SEO JSON-LD Schema Markup Injection
  useEffect(() => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Yalini Exim",
      "image": "https://yaliniexim.com/yalini_logo.jpg",
      "@id": "https://yaliniexim.com/#localbusiness",
      "url": window.location.origin,
      "telephone": "+919944823311",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Karaikudi Main Road",
        "addressLocality": "Karaikudi",
        "addressRegion": "Tamil Nadu",
        "postalCode": "630001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.0748",
        "longitude": "78.7853"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      },
      "sameAs": [
        "https://wa.me/919944823311"
      ]
    };

    const productCollectionSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Yalini Exim Export Portfolios",
      "description": "Premium commercial grade Indian export product collections optimized for international B2B wholesale buyers.",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Eco-Friendly Sugarcane Bagasse Tableware",
          "description": "Compostable, heavy-duty plates and bowls sourced from premium sugarcane pulp fiber."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Areca Leaf Organic Plates",
          "description": "100% natural, chemical-free, biodegradable dining solutions crafted from fallen palm fronds."
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Coir Pith & Coconut Husk Growing Substrates",
          "description": "High-expansion coco coir blocks engineered for professional greenhouse growers and horticultural distributors."
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Premium Sona Masoori Rice & Agro Commodities",
          "description": "Geographical Indication (GI) certified rice grains, perfectly aged and moisture-controlled."
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "South Indian Polished Granite & Architectural Marble",
          "description": "High-durability dimensional slabs and custom structural tiles directly from quarries."
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What custom sourcing capabilities does Yalini Exim offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yalini Exim provides comprehensive private labeling, custom molds for bagasse tableware, custom slab sizing for granite, and tailor-made retail and bulk packaging options with direct delivery to Chennai Port."
          }
        },
        {
          "@type": "Question",
          "name": "How are shipping logistics and documentation managed for global buyers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We operate from the Chennai INMAA shipping corridor, taking full care of all phytosanitary certifications, certificate of origin, APEDA, FSSAI customs compliance, and direct shipment tracing."
          }
        },
        {
          "@type": "Question",
          "name": "Can I request samples before placing a container-load order?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Yalini Exim welcomes global buyers to request physical samples of eco-dining ware and agro products. Sourcing consultants coordinate express courier dispatch for fast validation."
          }
        }
      ]
    };

    const createScript = (id: string, schema: object) => {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema, null, 2);
    };

    createScript("schema-local-business", localBusinessSchema);
    createScript("schema-product-collection", productCollectionSchema);
    createScript("schema-faq", faqSchema);

    return () => {
      const ids = ["schema-local-business", "schema-product-collection", "schema-faq"];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  const t = translations[lang];

  const handleOpenGenericQuote = () => {
    setSelectedProduct(null);
    setIsQuoteOpen(true);
  };

  const handleInquireProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsQuoteOpen(true);
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-brand-green selection:text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* 1. Header & Navigation */}
      <Navbar 
        onOpenQuoteModal={handleOpenGenericQuote} 
        onOpenAdmin={handleOpenAdmin} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
      />

      {currentPage === 'home' ? (
        <>
          {/* 2. Hero Section */}
      <section 
        id="hero" 
        className="relative bg-brand-dark overflow-hidden py-24 lg:py-32 border-b-4 border-brand-green-light"
      >
        {/* Background Visual Graphics with Ambient Animations */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/60 via-brand-dark to-brand-dark"></div>
        <div className="absolute top-12 right-12 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green-light/15 border border-brand-green-light/20 rounded-full text-xs font-bold text-brand-green-light uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-green-light" />
                <span>{t.heroBadge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1]">
                {t.heroTitle1}<span className="text-brand-green-light">{t.heroTitleHighlight}</span>{t.heroTitle2}
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {t.heroDesc}
              </p>
              
              {/* Core visual B2B targets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-gray-300 font-medium">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                  <span>{t.benefitQuality}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                  <span>{t.benefitIncoterms}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-lg col-span-2 sm:col-span-1">
                  <CheckCircle className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                  <span>{t.benefitClearance}</span>
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleOpenGenericQuote}
                  className="bg-brand-green hover:bg-brand-green-light text-white font-bold px-8 py-4 rounded-lg text-sm shadow-lg shadow-emerald-950/40 border border-transparent hover:border-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{t.ctaRfq}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
                <a
                  href="#products"
                  className="bg-white hover:bg-gray-100 text-brand-dark font-bold px-8 py-4 rounded-lg text-sm text-center border border-gray-200 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t.ctaCatalog}
                </a>
                <a
                  href="https://wa.me/919944823311?text=Hi%20Prabhu,%20I%20am%20reviewing%20Yalini%20Exim%20and%20need%20bulk%20quotes..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-lg text-sm text-center transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-emerald-200" />
                  <span>{t.ctaWhatsapp}</span>
                </a>
              </div>
            </div>

            {/* Hero Right Content: Visual Bento Collage with Floating Glassmorphism */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full relative">
              <div className="col-span-1 space-y-4">
                <div className="glassmorphism animate-float-slow p-6 rounded-xl flex flex-col justify-between h-44 shadow-xl border border-white/20">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-green-light font-bold">{t.bentoEco}</span>
                  <div className="mt-auto text-left">
                    <h3 className="text-base font-bold text-white">{t.bentoEco}</h3>
                    <p className="text-[11px] text-gray-300 mt-0.5">{t.bentoEcoDesc}</p>
                  </div>
                </div>
                <div className="glassmorphism animate-float-reverse p-6 rounded-xl flex flex-col justify-between h-52 shadow-xl border border-white/20">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-green-light font-bold">{t.bentoStone}</span>
                  <div className="mt-auto text-left">
                    <h3 className="text-base font-bold text-white">{t.bentoStone}</h3>
                    <p className="text-[11px] text-gray-300 mt-0.5">{t.bentoStoneDesc}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 space-y-4 pt-6">
                <div className="glassmorphism animate-float-reverse p-6 rounded-xl flex flex-col justify-between h-52 shadow-xl border border-white/20">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-green-light font-bold">{t.bentoFmcg}</span>
                  <div className="mt-auto text-left">
                    <h3 className="text-base font-bold text-white">{t.bentoFmcg}</h3>
                    <p className="text-[11px] text-gray-300 mt-0.5">{t.bentoFmcgDesc}</p>
                  </div>
                </div>
                <div className="glassmorphism animate-float-slow p-6 rounded-xl flex flex-col justify-between h-44 shadow-xl border border-white/20">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-green-light font-bold">{t.bentoPrint}</span>
                  <div className="mt-auto text-left">
                    <h3 className="text-base font-bold text-white">{t.bentoPrint}</h3>
                    <p className="text-[11px] text-gray-300 mt-0.5">{t.bentoPrintDesc}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Value Props / Trust Section */}
      <section id="trust-pillars" className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            
            <div className="p-4 space-y-2 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-green/5 rounded-full flex items-center justify-center border border-brand-green/10">
                <Globe className="w-5 h-5 text-brand-green" />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">{t.pillar1Title}</h4>
              <p className="text-[11px] text-gray-500">{t.pillar1Desc}</p>
            </div>

            <div className="p-4 space-y-2 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-green/5 rounded-full flex items-center justify-center border border-brand-green/10">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">{t.pillar2Title}</h4>
              <p className="text-[11px] text-gray-500">{t.pillar2Desc}</p>
            </div>

            <div className="p-4 space-y-2 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-green/5 rounded-full flex items-center justify-center border border-brand-green/10">
                <BadgeDollarSign className="w-5 h-5 text-brand-green" />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">{t.pillar3Title}</h4>
              <p className="text-[11px] text-gray-500">{t.pillar3Desc}</p>
            </div>

            <div className="p-4 space-y-2 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-green/5 rounded-full flex items-center justify-center border border-brand-green/10">
                <Truck className="w-5 h-5 text-brand-green" />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">{t.pillar4Title}</h4>
              <p className="text-[11px] text-gray-500">{t.pillar4Desc}</p>
            </div>

            <div className="p-4 space-y-2 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-green/5 rounded-full flex items-center justify-center border border-brand-green/10">
                <FileText className="w-5 h-5 text-brand-green" />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">{t.pillar5Title}</h4>
              <p className="text-[11px] text-gray-500">{t.pillar5Desc}</p>
            </div>

            <div className="p-4 space-y-2 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-green/5 rounded-full flex items-center justify-center border border-brand-green/10">
                <Ship className="w-5 h-5 text-brand-green" />
              </div>
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">{t.pillar6Title}</h4>
              <p className="text-[11px] text-gray-500">{t.pillar6Desc}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. About Yalini Exim Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Left Visual */}
            <div className="lg:col-span-5 bg-slate-50 border border-gray-100 p-8 rounded-2xl relative shadow-xs">
              <div className="absolute top-4 left-4 w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center text-brand-gold font-bold font-display border border-brand-gold shadow-md">
                2023
              </div>
              <div className="space-y-6 pt-8">
                <blockquote className="text-base font-medium italic text-brand-green leading-relaxed">
                  "Established in 2023, Yalini Exim bridges the gap between reliable Indian agricultural/architectural cooperatives and global wholesale buyers, supermarkets, hospitality, and construction pipelines."
                </blockquote>
                <div className="border-t border-gray-150 pt-4 space-y-2 text-xs font-semibold text-brand-dark">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-brand-green" />
                    <span>Karaikudi, Tamilnadu - INDIA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4.5 h-4.5 text-brand-green" />
                    <span>prabhu@yaliniexim.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4.5 h-4.5 text-brand-green" />
                    <span>+91 99448 23311 (Mr. Prabhu)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Right Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-semibold uppercase tracking-wider">
                <span>Who We Are</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight leading-snug">
                Your Direct Trade Gateway for Premium Indian Goods
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Yalini Exim operates as a professional manufacturer-sourcing partner and bulk international supplier. Located in Tamil Nadu, India, we work in alignment with prominent statutory commodity boards to inspect and package high-fidelity items.
              </p>

              {/* Bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">Full Certification Integrity</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Direct FSSAI Exporter Central clearances, IEC code registration, and board licenses.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">Strict Quality Vetting</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Every batch of natural sugar bagasse or heavy black galaxy granite is structurally monitored.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">Flexible Cargo Options</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Accommodating Full Container Loads (FCL) as well as Less Container Loads (LCL) trials.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">Custom Private Labeling</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Embossed brand logos on biodegradable dinnerware, custom container print runs, etc.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Government Certifications (Very Prominent) */}
      <Certifications />

      {/* 6. Product Gallery */}
      <ProductGallery 
        onInquireProduct={handleInquireProduct} 
        onOpenQuoteModal={handleOpenGenericQuote}
        detectedCountry={detectedCountry}
        lang={lang}
      />

      {/* 7. Private Labeling / Custom OEM Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/15 text-brand-gold-light bg-brand-dark rounded-full text-xs font-semibold uppercase tracking-wider">
                <Settings className="w-3.5 h-3.5" />
                <span>B2B OEM Customization</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight leading-snug">
                Contract Sourcing & Private Label (OEM) Manufacturing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Maximize brand equity in your local market. Yalini Exim assists hospitality chains, retail brands, and food packaging distributors in building custom, white-labeled goods.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-gray-100 flex gap-3.5 items-start">
                  <span className="text-lg font-bold text-brand-green bg-white shadow-xs w-8 h-8 rounded-full flex items-center justify-center border border-gray-150">1</span>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">Logo Embossing & Plate Engraving</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Engrave custom corporate logos directly onto Sugarcane Bagasse plates, lids, or take-away food container bases.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-gray-100 flex gap-3.5 items-start">
                  <span className="text-lg font-bold text-brand-green bg-white shadow-xs w-8 h-8 rounded-full flex items-center justify-center border border-gray-150">2</span>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">High-Resolution Container Print Runs</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Offset and high-fidelity screen printing on microwaveable PP takeaway food containers with food-grade non-toxic inks.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-gray-100 flex gap-3.5 items-start">
                  <span className="text-lg font-bold text-brand-green bg-white shadow-xs w-8 h-8 rounded-full flex items-center justify-center border border-gray-150">3</span>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">Custom Retail Packing Specifications</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Pack grocery items, rice, and spice powders in custom-branded retail pouches (1kg, 5kg BOPP bags) ready for supermarket display.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Badge */}
            <div className="lg:col-span-5 bg-brand-green p-8 sm:p-10 rounded-2xl text-white relative overflow-hidden shadow-xl border-2 border-brand-gold">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-12 -translate-y-12"></div>
              <h3 className="text-xl font-bold font-display text-white mb-4">OEM Sourcing Request Process</h3>
              <ul className="space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-brand-gold">Step A:</span>
                  <p className="text-gray-200">Share your vector designs (.AI/.PDF) and volume parameters via our B2B form.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-brand-gold">Step B:</span>
                  <p className="text-gray-200">Our factories prepare a customized technical CAD design for engraving moulds.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-brand-gold">Step C:</span>
                  <p className="text-gray-200">Prototype samples are manufactured and shipped to your location for verification.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-brand-gold">Step D:</span>
                  <p className="text-gray-200">Upon approval, bulk FCL/LCL processing is scheduled at Chennai shipping port.</p>
                </li>
              </ul>
              
              <button
                onClick={handleOpenGenericQuote}
                className="mt-8 w-full bg-white text-brand-green hover:bg-gray-100 py-3 rounded-lg font-bold text-xs transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <span>Initiate OEM Consult</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. AI Quote Assistant Section */}
      <QuoteAssistant />

      {/* 9. International Export & Interactive World Map Section */}
      <InteractiveWorldMap />

      {/* Dynamic Testimonial Carousel */}
      <TestimonialCarousel />

      {/* Live Export Status Indicators */}
      <LiveExportStatus />

      {/* Interactive Export Journey Step-by-Step Timeline */}
      <ExportJourney />

          {/* 10. FAQs Board */}
          <FAQSection />
        </>
      ) : (
        <>
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'faqs' && <FAQPage />}
          {currentPage === 'blog' && <BlogPage />}
        </>
      )}

      {/* 11. B2B Corporate Footer */}
      <footer className="bg-brand-dark text-white border-t-4 border-brand-green pt-16 pb-12 relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Corporate Summary (Col 1-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shadow-md bg-white">
                  <img 
                    src={yaliniLogo} 
                    alt="Yalini Exim Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-lg font-black font-display tracking-tight text-white">YALINI EXIM</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Established in 2023. Governed by central Indian export statutes, shipping high-fidelity dining ware, granite, and consolidated supermarket brand food preparations to international partners.
              </p>
              <div className="pt-2 text-[10px] text-gray-500 font-mono space-y-1">
                <p>IEC License: 4123005829</p>
                <p>GSTIN Registration: 33AAFCY8392J1Z3</p>
                <p>Central FSSAI Exporter: No. 12423000000000</p>
              </div>
            </div>

            {/* Quick Sourcing Categories (Col 5-6) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs uppercase font-bold text-brand-green-light tracking-wider">Export Categories</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#products" className="hover:text-white transition-colors">Sugarcane Bagasse Dining Ware</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Corn Starch Tableware</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Takeaway Food Containers</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">FMCG & Groceries Consolidation</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Restaurant Diner Tableware</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Indian Granite & Marbles</a></li>
              </ul>
            </div>

            {/* Address & Coordinates (Col 7-9) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs uppercase font-bold text-brand-green-light tracking-wider">Sourcing Headquarters</h4>
              <div className="space-y-3 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4.5 h-4.5 text-brand-green-light flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-semibold text-gray-300">
                    No.8, Yalini Illam,<br />
                    Chockalinga nagar 1st street, Burma colony,<br />
                    Karaikudi-630002, Tamilnadu - INDIA
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-green-light" />
                  <a href="mailto:prabhu@yaliniexim.com" className="hover:text-white transition-colors">
                    prabhu@yaliniexim.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-green-light" />
                  <a href="tel:+919944823311" className="hover:text-white transition-colors">
                    +91 99448 23311 (Director Prabhu)
                  </a>
                </div>

                {/* Active Sourcing Clock */}
                <div className="pt-2.5 border-t border-gray-800/60 mt-2 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-brand-green-light" />
                    <span className="text-[10px] font-mono tracking-tight text-gray-300">
                      Karaikudi: {karaikudiTime || "..."}
                    </span>
                  </div>
                  
                  {isAvailable ? (
                    <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-400 bg-amber-950/40 border border-amber-900/60 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>Offline</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* WhatsApp Business QR (Col 10-12) */}
            <div className="lg:col-span-3 space-y-3 bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl flex flex-col items-center text-center">
              <h4 className="text-xs uppercase font-bold text-brand-green-light tracking-wider w-full">WhatsApp Instant RFQ</h4>
              <p className="text-[10px] text-gray-400 leading-normal max-w-xs">
                Scan the QR code below to connect instantly with Director Prabhu for rapid B2B bulk quotations and catalog details.
              </p>
              
              {/* QR Code Frame */}
              <div className="w-24 h-24 bg-white p-1.5 rounded-lg shadow-md hover:scale-105 transition-transform duration-250 flex items-center justify-center">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fwa.me%2F919944823311%3Ftext%3DHi%2520Prabhu%252C%2520I%2520am%2520scanning%2520the%2520website%2520footer%2520QR%2520code%2520and%2520would%2520like%2520to%2520request%252520a%2520bulk%2520B2B%2520sourcing%2520quote."
                  alt="WhatsApp Chat QR Code"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <a 
                href="https://wa.me/919944823311?text=Hi%20Prabhu,%20I%20am%20scanning%20the%20website%20footer%20QR%20code%20and%20would%20like%20to%20request%20a%20bulk%20B2B%20sourcing%20quote."
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-brand-green-light hover:underline font-bold flex items-center gap-1 cursor-pointer mt-1"
              >
                <span>Or click here to chat</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Legal Notice Bottom Banner */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
            <p>© {new Date().getFullYear()} Yalini Exim. All Rights Reserved. Sourced & Packed in India.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-brand-green text-[10px] uppercase font-bold bg-brand-green/10 border border-brand-green/20 px-2.5 py-0.5 rounded-full">
                <span>Active customs code: INMAA</span>
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* 12. Floating/Sticky CTAs for Conversion */}
      <StickyCTA onOpenQuoteModal={handleOpenGenericQuote} />

      {/* 13. RFQ Lead Modal Dialog */}
      <InquiryModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        preSelectedProduct={selectedProduct} 
      />

      {/* 14. Exit Intent Lead Capture Popup */}
      <ExitIntentPopup onOpenInquiry={handleOpenGenericQuote} />

      {/* 15. Secure Owner Portal (Admin leads list) */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
