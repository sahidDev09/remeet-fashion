import { Product, CategoryInfo, FilterPriceRange } from '@/types/product';

export type { Product, CategoryInfo, FilterPriceRange };

export const filterColors = [
  'Black', 'White', 'Navy', 'Grey'
];

export const filterPriceRanges: FilterPriceRange[] = [
  { label: '400 To 1000', min: 400, max: 1000 },
  { label: '1001 To 2500', min: 1001, max: 2500 },
];

export const filterSizes = ['S', 'M', 'L', 'XL', 'XXL'];

export const products: Product[] = [
  {
    id: 1,
    name: 'ESSENTIAL T-SHIRT',
    color: 'WHITE',
    price: '৳1,490',
    numericPrice: 1490,
    originalPrice: '৳1,990',
    discount: '25%',
    image: '/images/products/tshirt1.jpg',
    categories: ['man', 'tshirt', 'premium-solid', 'summer'],
    colors: ['White', 'Off White'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'OVERSIZED TEE',
    color: 'WASHED BLACK',
    price: '৳1,890',
    numericPrice: 1890,
    originalPrice: '৳2,290',
    discount: '18%',
    image: '/images/products/tshirt2.jpg',
    categories: ['unisex', 'tshirt', 'dropshoulder-tshirt', 'summer'],
    colors: ['Black', 'Grey'],
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: 3,
    name: 'GRAPHIC PRINT',
    color: 'VINTAGE GREY',
    price: '৳2,190',
    numericPrice: 2190,
    originalPrice: '৳2,690',
    discount: '18%',
    image: '/images/products/tshirt3.jpg',
    categories: ['man', 'tshirt', 'remeet-edition', 'summer'],
    colors: ['Grey', 'Multicolor'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'CLASSIC CREWNECK',
    color: 'NAVY BLUE',
    price: '৳1,490',
    numericPrice: 1490,
    originalPrice: '৳1,990',
    discount: '25%',
    image: '/images/products/tshirt4.jpg',
    categories: ['man', 'tshirt', 'premium-solid', 'winter'],
    colors: ['Navy', 'Blue'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 5,
    name: 'HEAVYWEIGHT TEE',
    color: 'FOREST GREEN',
    price: '৳2,490',
    numericPrice: 2490,
    originalPrice: '৳2,990',
    discount: '16%',
    image: '/images/products/tshirt5.jpg',
    categories: ['man', 'tshirt', 'sports-tshirt', 'summer', 'eid-collection'],
    colors: ['Green'],
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: 6,
    name: 'KNITTED POLO CLASSIC',
    color: 'OLIVE GREEN',
    price: '৳2,290',
    numericPrice: 2290,
    originalPrice: '৳2,790',
    discount: '18%',
    image: '/images/products/tshirt1.jpg',
    categories: ['man', 'polo-shirt', 'knitted-polo', 'summer'],
    colors: ['Green', 'Off White'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 7,
    name: 'OLD MONEY POLO',
    color: 'CREAM WHITE',
    price: '৳2,690',
    numericPrice: 2690,
    originalPrice: '৳3,190',
    discount: '16%',
    image: '/images/products/tshirt3.jpg',
    categories: ['man', 'polo-shirt', 'old-money-polo', 'summer', 'eid-collection'],
    colors: ['Cream', 'Off White'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 8,
    name: 'WINTER LAYER TEE',
    color: 'CHARCOAL',
    price: '৳1,990',
    numericPrice: 1990,
    originalPrice: '৳2,490',
    discount: '20%',
    image: '/images/products/tshirt4.jpg',
    categories: ['unisex', 'tshirt', 'premium-solid', 'winter'],
    colors: ['Black', 'Grey'],
    sizes: ['S', 'M', 'L'],
  },
];

export const categories: Record<string, CategoryInfo> = {
  man: {
    slug: 'man',
    title: 'Man',
    description: 'Premium menswear crafted for the modern gentleman. Explore our curated collection of essential pieces.',
    banner: '/images/home/hero/hero_models.png',
  },
  unisex: {
    slug: 'unisex',
    title: 'Unisex',
    description: 'Gender-fluid fashion designed to fit everyone. Comfortable, stylish, and effortlessly cool.',
    banner: '/images/home/hero/hero_models.png',
  },
  'polo-shirt': {
    slug: 'polo-shirt',
    title: 'Polo Shirt',
    description: 'Timeless polo shirts with a modern twist. From knitted to old money styles — find your perfect polo.',
    banner: '/images/home/hero/hero_models.png',
  },
  'knitted-polo': {
    slug: 'knitted-polo',
    title: 'Knitted Polo',
    description: 'Luxurious knitted polo shirts that elevate your everyday look with premium texture and comfort.',
    banner: '/images/home/hero/hero_models.png',
  },
  'old-money-polo': {
    slug: 'old-money-polo',
    title: 'Old Money Polo',
    description: 'Classic, understated elegance. Our Old Money polo collection exudes quiet luxury and timeless sophistication.',
    banner: '/images/home/hero/hero_models.png',
  },
  tshirt: {
    slug: 'tshirt',
    title: 'T-Shirt',
    description: 'From dropshoulder to sports tees — discover our complete range of premium t-shirts.',
    banner: '/images/home/hero/hero_models.png',
  },
  'dropshoulder-tshirt': {
    slug: 'dropshoulder-tshirt',
    title: 'Dropshoulder T-Shirt',
    description: 'Relaxed dropshoulder silhouettes for the ultimate streetwear vibe.',
    banner: '/images/home/hero/hero_models.png',
  },
  'remeet-edition': {
    slug: 'remeet-edition',
    title: 'reMeet Edition',
    description: 'Limited edition pieces designed exclusively by reMeet. Bold, unique, and unapologetically original.',
    banner: '/images/home/hero/hero_models.png',
  },
  'sports-tshirt': {
    slug: 'sports-tshirt',
    title: 'Sports T-Shirt',
    description: 'Performance meets style. Breathable, lightweight sports tees for active lifestyles.',
    banner: '/images/home/hero/hero_models.png',
  },
  'premium-solid': {
    slug: 'premium-solid',
    title: 'Premium Solid',
    description: 'Clean, minimal, premium. Our solid tees are the foundation of any great wardrobe.',
    banner: '/images/home/hero/hero_models.png',
  },
  summer: {
    slug: 'summer',
    title: 'Summer',
    description: 'Beat the heat in style. Lightweight fabrics and fresh designs for the sunny season.',
    banner: '/images/home/hero/hero_models.png',
  },
  winter: {
    slug: 'winter',
    title: 'Winter',
    description: 'Stay warm without compromising on style. Cozy layers and heavyweight essentials.',
    banner: '/images/home/hero/hero_models.png',
  },
  'eid-collection': {
    slug: 'eid-collection',
    title: 'Eid Collection',
    description: 'Celebrate in style with our exclusive Eid collection. Premium pieces for special occasions.',
    banner: '/images/home/hero/hero_models.png',
  },
};

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categories.includes(slug));
}

export function getCategoryInfo(slug: string): CategoryInfo | undefined {
  return categories[slug];
}
