import { getCollection, getCollectionProducts } from "lib/shopify"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Grid from "components/grid"
import ProductGridItems from "components/layout/product-grid-items"
import { defaultSort, sorting } from "lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>
}): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollection(params.collection)

  if (!collection) return notFound()

  return {
    title: collection.seo?.title || collection.title,
    description: collection.seo?.description || collection.description || `${collection.title} products`,
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sort } = searchParams as { [key: string]: string }
  const collection = await getCollection(params.collection)

  if (!collection) return notFound()

  // Fallback to updated defaultSort
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort

  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse })

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none bg-muted/50">
        <CardHeader className="text-center space-y-4 pb-8 pt-12">
          <CardTitle className="text-4xl md:text-5xl font-bold tracking-tight">{collection.title}</CardTitle>
          {collection.description && (
            <CardDescription className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {collection.description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>

      <section className="container mx-auto px-4">
        {products.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <p className="text-lg text-muted-foreground">No products found in this collection</p>
            </CardContent>
          </Card>
        ) : (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <ProductGridItems products={products} />
          </Grid>
        )}
      </section>
    </div>
  )
}

