import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Contact, Footer } from "@/components/contact-footer"
import { JsonLd, breadcrumb } from "@/components/json-ld"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | Klyvora Group",
  description: "Get in touch with Klyvora Group to discuss your talent needs.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Klyvora Group",
    description: "Get in touch with Klyvora Group to discuss your talent needs.",
    url: "/contact",
  },
}

const contactHeaderData = {
  title: "Get in Touch",
  subtitle: "Have questions? We'd love to hear from you. Fill out the form and our team will respond shortly.",
  backHref: "/",
  backLabel: "Back to Home",
}

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <Navbar />
      <PageHeader {...contactHeaderData} />
      <Contact />
      <Footer />
    </main>
  )
}
