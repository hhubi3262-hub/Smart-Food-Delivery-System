import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Logo size="md" showText={true} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition">
              About
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-600 transition">
              Menu
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-orange-600 transition">
              Gallery
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition">
              Contact
            </Link>
            <Link to="/order" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              🛒 Order Now
            </Link>
            {token && (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-orange-600 transition">
                  Orders
                </Link>
                <Link to="/reservations" className="text-gray-700 hover:text-orange-600 transition">
                  Reservations
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-orange-600 transition">
                  Dashboard
                </Link>
              </>
            )}
            
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            {token ? (
              <button
                onClick={handleLogout}
                className="btn-primary"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/menu"
              className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/order"
              className="block px-3 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
              onClick={() => setIsOpen(false)}
            >
              🛒 Order Now
            </Link>
            {token && (
              <>
                <Link
                  to="/orders"
                  className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/reservations"
                  className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Reservations
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-orange-600 hover:bg-orange-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
