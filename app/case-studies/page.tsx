import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { CaseStudiesSection } from "@/components/case-studies"
import { Footer } from "@/components/contact-footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Studies | Real Estate Success Stories | Klyvora",
  description: "Discover how real estate firms transformed operations with Klyvora. See real results from multifamily REITs, PE funds, and property management companies.",
  keywords: [
    "case studies",
    "real estate success",
    "accounting solutions",
    "cost savings",
    "efficiency gains",
    "real estate finance",
    "talent success stories",
  ],
  openGraph: {
    title: "Case Studies | Real Estate Success Stories | Klyvora",
    description: "Real results from real estate companies transformed by Klyvora.",
    url: "/case-studies",
  },
}

const caseStudiesHeaderData = {
  title: "Client Success Stories",
  subtitle:
    "Real results from real estate companies that transformed their operations with Klyvora.",
  backHref: "/",
  backLabel: "Back to Home",
}

export default function CaseStudies() {
  return (
    <main>
      <Navbar />
      <PageHeader {...caseStudiesHeaderData} />
      <CaseStudiesSection />
      <Footer />
    </main>
  )
}
