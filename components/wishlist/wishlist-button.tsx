'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import type { Product } from '../../lib/shopify/types';
import { useWishlist } from './wishlist-context';

export function WishlistButton({
  product,
  className = ''
}: {
  product: Product;
  className?: string;
}) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  const inWishlist = isInWishlist(product.handle);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={className}
        disabled
        aria-label="Loading..."
      >
        <Heart className="h-4 w-4" />
        <span className="ml-2">Loading...</span>
      </Button>
    );
  }

  const handleClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.handle);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant={inWishlist ? 'default' : 'outline'}
      size="sm"
      onClick={handleClick}
      className={className}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`}
      />
      <span className="ml-2">
        {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
      </span>
    </Button>
  );
}
