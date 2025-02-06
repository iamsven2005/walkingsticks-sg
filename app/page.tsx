import { Card, CardContent } from "@/components/ui/card"
import { Carousels } from "components/carousel"
import { Testimonials } from "components/grid/testimonial"
import Footer from "components/layout/footer"
import { getCollectionProducts } from "lib/shopify"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, HelpCircle } from "lucide-react"

export const metadata = {
  description: "Find all your walking stick needs from Singapore",
  openGraph: {
    type: "website",
  },
}

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: "hidden-carousel" })

  return (
    <>
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src="/main.jpg"
          alt="LazerStick"
          layout="fill"
          objectFit="cover"
          priority
          className="transform scale-105 hover:scale-100 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex flex-col items-start justify-center text-white p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">What's your style?</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-lg animate-fade-in-up animation-delay-200">
            Find a stick to match your personality and walk with confidence!
          </p>
            <Link href="/search">
            Shop Now <ArrowRight/>
            </Link>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find the perfect style, just for you</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everyone's got their own style – their own 'stamp' on the world. Discover the right walking stick to suit
            yours with our curated collection.
          </p>
        </div>

        <Carousels products={products} />
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Help & Advice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <HelpCircle className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">How to choose the right stick</h3>
                  <p className="text-muted-foreground mb-4">
                    Short description of the advice or help article goes here.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Our Brands</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the quality brands we partner with to bring you the best walking sticks.
            </p>
            <div className="flex flex-wrap gap-8">
              <Link
                href="/search/agegracefully"
                className="relative w-32 h-32 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <Image src="/2.png" alt="Agegracefully" layout="fill" objectFit="cover" />
              </Link>
              <Link
                href="/search/gyenno"
                className="relative w-32 h-32 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <Image src="/3.png" alt="Gyenno" layout="fill" objectFit="cover" />
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Our Customers Love Us!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              See what our happy customers have to say about our sticks and service.
            </p>
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Walking Stick?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our collection and discover the perfect blend of style, comfort, and support.
          </p>
          <Button asChild size="lg" >
            <Link href="/search">
              Explore Our Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  )
}

