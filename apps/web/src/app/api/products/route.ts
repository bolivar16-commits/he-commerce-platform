import { NextRequest, NextResponse } from 'next/server';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Midnight Ocean',
    slug: 'midnight-ocean',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
    images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f'],
    rating: 4.5,
    reviewCount: 124,
    featured: true,
  },
  {
    id: '2',
    name: 'Rose Garden',
    slug: 'rose-garden',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
    images: ['https://images.unsplash.com/photo-1518895949257-7621c3c786d7'],
    rating: 4.8,
    reviewCount: 256,
    featured: true,
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('limit') || '12');
  const featured = searchParams.get('featured') === 'true';
  const sortBy = searchParams.get('sortBy') || 'newest';
  const search = searchParams.get('search') || '';

  let filtered = MOCK_PRODUCTS;

  if (featured) {
    filtered = filtered.filter((p) => p.featured);
  }

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const products = filtered.slice(start, end);

  return NextResponse.json({
    success: true,
    data: products,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.ceil(filtered.length / pageSize),
  });
}
