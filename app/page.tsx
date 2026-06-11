import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Testimonials } from "@/components/testimonials"
import { LogoCarousel } from "@/components/logo-carousel"
import { WhyKlyvora } from "@/components/why-onemarket"
import { RolesCta } from "@/components/roles-cta"
import { Process } from "@/components/process"
import { Contact, Footer } from "@/components/contact-footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero /> 
      {/* <LogoCarousel /> */}
      {/* <Testimonials /> */}

      <WhyKlyvora />
      <RolesCta />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}
