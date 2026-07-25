import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = {
    id: params.slug,
    name: 'Premium Fragrance',
    slug: params.slug,
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
    images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f'],
    description: 'A sophisticated fragrance with top notes of bergamot, heart notes of jasmine, and base notes of sandalwood.',
    rating: 4.7,
    reviewCount: 89,
    stock: 15,
    fragrance: {
      family: 'Floral',
      intensity: 'strong',
    },
    notes: {
      top: ['Bergamot', 'Lemon'],
      heart: ['Jasmine', 'Rose'],
      base: ['Sandalwood', 'Musk'],
    },
  };

  return NextResponse.json(product);
}
