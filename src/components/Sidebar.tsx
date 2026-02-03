import { categories, manufacturers } from '@/data/equipment';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedManufacturers: string[];
  onManufacturerChange: (manufacturers: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  yearRange: [number, number];
  onYearChange: (range: [number, number]) => void;
}

export const Sidebar = ({
  selectedCategories,
  onCategoryChange,
  selectedManufacturers,
  onManufacturerChange,
  priceRange,
  onPriceChange,
  yearRange,
  onYearChange,
}: SidebarProps) => {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [manufacturerOpen, setManufacturerOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [yearOpen, setYearOpen] = useState(true);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const toggleManufacturer = (manufacturer: string) => {
    if (selectedManufacturers.includes(manufacturer)) {
      onManufacturerChange(selectedManufacturers.filter((m) => m !== manufacturer));
    } else {
      onManufacturerChange([...selectedManufacturers, manufacturer]);
    }
  };

  const clearFilters = () => {
    onCategoryChange([]);
    onManufacturerChange([]);
    onPriceChange([0, 2000000]);
    onYearChange([2018, 2024]);
  };

  return (
    <aside className="w-full lg:w-72 bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div className="border-b border-border pb-4 mb-4">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-foreground">Category</h3>
          {categoryOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {categoryOpen && (
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label htmlFor={category.id} className="text-sm text-foreground cursor-pointer">
                    {category.name}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manufacturers */}
      <div className="border-b border-border pb-4 mb-4">
        <button
          onClick={() => setManufacturerOpen(!manufacturerOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-foreground">Manufacturer</h3>
          {manufacturerOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {manufacturerOpen && (
          <div className="mt-3 space-y-2">
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer} className="flex items-center gap-2">
                <Checkbox
                  id={manufacturer}
                  checked={selectedManufacturers.includes(manufacturer)}
                  onCheckedChange={() => toggleManufacturer(manufacturer)}
                />
                <Label htmlFor={manufacturer} className="text-sm text-foreground cursor-pointer">
                  {manufacturer}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-border pb-4 mb-4">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-foreground">Price Range</h3>
          {priceOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {priceOpen && (
          <div className="mt-4">
            <Slider
              value={[priceRange[0], priceRange[1]]}
              min={0}
              max={2000000}
              step={10000}
              onValueChange={(value) => onPriceChange([value[0], value[1]])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${(priceRange[0] / 1000).toFixed(0)}K</span>
              <span>${(priceRange[1] / 1000).toFixed(0)}K+</span>
            </div>
          </div>
        )}
      </div>

      {/* Year Range */}
      <div>
        <button
          onClick={() => setYearOpen(!yearOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-foreground">Year</h3>
          {yearOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {yearOpen && (
          <div className="mt-4">
            <Slider
              value={[yearRange[0], yearRange[1]]}
              min={2018}
              max={2024}
              step={1}
              onValueChange={(value) => onYearChange([value[0], value[1]])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
