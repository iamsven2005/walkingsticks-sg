import { BlogPosts } from "../../app/blog/posts"
import { siteUrl } from "../../lib/site"

export const metadata = {
  title: 'Walking Stick Blog',
  description: 'Expert guides and advice on choosing and using walking sticks in Singapore.',
  alternates: {
    canonical: '/blog'
  },
  keywords: [
    'walking stick guide singapore',
    'how to choose walking stick',
    'walking cane tips',
    'mobility advice singapore',
    'walking stick blog singapore'
  ],
  openGraph: {
    type: 'website',
    url: `${siteUrl}/blog`,
    title: 'Walking Stick Blog',
    description: 'Expert guides and advice on choosing and using walking sticks in Singapore.'
  }
}

export default function Page() {
  return (
    <section className='m-5 p-5'>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">The Knowledge Centre</h1>
      
      <BlogPosts/>
    </section>
  )
}