import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { RolesPage } from "@/components/roles-page"
import { Footer } from "@/components/contact-footer"
import { JsonLd, breadcrumb } from "@/components/json-ld"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Finance & Accounting Roles We Hire | Klyvora Group",
  description: "Explore accounting and finance roles we place for U.S. real estate investment firms. We specialize in Big-Four-caliber talent: CPA, accounting managers, financial analysts, and more.",
  keywords: [
    "accounting roles",
    "finance positions",
    "CPA jobs",
    "accounting jobs",
    "financial analyst",
    "accounting manager",
    "real estate accounting",
    "accounting positions",
  ],
  openGraph: {
    title: "Finance & Accounting Roles We Hire | Klyvora Group",
    description: "Explore elite accounting and finance positions we place for real estate firms.",
    url: "/roles",
  },
  alternates: {
    canonical: "/roles",
  },
}

const rolesHeaderData = {
  title: "Roles We Hire",
  subtitle:
    "Every candidate is rigorously assessed for cognitive ability, technical accounting knowledge, and communication skills. We only present the top 2% of applicants—the best in real estate finance talent.",
  backHref: "/",
  backLabel: "Back to Home",
}

export default function Roles() {
  return (
    <main>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Roles", path: "/roles" }])} />
      <Navbar />
      <PageHeader {...rolesHeaderData} />
      <RolesPage />
      <Footer />
    </main>
  )
}
