import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export const Footer = () => {
  return (
    <footer className="bg-dark-bg text-white py-8 px-4 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src={logo} alt="LineLock Equipment" className="h-10 w-auto mb-4" />
            <p className="text-white/60 text-sm">
              American-made quality for skid steers, excavators, and tractors. Built to last.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-primary">Browse</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-primary transition-colors">All Equipment</Link></li>
              <li><Link to="/category/excavators" className="hover:text-primary transition-colors">Excavators</Link></li>
              <li><Link to="/category/track-loaders" className="hover:text-primary transition-colors">Track Loaders</Link></li>
              <li><Link to="/category/generators" className="hover:text-primary transition-colors">Generators</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-primary">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/sell-equipment" className="hover:text-primary transition-colors">Sell Equipment</Link></li>
              <li><Link to="/financing" className="hover:text-primary transition-colors">0% Financing</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Fast Shipping</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-primary">Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="tel:8644281972" className="hover:text-primary transition-colors">(864) 428-1972</a></li>
              <li><a href="mailto:info@linelockequipment.com" className="hover:text-primary transition-colors">info@linelockequipment.com</a></li>
              <li>Mon-Sat 8am-6pm EST</li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us →</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-sm text-white/40 text-center">
          © 2026 LineLock Equipment. All rights reserved. Made by WeekThink 🇺🇸
        </div>
      </div>
    </footer>
  );
};
