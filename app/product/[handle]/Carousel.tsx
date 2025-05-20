'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GridTileImage } from '../../../components/grid/tile';

interface CarouselProps {
  products: any[];
}

export function Carousel({ products }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);

  const totalProducts = products.length;
  const visibleProducts = 3; // Number of products visible at once

  useEffect(() => {
    if (carouselRef.current) {
      const maxTranslate = ((totalProducts - visibleProducts) / totalProducts) * 100;
      const translate = Math.min(currentIndex * (100 / visibleProducts), maxTranslate);
      carouselRef.current.style.transform = `translateX(-${translate}%)`;
    }
  }, [currentIndex, totalProducts, visibleProducts]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visibleProducts >= totalProducts 
        ? totalProducts - visibleProducts 
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const isAtEnd = currentIndex + visibleProducts >= totalProducts;

  if (!products?.length) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <ul
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ width: `${(totalProducts / visibleProducts) * 100}%`, maxWidth: `${totalProducts * 100}%` }}
      >
        {products.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-full flex-none md:w-1/3"
            style={{ width: `${100 / totalProducts}%` }}
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
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
          </li>
        ))}
      </ul>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md transition-all ${
          isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'
        }`}
        aria-label="Next slide"
        disabled={isAtEnd}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

