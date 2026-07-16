import React, { useState, useRef, useEffect } from "react";

// ✅ Country + Language mapping (Google Translate language codes included)
const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", language: "English", langCode: "en" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", language: "English", langCode: "en" },
  { code: "FR", name: "France", flag: "🇫🇷", language: "French", langCode: "fr" },
  { code: "DE", name: "Germany", flag: "🇩🇪", language: "German", langCode: "de" },
  { code: "ES", name: "Spain", flag: "🇪🇸", language: "Spanish", langCode: "es" },
  { code: "IT", name: "Italy", flag: "🇮🇹", language: "Italian", langCode: "it" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", language: "Portuguese", langCode: "pt" },
  { code: "RU", name: "Russia", flag: "🇷🇺", language: "Russian", langCode: "ru" },
  { code: "CN", name: "China", flag: "🇨🇳", language: "Chinese", langCode: "zh-CN" },
  { code: "JP", name: "Japan", flag: "🇯🇵", language: "Japanese", langCode: "ja" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", language: "Korean", langCode: "ko" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", language: "Arabic", langCode: "ar" },
  { code: "IN", name: "India", flag: "🇮🇳", language: "Hindi", langCode: "hi" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", language: "Portuguese", langCode: "pt" },
  { code: "CA", name: "Canada", flag: "🇨🇦", language: "English/French", langCode: "en" },
  { code: "AU", name: "Australia", flag: "🇦🇺", language: "English", langCode: "en" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", language: "Dutch", langCode: "nl" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", language: "Swedish", langCode: "sv" },
  { code: "NO", name: "Norway", flag: "🇳🇴", language: "Norwegian", langCode: "no" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", language: "Turkish", langCode: "tr" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", language: "Vietnamese", langCode: "vi" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", language: "Thai", langCode: "th" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", language: "Indonesian", langCode: "id" },
  { code: "GR", name: "Greece", flag: "🇬🇷", language: "Greek", langCode: "el" },
  { code: "PL", name: "Poland", flag: "🇵🇱", language: "Polish", langCode: "pl" },
];

const GoogleLanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Filter countries based on search term
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Change Google Translate Language (with retry if not loaded)
  const changeLanguage = (langCode) => {
    let attempts = 0;
    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      } else {
        attempts++;
        console.warn("Google Translate not ready, retrying...", attempts);
        if (attempts > 10) clearInterval(interval); // Stop after 10 tries (~5 sec)
      }
    }, 500);
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm("");
    changeLanguage(country.langCode); // ✅ trigger translation
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      {/* Selected language display */}
      <button
        className="w-full flex items-center justify-between bg-white rounded-lg border border-gray-300 shadow-sm px-4 py-2 hover:border-gray-400 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedCountry.flag}</span>
          <div className="text-left">
            <div className="font-medium text-gray-900">
              {selectedCountry.language}
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search languages or countries"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {/* Country list */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className={`flex items-center px-4 py-3 cursor-pointer hover:bg-blue-50 ${
                    selectedCountry.code === country.code ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleCountrySelect(country)}
                >
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {country.language}
                    </div>
                    <div className="text-sm text-gray-600">{country.name}</div>
                  </div>
                  {selectedCountry.code === country.code && (
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-gray-500">No languages found</div>
            )}
          </div>
        </div>
      )}

      {/* ✅ hidden Google Translate dropdown (required for functionality) */}
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
};

export default GoogleLanguageSelector;
