import { Equipment } from '@/data/equipment';
import { MapPin, Calendar, Clock, Wrench, Tag, Settings, CheckCircle } from 'lucide-react';

interface EquipmentSpecsTableProps {
  equipment: Equipment;
}

export const EquipmentSpecsTable = ({ equipment }: EquipmentSpecsTableProps) => {
  const specs = [
    { label: 'Manufacturer', value: equipment.manufacturer, icon: Settings },
    { label: 'Make', value: equipment.make, icon: Tag },
    { label: 'Model', value: equipment.model, icon: Tag },
    { label: 'Year', value: equipment.year.toString(), icon: Calendar },
    { label: 'Hours', value: equipment.hours ? `${equipment.hours} hrs` : undefined, icon: Clock },
    { label: 'Engine', value: equipment.engine ? `${equipment.engine} Engine` : undefined, icon: Wrench },
    { label: 'Condition', value: equipment.condition, icon: CheckCircle },
    { label: 'Location', value: equipment.location, icon: MapPin },
    { label: 'Category', value: equipment.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), icon: Tag },
    { label: 'Status', value: equipment.status === 'available' ? 'Available' : 'Sold', icon: CheckCircle },
  ].filter(spec => spec.value);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-muted px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Equipment Specifications</h2>
      </div>
      <div className="divide-y divide-border">
        {specs.map((spec) => (
          <div key={spec.label} className="flex items-center px-6 py-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3 w-44 text-muted-foreground">
              <spec.icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{spec.label}</span>
            </div>
            <span className="text-sm text-foreground">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
