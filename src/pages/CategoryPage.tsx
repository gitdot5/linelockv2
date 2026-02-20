import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EquipmentGrid } from '@/components/EquipmentGrid';
import { equipmentData, categories } from '@/data/equipment';
import { usePageSEO } from '@/hooks/usePageSEO';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const category = categories.find((c) => c.id === slug);
  const categoryName = category?.name ?? slug?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) ?? '';

  usePageSEO({
    title: `${categoryName} For Sale | LineLock Equipment`,
    description: `Browse quality ${categoryName.toLowerCase()} for sale. American-made construction equipment with 0% financing available. Call (864) 428-1972.`,
    canonical: `https://linelockv2.lovable.app/category/${slug}`,
  });

  const filtered = useMemo(() => {
    let items = equipmentData.filter((e) => e.category === slug);
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case 'price-high':
        items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'year-new':
        items.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        items.sort((a, b) => a.year - b.year);
        break;
    }
    return items;
  }, [slug, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container mx-auto">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-all duration-200 mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to all listings
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} listing{filtered.length !== 1 ? 's' : ''} available</p>
        </div>

        <EquipmentGrid
          equipment={filtered}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filtered.length}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
