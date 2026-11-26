import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo size="md" showText={false} className="mb-4 text-white" />
            <h3 className="text-xl font-bold mb-2">AFAMIA CAFE</h3>
            <p className="text-gray-400 mb-2 text-sm">
              KEDIR - ከድር
            </p>
            <p className="text-gray-400 text-sm">
              Ethiopian & International Cuisine
            </p>
            <p className="text-gray-400 text-sm mt-2">
              License: 133469
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/menu" className="hover:text-white transition">Menu</a></li>
              <li><a href="/reservations" className="hover:text-white transition">Reservations</a></li>
              <li><a href="/orders" className="hover:text-white transition">Orders</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a href="mailto:kedir6679@gmail.com" className="hover:text-white transition">
                  kedir6679@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <a href="tel:+971566407830" className="hover:text-white transition">
                  +971 56 640 7830
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href="tel:+971503309794" className="hover:text-white transition">
                  +971 50 330 9794
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Shop 64-65, Rashideya 1<br/>Ajman, UAE</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Documents</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="/documents/agreement-report.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  📄 Agreement Report
                </a>
              </li>
              <li>
                <span className="text-sm">Business License: 133469</span>
              </li>
              <li>
                <span className="text-sm">VAT Compliant</span>
              </li>
              <li>
                <span className="text-sm">Ajman Municipality Approved</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 AFAMIA CAFE AND RESTAURANT (S.P.S - L.L.C). All rights reserved.</p>
          <p className="text-sm mt-2">
            Owner: Chef Yabuabel (Kedir Ahmed Ebrahim) | VAT Compliant | License: 133469
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
