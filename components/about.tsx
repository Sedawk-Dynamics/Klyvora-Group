"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Eye, Heart } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    body: "Connect U.S. real estate firms with Big-Four-caliber finance talent from India—globalizing teams, not just offshoring tasks.",
    accent: {
      bg: "hover:bg-emerald-50",
      iconBg: "group-hover:bg-emerald-100",
      text: "group-hover:text-emerald-600",
      border: "hover:border-emerald-500",
    },
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "A world where the best real estate firms access the best finance talent regardless of geography, building reliable teams that scale efficiently.",
    accent: {
      bg: "hover:bg-coral/10",
      iconBg: "group-hover:bg-coral/20",
      text: "group-hover:text-coral",
      border: "hover:border-coral",
    },
  },
  {
    icon: Heart,
    title: "Our Values",
    body: "We Bring The H.E.A.T. — Honesty, Execution, Attitude, and Teamwork guide every placement and every relationship we build.",
    accent: {
      bg: "hover:bg-amber-50",
      iconBg: "group-hover:bg-amber-100",
      text: "group-hover:text-amber-600",
      border: "hover:border-amber-500",
    },
  },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className={`flex flex-col items-center text-center mb-16 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">
            Who We Are
          </span>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight mb-5">
            A Smarter Approach to <br /> Real Estate Finance Talent
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Klyvora Group was built on a simple insight: India has developed one of the world&apos;s
            largest pools of sophisticated accounting and finance professionals—and U.S. real estate
            firms deserve access to them. Every candidate passes cognitive assessments, technical
            evaluations, and structured interviews before we present them.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map(({ icon: Icon, title, body, accent }, i) => (
            <div
              key={title}
              className={`group bg-white rounded-2xl p-8 border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${accent.bg} ${accent.border} ${visible ? "animate-fade-up" : "opacity-0"
                }`}
              style={{ animationDelay: visible ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 transition-all duration-300 ${accent.iconBg}`}
              >
                <Icon size={24} className={`text-secondary transition-colors duration-300 ${accent.text}`} />
              </div>

              <h4 className={`text-lg font-bold text-primary mb-3 transition-colors duration-300 ${accent.text}`}>
                {title}
              </h4>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
