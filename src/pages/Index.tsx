import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { EquipmentGrid } from '@/components/EquipmentGrid';
import { MobileFilters } from '@/components/MobileFilters';
import { equipmentData } from '@/data/equipment';

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

      // Price filter
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
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
      <section className="bg-dark-bg text-white py-8 px-4">
        <div className="container mx-auto">
          <span className="inline-block bg-dark-bg-light text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            🔥 BIGGEST SALE OF THE YEAR — Up to $2,000 OFF!
          </span>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            PREMIUM <span className="text-primary">EQUIPMENT</span> FOR SALE
          </h1>
          <p className="text-white/70 max-w-xl">
            Browse {equipmentData.length} excavators, loaders, dozers, cranes & more from trusted dealers nationwide.
          </p>
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
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 40 40" className="w-8 h-8">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="hsl(180, 100%, 45%)" strokeWidth="2" />
                  <circle cx="20" cy="20" r="12" fill="none" stroke="hsl(180, 100%, 45%)" strokeWidth="2" />
                  <circle cx="20" cy="20" r="4" fill="hsl(180, 100%, 45%)" />
                  <rect x="18" y="2" width="4" height="8" fill="hsl(180, 100%, 45%)" />
                  <rect x="18" y="30" width="4" height="8" fill="hsl(180, 100%, 45%)" />
                  <rect x="2" y="18" width="8" height="4" fill="hsl(180, 100%, 45%)" />
                  <rect x="30" y="18" width="8" height="4" fill="hsl(180, 100%, 45%)" />
                </svg>
                <span className="font-bold text-lg">
                  <span className="text-primary">Line</span>
                  <span className="text-white">Lock</span>
                </span>
              </div>
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
