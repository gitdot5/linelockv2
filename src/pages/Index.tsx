import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { EquipmentGrid } from '@/components/EquipmentGrid';
import { MobileFilters } from '@/components/MobileFilters';
import { equipmentData } from '@/data/equipment';
import heroBanner from '@/assets/hero-banner.jpg';
import logo from '@/assets/logo.png';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2018, 2024]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const filteredEquipment = useMemo(() => {
    let filtered = equipmentData.filter((item) => {
      // Search filter
      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
        return false;
      }

      // Manufacturer filter
      if (selectedManufacturers.length > 0 && !selectedManufacturers.includes(item.manufacturer)) {
        return false;
      }

      // Price filter (skip items with no price - "Call for Price")
      if (item.price !== undefined) {
        if (item.price < priceRange[0] || item.price > priceRange[1]) {
          return false;
        }
      }

      // Year filter
      if (item.year < yearRange[0] || item.year > yearRange[1]) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedManufacturers, priceRange, yearRange, sortBy]);

  const activeFilterCount =
    selectedCategories.length +
    selectedManufacturers.length +
    (priceRange[0] > 0 || priceRange[1] < 2000000 ? 1 : 0) +
    (yearRange[0] > 2018 || yearRange[1] < 2024 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Hero Section */}
      <section 
        className="relative bg-dark-bg text-white py-16 md:py-24 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/70 to-dark-bg/50" />
        
        <div className="container mx-auto relative z-10">
          <span className="inline-block bg-dark-bg-light/80 backdrop-blur-sm text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/20">
            🔥 BIGGEST SALE OF THE YEAR — Up to $2,000 OFF!
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            PREMIUM <span className="text-primary">EQUIPMENT</span><br />
            FOR SALE
          </h1>
          <p className="text-white/80 max-w-xl text-lg mb-6">
            Browse {equipmentData.length} excavators, loaders, dozers, cranes & more from trusted dealers nationwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-dark-bg px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
              Browse Equipment
            </button>
            <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <nav className="text-sm text-muted-foreground">
            <span className="hover:text-primary cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">Construction Equipment</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4 lg:hidden">
          <MobileFilters
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            selectedManufacturers={selectedManufacturers}
            onManufacturerChange={setSelectedManufacturers}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            yearRange={yearRange}
            onYearChange={setYearRange}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedManufacturers={selectedManufacturers}
              onManufacturerChange={setSelectedManufacturers}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              yearRange={yearRange}
              onYearChange={setYearRange}
            />
          </div>

          {/* Equipment Grid */}
          <EquipmentGrid
            equipment={filteredEquipment}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={filteredEquipment.length}
          />
        </div>
      </main>

      {/* Footer */}
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
                <li><a href="#" className="hover:text-primary transition-colors">Excavators</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Wheel Loaders</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Bulldozers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cranes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Services</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-primary transition-colors">Sell Equipment</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Dealer Portal</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">0% Financing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Fast Shipping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Contact</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>(864) 252-7174</li>
                <li>support@linelock.com</li>
                <li>Mon-Sat 8am-6pm EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-6 text-sm text-white/40 text-center">
            © 2024 LineLock Equipment. All rights reserved. Made in USA 🇺🇸
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
