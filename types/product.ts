export interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  numericPrice: number;
  originalPrice: string;
  discount: string;
  image: string;
  categories: string[];
  colors: string[];
  sizes: string[];
}

export interface CategoryInfo {
  slug: string;
  title: string;
  description: string;
  banner: string;
}

export interface FilterPriceRange {
  label: string;
  min: number;
  max: number;
}
