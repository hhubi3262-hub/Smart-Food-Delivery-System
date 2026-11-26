import { FiAward, FiUsers, FiStar, FiHeart } from 'react-icons/fi';
import Logo from '../components/Logo';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-gold-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Logo size="xl" showText={false} className="mx-auto mb-6 text-white" />
            <h1 className="text-5xl font-bold mb-4">About AFAMIA CAFE</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Bringing authentic Ethiopian and international cuisine to Ajman since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              AFAMIA CAFE AND RESTAURANT was founded by <strong>Chef Yabuabel (Kedir Ahmed Ebrahim)</strong> 
              with a vision to bring the rich flavors of Ethiopian cuisine to the UAE while also serving 
              beloved international dishes.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Located in the heart of Rashideya 1, Ajman, our restaurant has become a beloved destination 
              for both Ethiopian expatriates and food lovers from around the world.
            </p>
            <p className="text-lg text-gray-700">
              Every dish we serve is prepared with love, using traditional recipes passed down through 
              generations and the freshest ingredients available.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">☕</div>
              <div className="text-3xl font-bold text-primary-600">5+</div>
              <div className="text-gray-600">Years Serving</div>
            </div>
            <div className="bg-gold-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <div className="text-3xl font-bold text-gold-600">40+</div>
              <div className="text-gray-600">Menu Items</div>
            </div>
            <div className="bg-green-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-green-600">4.9</div>
              <div className="text-gray-600">Rating</div>
            </div>
            <div className="bg-blue-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">👥</div>
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<FiAward className="text-5xl" />}
              title="Quality"
              description="We use only the finest ingredients and maintain the highest standards"
            />
            <ValueCard
              icon={<FiUsers className="text-5xl" />}
              title="Community"
              description="Building connections through food and bringing people together"
            />
            <ValueCard
              icon={<FiStar className="text-5xl" />}
              title="Excellence"
              description="Striving for perfection in every dish and every service"
            />
            <ValueCard
              icon={<FiHeart className="text-5xl" />}
              title="Passion"
              description="Cooking with love and dedication in every meal we prepare"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamCard
              name="Chef Yabuabel"
              role="Owner & Head Chef"
              description="Master of Ethiopian cuisine with 15+ years experience"
              emoji="👨‍🍳"
            />
            <TeamCard
              name="Faiza Yimam Nurye"
              role="Restaurant Manager"
              description="Ensuring every guest has an exceptional experience"
              emoji="👩‍💼"
            />
            <TeamCard
              name="Our Kitchen Team"
              role="Culinary Experts"
              description="Dedicated professionals bringing flavors to life"
              emoji="👥"
            />
          </div>
        </div>
      </section>

      {/* License Info */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Fully Licensed & Certified</h3>
          <p className="text-primary-100 mb-2">
            AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C)
          </p>
          <p className="text-primary-100 mb-2">
            License Number: 133469 | Ajman Municipality Approved
          </p>
          <p className="text-primary-100">
            VAT Compliant | Food Safety Certified
          </p>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center">
    <div className="text-primary-600 mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamCard = ({ name, role, description, emoji }: { name: string; role: string; description: string; emoji: string }) => (
  <div className="bg-gradient-to-br from-primary-50 to-gold-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
    <div className="text-6xl mb-4">{emoji}</div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
    <p className="text-primary-600 font-semibold mb-3">{role}</p>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default About;
