import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';

interface MobileFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedManufacturers: string[];
  onManufacturerChange: (manufacturers: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  yearRange: [number, number];
  onYearChange: (range: [number, number]) => void;
  activeFilterCount: number;
}

export const MobileFilters = ({
  selectedCategories,
  onCategoryChange,
  selectedManufacturers,
  onManufacturerChange,
  priceRange,
  onPriceChange,
  yearRange,
  onYearChange,
  activeFilterCount,
}: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-80 p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          <Sidebar
            selectedCategories={selectedCategories}
            onCategoryChange={onCategoryChange}
            selectedManufacturers={selectedManufacturers}
            onManufacturerChange={onManufacturerChange}
            priceRange={priceRange}
            onPriceChange={onPriceChange}
            yearRange={yearRange}
            onYearChange={onYearChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
