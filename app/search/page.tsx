import Grid from '../../components/grid';
import ProductGridItems from '../../components/layout/product-grid-items';
import { defaultSort, sorting } from '../../lib/constants';
import { getProducts } from '../../lib/shopify';
import { siteUrl } from '../../lib/site';

export const metadata = {
  title: 'Search',
  description: 'Browse and search for walking sticks and accessories.',
  alternates: {
    canonical: '/search'
  },
  keywords: [
    'search walking sticks singapore',
    'walking stick products singapore',
    'walking cane products singapore',
    'folding cane singapore',
    'quad cane singapore',
    'walking accessories singapore'
  ],
  openGraph: {
    type: 'website',
    url: `${siteUrl}/search`,
    title: 'Search Walking Sticks',
    description: 'Browse and search for walking sticks and accessories.'
  }
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };

  // Fallback to updated defaultSort
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
