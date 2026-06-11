"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Building2, BarChart3, Wallet, TrendingUp, Home, Receipt } from "lucide-react"
import Link from "next/link"

const roles = [
  {
    icon: Building2,
    title: "Property Accountant",
    category: "Accounting",
    accentColor: "emerald",
    description:
      "Manage financial records for residential and commercial portfolios, including CAM reconciliations and month-end close.",
    skills: ["General Ledger", "CAM Reconciliation", "Month-End Close", "Financial Reporting"],
  },
  {
    icon: Wallet,
    title: "Corporate Accountant",
    category: "Accounting",
    accentColor: "coral",
    description:
      "Handle corporate-level accounting for real estate investment firms—consolidations, intercompany transactions, and audit readiness.",
    skills: ["Financial Consolidations", "Audit Support", "Intercompany", "GAAP Compliance"],
  },
  {
    icon: BarChart3,
    title: "Fund Accountant",
    category: "Accounting",
    accentColor: "amber",
    description:
      "Provide fund-level accounting for real estate private equity vehicles, including investor reporting and waterfall calculations.",
    skills: ["Investor Reporting", "NAV Calculations", "Waterfall Modeling", "Capital Calls"],
  },
  {
    icon: TrendingUp,
    title: "Acquisition Analyst",
    category: "Analysis",
    accentColor: "teal",
    description:
      "Conduct underwriting, pro forma modeling, and due diligence for acquisitions. Build detailed financial models to evaluate deal returns.",
    skills: ["Pro Forma Modeling", "DCF Analysis", "Underwriting", "Market Research"],
  },
  {
    icon: Home,
    title: "Asset Management Analyst",
    category: "Analysis",
    accentColor: "violet",
    description:
      "Monitor and optimize asset performance across portfolios. Support budgeting, variance analysis, and portfolio-level reporting.",
    skills: ["Portfolio Reporting", "Variance Analysis", "Budgeting", "Performance Metrics"],
  },
  {
    icon: Receipt,
    title: "Accounts Payable & Receivable",
    category: "Accounting",
    accentColor: "emerald",
    description:
      "Manage AP/AR workflows—vendor invoices, tenant billing, collections, and payment runs for real estate operations.",
    skills: ["Invoice Processing", "Tenant Billing", "Collections", "Payment Runs"],
  },
]

const accentStyles: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  emerald: { bg: "bg-emerald/10", border: "border-emerald", text: "text-emerald", hover: "hover:bg-emerald/15" },
  coral: { bg: "bg-coral/10", border: "border-coral", text: "text-coral", hover: "hover:bg-coral/15" },
  amber: { bg: "bg-amber/10", border: "border-amber", text: "text-amber", hover: "hover:bg-amber/15" },
  teal: { bg: "bg-teal/10", border: "border-teal", text: "text-teal", hover: "hover:bg-teal/15" },
  violet: { bg: "bg-violet/10", border: "border-violet", text: "text-violet", hover: "hover:bg-violet/15" },
}

export function RolesPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    window.location.href = "/#contact"
  }

  return (
    <section className="py-24 bg-background min-h-screen" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Roles grid with vibrant accents */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {roles.map((role, i) => {
            const Icon = role.icon
            const accent = accentStyles[role.accentColor]
            return (
              <article
                key={role.title}
                className={`group bg-white rounded-2xl border-2 border-border p-8 hover:border-l-4 hover:${accent.border} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
                  visible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: visible ? `${i * 80}ms` : "0ms" }}
              >
                {/* Icon + category row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-xl ${accent.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className={accent.text} aria-hidden="true" />
                  </div>
                  <span className={`text-xs font-bold tracking-wide uppercase ${accent.text} ${accent.bg} px-3 py-1.5 rounded-full`}>
                    {role.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className={`font-sans text-xl font-bold text-primary mb-3 group-hover:${accent.text} transition-colors duration-300`}>
                  {role.title}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {role.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs bg-surface border border-border text-foreground/70 px-3 py-1.5 rounded-full font-medium group-hover:border-current group-hover:${accent.text} transition-colors duration-300`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA section */}
        <div
          className={`bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8 ${
            visible ? "animate-fade-up delay-450" : "opacity-0"
          }`}
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl font-bold text-white mb-3">
              Don&apos;t see the exact role you need?
            </h3>
            <p className="text-white/80 text-base max-w-xl">
              We recruit for custom finance and accounting roles tailored to your firm&apos;s specific requirements.
              Let&apos;s discuss how we can help build your team.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-3 bg-white text-primary font-semibold px-8 py-4 rounded-full hover:bg-coral hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap group"
          >
            Talk to Us
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
