import { Equipment } from '@/data/equipment';

export const generateEquipmentJsonLd = (equipment: Equipment) => {
  const price = equipment.price;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: equipment.title,
    description: `${equipment.year} ${equipment.manufacturer} ${equipment.model || ''} — ${equipment.condition} ${equipment.category.replace(/-/g, ' ')} for sale.`,
    brand: {
      '@type': 'Brand',
      name: equipment.manufacturer,
    },
    manufacturer: {
      '@type': 'Organization',
      name: equipment.manufacturer,
    },
    model: equipment.model || undefined,
    productionDate: equipment.year.toString(),
    image: equipment.image,
    itemCondition: equipment.condition === 'New'
      ? 'https://schema.org/NewCondition'
      : 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: price ? price.toString() : undefined,
      availability: equipment.status === 'available'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      seller: {
        '@type': 'Organization',
        name: 'LineLock Equipment',
        telephone: '+18642527174',
        email: 'info@linelockequipment.com',
      },
    },
  };
};

export const generateOrganizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LineLock Equipment',
  url: 'https://linelockv2.lovable.app',
  telephone: '+18642527174',
  email: 'info@linelockequipment.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
});

export const generateBreadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
