"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Building2, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"

const roleHighlights = [
  { icon: Building2, title: "Property Accountants", color: "emerald" },
  { icon: BarChart3, title: "Fund Accountants", color: "coral" },
  { icon: TrendingUp, title: "Acquisition Analysts", color: "amber" },
]

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald/10", text: "text-emerald", border: "border-emerald" },
  coral: { bg: "bg-coral/10", text: "text-coral", border: "border-coral" },
  amber: { bg: "bg-amber/10", text: "text-amber", border: "border-amber" },
}

export function RolesCta() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="roles" className="py-24 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col items-center text-center mb-12 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">
            Talent We Place
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance mb-5">
            Roles We Hire
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl text-pretty">
            From property accountants to acquisition analysts, we place Big-Four-caliber finance talent
            for real estate investment firms.
          </p>
        </div>

        {/* Role highlight cards */}
        <div className={`grid md:grid-cols-3 gap-6 mb-12 ${visible ? "animate-fade-up delay-150" : "opacity-0"}`}>
          {roleHighlights.map(({ icon: Icon, title, color }, i) => {
            const c = colorMap[color]
            return (
              <div
                key={title}
                className={`group bg-white rounded-2xl border-2 border-border p-6 flex items-center gap-4 hover:border-l-4 hover:${c.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className={c.text} />
                </div>
                <span className="font-semibold text-primary group-hover:text-secondary transition-colors">{title}</span>
              </div>
            )
          })}
        </div>

        {/* CTA to roles page */}
        <div className={`flex justify-center ${visible ? "animate-fade-up delay-300" : "opacity-0"}`}>
          <Link
            href="/roles"
            className="group flex items-center gap-3 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-coral hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View All Roles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
