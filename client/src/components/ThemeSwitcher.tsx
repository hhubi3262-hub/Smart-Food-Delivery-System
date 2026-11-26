import { useState } from 'react';
import { FiSun, FiMoon, FiDroplet, FiSunrise, FiFeather, FiCoffee } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const CurrentIcon = themes.find(t => t.name === theme)?.icon || FiSun;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Change Theme"
      >
        <CurrentIcon className="w-6 h-6 text-gray-700" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-gold-500 text-white">
              <h3 className="font-bold text-sm">Choose Theme</h3>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              {themes.map((t) => {
                const ThemeIcon = t.icon;
                return (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(t.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      theme === t.name
                        ? 'bg-primary-100 border-2 border-primary-500'
                        : 'hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <ThemeIcon className="w-6 h-6 text-gray-700" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">{t.label}</div>
                      <div className="flex gap-1 mt-1">
                        <div 
                          className="w-4 h-4 rounded-full border" 
                          style={{ backgroundColor: t.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border" 
                          style={{ backgroundColor: t.colors.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border" 
                          style={{ backgroundColor: t.colors.background }}
                        />
                      </div>
                    </div>
                    {theme === t.name && (
                      <span className="text-primary-600 font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
