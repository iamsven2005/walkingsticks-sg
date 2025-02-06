import type { Metadata } from 'next';

import Prose from 'components/prose';
import { getBlogs } from 'lib/shopify';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blogs',
    description: 'Discover our latest blogs and updates.',
    openGraph: {
      type: 'website',
    },
  };
}

export default async function Page() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <p className="text-center text-lg">No blogs available at the moment. Please check back later.</p>
    );
  }

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">Blogs</h1>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="border-b pb-4">
            <h2 className="text-3xl font-semibold">
              <Link href={`/blogs/${blog.handle}`}>
                {blog.title}
              </Link>
            </h2>
            {blog.bodySummary && (
              <Prose className="mb-4" html={blog.bodySummary} />
            )}
            <p className="text-sm italic">
              {`Published on ${new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(new Date(blog.createdAt))}`}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
