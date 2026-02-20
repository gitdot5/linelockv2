import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { usePageSEO } from '@/hooks/usePageSEO';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Financing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  usePageSEO({
    title: '0% Financing Available | LineLock Equipment',
    description: 'Get 0% financing on quality construction equipment. Easy application, fast approval. Contact LineLock Equipment at (864) 428-1972.',
    canonical: 'https://linelockv2.lovable.app/financing',
  });

  const perks = [
    '0% interest on select equipment',
    'Flexible terms up to 60 months',
    'Quick approval — often same day',
    'No prepayment penalties',
    'Available for new and used equipment',
    'Competitive rates for all credit levels',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Financing</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Limited Time Offer
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">0% Financing Available</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Get the equipment you need today and pay over time — with no interest on qualifying purchases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Perks list */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">What's Included</h2>
              <ul className="space-y-4">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-muted rounded-lg p-6 mt-8">
                <h3 className="font-semibold text-foreground mb-2">How to Apply</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Browse our <Link to="/" className="text-primary hover:underline">equipment listings</Link></li>
                  <li>Submit an inquiry or call us at (864) 428-1972</li>
                  <li>Complete a short credit application</li>
                  <li>Get approved and start using your equipment</li>
                </ol>
              </div>
            </div>

            {/* Form */}
            <ContactForm equipmentTitle="Financing Inquiry" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Financing;
