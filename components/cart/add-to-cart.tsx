"use client"

import { ShoppingCartIcon } from "lucide-react"
import clsx from "clsx"
import { addItem } from "../../components/cart/actions"
import { useProduct } from "../../components/product/product-context"
import type { Product, ProductVariant } from "../../lib/shopify/types"
import { useActionState, useTransition } from "react"
import { useCart } from "./cart-context"
import { Button } from "../../components/ui/button"
import type React from "react" // Added import for React
import { useToast } from "../../app/hooks/use-toast"

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isLoading,
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
  isLoading: boolean
}) {
  const buttonClasses = clsx("relative w-full", isLoading && "animate-pulse")

  if (!availableForSale) {
    return (
      <Button disabled className={buttonClasses} variant="destructive">
        Out Of Stock
      </Button>
    )
  }

  if (!selectedVariantId) {
    return (
      <Button aria-label="Please select an option" disabled className={buttonClasses}>
        Select Options
      </Button>
    )
  }

  return (
    <Button type="submit" className={buttonClasses} disabled={isLoading}>
      <ShoppingCartIcon className="mr-2 h-4 w-4" />
      {isLoading ? "Adding..." : "Add To Cart"}
    </Button>
  )
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product
  const { addCartItem } = useCart()
  const { state } = useProduct()
  const [isPending, startTransition] = useTransition()
  const [message, formAction] = useActionState(addItem, undefined)
  const {toast} = useToast()
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()]),
  )
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const selectedVariantId = variant?.id || defaultVariantId
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedVariantId) return

    startTransition(async () => {
      try {
        // Optimistic update
        addCartItem(finalVariant, product)

        // Actual action
        const result = await formAction(selectedVariantId)

        if (result === undefined) {
          toast({
            title: "Success",
            description: "Item added to cart",
          })
        } else {
          throw new Error(result)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to add item to cart",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} isLoading={isPending} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}

