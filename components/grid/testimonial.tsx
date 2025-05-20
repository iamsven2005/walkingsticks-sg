"use client"

import { Carousel, CarouselContent, CarouselItem } from "../../components/ui/carousel"
import { Card, CardContent, CardDescription, CardTitle } from "../../components/ui/card"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    name: "Alice Johnson",
    quote: "This product exceeded my expectations. The quality is outstanding!",
  },
  {
    name: "Bob Smith",
    quote: "I've been using this for months now, and it's become an essential part of my daily routine.",
  },
  {
    name: "Carol White",
    quote: "The customer service is top-notch. They went above and beyond to help me.",
  },
  {
    name: "David Brown",
    quote: "I'm impressed by the attention to detail. It's clear that a lot of thought went into this product.",
  },
]

export function Testimonials() {
  return (
    <Carousel
    className="w-full max-w-xs"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardContent className="flex aspect-square items-center justify-center p-6 flex-wrap w-56">
                <CardDescription className="text-lg mb-4 italic">{testimonial.quote}</CardDescription>
                <CardTitle className="font-semibold">{testimonial.name}</CardTitle>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

