import { formatDate, getBlogPosts } from '../../app/blog/[slug]/utils'
import Link from 'next/link'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div >
      {allBlogs
        .sort((a: { metadata: { publishedAt: string | number | Date } }, b: { metadata: { publishedAt: string | number | Date } }) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post: { slug: Key | null | undefined; metadata: { publishedAt: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined } }) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
