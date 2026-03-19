import { NextRequest, NextResponse } from 'next/server';

import { getProducts } from '../../../lib/shopify';

const MAX_SUGGESTIONS = 8;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const query = req.nextUrl.searchParams.get('q')?.trim() || '';

  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const products = await getProducts({ query });
    const suggestions = products.slice(0, MAX_SUGGESTIONS).map((product) => ({
      title: product.title,
      handle: product.handle
    }));

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 200 });
  }
}
