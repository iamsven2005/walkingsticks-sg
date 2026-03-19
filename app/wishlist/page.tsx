'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Price from '../../components/price';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useWishlist } from '../../components/wishlist/wishlist-context';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-neutral-600 dark:text-neutral-400">
              Your wishlist is empty
            </p>
            <Button asChild>
              <Link href="/search">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <Card key={item.handle} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/products/${item.handle}`}>
                  {item.image && (
                    <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                </Link>
                <CardContent className="p-4">
                  <Link href={`/products/${item.handle}`}>
                    <h3 className="font-semibold text-sm hover:underline line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="mt-2 mb-3">
                    <Price amount={item.price} currencyCode={item.currencyCode} />
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/products/${item.handle}`}>View</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromWishlist(item.handle)}
                      className="flex-1"
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-2">
            <Button variant="outline" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
