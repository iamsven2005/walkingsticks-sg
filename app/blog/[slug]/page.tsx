import { DrumstickIcon as WalkingStickIcon } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShareButton } from '../../../components/share/share-button'
import { Button } from '../../../components/ui/button'
import { siteUrl } from '../../../lib/site'
import { CustomMDX } from './mdx'
import { formatDate, getBlogPosts } from './utils'

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
    : `${siteUrl}/og?title=${encodeURIComponent(title)}`
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: canonicalUrl,
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
      <Button asChild variant="ghost" size="sm" className="mb-6 px-0 text-sm">
        <Link href="/blog">← Back to Articles</Link>
      </Button>
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
              ? `${siteUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${siteUrl}/blog/${post.slug}`,
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
          <div className="mb-6">
            <ShareButton
              title={post.metadata.title}
              text={`Read this article: ${post.metadata.title}`}
              url={`${siteUrl}/blog/${post.slug}`}
              label="Share Article"
            />
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <CustomMDX source={post.content} />
          </div>
        </div>
      </article>
    </div>
  )
}
