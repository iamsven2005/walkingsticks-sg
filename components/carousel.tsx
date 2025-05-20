"use client"
import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import { Carousel, CarouselContent, CarouselItem } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function Carousels({products}: any) {
  // Collections that start with `hidden-*` are hidden from the search page.

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <Carousel className="w-full overflow-hidden pb-6 pt-1"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            align: "center",
            loop: true,
          }}>
    <CarouselContent
      className="flex gap-4 "
    >
      {carouselProducts.map((product, i) => (
        <CarouselItem
          key={`${product.handle}${i}`}
          className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
        >
          <Link href={`/products/${product.handle}`} className="relative h-full w-full">
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </Link>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
  );
}
