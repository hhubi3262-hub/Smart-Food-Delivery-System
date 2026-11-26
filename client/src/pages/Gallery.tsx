import { useState } from 'react';
import { FiX, FiImage, FiCoffee, FiHome, FiGrid, FiUsers, FiLayers, FiCalendar, FiStar, FiAward } from 'react-icons/fi';

type GalleryCategory = 'all' | 'food' | 'restaurant' | 'kitchen' | 'chef' | 'tables' | 'events';

interface GalleryItem {
  id: number;
  category: GalleryCategory;
  title: string;
  image: string;
  description: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    // Food Items
    { id: 1, category: 'food', title: 'Shekla Tibs', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80', description: 'Our signature Ethiopian beef dish' },
    { id: 2, category: 'food', title: 'Asham VIP', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', description: 'Premium mixed platter for sharing' },
    { id: 3, category: 'food', title: 'Ethiopian Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', description: 'Traditional coffee ceremony' },
    { id: 4, category: 'food', title: 'Pasta Carbonara', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80', description: 'Creamy Italian pasta' },
    { id: 5, category: 'food', title: 'Gomen Besega', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', description: 'Collard greens with tender beef' },
    { id: 6, category: 'food', title: 'Fresh Juices', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80', description: 'Freshly squeezed natural juices' },
    
    // Restaurant Interior
    { id: 7, category: 'restaurant', title: 'Main Dining Area', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', description: 'Spacious and comfortable seating' },
    { id: 8, category: 'restaurant', title: 'VIP Section', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80', description: 'Private dining for special occasions' },
    { id: 9, category: 'restaurant', title: 'Outdoor Seating', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', description: 'Al fresco dining experience' },
    { id: 10, category: 'restaurant', title: 'Entrance', image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=600&q=80', description: 'Welcoming atmosphere from the start' },
    
    // Kitchen
    { id: 11, category: 'kitchen', title: 'Modern Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80', description: 'State-of-the-art equipment' },
    { id: 12, category: 'kitchen', title: 'Prep Station', image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80', description: 'Fresh ingredients prepared daily' },
    { id: 13, category: 'kitchen', title: 'Cooking Line', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80', description: 'Where the magic happens' },
    { id: 14, category: 'kitchen', title: 'Food Safety', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80', description: 'Hygiene certified facilities' },
    
    // Chefs
    { id: 15, category: 'chef', title: 'Chef Yabuabel', image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&q=80', description: 'Head Chef & Owner' },
    { id: 16, category: 'chef', title: 'Kitchen Team', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80', description: 'Our talented culinary team' },
    { id: 17, category: 'chef', title: 'Sous Chef', image: 'https://images.unsplash.com/photo-1571730894-63c42a06a05e?w=600&q=80', description: 'Master of Ethiopian cuisine' },
    { id: 18, category: 'chef', title: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1556910591-c71e18b6f4a5?w=600&q=80', description: 'Creating sweet delights' },
    
    // Tables
    { id: 19, category: 'tables', title: '2-Person Tables', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', description: 'Intimate dining for couples' },
    { id: 20, category: 'tables', title: '4-Person Tables', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80', description: 'Perfect for small families' },
    { id: 21, category: 'tables', title: '6-Person Tables', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80', description: 'Group dining experience' },
    { id: 22, category: 'tables', title: 'Large Banquet Tables', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80', description: 'For special celebrations' },
    
    // Events
    { id: 23, category: 'events', title: 'Birthday Celebrations', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80', description: 'Make your day special' },
    { id: 24, category: 'events', title: 'Corporate Events', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80', description: 'Professional gatherings' },
    { id: 25, category: 'events', title: 'Cultural Nights', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80', description: 'Ethiopian cultural experiences' },
    { id: 26, category: 'events', title: 'Private Parties', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80', description: 'Exclusive venue hire' },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: FiImage },
    { id: 'food', label: 'Food', icon: FiCoffee },
    { id: 'restaurant', label: 'Restaurant', icon: FiHome },
    { id: 'kitchen', label: 'Kitchen', icon: FiGrid },
    { id: 'chef', label: 'Chefs', icon: FiUsers },
    { id: 'tables', label: 'Tables', icon: FiLayers },
    { id: 'events', label: 'Events', icon: FiCalendar },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-gold-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-primary-100">
            Explore our restaurant, dishes, kitchen, and team
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 sticky top-16 bg-white/95 backdrop-blur-sm z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as GalleryCategory)}
                  className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-primary-600 to-gold-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="text-lg" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            >
              {/* Real Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <span className="inline-block mt-2 text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {categories.find(c => c.id === item.category)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <FiImage className="text-6xl mb-4 mx-auto text-gray-400" />
            <p className="text-xl text-gray-600">No items found in this category</p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <FiX />
          </button>
          
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 overflow-hidden">
              <img 
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
              <p className="text-lg text-gray-600 mb-4">{selectedImage.description}</p>
              <span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-full">
                {categories.find(c => c.id === selectedImage.category)?.label}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-gold-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <FiCoffee className="text-5xl mb-2 mx-auto" />
              <div className="text-4xl font-bold">40+</div>
              <div className="text-primary-100">Menu Items</div>
            </div>
            <div>
              <FiLayers className="text-5xl mb-2 mx-auto" />
              <div className="text-4xl font-bold">50+</div>
              <div className="text-primary-100">Dining Seats</div>
            </div>
            <div>
              <FiUsers className="text-5xl mb-2 mx-auto" />
              <div className="text-4xl font-bold">10+</div>
              <div className="text-primary-100">Expert Chefs</div>
            </div>
            <div>
              <FiStar className="text-5xl mb-2 mx-auto" />
              <div className="text-4xl font-bold">4.9</div>
              <div className="text-primary-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
