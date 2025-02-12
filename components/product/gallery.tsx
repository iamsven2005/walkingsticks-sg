"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { GridTileImage } from "components/grid/tile"
import { useProduct, useUpdateURL } from "components/product/product-context"
import Image from "next/image"
import { useState, useCallback, useEffect, useTransition } from "react"
import useEmblaCarousel from "embla-carousel-react"

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct()
  const updateURL = useUpdateURL()
  const [selectedIndex, setSelectedIndex] = useState(state.image ? Number.parseInt(state.image) : 0)
  const [isPending, startTransition] = useTransition()

  // Remove autoplay to prevent video reloading
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    setSelectedIndex(newIndex)
    startTransition(() => {
      const newState = updateImage(newIndex.toString())
      updateURL(newState)
    })
  }, [emblaApi, updateImage, updateURL])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    emblaApi.scrollTo(selectedIndex)
  }, [emblaApi, onSelect, selectedIndex])

  const buttonClassName =
    "absolute top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-50/80 text-neutral-500 transition-all ease-in-out hover:scale-110 hover:text-black dark:bg-neutral-900/80 dark:hover:text-white"

  return (
    <div className="relative">
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div key={image.src} className="relative h-full w-full flex-[0_0_100%]">
              <Image
                className="h-full w-full object-contain"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={image.altText as string}
                src={(image.src as string) || "/placeholder.svg"}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button className={`${buttonClassName} left-2`} onClick={scrollPrev} aria-label="Previous image">
            <ArrowLeftIcon className="h-5" />
          </button>
          <button className={`${buttonClassName} right-2`} onClick={scrollNext} aria-label="Next image">
            <ArrowRightIcon className="h-5" />
          </button>
        </>
      )}

      {images.length > 1 ? (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === selectedIndex

            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  aria-label={`Go to image ${index + 1}`}
                  className="h-full w-full"
                  onClick={() => {
                    emblaApi?.scrollTo(index)
                  }}
                >
                  <GridTileImage alt={image.altText} src={image.src} width={80} height={80} active={isActive} />
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

