import { Equipment, equipmentData } from '@/data/equipment';
import { EquipmentCard } from '@/components/EquipmentCard';

interface RelatedEquipmentProps {
  currentEquipment: Equipment;
}

export const RelatedEquipment = ({ currentEquipment }: RelatedEquipmentProps) => {
  const related = equipmentData
    .filter(
      (e) =>
        e.id !== currentEquipment.id &&
        (e.category === currentEquipment.category || e.manufacturer === currentEquipment.manufacturer)
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-foreground mb-6">Related Equipment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((item) => (
          <EquipmentCard key={item.id} equipment={item} viewMode="grid" />
        ))}
      </div>
    </section>
  );
};
