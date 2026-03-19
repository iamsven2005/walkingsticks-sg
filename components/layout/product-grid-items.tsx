import Link from 'next/link';
import Grid from '../../components/grid';
import { GridTileImage } from '../../components/grid/tile';
import { Product } from '../../lib/shopify/types';

export default function ProductGridItems({
  products,
  collectionHandle
}: {
  products: Product[];
  collectionHandle?: string;
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={
              collectionHandle
                ? `/products/${product.handle}?collection=${encodeURIComponent(collectionHandle)}`
                : `/products/${product.handle}`
            }
            prefetch={true}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
