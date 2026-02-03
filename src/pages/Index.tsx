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
      <section className="bg-gradient-to-r from-foreground to-foreground/90 text-card py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Construction Equipment For Sale</h1>
          <p className="text-card/80">
            Browse {equipmentData.length} excavators, loaders, dozers, cranes & more from trusted dealers
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
      <footer className="bg-foreground text-card py-8 px-4 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">HE</span>
                </div>
                <span className="font-bold text-lg">HeavyEquip</span>
              </div>
              <p className="text-card/70 text-sm">
                The trusted marketplace for construction equipment since 1998.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Browse</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li><a href="#" className="hover:text-primary">Excavators</a></li>
                <li><a href="#" className="hover:text-primary">Wheel Loaders</a></li>
                <li><a href="#" className="hover:text-primary">Bulldozers</a></li>
                <li><a href="#" className="hover:text-primary">Cranes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li><a href="#" className="hover:text-primary">Sell Equipment</a></li>
                <li><a href="#" className="hover:text-primary">Dealer Portal</a></li>
                <li><a href="#" className="hover:text-primary">Financing</a></li>
                <li><a href="#" className="hover:text-primary">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li>1-800-555-EQUIP</li>
                <li>support@heavyequip.com</li>
                <li>Mon-Fri 8am-6pm CST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-card/20 mt-8 pt-6 text-sm text-card/50 text-center">
            © 2024 HeavyEquip. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
