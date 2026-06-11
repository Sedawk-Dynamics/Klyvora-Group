"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Building2, BarChart3, Wallet, TrendingUp, Home, Receipt } from "lucide-react"

const roles = [
  {
    icon: Building2,
    title: "Property Accountant",
    category: "Accounting",
    description:
      "Manage financial records for residential and commercial portfolios, including CAM reconciliations and month-end close.",
    skills: ["General Ledger", "CAM Reconciliation"],
  },
  {
    icon: Wallet,
    title: "Corporate Accountant",
    category: "Accounting",
    description:
      "Handle corporate-level accounting for real estate investment firms—consolidations, intercompany transactions, and audit readiness.",
    skills: ["Financial Consolidations", "Audit Support"],
  },
  {
    icon: BarChart3,
    title: "Fund Accountant",
    category: "Accounting",
    description:
      "Provide fund-level accounting for real estate private equity vehicles, including investor reporting and waterfall calculations.",
    skills: ["Investor Reporting", "NAV Calculations"],
  },
  {
    icon: TrendingUp,
    title: "Acquisition Analyst",
    category: "Analysis",
    description:
      "Conduct underwriting, pro forma modeling, and due diligence for acquisitions. Build detailed financial models to evaluate deal returns.",
    skills: ["Pro Forma Modeling", "DCF Analysis"],
  },
  {
    icon: Home,
    title: "Asset Management Analyst",
    category: "Analysis",
    description:
      "Monitor and optimize asset performance across portfolios. Support budgeting, variance analysis, and portfolio-level reporting.",
    skills: ["Portfolio Reporting", "Variance Analysis"],
  },
  {
    icon: Receipt,
    title: "Accounts Payable & Receivable",
    category: "Accounting",
    description:
      "Manage AP/AR workflows—vendor invoices, tenant billing, collections, and payment runs for real estate operations.",
    skills: ["Invoice Processing", "Tenant Billing"],
  },
]

export function Roles() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="roles" className="py-24 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`flex flex-col items-center text-center mb-14 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">
            Talent We Place
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance mb-5">
            Roles We Hire
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl text-pretty">
            Every candidate is rigorously assessed for cognitive ability, technical accounting knowledge,
            and communication skills. We hire only the best for your team.
          </p>
        </div>

        {/* Roles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role, i) => {
            const Icon = role.icon
            return (
              <article
                key={role.title}
                className={`bg-white rounded-2xl border border-border p-6 hover:border-secondary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                  visible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: visible ? `${(i % 3) * 80 + Math.floor(i / 3) * 80}ms` : "0ms" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon size={24} className="text-secondary" aria-hidden="true" />
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                    {role.category}
                  </span>
                </div>
                <h3 className="font-sans text-base font-bold text-primary mb-2">{role.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-surface border border-border text-foreground/70 px-3 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA strip */}
        <div
          className={`bg-primary rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 ${
            visible ? "animate-fade-up delay-450" : "opacity-0"
          }`}
        >
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              Don&apos;t see the exact role you need?
            </h3>
            <p className="text-white/70 text-sm">
              We recruit for custom finance and accounting roles tailored to your firm.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 bg-secondary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent transition-colors whitespace-nowrap"
          >
            Talk to Us
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
