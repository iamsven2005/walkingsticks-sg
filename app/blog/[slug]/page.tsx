import { notFound } from 'next/navigation'
import baseUrl from 'app/sitemap'
import { CustomMDX } from './mdx'
import { formatDate, getBlogPosts } from './utils'
import Image from 'next/image'
import { Metadata } from 'next'
import { DrumstickIcon as WalkingStickIcon } from 'lucide-react'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post: { slug: any }) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: any): Metadata {
  let post = getBlogPosts().find((post: { slug: any }) => post.slug === params.slug)
  if (!post) {
    return notFound()
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }: any) {
  let post = getBlogPosts().find((post: { slug: any }) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Walking Stick Experts',
            },
          }),
        }}
      />
      <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {post.metadata.image && (
          <div className="relative h-72 w-full">
            <Image
              src={post.metadata.image || "/placeholder.svg"}
              alt={post.metadata.title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-500 ease-in-out"
            />
          </div>
        )}
        <div className="p-8">
          <div className="flex items-center mb-4">
            <WalkingStickIcon className="h-6 w-6 text-primary mr-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {post.metadata.title}
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <CustomMDX source={post.content} />
          </div>
        </div>
      </article>
    </div>
  )
}
