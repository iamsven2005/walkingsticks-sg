"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import Prose from "../../components/prose"

export default function ProductDetail({ product, compact = false }: { product: any; compact?: boolean }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPrevImage = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1)
  }

  const goToNextImage = () => {
    setCurrentImageIndex(currentImageIndex === product.images.length - 1 ? 0 : currentImageIndex + 1)
  }

  // If compact mode is enabled (for mobile), show a simplified version
  if (compact) {
    return (
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.tags?.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-emerald-600">
              {product?.priceRange?.maxVariantPrice?.amount ?? "--"}{" "}
              {product?.priceRange?.maxVariantPrice?.currencyCode ?? ""}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              {product.descriptionHtml ? (
                <Prose className="text-sm leading-tight dark:text-white/[60%]" html={product.descriptionHtml} />
              ) : (
                <p className="text-sm text-muted-foreground">No description available.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }

  // Full version for larger screens
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden border bg-white">
          <Image
            src={product.images[currentImageIndex].url || "/placeholder.svg"}
            alt={product.images[currentImageIndex].altText || product.title}
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/80 backdrop-blur-sm"
              onClick={goToPrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/80 backdrop-blur-sm"
              onClick={goToNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {product.images.map((_: any, index: number) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-primary" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.images.slice(0, 6).map((image: any, index: number) => (
            <button
              key={index}
              className={`relative aspect-square rounded-md overflow-hidden border ${
                index === currentImageIndex ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.altText || `Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-emerald-600">
              {product?.priceRange?.maxVariantPrice?.amount ?? "--"}{" "}
              {product?.priceRange?.maxVariantPrice?.currencyCode ?? ""}
            </span>

            {product.descriptionHtml ? (
              <Prose className="m-6 text-sm leading-tight dark:text-white/[60%]" html={product.descriptionHtml} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
