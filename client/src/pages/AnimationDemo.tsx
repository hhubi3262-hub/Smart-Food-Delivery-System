import { FiMapPin, FiStar, FiHeart, FiCoffee, FiShoppingCart } from 'react-icons/fi';

const AnimationDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Animation Showcase 🎨
          </h1>
          <p className="text-xl text-gray-600">
            5 New Beautiful Animations for AFAMIA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bounce & Rotate */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <FiMapPin className="text-7xl text-blue-600 animate-bounce-rotate" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Bounce & Rotate
            </h3>
            <p className="text-gray-600 mb-4">
              Perfect for loading states and location detection
            </p>
            <code className="text-sm bg-gray-100 px-3 py-1 rounded">
              animate-bounce-rotate
            </code>
          </div>

          {/* Swing */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <FiStar className="text-7xl text-yellow-500 animate-swing" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Swing
            </h3>
            <p className="text-gray-600 mb-4">
              Gentle pendulum motion for badges and highlights
            </p>
            <code className="text-sm bg-gray-100 px-3 py-1 rounded">
              animate-swing
            </code>
          </div>

          {/* Rotate Up & Down */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <FiHeart className="text-7xl text-red-500 animate-rotate-updown" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Rotate Up & Down
            </h3>
            <p className="text-gray-600 mb-4">
              3D rotation effect with depth perception
            </p>
            <code className="text-sm bg-gray-100 px-3 py-1 rounded">
              animate-rotate-updown
            </code>
          </div>

          {/* Float */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <FiCoffee className="text-7xl text-brown-600 animate-float" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Float
            </h3>
            <p className="text-gray-600 mb-4">
              Smooth floating motion for buttons and icons
            </p>
            <code className="text-sm bg-gray-100 px-3 py-1 rounded">
              animate-float
            </code>
          </div>

          {/* Wobble */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <FiShoppingCart className="text-7xl text-green-600 animate-wobble" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Wobble
            </h3>
            <p className="text-gray-600 mb-4">
              Quick shake for notifications and alerts
            </p>
            <code className="text-sm bg-gray-100 px-3 py-1 rounded">
              animate-wobble
            </code>
          </div>

          {/* Combined Example */}
          <div className="bg-gradient-to-br from-primary-600 to-gold-500 rounded-2xl shadow-lg p-8 text-center text-white">
            <div className="flex justify-center gap-4 mb-6">
              <FiStar className="text-4xl animate-swing" />
              <FiHeart className="text-4xl animate-float" />
              <FiMapPin className="text-4xl animate-wobble" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Mix & Match!
            </h3>
            <p className="text-primary-100 mb-4">
              Combine animations for unique effects
            </p>
            <code className="text-sm bg-white/20 px-3 py-1 rounded">
              Multiple animations
            </code>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-gray-900 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How to Use in Your Code
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-gold-400">
                Simple Icon Animation
              </h4>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-x-auto">
{`<FiMapPin 
  className="text-xl animate-rotate-updown" 
/>`}
              </pre>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-gold-400">
                Animated Button
              </h4>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-x-auto">
{`<button className="bg-blue-500 px-6 py-3 rounded-lg animate-float">
  Order Now
</button>`}
              </pre>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-gold-400">
                Badge with Wobble
              </h4>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-x-auto">
{`<span className="badge animate-wobble">
  3 New Messages
</span>`}
              </pre>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-gold-400">
                Loading State
              </h4>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-x-auto">
{`<FiMapPin 
  className="animate-bounce-rotate" 
/>
<span>Loading...</span>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Button Examples */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Interactive Button Examples
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold animate-float hover:shadow-lg transition">
              🌊 Floating Button
            </button>
            
            <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold animate-wobble hover:shadow-lg transition">
              🎯 Wobble Button
            </button>
            
            <button className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
              <span className="inline-block animate-rotate-updown">⭐</span>
              <span className="ml-2">3D Rotate Icon</span>
            </button>
            
            <button className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
              <span className="inline-block animate-swing">🔔</span>
              <span className="ml-2">Swinging Bell</span>
            </button>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
              <span className="inline-block animate-bounce-rotate">📍</span>
              <span className="ml-2">Bounce & Rotate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDemo;
