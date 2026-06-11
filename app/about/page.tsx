import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { AboutPage } from "@/components/about-page"
import { Footer } from "@/components/contact-footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Klyvora | Mission, Vision & Values",
  description: "Learn about Klyvora mission to connect elite accounting talent from India with U.S. real estate firms. Discover our vision, values, and commitment to quality.",
  keywords: [
    "about Klyvora",
    "company mission",
    "accounting talent",
    "real estate finance",
    "company values",
  ],
  openGraph: {
    title: "About Klyvora | Mission, Vision & Values",
    description: "Elite accounting talent connection for real estate firms. Learn our mission and values.",
    url: "/about",
  },
}

const aboutHeaderData = {
  title: "About Klyvora",
  subtitle: "Building global partnerships that transform accounting and finance operations.",
  backHref: "/",
  backLabel: "Back to Home",
}

export default function About() {
  return (
    <main>
      <Navbar />
      <PageHeader {...aboutHeaderData} />
      <AboutPage />
      <Footer />
    </main>
  )
}
