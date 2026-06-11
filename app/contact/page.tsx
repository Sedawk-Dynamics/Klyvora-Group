import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Contact, Footer } from "@/components/contact-footer"

export const metadata = {
  title: "Contact Us | Klyvora Group",
  description: "Get in touch with Klyvora Group to discuss your talent needs.",
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
      <Navbar />
      <PageHeader {...contactHeaderData} />
      <Contact />
      <Footer />
    </main>
  )
}
