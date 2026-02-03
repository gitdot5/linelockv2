import { Equipment } from '@/data/equipment';
import { EquipmentCard } from './EquipmentCard';
import { Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EquipmentGridProps {
  equipment: Equipment[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export const EquipmentGrid = ({
  equipment,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalCount,
}: EquipmentGridProps) => {
  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="bg-card rounded-lg border border-border p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-foreground font-medium">
            {totalCount} {totalCount === 1 ? 'listing' : 'listings'} found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="year-new">Year: Newest First</SelectItem>
              <SelectItem value="year-old">Year: Oldest First</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Equipment Grid/List */}
      {equipment.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
              : 'flex flex-col gap-4'
          }
        >
          {equipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground text-lg">No equipment matches your filters.</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};
