import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { usePageSEO } from '@/hooks/usePageSEO';
import { Link } from 'react-router-dom';
import { DollarSign, Truck, Shield, Clock } from 'lucide-react';

const SellEquipment = () => {
  const [searchQuery, setSearchQuery] = useState('');

  usePageSEO({
    title: 'Sell Your Equipment | LineLock Equipment',
    description: 'Sell your construction equipment with LineLock. Get top dollar for your used excavators, loaders, and generators. Free valuations. Call (864) 252-7174.',
    canonical: 'https://linelockv2.lovable.app/sell-equipment',
  });

  const benefits = [
    { icon: DollarSign, title: 'Top Dollar Offers', description: 'We offer competitive prices based on current market values.' },
    { icon: Clock, title: 'Fast Turnaround', description: 'Get a valuation within 24 hours and payment within days.' },
    { icon: Truck, title: 'Free Pickup', description: 'We handle transport logistics at no cost to you.' },
    { icon: Shield, title: 'Trusted Process', description: 'Transparent, honest transactions every time.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Sell Equipment</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sell Your Equipment</h1>
          <p className="text-lg text-muted-foreground">
            Ready to sell your construction equipment? We make it easy. Get a free valuation and top dollar for your machines.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-4 text-center">Request a Free Valuation</h2>
          <ContactForm equipmentTitle="Equipment Valuation Request" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellEquipment;
