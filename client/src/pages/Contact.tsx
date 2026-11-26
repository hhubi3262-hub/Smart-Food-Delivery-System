import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiStar } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `*Contact Form Submission*\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Rating: ${rating > 0 ? '⭐'.repeat(rating) : 'Not provided'}`;
    
    const whatsappUrl = `https://wa.me/971566407830?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps?q=25.4052,55.5136', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-gold-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-100">
            We'd love to hear from you! Reach out for reservations, feedback, or inquiries
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl text-primary-600">
                  <FiMapPin />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">Shop 64-65, Rashideya 1</p>
                  <p className="text-gray-600">Ajman, United Arab Emirates</p>
                  <button
                    onClick={openGoogleMaps}
                    className="mt-2 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                  >
                    <FiMapPin /> View on Google Maps
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl text-primary-600">
                  <FiPhone />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+971566407830" className="text-gray-600 hover:text-primary-600 block">
                    +971 56 640 7830
                  </a>
                  <a href="tel:+971503309794" className="text-gray-600 hover:text-primary-600 block">
                    +971 50 330 9794
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl text-primary-600">
                  <FiMail />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Email</h3>
                  <a href="mailto:kedir6679@gmail.com" className="text-gray-600 hover:text-primary-600">
                    kedir6679@gmail.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl text-primary-600">
                  <FiClock />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Opening Hours</h3>
                  <p className="text-gray-600">Monday - Sunday</p>
                  <p className="text-gray-600">8:00 AM - 11:00 PM</p>
                  <p className="text-sm text-green-600 font-semibold mt-1">Open Now!</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/971566407830"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-green-500 text-white rounded-xl shadow-md hover:shadow-lg hover:bg-green-600 transition-all"
              >
                <div className="text-3xl">
                  <FaWhatsapp />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                  <p className="text-green-100">Chat with us instantly!</p>
                </div>
              </a>
            </div>

            {/* Rating Section */}
            <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rate Your Experience</h3>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-125"
                  >
                    <FiStar
                      className={`text-4xl ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-gray-600">
                {rating > 0 ? (
                  <span className="font-semibold text-lg">
                    {rating === 5 && '🌟 Excellent!'}
                    {rating === 4 && '😊 Great!'}
                    {rating === 3 && '👍 Good!'}
                    {rating === 2 && '😐 Fair'}
                    {rating === 1 && '😞 Needs Improvement'}
                  </span>
                ) : (
                  'Click to rate us!'
                )}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                    placeholder="+971 50 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition"
                    placeholder="Reservation / Feedback / Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-2xl" />
                  Send via WhatsApp
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Your message will be sent to our WhatsApp for immediate response
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find Us on the Map</h2>
          <div className="relative w-full h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.8687!2d55.5136!3d25.4052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzE4LjciTiA1NcKwMzAnNDkuMCJF!5e0!3m2!1sen!2sae!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <button
              onClick={openGoogleMaps}
              className="absolute bottom-4 right-4 bg-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <FiMapPin className="text-blue-600" />
              Open in Google Maps
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
