import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { usePageSEO } from '@/hooks/usePageSEO';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  usePageSEO({
    title: 'Contact Us | LineLock Equipment',
    description: 'Get in touch with LineLock Equipment. Call (864) 428-1972 or email info@linelockequipment.com. Mon-Sat 8am-6pm EST.',
    canonical: 'https://linelockv2.lovable.app/contact',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Contact Us</h1>
          <p className="text-muted-foreground mb-10 text-lg">
            Have a question about a listing or want to sell your equipment? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  { icon: Phone, label: 'Phone', value: '(864) 428-1972', href: 'tel:8644281972' },
                  { icon: Mail, label: 'Email', value: 'info@linelockequipment.com', href: 'mailto:info@linelockequipment.com' },
                  { icon: Clock, label: 'Hours', value: 'Mon-Sat 8am-6pm EST' },
                  { icon: MapPin, label: 'Location', value: 'United States' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{label}</p>
                      {href ? (
                        <a href={href} className="text-foreground hover:text-primary transition-colors font-medium">{value}</a>
                      ) : (
                        <p className="text-foreground font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Looking to sell equipment?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  We buy quality construction equipment. Get a free valuation by contacting us or visiting our sell page.
                </p>
                <Link to="/sell-equipment" className="text-sm text-primary font-medium hover:underline">
                  Learn more about selling →
                </Link>
              </div>
            </div>

            {/* Form */}
            <ContactForm equipmentTitle="General Inquiry" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
