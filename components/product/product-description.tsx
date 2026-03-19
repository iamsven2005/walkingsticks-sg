"use client"

import Link from "next/link"
import { useMemo } from "react"
import { AddToCart } from "../../components/cart/add-to-cart"
import Price from "../../components/price"
import { useProduct } from "../../components/product/product-context"
import Prose from "../../components/prose"
import { ShareButton } from "../../components/share/share-button"
import { Button } from "../../components/ui/button"
import { WishlistButton } from "../../components/wishlist/wishlist-button"
import type { Product, ProductVariant } from "../../lib/shopify/types"
import { VariantSelector } from "./variant-selector"

export function ProductDescription({
  product,
  shareUrl,
  backToCollectionPath,
  backToCollectionLabel
}: {
  product: Product
  shareUrl: string
  backToCollectionPath?: string
  backToCollectionLabel?: string
}) {
  const { state } = useProduct()

  const selectedVariant = useMemo(() => {
    return product.variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every((option) => state[option.name.toLowerCase()] === option.value),
    )
  }, [product.variants, state])

  const price = selectedVariant?.price || product.priceRange.maxVariantPrice

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        {backToCollectionPath ? (
          <Button asChild variant="ghost" size="sm" className="mb-3 w-fit px-0 text-sm">
            <Link href={backToCollectionPath}>← Back to {backToCollectionLabel || "Collection"}</Link>
          </Button>
        ) : null}
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full p-2 text-sm">
          <Price amount={price.amount} currencyCode={price.currencyCode} />
        </div>
        <div className="flex gap-2 mt-3">
          <ShareButton
            title={product.title}
            text={`Check out ${product.title}`}
            url={shareUrl}
            className="w-fit"
            label="Share Product"
          />
          <WishlistButton product={product} />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />
      {product.descriptionHtml ? (
        <Prose className="m-6 text-sm leading-tight dark:text-white/[60%]" html={product.descriptionHtml} />
      ) : null}
    </>
  )
}

