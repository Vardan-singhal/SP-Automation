import React, { useState, useRef, useEffect } from "react";
import {
  US, FR, DE, ES, IN, CN, JP, RU, IT, BR, SA, KR, TR, IR, PK, BD,
  CA, MX, ZA, NG, AR, CL, CO, EG, ID, TH, VN, IL, PL, NL, SE, NO,
  FI, DK, GR, PT, BE, CH, AT, CZ, HU, RO, UA, SK, HR, RS, BG
} from "country-flag-icons/react/3x2"; // ✅ Flags

// ✅ Supported Languages
const countries = [
  { code: "US", name: "English", Flag: US, langCode: "en" },
  { code: "FR", name: "Français", Flag: FR, langCode: "fr" },
  { code: "DE", name: "Deutsch", Flag: DE, langCode: "de" },
  { code: "ES", name: "Español", Flag: ES, langCode: "es" },
  { code: "IN", name: "हिन्दी", Flag: IN, langCode: "hi" },
  { code: "CN", name: "中文 (Chinese)", Flag: CN, langCode: "zh-CN" },
  { code: "JP", name: "日本語 (Japanese)", Flag: JP, langCode: "ja" },
  { code: "RU", name: "Русский (Russian)", Flag: RU, langCode: "ru" },
  { code: "IT", name: "Italiano", Flag: IT, langCode: "it" },
  { code: "BR", name: "Português (Brasil)", Flag: BR, langCode: "pt" },
  { code: "SA", name: "العربية", Flag: SA, langCode: "ar" },
  { code: "KR", name: "한국어", Flag: KR, langCode: "ko" },
  { code: "TR", name: "Türkçe", Flag: TR, langCode: "tr" },
  { code: "IR", name: "فارسی", Flag: IR, langCode: "fa" },
  { code: "PK", name: "اردو", Flag: PK, langCode: "ur" },
  { code: "BD", name: "বাংলা", Flag: BD, langCode: "bn" },
  { code: "CA", name: "Français (Canada)", Flag: CA, langCode: "fr" },
  { code: "MX", name: "Español (México)", Flag: MX, langCode: "es" },
  { code: "ZA", name: "Afrikaans", Flag: ZA, langCode: "af" },
  { code: "NG", name: "Yorùbá", Flag: NG, langCode: "yo" },
  { code: "AR", name: "Español (Argentina)", Flag: AR, langCode: "es" },
  { code: "CL", name: "Español (Chile)", Flag: CL, langCode: "es" },
  { code: "CO", name: "Español (Colombia)", Flag: CO, langCode: "es" },
  { code: "EG", name: "العربية (Egypt)", Flag: EG, langCode: "ar" },
  { code: "ID", name: "Bahasa Indonesia", Flag: ID, langCode: "id" },
  { code: "TH", name: "ไทย", Flag: TH, langCode: "th" },
  { code: "VN", name: "Tiếng Việt", Flag: VN, langCode: "vi" },
  { code: "IL", name: "עברית", Flag: IL, langCode: "iw" },
  { code: "PL", name: "Polski", Flag: PL, langCode: "pl" },
  { code: "NL", name: "Nederlands", Flag: NL, langCode: "nl" },
  { code: "SE", name: "Svenska", Flag: SE, langCode: "sv" },
  { code: "NO", name: "Norsk", Flag: NO, langCode: "no" },
  { code: "FI", name: "Suomi", Flag: FI, langCode: "fi" },
  { code: "DK", name: "Dansk", Flag: DK, langCode: "da" },
  { code: "GR", name: "Ελληνικά", Flag: GR, langCode: "el" },
  { code: "PT", name: "Português", Flag: PT, langCode: "pt" },
  { code: "BE", name: "Nederlands (Belgium)", Flag: BE, langCode: "nl" },
  { code: "CH", name: "Deutsch (Swiss)", Flag: CH, langCode: "de" },
  { code: "AT", name: "Deutsch (Austria)", Flag: AT, langCode: "de" },
  { code: "CZ", name: "Čeština", Flag: CZ, langCode: "cs" },
  { code: "HU", name: "Magyar", Flag: HU, langCode: "hu" },
  { code: "RO", name: "Română", Flag: RO, langCode: "ro" },
  { code: "UA", name: "Українська", Flag: UA, langCode: "uk" },
  { code: "SK", name: "Slovenčina", Flag: SK, langCode: "sk" },
  { code: "HR", name: "Hrvatski", Flag: HR, langCode: "hr" },
  { code: "RS", name: "Српски", Flag: RS, langCode: "sr" },
  { code: "BG", name: "Български", Flag: BG, langCode: "bg" },
];

const LanguageSelector = () => {
  const [selected, setSelected] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Load Google Translate script
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      };
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Change Language
  const changeLanguage = (country) => {
    setSelected(country);
    setOpen(false);

    const tryChange = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = country.langCode;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      }
      return false;
    };

    // Retry until Google Translate dropdown loads
    if (!tryChange()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (tryChange() || attempts > 20) clearInterval(interval);
      }, 500);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden Google Translate */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Main Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md shadow"
      >
        <selected.Flag className="w-6 h-4" />
        <span>{selected.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 max-h-64 overflow-y-auto w-56 bg-white border rounded-md shadow-lg z-50">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => changeLanguage(country)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              <country.Flag className="w-6 h-4" />
              {country.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
