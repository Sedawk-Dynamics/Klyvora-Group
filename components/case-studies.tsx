"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Award, Zap, Users } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    industry: "Multifamily / REIT",
    scale: "15,000+ units",
    title: "Leading Multifamily REIT Saves $480K Annually",
    company: "Top 20 Multifamily Property Manager",
    challenge:
      "Managing accounting operations across 15,000+ multifamily units with a lean US-based team was resulting in delayed closings, reporting errors, and overwhelming workload for existing staff.",
    solution:
      "Klyvora deployed a dedicated team of 8 senior accountants and 4 AP specialists working US hours. The team handles property-level accounting, AP/AR, month-end close, and financial reporting.",
    results: [
      { metric: "70%", label: "Cost Reduction", color: "text-emerald" },
      { metric: "15 Hours", label: "Time Saved Weekly", color: "text-coral" },
      { metric: "5 Days", label: "Faster Close", color: "text-amber" },
      { metric: "100%", label: "Accuracy", color: "text-teal" },
    ],
    quote:
      "Klyvora  changed how we think about offshore talent. Their team is not just cost-effective - they are genuinely better trained and more committed than some of our previous US hires.",
    quoteAttribution: "CFO, Leading Multifamily Operator",
  },
  {
    id: 2,
    industry: "Private Equity / Asset Management",
    scale: "$2.5B AUM",
    title: "Private Equity Firm Scales Asset Management Operations 3x",
    company: "Real Estate Private Equity Fund",
    challenge:
      "Rapid portfolio growth from $800M to $2.5B AUM required significantly more asset management support, but hiring US-based analysts would erode returns and slow decision-making.",
    solution:
      "Klyvora provided 5 financial analysts and 3 asset managers specializing in underwriting, portfolio analysis, investor reporting, and deal modeling. Team integrated directly into existing workflows.",
    results: [
      { metric: "3x", label: "Portfolio Growth", color: "text-emerald" },
      { metric: "$600K", label: "Annual Savings", color: "text-coral" },
      { metric: "48 Hours", label: "Deal Turnaround", color: "text-amber" },
      { metric: "24/7", label: "Coverage", color: "text-teal" },
    ],
    quote:
      "Our Klyvora analysts are indistinguishable from our US team in terms of quality. The cost savings have allowed us to be more competitive on fees while improving our analysis depth.",
    quoteAttribution: "Managing Partner, PE Fund",
  },
  {
    id: 3,
    industry: "Commercial / Office",
    scale: "5M+ sq ft",
    title: "Commercial Property Manager Eliminates Turnover Issues",
    company: "Commercial Property Management Firm",
    challenge:
      "High turnover among US-based accountants (3 resignations in 18 months) was creating knowledge loss, training fatigue, and inconsistent financial reporting across 50+ properties.",
    solution:
      "Klyvora established a core team of 4 senior accountants and 2 controllers who became the institutional knowledge base for the company. US team focuses on client relationships and strategy.",
    results: [
      { metric: "0%", label: "Turnover", color: "text-emerald" },
      { metric: "12 Weeks", label: "Training Eliminated", color: "text-coral" },
      { metric: "65%", label: "Cost Savings", color: "text-amber" },
      { metric: "100%", label: "Process Documentation", color: "text-teal" },
    ],
    quote:
      "The stability has been transformative. We finally have a team that knows our properties, our clients, and our processes inside and out.",
    quoteAttribution: "Controller, Commercial PM Company",
  },
  {
    id: 4,
    industry: "Student Housing",
    scale: "25,000 beds",
    title: "Student Housing Operator Achieves 99.5% On-Time Rent Collection",
    company: "National Student Housing Operator",
    challenge:
      "Managing rent collection, student billing, and vendor payments for 25,000 beds across 40 properties required significant manual effort and resulted in delayed payments and cash flow issues.",
    solution:
      "Klyvora deployed specialized AP team with expertise in property management software (Yardi, AppFolio). Implemented automated workflows for rent posting, billing, and vendor management.",
    results: [
      { metric: "99.5%", label: "On-Time Collection", color: "text-emerald" },
      { metric: "2 Days", label: "Payment Processing", color: "text-coral" },
      { metric: "50%", label: "AP Cost Reduction", color: "text-amber" },
      { metric: "10K+", label: "Monthly Transactions", color: "text-teal" },
    ],
    quote:
      "Klyvora understands student housing operations. Their team processes more volume with higher accuracy than we ever achieved in-house.",
    quoteAttribution: "VP of Finance, Student Housing",
  },
]

export function CaseStudiesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="py-24 bg-gradient-to-b from-background via-emerald/5 to-background"
      ref={ref}
      aria-label="Client Success Stories"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: TrendingUp, label: "Average Cost Savings", value: "70%" },
            { icon: Zap, label: "Hours Saved Weekly", value: "15+" },
            { icon: Award, label: "Avg Retention", value: "24 Months" },
            { icon: Users, label: "Units Managed", value: "100K+" },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className={`bg-white border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow ${visible ? "animate-fade-up" : "opacity-0"
                  }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Icon size={28} className="text-secondary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Case studies grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <div
              key={study.id}
              className={`bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${visible ? "animate-fade-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${(idx + 4) * 100}ms` }}
              onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
            >
              {/* Header with industry badge */}
              <div className="bg-gradient-to-r from-emerald/10 via-coral/10 to-amber/10 p-6 border-b border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-2">
                      {study.industry}
                    </span>
                    <p className="text-xs text-muted-foreground">{study.scale}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                  {study.title}
                </h3>
              </div>

              {/* Results metrics */}
              <div className="p-6 border-b border-border">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {study.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-xl font-bold ${result.color}`}>{result.metric}</div>
                      <div className="text-xs text-muted-foreground mt-1">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable content */}
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${expandedId === study.id ? "pb-6 max-h-96" : "max-h-0"
                  }`}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-2">Challenge</h4>
                    <p className="text-sm text-muted-foreground">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground">{study.solution}</p>
                  </div>
                  <blockquote className="border-l-4 border-coral pl-4 py-2 italic text-sm text-foreground">
                    "{study.quote}"
                    <footer className="text-xs text-muted-foreground mt-2 not-italic">
                      — {study.quoteAttribution}
                    </footer>
                  </blockquote>
                </div>
              </div>

              {/* Click hint */}
              <div className="px-6 py-3 bg-muted text-center">
                <button
                  className="text-xs font-semibold text-secondary hover:text-coral transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedId(expandedId === study.id ? null : study.id)
                  }}
                >
                  {expandedId === study.id ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-20 bg-gradient-to-r from-emerald/10 via-coral/10 to-amber/10 rounded-xl p-12 text-center border border-border">
          <h3 className="text-3xl font-bold text-primary mb-4">Ready to Transform Your Operations?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join leading real estate firms that are already experiencing cost savings, faster operations, and improved accuracy with Klyvora.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded-full hover:bg-coral transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
}
