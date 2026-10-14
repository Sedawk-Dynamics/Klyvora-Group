import { Briefcase, Globe2, GraduationCap, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/contact-footer"
import { CareersJobs } from "@/components/careers-jobs"
import { JsonLd, breadcrumb } from "@/components/json-ld"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Careers | Klyvora Group",
  description: "Explore open accounting and finance roles at Klyvora Group.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | Klyvora Group",
    description: "Explore open accounting and finance roles at Klyvora Group.",
    url: "/careers",
  },
}

const careersHeaderData = {
  title: "Careers",
  subtitle: "Join our team of accounting and finance professionals serving leading U.S. real estate firms.",
  backHref: "/",
  backLabel: "Back to Home",
}

const perks = [
  { icon: Globe2, title: "Global Exposure", text: "Work directly with U.S. real estate investment firms." },
  { icon: Briefcase, title: "Work From Home", text: "Fully remote roles with a structured, supportive team." },
  { icon: TrendingUp, title: "Career Growth", text: "Build deep expertise in real estate accounting and finance." },
  { icon: GraduationCap, title: "Big Four Standards", text: "Grow alongside CA/CPA-qualified professionals." },
]

export default function CareersPage() {
  return (
    <main>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <Navbar />
      <PageHeader {...careersHeaderData} />

      <section className="pt-16 pb-8 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border bg-white p-6">
                <div className="w-11 h-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-primary mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-8 pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-secondary mb-2">Open Positions</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Find your next role</h2>
          </div>
          <CareersJobs />
        </div>
      </section>

      <Footer />
    </main>
  )
}
