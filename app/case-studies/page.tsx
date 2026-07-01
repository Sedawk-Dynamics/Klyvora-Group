import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/contact-footer"
import { JsonLd, breadcrumb } from "@/components/json-ld"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Studies | Klyvora Group",
  description: "Klyvora Group case studies are available on demand for serious inquiries. Contact us to request real estate accounting and finance success stories.",
  keywords: [
    "case studies",
    "real estate accounting",
    "accounting solutions",
    "real estate finance",
  ],
  openGraph: {
    title: "Case Studies | Klyvora Group",
    description: "Case studies available on demand — serious inquiries only.",
    url: "/case-studies",
  },
  alternates: {
    canonical: "/case-studies",
  },
}

const caseStudiesHeaderData = {
  title: "Case Studies Available on Demand",
  subtitle: "Serious Inquiries Only",
  backHref: "/",
  backLabel: "Back to Home",
}

export default function CaseStudies() {
  return (
    <main>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }])} />
      <Navbar />
      <PageHeader {...caseStudiesHeaderData} />
      <Footer />
    </main>
  )
}
