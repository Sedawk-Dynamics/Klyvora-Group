import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/contact-footer"

export const metadata = {
  title: "Blog | Klyvora",
  description: "Insights, tips, and best practices for real estate accounting and finance talent management.",
}

const blogHeaderData = {
  title: "Blog & Resources",
  subtitle:
    "Stay updated with insights on real estate accounting, finance best practices, and talent management strategies for modern investment firms.",
  backHref: "/",
  backLabel: "Back to Home",
}

export default function Blog() {
  return (
    <main>
      <Navbar />
      <PageHeader {...blogHeaderData} />
      <BlogSection />
      <Footer />
    </main>
  )
}
