import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from 'geist/font/sans';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { CartProvider } from '../components/cart/cart-context';
import { Navbar } from '../components/layout/navbar';
import { WishlistProvider } from '../components/wishlist/wishlist-context';
import { getCart } from '../lib/shopify';
import { siteName, siteUrl } from '../lib/site';
import { ensureStartsWith } from '../lib/utils';
import './globals.css';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: 'Premium walking sticks in Singapore for comfort, support, and style.',
  alternates: {
    canonical: '/'
  },
  keywords: [
    'walking stick singapore',
    'walking sticks singapore',
    'walking cane singapore',
    'buy walking stick singapore',
    'best walking stick singapore',
    'walking stick for elderly singapore',
    'walking cane for seniors singapore',
    'medical walking stick singapore',
    'walking aid singapore',
    'mobility aid shop singapore',
    'folding walking stick',
    'adjustable walking cane singapore',
    'quad walking cane singapore',
    'quad cane',
    'mobility aids singapore'
  ],
  robots: {
    follow: true,
    index: true
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: SITE_NAME || siteName,
    title: SITE_NAME || siteName,
    description: 'Premium walking sticks in Singapore for comfort, support, and style.'
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = (await cookies()).get('cartId')?.value;
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId);

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <WishlistProvider>
          <CartProvider cartPromise={cart}>
            <Navbar />
            <main>
              {children}
              <Toaster closeButton />
              <Analytics/>
            </main>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
