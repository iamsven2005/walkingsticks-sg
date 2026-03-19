'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useWishlist } from '../../components/wishlist/wishlist-context';

export function WishlistIcon() {
  const { wishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Link
      href="/wishlist"
      className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
      aria-label={`Wishlist (${wishlist.length} items)`}
    >
      <Heart className="h-5 w-5" />
      {wishlist.length > 0 && (
        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
          {wishlist.length > 9 ? '9+' : wishlist.length}
        </span>
      )}
    </Link>
  );
}
