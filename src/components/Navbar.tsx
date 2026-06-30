import React, { useState } from "react";
import { Menu, X, Phone, Mail, Lock, Globe } from "lucide-react";
// @ts-ignore
import yaliniLogo from "../assets/images/yalini_logo_1782803904536.jpg";
import { translations, Language } from "../lib/translations";

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenAdmin: () => void;
  currentPage: 'home' | 'about' | 'contact' | 'faqs' | 'blog';
  setCurrentPage: (page: 'home' | 'about' | 'contact' | 'faqs' | 'blog') => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ 
  onOpenQuoteModal, 
  onOpenAdmin, 
  currentPage, 
  setCurrentPage,
  lang,
  setLang 
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navigateToSection = (sectionId: string) => {
    setIsOpen(false);
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 200);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handlePageChange = (page: 'home' | 'about' | 'contact' | 'faqs' | 'blog') => {
    setIsOpen(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs">
      {/* Top Banner with Direct Contact Info */}
      <div className="w-full bg-brand-green text-white py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+919944823311" className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span className="ltr:block rtl:hidden">+91 99448 23311</span>
              <span className="rtl:block ltr:hidden" dir="ltr">+91 99448 23311</span>
            </a>
            <a href="mailto:prabhu@yaliniexim.com" className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span>prabhu@yaliniexim.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1 text-[11px] bg-brand-green-dark px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.govermentBanner}</span>
            </span>
            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-1 hover:text-emerald-200 transition-colors cursor-pointer bg-brand-green-dark/30 hover:bg-brand-green-dark/60 px-2 py-1 rounded-sm text-[10px] font-bold"
            >
              <Lock className="w-3 h-3" />
              <span>{t.ownerPortal}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer animate-fade-in" onClick={() => handlePageChange('home')}>
              <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center shadow-md border border-emerald-800/10 bg-white">
                <img 
                  src={yaliniLogo} 
                  alt="Yalini Exim" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold text-brand-green font-display tracking-tight leading-none">
                  YALINI EXIM
                </span>
                <span className="text-[10px] text-brand-green-light font-semibold uppercase tracking-widest mt-0.5">
                  Global Export Solutions
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            <button 
              onClick={() => handlePageChange('home')} 
              className={`font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors py-1 border-b-2 ${currentPage === 'home' ? 'text-brand-green border-brand-green' : 'text-brand-dark hover:text-brand-green border-transparent'}`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => handlePageChange('about')} 
              className={`font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors py-1 border-b-2 ${currentPage === 'about' ? 'text-brand-green border-brand-green' : 'text-brand-dark hover:text-brand-green border-transparent'}`}
            >
              {t.about}
            </button>
            <button 
              onClick={() => navigateToSection("products")} 
              className="text-brand-dark hover:text-brand-green font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors py-1 border-b-2 border-transparent"
            >
              {t.products}
            </button>
            <button 
              onClick={() => handlePageChange('blog')} 
              className={`font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors py-1 border-b-2 ${currentPage === 'blog' ? 'text-brand-green border-brand-green' : 'text-brand-dark hover:text-brand-green border-transparent'}`}
            >
              {t.blog}
            </button>
            <button 
              onClick={() => handlePageChange('faqs')} 
              className={`font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors py-1 border-b-2 ${currentPage === 'faqs' ? 'text-brand-green border-brand-green' : 'text-brand-dark hover:text-brand-green border-transparent'}`}
            >
              {t.faqs}
            </button>
            <button 
              onClick={() => handlePageChange('contact')} 
              className={`font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors py-1 border-b-2 ${currentPage === 'contact' ? 'text-brand-green border-brand-green' : 'text-brand-dark hover:text-brand-green border-transparent'}`}
            >
              {t.contact}
            </button>

            {/* Language Selector Dropdown / Pills */}
            <div className="flex items-center gap-1 bg-slate-100 border border-gray-200/60 rounded-xl p-0.5 shadow-3xs ml-1">
              <Globe className="w-3.5 h-3.5 text-gray-400 mx-1 flex-shrink-0" />
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                  lang === "en" 
                    ? "bg-white text-brand-green shadow-xs font-black" 
                    : "text-gray-500 hover:text-brand-dark font-semibold"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                  lang === "ar" 
                    ? "bg-white text-brand-green shadow-xs font-black" 
                    : "text-gray-500 hover:text-brand-dark font-semibold"
                }`}
              >
                العربية
              </button>
            </div>

            <button
              onClick={onOpenQuoteModal}
              className="bg-brand-green hover:bg-brand-green-light text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5"
            >
              {t.rfq}
            </button>
          </nav>

          {/* Mobile menu button & Mobile Language Switcher */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Inline switcher for mobile layout */}
            <div className="flex items-center gap-0.5 bg-slate-100 border border-gray-200 rounded-lg p-0.5 text-[10px]">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-md transition-all font-black cursor-pointer ${lang === "en" ? "bg-white text-brand-green shadow-3xs" : "text-gray-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-2 py-0.5 rounded-md transition-all font-black cursor-pointer ${lang === "ar" ? "bg-white text-brand-green shadow-3xs" : "text-gray-400"}`}
              >
                AR
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:text-brand-green hover:bg-gray-50 focus:outline-hidden"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1.5 text-left">
          <button
            onClick={() => handlePageChange('home')}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold ${currentPage === 'home' ? 'bg-emerald-50 text-brand-green' : 'text-brand-dark hover:bg-gray-50'}`}
          >
            {t.home}
          </button>
          <button
            onClick={() => handlePageChange('about')}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold ${currentPage === 'about' ? 'bg-emerald-50 text-brand-green' : 'text-brand-dark hover:bg-gray-50'}`}
          >
            {t.about}
          </button>
          <button
            onClick={() => navigateToSection("products")}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-brand-dark hover:bg-gray-50"
          >
            {t.products}
          </button>
          <button
            onClick={() => handlePageChange('blog')}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold ${currentPage === 'blog' ? 'bg-emerald-50 text-brand-green' : 'text-brand-dark hover:bg-gray-50'}`}
          >
            {t.blog}
          </button>
          <button
            onClick={() => handlePageChange('faqs')}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold ${currentPage === 'faqs' ? 'bg-emerald-50 text-brand-green' : 'text-brand-dark hover:bg-gray-50'}`}
          >
            {t.faqs}
          </button>
          <button
            onClick={() => handlePageChange('contact')}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold ${currentPage === 'contact' ? 'bg-emerald-50 text-brand-green' : 'text-brand-dark hover:bg-gray-50'}`}
          >
            {t.contact}
          </button>
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full bg-brand-green text-white text-center py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-brand-green-light transition-colors"
            >
              {t.rfq}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
