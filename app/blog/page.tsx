import { BlogPosts } from "app/blog/posts"
import { getBlogPosts } from "./[slug]/utils"

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
    let allBlogs = getBlogPosts()
  
  return (
    <section className='m-5 p-5'>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">The Knowledge Centre</h1>
      
      <BlogPosts/>
    </section>
  )
}