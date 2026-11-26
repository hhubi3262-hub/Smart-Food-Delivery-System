import { useState, useEffect } from 'react';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiMapPin, FiPhone, FiClock, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import Logo from '../components/Logo';

interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  nameAm?: string;
  price: string | number;
  description: string;
  imageUrl?: string;
  categoryId: number;
  isAvailable: boolean;
  preparationTime: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Order = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerLocation, setCustomerLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  const restaurantPhone = '+971566407830'; // WhatsApp number
  const restaurantLocation = '25.4052,55.5136'; // Ajman coordinates
  const restaurantAddress = 'Shop 64-65, Rashideya 1, Ajman, UAE';

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/menu', {
        params: { limit: 100 }
      });
      if (response.data && response.data.data) {
        setMenuItems(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const getCustomerLocation = () => {
    setLocationLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
      toast.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCustomerLocation(location);
        setLocationLoading(false);
        toast.success('Location captured! 📍', { autoClose: 2000 });
        
        // Reverse geocode to get address
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`)
          .then(res => res.json())
          .then(data => {
            if (data.display_name) {
              setDeliveryAddress(data.display_name);
            }
          })
          .catch(err => console.log('Reverse geocode error:', err));
      },
      (error) => {
        setLocationLoading(false);
        let errorMessage = 'Unable to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart!`, { autoClose: 1000 });
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(i => i.id !== itemId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(i => 
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCategoryEmoji = (categoryId: number): string => {
    const emojiMap: { [key: number]: string } = {
      1: '☕', 2: '🍵', 3: '🥤', 4: '🍳', 5: '🥗',
      6: '🍖', 7: '🥪', 8: '🍰', 9: '🍝', 10: '🍟'
    };
    return emojiMap[categoryId] || '🍽️';
  };

  const sendWhatsAppOrder = () => {
    if (!customerName || !customerPhone) {
      toast.error('Please enter your name and phone number');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    const orderDetails = cart.map(item => 
      `${getCategoryEmoji(item.categoryId)} ${item.name} x${item.quantity} - ${(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)} AED`
    ).join('\n');

    const total = calculateTotal().toFixed(2);
    
    // Build customer location section with map image
    let locationInfo = '';
    if (customerLocation) {
      const googleMapsLink = `https://www.google.com/maps?q=${customerLocation.lat},${customerLocation.lng}`;
      // Google Maps Static API image - shows customer location on map
      const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${customerLocation.lat},${customerLocation.lng}&zoom=15&size=400x200&markers=color:red%7C${customerLocation.lat},${customerLocation.lng}&key=YOUR_API_KEY`;
      
      locationInfo = `\n📍 *CUSTOMER LOCATION:*\n` +
        `🗺️ Map: ${googleMapsLink}\n` +
        `📊 Coordinates: ${customerLocation.lat.toFixed(6)}, ${customerLocation.lng.toFixed(6)}\n`;
    }
    
    // Payment method icon and text
    const paymentIcon = paymentMethod === 'cash' ? '💵' : '💳';
    const paymentText = paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card Payment';
    
    // Restaurant information
    const restaurantInfo = `\n🏪 *DELIVERY TO:*\n` +
      `📍 ${restaurantAddress}\n` +
      `📞 ${restaurantPhone}\n` +
      `🗺️ https://www.google.com/maps?q=${restaurantLocation}\n`;
    
    const message = 
      `\n` +
      `╔═══════════════════════════════════╗\n` +
      `║                                   ║\n` +
      `║   🍽️ *AFAMIA CAFE & RESTAURANT* 🍽️   ║\n` +
      `║   ════════════════════════════   ║\n` +
      `║        ✨ *NEW ORDER ALERT* ✨        ║\n` +
      `║                                   ║\n` +
      `╚═══════════════════════════════════╝\n\n` +
      
      `┌───────────────────────────────────┐\n` +
      `│  👤 *CUSTOMER INFORMATION*        │\n` +
      `└───────────────────────────────────┘\n` +
      `\n` +
      `👨‍💼 *Name:*\n` +
      `   ➤ ${customerName}\n\n` +
      `📞 *Phone:*\n` +
      `   ➤ ${customerPhone}\n\n` +
      `🏠 *Delivery Address:*\n` +
      `   ➤ ${deliveryAddress || '🏪 Pickup from Restaurant'}\n` +
      locationInfo +
      `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      
      `┌───────────────────────────────────┐\n` +
      `│  🛒 *YOUR ORDER*                  │\n` +
      `└───────────────────────────────────┘\n\n` +
      `${orderDetails}\n` +
      `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      
      `╔═══════════════════════════════════╗\n` +
      `║                                   ║\n` +
      `║     💰 *TOTAL AMOUNT*             ║\n` +
      `║                                   ║\n` +
      `║       *${total} AED*              ║\n` +
      `║                                   ║\n` +
      `║     ${paymentIcon} ${paymentText.padEnd(20)}║\n` +
      `║                                   ║\n` +
      `╚═══════════════════════════════════╝\n\n` +
      
      `${orderNotes ? `┌───────────────────────────────────┐\n` +
      `│  📝 *SPECIAL INSTRUCTIONS*        │\n` +
      `└───────────────────────────────────┘\n` +
      `\n💬 _"${orderNotes}"_\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` : ''}` +
      
      `┌───────────────────────────────────┐\n` +
      `│  🏪 *RESTAURANT DETAILS*          │\n` +
      `└───────────────────────────────────┘\n\n` +
      `🏢 *AFAMIA CAFE & RESTAURANT*\n\n` +
      `📍 *Address:*\n` +
      `   ${restaurantAddress}\n\n` +
      `☎️ *Contact:*\n` +
      `   ${restaurantPhone}\n\n` +
      `🗺️ *Location Map:*\n` +
      `   ${`https://www.google.com/maps?q=${restaurantLocation}`}\n\n` +
      
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      
      `⏰ *Order Placed:*\n` +
      `   ${new Date().toLocaleString('en-AE', { 
        timeZone: 'Asia/Dubai',
        dateStyle: 'full',
        timeStyle: 'short'
      })}\n\n` +
      
      `🌍 *Service Area:*\n` +
      `   Dubai & Ajman, UAE 🇦🇪\n\n` +
      
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      
      `╔═══════════════════════════════════╗\n` +
      `║                                   ║\n` +
      `║    ✅ *PLEASE CONFIRM ORDER*      ║\n` +
      `║                                   ║\n` +
      `║    🚀 Fast Delivery (30-45 min)   ║\n` +
      `║    🌟 Fresh & Quality Guaranteed  ║\n` +
      `║    🎁 Special Offers Available    ║\n` +
      `║    ⭐ Rate 5 Stars & Get Discount ║\n` +
      `║                                   ║\n` +
      `╚═══════════════════════════════════╝\n\n` +
      
      `╭───────────────────────────────────╮\n` +
      `│                                   │\n` +
      `│  🙏 *Thank You for Choosing*      │\n` +
      `│     *AFAMIA CAFE & RESTAURANT!*   │\n` +
      `│                                   │\n` +
      `│  💝 We appreciate your business   │\n` +
      `│  🌟 Your satisfaction is our goal │\n` +
      `│                                   │\n` +
      `╰───────────────────────────────────╯\n\n` +
      
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `  🍽️ Bon Appétit! | እንጃ ጀምረው! | !بالهناء والشفاء  \n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

    const whatsappUrl = `https://wa.me/${restaurantPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success(`Opening WhatsApp with order details! 📱`, { autoClose: 3000 });
  };

  const openGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${restaurantLocation}`;
    window.open(mapsUrl, '_blank');
  };

  const categories = Array.from(new Set(menuItems.map(item => item.categoryId)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center animate-pulse">
            <FiShoppingCart className="text-4xl text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-gold-500 to-primary-600 text-white py-8 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo size="md" showText={false} className="text-white" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">Order Now</h1>
                <p className="text-primary-100">Order via WhatsApp • Fast & Easy</p>
              </div>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowCheckout(!showCheckout)}
                className="relative bg-white text-primary-600 p-4 rounded-full hover:bg-gold-400 hover:text-white transition-all duration-300 shadow-lg"
              >
                <FiShoppingCart className="text-2xl" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={openGoogleMaps}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-all"
            >
              <FiMapPin /> View on Map
            </button>
            <a
              href={`tel:${restaurantPhone}`}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-all"
            >
              <FiPhone /> Call Us
            </a>
            <a
              href={`https://wa.me/${restaurantPhone.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-all"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-6 overflow-x-auto pb-4">
              <div className="flex gap-3 min-w-max">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-primary-600 to-gold-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Items
                </button>
                {categories.map(catId => (
                  <button
                    key={catId}
                    onClick={() => setSelectedCategory(catId)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      selectedCategory === catId
                        ? 'bg-gradient-to-r from-primary-600 to-gold-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {getCategoryEmoji(catId)} Category {catId}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems
                .filter(item => selectedCategory === null || item.categoryId === selectedCategory)
                .map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary-400 via-gold-400 to-primary-500 flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-6xl">{getCategoryEmoji(item.categoryId)}</span>
                      )}
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-primary-600 mb-2">{item.nameAr}</p>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <p className="text-2xl font-bold text-primary-600">
                            {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)}
                            <span className="text-sm ml-1">AED</span>
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <FiClock /> {item.preparationTime} min
                          </p>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          disabled={!item.isAvailable}
                          className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                            item.isAvailable
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {item.isAvailable ? (
                            <><FiPlus className="inline mr-1" /> Add</>
                          ) : (
                            'Unavailable'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FiShoppingCart className="text-primary-600" />
                  Your Order
                </h2>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Add items to get started!</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="text-3xl">{getCategoryEmoji(item.categoryId)}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-primary-600 font-bold">
                              {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)} AED
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                            >
                              <FiMinus />
                            </button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition"
                            >
                              <FiPlus />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 text-red-500 hover:text-red-700 transition"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">{calculateTotal().toFixed(2)} AED</span>
                      </div>
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-600">Payment Method</span>
                        <span className={`font-semibold ${paymentMethod === 'cash' ? 'text-green-600' : 'text-blue-600'}`}>
                          {paymentMethod === 'cash' ? '💵 Cash' : '💳 Card'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xl font-bold text-primary-600">
                        <span>Total</span>
                        <span>{calculateTotal().toFixed(2)} AED</span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-3 mb-6">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                      />
                      
                      {/* Location Tracking */}
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={getCustomerLocation}
                          disabled={locationLoading}
                          className={`w-full px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                            customerLocation
                              ? 'bg-green-100 text-green-700 border-2 border-green-500'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {locationLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Getting Location...
                            </>
                          ) : customerLocation ? (
                            <>
                              <FiCheck className="text-xl" />
                              Location Captured! ✓
                            </>
                          ) : (
                            <>
                              <FiMapPin className="text-xl" />
                              📍 Share My Location
                            </>
                          )}
                        </button>
                        
                        {customerLocation && (
                          <div className="bg-green-50 border-2 border-green-500 rounded-xl overflow-hidden">
                            {/* Map Image Preview */}
                            <div className="relative h-48 bg-gray-200">
                              <iframe
                                src={`https://www.google.com/maps?q=${customerLocation.lat},${customerLocation.lng}&z=15&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Customer Location Map"
                              ></iframe>
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                📍 Live Location
                              </div>
                            </div>
                            
                            {/* Location Details */}
                            <div className="p-4">
                              <p className="text-green-800 font-semibold mb-2 flex items-center gap-2">
                                <FiCheck className="text-green-600" />
                                ✅ Location Captured Successfully!
                              </p>
                              <div className="space-y-1 text-sm text-green-700">
                                <p className="flex items-center gap-2">
                                  <FiMapPin className="text-green-600" />
                                  <span className="font-mono text-xs">
                                    {customerLocation.lat.toFixed(6)}, {customerLocation.lng.toFixed(6)}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-3 flex gap-2">
                                <a
                                  href={`https://www.google.com/maps?q=${customerLocation.lat},${customerLocation.lng}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
                                >
                                  <FiMapPin />
                                  Open in Maps
                                </a>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCustomerLocation(null);
                                    setDeliveryAddress('');
                                  }}
                                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition"
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {locationError && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
                            <p className="text-red-600">{locationError}</p>
                            <p className="text-xs text-red-500 mt-1">
                              Please enable location access in your browser settings
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <input
                        type="text"
                        placeholder="Delivery Address (optional)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                      />
                      <textarea
                        placeholder="Order Notes (optional)"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition resize-none"
                      />
                      
                      {/* Payment Method Selection */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          💳 Payment Method *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {/* Cash Option */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cash')}
                            className={`relative p-4 rounded-xl border-2 transition-all ${
                              paymentMethod === 'cash'
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-2">💵</div>
                              <div className={`font-semibold ${
                                paymentMethod === 'cash' ? 'text-green-700' : 'text-gray-700'
                              }`}>
                                Cash
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Pay on delivery
                              </div>
                            </div>
                            {paymentMethod === 'cash' && (
                              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                <FiCheck className="text-sm" />
                              </div>
                            )}
                          </button>

                          {/* Card Option */}
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`relative p-4 rounded-xl border-2 transition-all ${
                              paymentMethod === 'card'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-2">💳</div>
                              <div className={`font-semibold ${
                                paymentMethod === 'card' ? 'text-blue-700' : 'text-gray-700'
                              }`}>
                                Card
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Credit/Debit card
                              </div>
                            </div>
                            {paymentMethod === 'card' && (
                              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                                <FiCheck className="text-sm" />
                              </div>
                            )}
                          </button>
                        </div>
                        
                        {/* Payment Info Message */}
                        <div className={`rounded-xl p-3 text-sm ${
                          paymentMethod === 'cash'
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          {paymentMethod === 'cash' ? (
                            <p className="text-green-800">
                              <span className="font-semibold">💵 Cash Payment:</span> Pay when your order arrives. Please have exact change if possible.
                            </p>
                          ) : (
                            <p className="text-blue-800">
                              <span className="font-semibold">💳 Card Payment:</span> Our delivery staff will bring a card machine. All major cards accepted.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Send Order Button */}
                    <button
                      onClick={sendWhatsAppOrder}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="text-2xl" />
                      {customerLocation ? 'Send Order with Location 📍' : 'Send Order via WhatsApp'}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      {customerLocation 
                        ? '✅ Your location will be shared with the restaurant'
                        : '💡 Share your location for accurate delivery'
                      }
                    </p>
                  </>
                )}
              </div>

              {/* Restaurant Location Card with Map */}
              <div className="mt-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border-2 border-gold-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-gold-500 text-white p-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <FiMapPin className="text-gold-300" />
                    🏪 AFAMIA CAFE Restaurant Location
                  </h3>
                  <p className="text-sm text-primary-100 mt-1">Ajman, United Arab Emirates 🇦🇪</p>
                </div>
                
                {/* Map Preview */}
                <div className="relative h-64 bg-gray-200">
                  <iframe
                    src={`https://www.google.com/maps?q=${restaurantLocation}&z=16&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AFAMIA Restaurant Location"
                  ></iframe>
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-bounce">
                    <FiMapPin />
                    Restaurant Location
                  </div>
                </div>
                
                {/* Location Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">📍 Address:</p>
                    <p className="text-gray-800 font-medium">{restaurantAddress}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">📞 Phone:</p>
                    <a 
                      href={`tel:${restaurantPhone}`}
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      {restaurantPhone}
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">🕐 Hours:</p>
                    <p className="text-gray-800">Daily: 8:00 AM - 11:00 PM</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button
                      onClick={openGoogleMaps}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FiMapPin className="text-xl" />
                      Get Directions in Google Maps
                    </button>
                    
                    <a
                      href={`https://wa.me/${restaurantPhone.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="text-xl" />
                      Contact via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
