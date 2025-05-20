"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "../..//components/ui/card"
import { Button } from "../../components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductDetail from "./product-detail"


// Head and body data with custom images
const heads = [
  { id: 1, name: "Ergonomic", image: "/images/ergonomic.png" },
  { id: 2, name: "Essential", image: "/images/essential.png" },
  { id: 3, name: "MP3", image: "/images/mp3.png" },
  { id: 4, name: "Laser", image: "/images/lazer.png" },
]

const bodies = [
  { id: 1, name: "Small Carbonquad", image: "/images/small-carbonquad.png" },
  { id: 2, name: "Medium Carbonquad", image: "/images/medium-carbonquad.png" },
  { id: 3, name: "Foldplus", image: "/images/foldplus.png" },
  { id: 4, name: "Carbonbond", image: "/images/carbonbond.png" },
  { id: 5, name: "Stickplus", image: "/images/stickplus.png" },
  { id: 6, name: "Chairplus", image: "/images/chairplus.png" },
]

// Swipeable carousel component
function SwipeableCarousel({
  items,
  currentIndex,
  setCurrentIndex,
  title,
  aspectRatio = "aspect-[2/1]",
}: {
  items: { id: number; name: string; image: string }[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
  title: string
  aspectRatio?: string
}) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [currentTranslateX, setCurrentTranslateX] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1)
  }

  // Reset position when index changes
  useEffect(() => {
    setCurrentTranslateX(0)
    setTranslateX(0)
  }, [currentIndex])

  // Touch/mouse event handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setTranslateX(currentTranslateX + diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100 // Minimum distance to trigger a slide
    const diff = translateX - currentTranslateX

    if (diff > threshold) {
      goToPrevious()
    } else if (diff < -threshold) {
      goToNext()
    }

    setCurrentTranslateX(0)
    setTranslateX(0)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Touch events
const handleTouchStart = (e: React.TouchEvent) => {
  const touch = e.touches?.[0]
  if (touch) {
    handleDragStart(touch.clientX)
  }
}

const handleTouchMove = (e: React.TouchEvent) => {
  const touch = e.touches?.[0]
  if (touch) {
    handleDragMove(touch.clientX)
  }
}


  const handleTouchEnd = () => {
    handleDragEnd()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} of {items.length}
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={goToPrevious} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div
            ref={carouselRef}
            className={`relative ${aspectRatio} rounded-lg overflow-hidden border cursor-grab ${isDragging ? "cursor-grabbing" : ""
              }`}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
<Image
  src={items[currentIndex]?.image ?? "/placeholder.svg"}
  alt={`${title} ${currentIndex + 1}`}
  fill
  className="object-contain"
/>

            <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white p-2 text-center">
<span className="font-medium">{items[currentIndex]?.name ?? "Unnamed"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2 mt-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to ${title} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


export default function ProductConfigurator() {
  const [headIndex, setHeadIndex] = useState(0)
  const [bodyIndex, setBodyIndex] = useState(0)
  const [selectedProductData, setSelectedProductData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Convert to 1-based indexing for product data
  const selectedHead = headIndex + 1
  const selectedBody = bodyIndex + 1

  // Generate product code from selected components
let rawCode = `${bodies[bodyIndex]?.image.replace("/images/", "").replace(".png", "")}-${heads[headIndex]?.image.replace("/images/", "").replace(".png", "")}`

// Special case fix
const productCode = rawCode === "medium-carbonquad-mp3" ? "medium-carbon-quad-mp3" : rawCode

  // Fetch product data from API
  useEffect(() => {
    const fetchProductInfo = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/${productCode}`)
        const data = await res.json()
        console.log("API Response for productCode:", data)

        setSelectedProductData(data)


      } catch (err) {
        console.error("Error fetching product code info:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductInfo()
  }, [productCode, selectedHead, selectedBody])
if (!selectedProductData || !selectedProductData.images || selectedProductData.images.length === 0) {
  return (
    <div className="text-center text-muted-foreground py-10">
      Product data is unavailable.
    </div>
  )
}
  // Use the dynamic data or fall back to the hardcoded data

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <SwipeableCarousel
          items={heads}
          currentIndex={headIndex}
          setCurrentIndex={setHeadIndex}
          title="Select Head"
          aspectRatio="aspect-[2/1]"
        />

        <SwipeableCarousel
          items={bodies}
          currentIndex={bodyIndex}
          setCurrentIndex={setBodyIndex}
          title="Select Body"
          aspectRatio="aspect-[1/2]"
        />
      </div>

      <div className="lg:sticky lg:top-8 self-start">
        
        <ProductDetail product={selectedProductData}/>

      </div>
    </div>
  )
}
