export type Language = "en" | "ar";

export interface Translations {
  // Navigation
  home: string;
  about: string;
  products: string;
  blog: string;
  faqs: string;
  contact: string;
  rfq: string;
  ownerPortal: string;
  govermentBanner: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroDesc: string;
  benefitQuality: string;
  benefitIncoterms: string;
  benefitClearance: string;
  ctaRfq: string;
  ctaCatalog: string;
  ctaWhatsapp: string;

  // Hero Bento Cards
  bentoEco: string;
  bentoEcoDesc: string;
  bentoStone: string;
  bentoStoneDesc: string;
  bentoFmcg: string;
  bentoFmcgDesc: string;
  bentoPrint: string;
  bentoPrintDesc: string;

  // Value Props / Trust Pillars
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;
  pillar5Title: string;
  pillar5Desc: string;
  pillar6Title: string;
  pillar6Desc: string;

  // Language Switcher Label
  langLabel: string;

  // Sourcing optimization messages
  sourcingOptimizationText: string;
  recommendedCategoriesText: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    home: "Home",
    about: "About Us",
    products: "Products",
    blog: "Blog",
    faqs: "FAQs",
    contact: "Contact",
    rfq: "B2B RFQ",
    ownerPortal: "Owner Portal",
    govermentBanner: "Govt. Registered Exporter Est. 2023",
    
    heroBadge: "Premium Quality B2B Export Solutions",
    heroTitle1: "Trusted Indian Exporter of ",
    heroTitleHighlight: "Eco Products",
    heroTitle2: ", FMCG & Industrial Supplies",
    heroDesc: "Yalini Exim is your premier trade link, supplying Sugarcane Bagasse & Corn Starch Dining Ware, custom printed plastic containers, premium FMCG groceries, restaurant tableware, and A-Grade Indian Granites and Marbles globally.",
    benefitQuality: "100% Quality Vetted",
    benefitIncoterms: "FOB Chennai / CIF Specs",
    benefitClearance: "Full Board Clearance",
    ctaRfq: "Get Custom FOB/CIF RFQ",
    ctaCatalog: "Browse Catalog",
    ctaWhatsapp: "WhatsApp Prabhu",
    
    bentoEco: "Eco Dining",
    bentoEcoDesc: "Sugarcane & Corn Starch plates, bowls",
    bentoStone: "Natural Stone",
    bentoStoneDesc: "Absolute Black, Ruby Red slabs",
    bentoFmcg: "FMCG & Provisions",
    bentoFmcgDesc: "CTC Tea, Filter Coffee, Basmati Rice",
    bentoPrint: "Custom Print",
    bentoPrintDesc: "Takeout containers & fine hotel plates",

    pillar1Title: "Global Export Network",
    pillar1Desc: "Shipping safely across worldwide lanes",
    pillar2Title: "Quality Assured",
    pillar2Desc: "Rigorous factory & quarry check",
    pillar3Title: "Competitive Prices",
    pillar3Desc: "Direct factory B2B rates margins",
    pillar4Title: "Bulk Supply Support",
    pillar4Desc: "Continuous heavy FCL/LCL capability",
    pillar5Title: "Documentation Assist",
    pillar5Desc: "FSSAI, APEDA, Spice, Coffee clearances",
    pillar6Title: "Reliable Logistics",
    pillar6Desc: "Chennai INMAA shipping corridor",

    langLabel: "English",
    sourcingOptimizationText: "Sourcing view optimized for B2B importers in",
    recommendedCategoriesText: "Showing recommended product categories."
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    products: "المنتجات",
    blog: "المدونة",
    faqs: "الأسئلة الشائعة",
    contact: "اتصل بنا",
    rfq: "طلب عرض أسعار B2B",
    ownerPortal: "بوابة المالك",
    govermentBanner: "مصدّر معتمد مسجل حكومياً تأسس عام ٢٠٢٣",
    
    heroBadge: "حلول تصدير B2B عالية الجودة",
    heroTitle1: "مصدّر هندي موثوق لـ ",
    heroTitleHighlight: "المنتجات الصديقة للبيئة",
    heroTitle2: "، والسلع الاستهلاكية والمستلزمات الصناعية",
    heroDesc: "شركة ياليني إكسيم هي شريكك التجاري الأبرز، حيث نقوم بتوريد أدوات المائدة الصديقة للبيئة من قصب السكر ونشا الذرة، والحاويات البلاستيكية المطبوعة المخصصة، والسلع الغذائية الاستهلاكية الممتازة، وأدوات مائدة المطاعم، والجرانيت والرخام الهندي عالي الجودة عالميًا.",
    benefitQuality: "فحص جودة ١٠٠٪",
    benefitIncoterms: "أسعار FOB تشيناي / شروط CIF",
    benefitClearance: "تخليص جمركي كامل",
    ctaRfq: "احصل على عرض أسعار مخصص FOB/CIF",
    ctaCatalog: "تصفح الكتالوج",
    ctaWhatsapp: "تواصل مع برابهو عبر واتساب",
    
    bentoEco: "أدوات مائدة صديقة للبيئة",
    bentoEcoDesc: "أطباق وأوعية من قصب السكر ونشا الذرة",
    bentoStone: "الأحجار الطبيعية",
    bentoStoneDesc: "ألواح الجرانيت الأسود المطلق والأحمر الياقوتي",
    bentoFmcg: "السلع الاستهلاكية والأغذية",
    bentoFmcgDesc: "شاي CTC، قهوة فلتر، أرز بسمتي",
    bentoPrint: "الطباعة المخصصة",
    bentoPrintDesc: "حاويات الوجبات الجاهزة وأطباق الفنادق الفاخرة",

    pillar1Title: "شبكة تصدير عالمية",
    pillar1Desc: "شحن آمن عبر الممرات الملاحية العالمية",
    pillar2Title: "ضمان الجودة",
    pillar2Desc: "فحوصات صارمة في المصانع والمقالع",
    pillar3Title: "أسعار تنافسية",
    pillar3Desc: "أسعار مباشرة من المصنع بدون وسطاء",
    pillar4Title: "دعم التوريد بالجملة",
    pillar4Desc: "قدرة مستمرة على شحن الحاويات الكاملة والجزئية",
    pillar5Title: "دعم التوثيق والمستندات",
    pillar5Desc: "تخليص شهادات FSSAI و APEDA و الهيئات المختصة",
    pillar6Title: "خدمات لوجستية موثوقة",
    pillar6Desc: "ميناء الشحن تشيناي INMAA",

    langLabel: "العربية",
    sourcingOptimizationText: "تم تحسين عرض المنتجات لمستوردي الجملة في",
    recommendedCategoriesText: "عرض الفئات الموصى بها لهذا السوق."
  }
};
