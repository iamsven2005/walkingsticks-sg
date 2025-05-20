"use client"

import { AddToCart } from "../../components/cart/add-to-cart"
import Price from "../../components/price"
import Prose from "../../components/prose"
import type { Product, ProductVariant } from "../../lib/shopify/types"
import { VariantSelector } from "./variant-selector"
import { useProduct } from "../../components/product/product-context"
import { useMemo } from "react"

export function ProductDescription({ product }: { product: Product }) {
  const { state } = useProduct()

  const selectedVariant = useMemo(() => {
    return product.variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every((option) => state[option.name.toLowerCase()] === option.value),
    )
  }, [product.variants, state])

  const price = selectedVariant?.price || product.priceRange.maxVariantPrice
  console.log(product.descriptionHtml)
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full p-2 text-sm">
          <Price amount={price.amount} currencyCode={price.currencyCode} />
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

