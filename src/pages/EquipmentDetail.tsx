import { useParams, Link } from 'react-router-dom';
import { equipmentData } from '@/data/equipment';
import { Header } from '@/components/Header';
import { EquipmentGallery } from '@/components/EquipmentGallery';
import { EquipmentSpecsTable } from '@/components/EquipmentSpecsTable';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { RelatedEquipment } from '@/components/RelatedEquipment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Share2, Heart } from 'lucide-react';
import { useState } from 'react';
import { usePageSEO } from '@/hooks/usePageSEO';
import { generateEquipmentJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonLd';

const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const equipment = equipmentData.find((e) => e.id === Number(id));

  const pageTitle = equipment
    ? `${equipment.title} | LineLock Equipment`
    : 'Equipment Not Found | LineLock Equipment';

  usePageSEO({
    title: pageTitle,
    description: equipment
      ? `${equipment.condition} ${equipment.title} for sale. ${equipment.location}. Contact LineLock Equipment at (864) 252-7174.`
      : 'The equipment listing you are looking for was not found.',
    canonical: `https://linelockv2.lovable.app/equipment/${id}`,
  });

  const productJsonLd = equipment ? generateEquipmentJsonLd(equipment) : null;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://linelockv2.lovable.app/' },
    { name: 'Equipment', url: 'https://linelockv2.lovable.app/' },
    ...(equipment ? [{ name: equipment.title, url: `https://linelockv2.lovable.app/equipment/${id}` }] : []),
  ]);

  if (!equipment) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Equipment Not Found</h1>
          <p className="text-muted-foreground mb-8">The listing you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return 'Call for Price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const conditionColors = {
    New: 'bg-success text-success-foreground',
    Used: 'bg-muted text-muted-foreground',
    'Certified Pre-Owned': 'bg-primary text-primary-foreground',
  };

  // For gallery — use main image (could be extended with multiple images in the future)
  const images = [equipment.image];

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: equipment.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <>
      {productJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/" className="hover:text-primary transition-colors">Equipment</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{equipment.title}</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 lg:py-10">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-all duration-200 mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to all listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column — gallery & specs */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            <EquipmentGallery images={images} title={equipment.title} />

            {/* Title & price (mobile) */}
            <div className="lg:hidden space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{equipment.title}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={conditionColors[equipment.condition]}>{equipment.condition}</Badge>
                    {equipment.status === 'sold' && (
                      <Badge className="bg-destructive text-destructive-foreground">Sold</Badge>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-3xl font-bold text-primary">{formatPrice(equipment.price)}</p>
            </div>

            <EquipmentSpecsTable equipment={equipment} />
          </div>

          {/* Right column — price card & contact form */}
          <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            {/* Price card (desktop) */}
            <div className="hidden lg:block bg-card rounded-lg border border-border p-6">
              <h1 className="text-xl font-bold text-foreground mb-2">{equipment.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={conditionColors[equipment.condition]}>{equipment.condition}</Badge>
                {equipment.status === 'sold' && (
                  <Badge className="bg-destructive text-destructive-foreground">Sold</Badge>
                )}
              </div>
              <p className="text-3xl font-bold text-primary mb-5">{formatPrice(equipment.price)}</p>

              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-destructive border-destructive/30' : ''}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isFavorite ? 'fill-destructive' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                {equipment.facebookUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={equipment.facebookUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Listing
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <ContactForm equipmentTitle={equipment.title} />
          </div>
        </div>

        <RelatedEquipment currentEquipment={equipment} />
      </main>

      <Footer />
    </div>
    </>
  );
};

export default EquipmentDetail;
