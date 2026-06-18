import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/contact-footer"
import { JsonLd, breadcrumb } from "@/components/json-ld"
import { getPosts } from "@/lib/ghost"
import type { Metadata } from 'next'

// Revalidate the blog listing from Ghost at most once per minute (ISR).
export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog & Resources | Klyvora Group",
  description: "Insights, tips, and best practices for real estate accounting and finance talent management.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Resources | Klyvora Group",
    description: "Insights, tips, and best practices for real estate accounting and finance talent management.",
    url: "/blog",
  },
}

const blogHeaderData = {
  title: "Blog & Resources",
  subtitle:
    "Stay updated with insights on real estate accounting, finance best practices, and talent management strategies for modern investment firms.",
  backHref: "/",
  backLabel: "Back to Home",
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <main>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <Navbar />
      <PageHeader {...blogHeaderData} />
      <BlogSection posts={posts} />
      <Footer />
    </main>
  )
}
