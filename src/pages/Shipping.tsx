import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { usePageSEO } from '@/hooks/usePageSEO';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Shipping = () => {
  const [searchQuery, setSearchQuery] = useState('');

  usePageSEO({
    title: 'Fast Nationwide Shipping | LineLock Equipment',
    description: 'LineLock Equipment offers fast, reliable shipping on all construction equipment across the United States. Get a free shipping quote today.',
    canonical: 'https://linelockv2.lovable.app/shipping',
  });

  const features = [
    { icon: Truck, title: 'Nationwide Delivery', description: 'We ship to all 50 states with trusted freight carriers.' },
    { icon: Clock, title: 'Fast Turnaround', description: 'Most equipment ships within 3–5 business days of purchase.' },
    { icon: Shield, title: 'Fully Insured', description: 'Every shipment is fully insured for your peace of mind.' },
    { icon: MapPin, title: 'Door-to-Door', description: 'Equipment delivered right to your job site or yard.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shipping</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fast & Reliable Shipping</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              We handle the logistics so you can focus on the job. Nationwide equipment delivery, fully insured.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-card border border-border rounded-lg p-6 flex gap-4">
                <div className="p-3 bg-primary/10 rounded-lg h-fit">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">Need a Shipping Quote?</h2>
            <p className="text-muted-foreground mb-6">
              Contact us with the equipment you're interested in and your delivery location. We'll get back to you with a quote within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Get a Quote
                </Button>
              </Link>
              <a href="tel:8642527174">
                <Button variant="outline">Call (864) 252-7174</Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
