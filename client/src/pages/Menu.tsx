import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  nameAm?: string;
  categoryId: number;
  price: string | number;
  description: string;
  descriptionAr: string;
  descriptionAm?: string;
  imageUrl?: string | null;
  isAvailable: boolean;
  isRecommended: boolean;
  isPopular: boolean;
  preparationTime: number;
  calories?: number;
}

const MenuSimple = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get appropriate emoji based on category ID
  const getCategoryEmoji = (categoryId: number): string => {
    const emojiMap: { [key: number]: string } = {
      1: '☕', // Hot Beverages - Coffee
      2: '🍵', // Hot Beverages - Tea
      3: '🥤', // Cold Beverages
      4: '🍳', // Breakfast
      5: '🥗', // Appetizers
      6: '🍖', // Main Courses
      7: '🥪', // Sandwiches
      8: '🍰', // Desserts
      9: '🍝', // Pasta
      10: '🍟', // Snacks
    };
    return emojiMap[categoryId] || '🍽️';
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching menu from: http://localhost:5000/api/v1/menu');
      
      const response = await axios.get('http://localhost:5000/api/v1/menu?limit=100', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });
      
      console.log('✅ Response status:', response.status);
      console.log('📦 Response data:', response.data);
      
      if (response.data) {
        // Handle both response.data and response.data.data structures
        const items = response.data.data || response.data || [];
        console.log('✅ Menu items loaded:', items.length);
        
        if (items.length > 0) {
          setMenuItems(items);
          toast.success(`Loaded ${items.length} menu items!`, {
            position: 'top-right',
            autoClose: 2000,
          });
        } else {
          setMenuItems([]);
          toast.warning('No menu items found in database', {
            position: 'top-right',
          });
        }
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to load menu';
      console.error('❌ Menu fetch error:', error);
      console.error('❌ Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError(errorMsg);
      toast.error(`Error: ${errorMsg}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-gold-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center animate-pulse">
            <span className="text-4xl">☕</span>
          </div>
          <p className="text-xl font-semibold text-gray-700 mb-2">Loading menu...</p>
          <p className="text-sm text-gray-500">Fetching items from database</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Menu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 mb-4">
              Backend: http://localhost:5000/api/v1/menu
            </p>
            <button
              onClick={fetchMenu}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition w-full"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition w-full"
            >
              🔃 Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-gold-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl text-primary-100">Found {menuItems.length} delicious items</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {menuItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items in menu</h3>
            <p className="text-gray-600">The menu is empty or still loading.</p>
            <button
              onClick={fetchMenu}
              className="mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Reload Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-primary-400 via-gold-400 to-primary-500 flex items-center justify-center overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const emoji = document.createElement('span');
                          emoji.className = 'text-6xl';
                          emoji.textContent = getCategoryEmoji(item.categoryId);
                          parent.appendChild(emoji);
                        }
                      }}
                    />
                  ) : (
                    <span className="text-6xl">{getCategoryEmoji(item.categoryId)}</span>
                  )}
                  {item.isRecommended && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ Recommended
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      🔥 Popular
                    </span>
                  )}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-primary-600 mb-1">{item.nameAr}</p>
                  {item.nameAm && (
                    <p className="text-sm text-gold-600 mb-2">{item.nameAm}</p>
                  )}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                  <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                      ⏱️ {item.preparationTime} min
                    </span>
                    {item.calories && (
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        🔥 {item.calories} cal
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">
                        {typeof item.price === 'string' ? parseFloat(item.price).toFixed(2) : item.price.toFixed(2)} <span className="text-sm">AED</span>
                      </p>
                    </div>
                    <button
                      disabled={!item.isAvailable}
                      className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                        item.isAvailable
                          ? 'bg-gradient-to-r from-primary-600 to-gold-500 text-white hover:shadow-lg hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {item.isAvailable ? '🛒 Add' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSimple;
