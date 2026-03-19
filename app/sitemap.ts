//@ts-nocheck
import { MetadataRoute } from 'next';
import { getCollections, getPages, getProducts } from '../lib/shopify';
import { siteUrl } from '../lib/site';
import { validateEnvironmentVariables } from '../lib/utils';
import { getBlogPosts } from './blog/[slug]/utils';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const staticRoutes = ['', '/blog'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${siteUrl}${collection.path}`,
      lastModified: collection.updatedAt,
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${siteUrl}/products/${product.handle}`,
      lastModified: product.updatedAt,
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${siteUrl}/${page.handle}`,
      lastModified: page.updatedAt,
    }))
  );

  const blogPostsPromise = Promise.resolve(getBlogPosts()).then((posts: any[]) =>
    posts.map((post: { slug: any; metadata: { publishedAt: any; }; }) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  );

  let fetchedRoutes = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise, blogPostsPromise])
    ).flat();
  } catch {
    fetchedRoutes = [];
  }

  return [...staticRoutes, ...fetchedRoutes];
}
