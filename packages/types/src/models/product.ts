export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FragranceProfile {
  family: string;
  intensity: 'light' | 'moderate' | 'strong';
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  images: string[];
}