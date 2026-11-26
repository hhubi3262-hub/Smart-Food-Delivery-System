import { useEffect, useState } from 'react';
import { menuAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useLanguage } from '../context/LanguageContext';
import { FiShoppingCart, FiHeart, FiClock, FiZap, FiSearch, FiFilter, FiX } from 'react-icons/fi';

interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  nameAm?: string;
  categoryId: number;
  price: number;
  description: string;
  descriptionAr: string;
  descriptionAm?: string;
  imageUrl?: string;
  isAvailable: boolean;
  isRecommended: boolean;
  isPopular: boolean;
  preparationTime: number;
  calories?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MenuEnhanced = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const { t, language } = useLanguage();

  const categories = [
    { id: 'All', name: t('menu.categories.all'), icon: '🍽️' },
    { id: '1', name: t('menu.categories.coffee'), icon: '☕' },
    { id: '2', name: t('menu.categories.tea'), icon: '🍵' },
    { id: '3', name: t('menu.categories.coldBeverages'), icon: '🥤' },
    { id: '4', name: t('menu.categories.breakfast'), icon: '🥐' },
    { id: '5', name: t('menu.categories.appetizers'), icon: '🥗' },
    { id: '6', name: t('menu.categories.mainCourses'), icon: '🍝' },
    { id: '7', name: t('menu.categories.sandwiches'), icon: '🥪' },
    { id: '8', name: t('menu.categories.desserts'), icon: '🍰' },
  ];

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await menuAPI.getAll();
      console.log('API Response:', response.data);
      // The API returns data directly, not nested in response.data.data
      const items = Array.isArray(response.data.data) ? response.data.data : 
                    Array.isArray(response.data) ? response.data : [];
      console.log('Menu items loaded:', items.length);
      setMenuItems(items);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Failed to load menu';
      toast.error(errorMsg);
      console.error('Menu fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getItemName = (item: MenuItem) => {
    if (language === 'ar') return item.nameAr;
    if (language === 'am') return item.nameAm || item.nameAr;
    return item.name;
  };

  const getItemDescription = (item: MenuItem) => {
    if (language === 'ar') return item.descriptionAr;
    if (language === 'am') return item.descriptionAm || item.descriptionAr;
    return item.description;
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`${getItemName(item)} added to cart!`, { autoClose: 2000 });
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filterByPrice = (item: MenuItem) => {
    if (priceFilter === 'all') return true;
    const price = item.price;
    if (priceFilter === 'low') return price < 20;
    if (priceFilter === 'medium') return price >= 20 && price < 50;
    if (priceFilter === 'high') return price >= 50;
    return true;
  };

  const filterBySearch = (item: MenuItem) => {
    if (!searchQuery) return true;
    const name = getItemName(item).toLowerCase();
    const description = getItemDescription(item).toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || description.includes(query);
  };

  const filteredItems = menuItems
    .filter(item => selectedCategory === 'All' || item.categoryId.toString() === selectedCategory)
    .filter(filterByPrice)
    .filter(filterBySearch);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center animate-pulse">
            <span className="text-4xl">☕</span>
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading delicious menu...</p>
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
            <h1 className="text-5xl font-bold mb-4 animate-fadeIn">Our Menu</h1>
            <p className="text-xl text-primary-100 mb-8">Discover authentic flavors from around the world</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="text-primary-600" />
              <h3 className="font-semibold text-gray-900">Categories</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary-600 to-gold-500 text-white shadow-lg shadow-primary-300'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`text-2xl ${selectedCategory === category.id ? 'animate-bounce-slow' : ''}`}>
                      {category.icon}
                    </span>
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiZap className="text-gold-600" />
              <h3 className="font-semibold text-gray-900">Price Range</h3>
            </div>
            <div className="flex gap-3">
              {[
                { id: 'all', label: 'All Prices', icon: '💰' },
                { id: 'low', label: 'Under AED 20', icon: '💵' },
                { id: 'medium', label: 'AED 20-50', icon: '💴' },
                { id: 'high', label: 'Above AED 50', icon: '💎' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setPriceFilter(filter.id as any)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    priceFilter === filter.id
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  {filter.icon} {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-bold text-primary-600">{filteredItems.length}</span> items
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
            >
              <FiX /> Clear search
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                getName={getItemName}
                getDescription={getItemDescription}
                onAddToCart={() => addToCart(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-primary-600 to-gold-500 text-white p-6 rounded-full shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-110 z-40 group"
        >
          <FiShoppingCart className="text-3xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">
            {getCartCount()}
          </span>
        </button>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setShowCart(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 animate-slideIn flex flex-col">
            <div className="p-6 bg-gradient-to-r from-primary-600 to-gold-500 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
              <p className="text-primary-100 mt-1">{getCartCount()} items</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 flex gap-4 hover:shadow-md transition"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-gold-400 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                    🍽️
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{getItemName(item)}</h3>
                    <p className="text-primary-600 font-semibold mb-2">
                      AED {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold transition"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center font-bold transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-600 p-2"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 border-t-2 border-gray-200 space-y-4">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold">AED {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>VAT (5%):</span>
                <span>AED {(getCartTotal() * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-primary-600 pt-4 border-t-2">
                <span>Total:</span>
                <span>AED {(getCartTotal() * 1.05).toFixed(2)}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-primary-600 to-gold-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105">
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MenuItemCard = ({
  item,
  getName,
  getDescription,
  onAddToCart,
}: {
  item: MenuItem;
  getName: (item: MenuItem) => string;
  getDescription: (item: MenuItem) => string;
  onAddToCart: () => void;
}) => {
  const [loved, setLoved] = useState(false);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-primary-400 via-gold-400 to-primary-500 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-125 transition-transform duration-500">
          🍽️
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isRecommended && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              ⭐ Recommended
            </span>
          )}
          {item.isPopular && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              🔥 Popular
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setLoved(!loved)}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            loved
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 text-gray-600 hover:bg-red-50'
          }`}
        >
          <FiHeart className={loved ? 'fill-current' : ''} />
        </button>

        {/* Availability Badge */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition">
          {getName(item)}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {getDescription(item)}
        </p>

        {/* Info Tags */}
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
          {item.preparationTime && (
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <FiClock className="text-primary-500" />
              {item.preparationTime} min
            </span>
          )}
          {item.calories && (
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <FiZap className="text-gold-500" />
              {item.calories} cal
            </span>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Price</p>
            <p className="text-2xl font-bold text-primary-600">
              AED {Number(item.price).toFixed(2)}
            </p>
          </div>
          <button
            disabled={!item.isAvailable}
            onClick={onAddToCart}
            className="bg-gradient-to-r from-primary-600 to-gold-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 group"
          >
            <FiShoppingCart className="group-hover:rotate-12 transition-transform" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuEnhanced;
