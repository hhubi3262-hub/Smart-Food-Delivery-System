import { useLanguage } from '../context/LanguageContext';
import { FiGlobe } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'am', name: 'Amharic', flag: '🇪🇹', nativeName: 'አማርኛ' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    setLanguage(code as 'en' | 'ar' | 'am');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        aria-label="Change language"
      >
        <FiGlobe className="text-xl" />
        <span className="text-2xl">{currentLanguage?.flag}</span>
        <span className="font-medium hidden md:inline">{currentLanguage?.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition ${
                language === lang.code ? 'bg-orange-50 border-l-4 border-orange-600' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{lang.nativeName}</div>
                <div className="text-sm text-gray-500">{lang.name}</div>
              </div>
              {language === lang.code && (
                <span className="text-orange-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
