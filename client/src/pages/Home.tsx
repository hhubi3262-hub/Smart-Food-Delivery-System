import { Link } from 'react-router-dom';
import { FiShoppingCart, FiCalendar, FiMapPin, FiPhone, FiMail, FiClock, FiCoffee, FiStar, FiTrendingUp, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section — Smart Split Layout */}
      <section className="relative min-h-screen bg-[#0d0d0d] overflow-hidden flex flex-col lg:flex-row">

        {/* ── Left panel: text content ── */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-28 lg:py-0 w-full lg:w-1/2">

          {/* Ambient glow */}
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-amber-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-10 w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs tracking-[0.2em] uppercase font-light">
              Ajman, UAE · Est. 2020
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-light leading-none text-white mb-6">
            <span className="block text-5xl md:text-7xl xl:text-8xl tracking-tight">
              AFAMIA
            </span>
            <span
              className="block text-5xl md:text-7xl xl:text-8xl tracking-tight"
              style={{
                WebkitTextStroke: '1px rgba(251,191,36,0.6)',
                color: 'transparent',
              }}
            >
              CAFÉ &amp;
            </span>
            <span className="block text-5xl md:text-7xl xl:text-8xl tracking-tight text-amber-400">
              RESTAURANT
            </span>
          </h1>

          {/* Sub-line */}
          <p className="text-gray-400 text-base md:text-lg font-light max-w-sm mb-10 leading-relaxed">
            Authentic Ethiopian &amp; International cuisine, crafted with passion in the heart of Ajman.
            <span className="block mt-2 text-amber-400/70 tracking-widest text-sm">ከድር · كدير · KEDIR</span>
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              to="/menu"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-medium tracking-widest uppercase text-sm px-10 py-4 transition-colors duration-300"
            >
              <FiCoffee />
              View Menu
              <span className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
            </Link>
            <Link
              to="/order"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-amber-500/60 text-white hover:text-amber-300 text-sm tracking-widest uppercase px-10 py-4 transition-colors duration-300"
            >
              <FaWhatsapp />
              Order Now
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex gap-10 border-t border-white/10 pt-8">
            {[
              { value: '50+', label: 'Menu Items' },
              { value: '4.9★', label: 'Rating' },
              { value: '3 min', label: 'Order Time' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-light text-white">{value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel: imagery ── */}
        <div className="relative w-full lg:w-1/2 min-h-[55vw] lg:min-h-0">

          {/* Main hero image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85"
              alt="Signature dish"
              className="w-full h-full object-cover object-center"
            />
            {/* gradient blends image into dark left panel on desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-transparent lg:block hidden" />
            {/* gradient on mobile: darken top */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/80 via-transparent to-transparent lg:hidden" />
            {/* subtle vignette right edge */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent" />
          </div>

          {/* Floating order card */}
          <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-52 shadow-2xl hidden md:block">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center">
                <FiShoppingCart className="text-amber-400 text-sm" />
              </div>
              <div>
                <p className="text-white text-xs font-medium">New Order</p>
                <p className="text-gray-500 text-[10px]">Just now</p>
              </div>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Ethiopian Coffee Ceremony · <span className="text-amber-400">AED 15</span>
            </p>
            <div className="mt-3 w-full bg-white/5 rounded-full h-1">
              <div className="bg-amber-400 h-1 rounded-full w-3/4 animate-pulse" />
            </div>
            <p className="text-gray-500 text-[10px] mt-1">Preparing…</p>
          </div>

          {/* Floating rating pill */}
          <div className="absolute bottom-10 right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 flex items-center gap-3 shadow-2xl hidden md:flex">
            <div className="flex -space-x-2">
              {['bg-amber-400','bg-orange-500','bg-yellow-300'].map((c,i) => (
                <div key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-black/60 flex items-center justify-center text-black text-[10px] font-bold`}>
                  {['K','F','A'][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white text-xs font-medium">200+ Happy Guests</p>
              <p className="text-amber-400 text-[10px]">★★★★★ this week</p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden animate-bounce">
            <div className="w-5 h-9 border border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-amber-400/70 rounded-full" />
            </div>
          </div>
        </div>

        {/* Desktop scroll indicator */}
        <div className="hidden lg:flex absolute bottom-10 left-24 items-center gap-3 text-white/30 text-xs uppercase tracking-widest animate-bounce">
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1">
            <div className="w-0.5 h-2 bg-white/50 rounded-full" />
          </div>
          Scroll
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
                  alt="Restaurant ambiance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold-500 -z-10"></div>
            </div>

            {/* Content */}
            <div>
              <p className="text-gold-600 uppercase tracking-widest text-sm mb-4 font-light flex items-center gap-2">
                <FiAward className="text-gold-500" />
                Est. 2020
              </p>
              <h2 className="font-serif text-5xl font-light mb-6 text-gray-900">
                A Culinary Journey
              </h2>
              <div className="w-20 h-0.5 bg-gold-500 mb-8"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Welcome to AFAMIA, where Ethiopian tradition meets international cuisine. 
                Founded by Chef Yabuabel (Kedir Ahmed Ebrahim), our restaurant brings 
                authentic flavors and warm hospitality to the heart of Ajman.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Every dish is crafted with passion, using the finest ingredients and 
                time-honored recipes. From aromatic Ethiopian coffee ceremonies to 
                contemporary international dishes, we celebrate culinary excellence.
              </p>
              <Link 
                to="/about" 
                className="inline-block text-gold-600 uppercase tracking-widest text-sm font-light hover:text-gold-700 transition-colors group"
              >
                Discover Our Story 
                <span className="inline-block ml-2 group-hover:ml-4 transition-all">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 uppercase tracking-widest text-sm mb-4 font-light flex items-center justify-center gap-2">
              <FiStar className="text-gold-500" />
              Menu Highlights
            </p>
            <h2 className="font-serif text-5xl font-light mb-6">Signature Dishes</h2>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-8"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our carefully curated selection of authentic flavors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DishCard 
              image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"
              title="Ethiopian Coffee"
              description="Traditional coffee ceremony with freshly roasted beans"
              price="AED 15"
            />
            <DishCard 
              image="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80"
              title="Signature Pasta"
              description="Handcrafted pasta with authentic Italian sauces"
              price="AED 45"
            />
            <DishCard 
              image="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80"
              title="Chef's Special"
              description="Fusion of Ethiopian spices with international techniques"
              price="AED 65"
            />
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/menu" 
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white px-12 py-4 text-lg font-light tracking-wider uppercase transition-all duration-300"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section - Gallery Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 uppercase tracking-widest text-sm mb-4 font-light flex items-center justify-center gap-2">
              <FiTrendingUp className="text-gold-500" />
              Gallery
            </p>
            <h2 className="font-serif text-5xl font-light mb-6 text-gray-900">The AFAMIA Experience</h2>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GalleryImage 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Restaurant interior"
            />
            <GalleryImage 
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80"
              alt="Kitchen"
              tall
            />
            <GalleryImage 
              src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80"
              alt="Coffee brewing"
            />
            <GalleryImage 
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80"
              alt="Dining"
            />
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/gallery" 
              className="inline-block text-gold-600 uppercase tracking-widest text-sm font-light hover:text-gold-700 transition-colors group"
            >
              View Complete Gallery 
              <span className="inline-block ml-2 group-hover:ml-4 transition-all">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact/Location Section */}
      <section className="relative py-24 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <p className="text-gold-400 uppercase tracking-widest text-sm mb-4 font-light flex items-center gap-2">
                <FiMapPin className="text-lg" />
                Visit Us
              </p>
              <h2 className="font-serif text-5xl font-light mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <ContactItem 
                  icon={<FiMapPin className="text-2xl" />}
                  title="Location"
                  content="Shop 64-65, Rashideya 1, Ajman, UAE"
                  subContent="License: 133469"
                />
                <ContactItem 
                  icon={<FiPhone className="text-2xl" />}
                  title="Phone"
                  content="+971 56 640 7830"
                  subContent="+971 50 330 9794"
                />
                <ContactItem 
                  icon={<FiMail className="text-2xl" />}
                  title="Email"
                  content="kedir6679@gmail.com"
                />
                <ContactItem 
                  icon={<FiClock className="text-2xl" />}
                  title="Hours"
                  content="Daily: 8:00 AM - 11:00 PM"
                />
              </div>

              <div className="mt-12">
                <Link 
                  to="/contact" 
                  className="inline-block bg-gold-500 hover:bg-gold-600 text-white px-10 py-4 text-lg font-light tracking-wider uppercase transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Map Preview */}
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.5!2d55.5136!3d25.4052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzE4LjciTiA1NcKwMzAnNDkuMCJF!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="brightness-75 saturate-50"
              ></iframe>
              <div className="absolute inset-0 border-4 border-gold-500/30 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Reservation CTA */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Reserve a table"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-white text-center px-4">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl font-light mb-6 flex items-center justify-center gap-4">
              <FiCalendar className="text-gold-400" />
              Reserve Your Table
            </h2>
            <p className="text-xl mb-8 text-gray-200">Experience exceptional dining</p>
            <Link 
              to="/order" 
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white px-12 py-4 text-lg font-light tracking-wider uppercase transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-3">
                <FaWhatsapp className="text-xl" />
                Book Now via WhatsApp
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component Definitions
const DishCard = ({ image, title, description, price }: { 
  image: string; 
  title: string; 
  description: string; 
  price: string;
}) => (
  <div className="group cursor-pointer">
    <div className="aspect-[4/5] overflow-hidden mb-6">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <h3 className="font-serif text-2xl font-light mb-3 text-gold-400">{title}</h3>
    <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>
    <p className="text-white font-light text-lg">{price}</p>
  </div>
);

const GalleryImage = ({ src, alt, tall = false }: { src: string; alt: string; tall?: boolean }) => (
  <div className={`relative overflow-hidden group cursor-pointer ${tall ? 'row-span-2' : ''}`}>
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

const ContactItem = ({ icon, title, content, subContent }: { 
  icon: React.ReactNode; 
  title: string; 
  content: string; 
  subContent?: string;
}) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 text-gold-400 mt-1">
      {icon}
    </div>
    <div>
      <p className="text-gold-400 text-sm uppercase tracking-widest font-light mb-1">{title}</p>
      <p className="text-white text-lg">{content}</p>
      {subContent && <p className="text-gray-400">{subContent}</p>}
    </div>
  </div>
);

const StatCard = ({ icon, number, label }: { icon: string; number: string; label: string }) => (
  <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
    <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">{icon}</div>
    <div className="text-4xl font-bold text-primary-600 mb-2">{number}</div>
    <div className="text-gray-600 font-medium">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    gold: 'from-gold-500 to-gold-600',
  }[color] || 'from-primary-500 to-primary-600';

  return (
    <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${colorClasses} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const MenuCategoryCard = ({ emoji, title, items }: { emoji: string; title: string; items: string }) => (
  <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-all duration-300 group transform hover:scale-105 border border-gray-700">
    <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{emoji}</div>
    <h3 className="text-2xl font-bold mb-3 text-gold-400">{title}</h3>
    <p className="text-gray-300">{items}</p>
  </div>
);

const LanguageCard = ({ flag, language, description }: { flag: string; language: string; description: string }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 group">
    <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{flag}</div>
    <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">{language}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatusItem = ({ label, status, color, percentage }: { label: string; status: string; color: string; percentage?: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="font-medium text-gray-700">{label}</span>
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
        color === 'green' ? 'bg-secondary-100 text-secondary-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </div>
    {percentage && (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-1000" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    )}
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-gray-700">
    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
      <span className="text-white text-sm">✓</span>
    </div>
    <span className="text-lg">{text}</span>
  </li>
);

const VideoCard = ({ src, title }: { src: string; title: string }) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300">
    <video 
      className="w-full h-48 object-cover"
      controls
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
      <h4 className="text-white font-semibold text-sm">{title}</h4>
    </div>
  </div>
);

export default Home;
