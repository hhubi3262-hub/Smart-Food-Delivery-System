import { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiPrinter, FiDollarSign, FiUser, FiPhone, FiCheck, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

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

interface Receipt {
  receiptNumber: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card';
  cashReceived?: number;
  change?: number;
  timestamp: Date;
}

const Cashier = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Customer & Payment Info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<Receipt | null>(null);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Restaurant Info
  const restaurantName = 'AFAMIA CAFE & RESTAURANT';
  const restaurantAddress = 'Shop 64-65, Rashideya 1, Ajman, UAE';
  const restaurantPhone = '+971 56 640 7830';
  const restaurantLicense = '133469';
  const taxRate = 0.05; // 5% VAT in UAE

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/menu?limit=100');
      if (response.data && response.data.data) {
        setMenuItems(response.data.data.filter((item: MenuItem) => item.isAvailable));
      }
    } catch (error) {
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
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
    toast.success(`${item.name} added`, { autoClose: 1000 });
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(i => i.id !== itemId));
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

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const calculateChange = () => {
    if (paymentMethod === 'cash' && cashReceived > 0) {
      return cashReceived - calculateTotal();
    }
    return 0;
  };

  const generateReceiptNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `AFM-${year}${month}${day}-${random}`;
  };

  const generateReceipt = (): Receipt => {
    return {
      receiptNumber: generateReceiptNumber(),
      customerName: customerName || 'Walk-in Customer',
      customerPhone: customerPhone || 'N/A',
      items: cart,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      paymentMethod,
      cashReceived: paymentMethod === 'cash' ? cashReceived : undefined,
      change: paymentMethod === 'cash' ? calculateChange() : undefined,
      timestamp: new Date(),
    };
  };

  const formatReceiptForWhatsApp = (receipt: Receipt) => {
    const itemsList = receipt.items.map(item => 
      `${item.quantity}x ${item.name} @ ${(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)} = ${((typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity).toFixed(2)} AED`
    ).join('\n');

    const paymentIcon = receipt.paymentMethod === 'cash' ? '💵' : '💳';
    const paymentDetails = receipt.paymentMethod === 'cash' 
      ? `${paymentIcon} Cash Received: ${receipt.cashReceived?.toFixed(2)} AED\n💰 Change: ${receipt.change?.toFixed(2)} AED`
      : `${paymentIcon} Card Payment: ${receipt.total.toFixed(2)} AED`;

    // QR Code Data - Restaurant website/menu link
    const restaurantWebsite = 'http://localhost:3000/menu';
    const qrCodeData = `Receipt: ${receipt.receiptNumber}\nTotal: ${receipt.total.toFixed(2)} AED\nVisit: ${restaurantWebsite}`;

    return `╔═══════════════════════════════╗\n` +
      `║    🧾 *OFFICIAL RECEIPT*     ║\n` +
      `║   ${restaurantName}   ║\n` +
      `╚═══════════════════════════════╝\n\n` +
      
      `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n` +
      `┃  📋 *RECEIPT DETAILS*      ┃\n` +
      `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n` +
      `🔢 *Receipt #:* ${receipt.receiptNumber}\n` +
      `📅 *Date:* ${receipt.timestamp.toLocaleString('en-AE', { timeZone: 'Asia/Dubai', dateStyle: 'medium', timeStyle: 'short' })}\n` +
      `👤 *Customer:* ${receipt.customerName}\n` +
      `📱 *Phone:* ${receipt.customerPhone}\n\n` +
      
      `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n` +
      `┃  🛒 *ITEMS PURCHASED*      ┃\n` +
      `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n` +
      `${itemsList}\n\n` +
      
      `╭───────────────────────────────╮\n` +
      `│  💵 Subtotal: ${receipt.subtotal.toFixed(2)} AED │\n` +
      `│  🏛️ VAT (5%): ${receipt.tax.toFixed(2)} AED  │\n` +
      `├───────────────────────────────┤\n` +
      `│  💰 *TOTAL: ${receipt.total.toFixed(2)} AED* │\n` +
      `╰───────────────────────────────╯\n\n` +
      
      `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n` +
      `┃  💳 *PAYMENT DETAILS*      ┃\n` +
      `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n` +
      `${paymentDetails}\n\n` +
      
      `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n` +
      `┃  📱 *SCAN QR CODE*         ┃\n` +
      `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n` +
      `📲 Scan to view our menu online\n` +
      `🌐 ${restaurantWebsite}\n\n` +
      
      `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n` +
      `┃  🏪 *RESTAURANT INFO*      ┃\n` +
      `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n` +
      `🏢 *${restaurantName}*\n` +
      `📍 ${restaurantAddress}\n` +
      `📞 ${restaurantPhone}\n` +
      `📜 License: ${restaurantLicense}\n` +
      `🇦🇪 VAT Registered\n\n` +
      
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✨ *Thank you for your purchase!*\n` +
      `🌟 Rate us & Get 10% OFF next visit\n` +
      `📱 Follow us on social media\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `💝 *Please visit us again!* 🍽️`;
  };

  const sendReceiptViaWhatsApp = (receipt: Receipt) => {
    if (!receipt.customerPhone || receipt.customerPhone === 'N/A') {
      toast.error('Customer phone number required to send receipt');
      return;
    }

    const message = formatReceiptForWhatsApp(receipt);
    const phoneNumber = receipt.customerPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp to send receipt! 📱');
  };

  const processPayment = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty!');
      return;
    }

    if (paymentMethod === 'cash' && cashReceived < calculateTotal()) {
      toast.error('Insufficient cash received!');
      return;
    }

    setProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      const receipt = generateReceipt();
      setLastReceipt(receipt);
      
      // Print receipt (would integrate with actual printer)
      console.log('Receipt:', receipt);
      
      // Show success and reset
      toast.success('Payment completed! Receipt generated!', { autoClose: 3000 });
      
      // Show receipt preview
      setShowReceiptPreview(true);
      
      // Reset form
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
      setCashReceived(0);
      setShowCheckout(false);
      setProcessingPayment(false);
    }, 1500);
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  const categories = Array.from(new Set(menuItems.map(item => item.categoryId)));
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === null || item.categoryId === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery) ||
      (item.nameAm && item.nameAm.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const getCategoryEmoji = (categoryId: number): string => {
    const emojiMap: { [key: number]: string } = {
      1: '☕', 2: '🍵', 3: '🥤', 4: '🍳', 5: '🥗',
      6: '🍖', 7: '🥪', 8: '🍰', 9: '🍝', 10: '🍟'
    };
    return emojiMap[categoryId] || '🍽️';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading POS System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-gold-500 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">💳 Cashier POS System</h1>
              <p className="text-sm text-primary-100">AFAMIA CAFE & RESTAURANT</p>
            </div>
            <div className="text-right">
              <p className="text-sm">License: {restaurantLicense}</p>
              <p className="text-xs text-primary-100">Ajman, UAE 🇦🇪</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Menu Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search & Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <input
                type="text"
                placeholder="🔍 Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                    selectedCategory === null
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All Items
                </button>
                {categories.map(catId => (
                  <button
                    key={catId}
                    onClick={() => setSelectedCategory(catId)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                      selectedCategory === catId
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {getCategoryEmoji(catId)} Cat {catId}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-4 text-left group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{getCategoryEmoji(item.categoryId)}</span>
                    <span className="text-lg font-bold text-primary-600">
                      {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)} AED
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Cart & Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg sticky top-24">
              {/* Cart Header */}
              <div className="bg-gradient-to-r from-primary-600 to-gold-500 text-white p-4 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiShoppingCart />
                    Current Sale
                  </h2>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Cart Items */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FiShoppingCart className="text-5xl mx-auto mb-2 opacity-50" />
                    <p>No items in cart</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            {(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)} AED
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                          >
                            <FiMinus className="text-sm" />
                          </button>
                          <span className="font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-primary-600 hover:bg-primary-700 text-white rounded"
                          >
                            <FiPlus className="text-sm" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Summary */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{calculateSubtotal().toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT (5%):</span>
                    <span className="font-semibold">{calculateTax().toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>TOTAL:</span>
                    <span className="text-primary-600">{calculateTotal().toFixed(2)} AED</span>
                  </div>

                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all mt-4"
                  >
                    <FiDollarSign className="inline mr-2" />
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-primary-600 to-gold-500 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">💳 Checkout</h2>
              <p className="text-sm text-primary-100">Complete the sale</p>
            </div>

            <div className="p-6 space-y-4">
              {/* Customer Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiUser className="inline mr-1" />
                  Customer Name (Optional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiPhone className="inline mr-1" />
                  Customer Phone (For Receipt)
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+971 XX XXX XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  📱 Receipt will be sent via WhatsApp
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'cash'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">💵</div>
                    <div className="font-semibold">Cash</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">💳</div>
                    <div className="font-semibold">Card</div>
                  </button>
                </div>
              </div>

              {/* Cash Payment Details */}
              {paymentMethod === 'cash' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💵 Cash Received
                  </label>
                  <input
                    type="number"
                    value={cashReceived || ''}
                    onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-xl font-bold"
                    step="0.01"
                  />
                  {cashReceived > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Total Amount:</span>
                        <span className="font-bold">{calculateTotal().toFixed(2)} AED</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Change:</span>
                        <span className={calculateChange() >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {calculateChange().toFixed(2)} AED
                        </span>
                      </div>
                      {calculateChange() < 0 && (
                        <p className="text-xs text-red-600 mt-1">⚠️ Insufficient amount</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCheckout(false)}
                  disabled={processingPayment}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  <FiX className="inline mr-2" />
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  disabled={processingPayment || (paymentMethod === 'cash' && calculateChange() < 0)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingPayment ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <FiCheck className="inline mr-2" />
                      Complete Sale
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Preview Modal with QR Code */}
      {showReceiptPreview && lastReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">🧾 Receipt Generated!</h2>
              <p className="text-sm text-green-100">Payment successful</p>
            </div>

            <div ref={receiptRef} className="p-6 space-y-4">
              {/* Receipt Header */}
              <div className="text-center border-b-2 border-dashed border-gray-300 pb-4">
                <h3 className="text-xl font-bold text-gray-900">{restaurantName}</h3>
                <p className="text-sm text-gray-600">{restaurantAddress}</p>
                <p className="text-sm text-gray-600">{restaurantPhone}</p>
                <p className="text-xs text-gray-500 mt-2">License: {restaurantLicense} • VAT Registered 🇦🇪</p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Receipt #:</span>
                  <span className="font-mono font-bold">{lastReceipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{lastReceipt.timestamp.toLocaleString('en-AE', { timeZone: 'Asia/Dubai', dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-semibold">{lastReceipt.customerName}</span>
                </div>
                {lastReceipt.customerPhone !== 'N/A' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{lastReceipt.customerPhone}</span>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <h4 className="font-bold text-gray-900 mb-3">Items Purchased:</h4>
                <div className="space-y-2">
                  {lastReceipt.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-semibold">
                        {((typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity).toFixed(2)} AED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t-2 border-dashed border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>{lastReceipt.subtotal.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (5%):</span>
                  <span>{lastReceipt.tax.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t-2 border-gray-300 pt-2">
                  <span>TOTAL:</span>
                  <span className="text-green-600">{lastReceipt.total.toFixed(2)} AED</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <span className="font-semibold">
                    {lastReceipt.paymentMethod === 'cash' ? '💵 Cash' : '💳 Card'}
                  </span>
                </div>
                {lastReceipt.paymentMethod === 'cash' && lastReceipt.cashReceived && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cash Received:</span>
                      <span>{lastReceipt.cashReceived.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-green-600">
                      <span>Change:</span>
                      <span>{lastReceipt.change?.toFixed(2)} AED</span>
                    </div>
                  </>
                )}
              </div>

              {/* QR Code Section */}
              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <div className="text-center">
                  <h4 className="font-bold text-gray-900 mb-3">📱 Scan QR Code</h4>
                  <div className="flex justify-center mb-3">
                    <div className="bg-white p-4 rounded-lg border-4 border-primary-500 shadow-lg">
                      <QRCodeSVG
                        value={`http://localhost:3000/menu?receipt=${lastReceipt.receiptNumber}&total=${lastReceipt.total}`}
                        size={200}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                          src: "/logo.jpg",
                          x: undefined,
                          y: undefined,
                          height: 40,
                          width: 40,
                          excavate: true,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Scan to view our menu online</p>
                  <p className="text-xs text-gray-500 mt-1">🌐 Order again anytime!</p>
                </div>
              </div>

              {/* Footer Message */}
              <div className="text-center border-t-2 border-dashed border-gray-300 pt-4">
                <p className="text-sm font-semibold text-gray-900">✨ Thank you for your purchase!</p>
                <p className="text-xs text-gray-600 mt-1">🌟 Rate us & Get 10% OFF next visit</p>
                <p className="text-xs text-gray-500 mt-2">💝 Please visit us again!</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3">
              <button
                onClick={() => {
                  if (lastReceipt.customerPhone && lastReceipt.customerPhone !== 'N/A') {
                    sendReceiptViaWhatsApp(lastReceipt);
                  } else {
                    toast.warning('Customer phone number required for WhatsApp');
                  }
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" />
                Send via WhatsApp
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <FiPrinter />
                Print Receipt
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowReceiptPreview(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cashier;
