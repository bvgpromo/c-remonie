import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isFeatured = searchParams.get('isFeatured') === 'true';

    let whereClause = {};
    if (category) {
      whereClause.category = category;
    }
    if (isFeatured) {
      whereClause.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        price: parseFloat(body.price),
        imageUrl: body.imageUrl || null,
        type: body.type || 'Sell',
        sizes: body.sizes || null,
        colors: body.colors || null,
        category: body.category,
        isFeatured: body.isFeatured || false,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
