"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Eye, Heart } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    short: "Connect U.S. firms with top talent",
    full: "Connect U.S. real estate firms with Big-Four-caliber finance talent from India—globalizing teams, not just offshoring tasks.",
    accent: {
      bg: "bg-emerald/10",
      icon: "text-emerald",
      border: "border-emerald",
      gradient: "from-emerald/5 to-emerald/10",
    },
  },
  {
    icon: Eye,
    title: "Our Vision",
    short: "Access best talent globally",
    full: "A world where the best real estate firms access the best finance talent regardless of geography, building reliable teams that scale efficiently.",
    accent: {
      bg: "bg-coral/10",
      icon: "text-coral",
      border: "border-coral",
      gradient: "from-coral/5 to-coral/10",
    },
  },
  {
    icon: Heart,
    title: "Our Values",
    short: "H.E.A.T. — Honesty, Execution, Attitude, Teamwork",
    full: "We Bring The H.E.A.T. — Honesty, Execution, Attitude, and Teamwork guide every placement and every relationship we build.",
    accent: {
      bg: "bg-amber/10",
      icon: "text-amber",
      border: "border-amber",
      gradient: "from-amber/5 to-amber/10",
    },
  },
]

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [flipped, setFlipped] = useState<number | null>(null)

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

  const toggleFlip = (idx: number) => {
    setFlipped(flipped === idx ? null : idx)
  }

  return (
    <section className="py-24 bg-background min-h-screen" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div
          className={`flex flex-col items-center text-center mb-20 ${visible ? "animate-fade-up" : "opacity-0"
            }`}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance mb-6">
            Who We Are
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl text-pretty">
            Klyvora is a global talent solutions company dedicated to
            connecting U.S. real estate investment firms with world-class
            accounting and finance professionals. We believe in building
            genuine partnerships that drive growth, efficiency, and success.
          </p>
        </div>

        {/* Flip Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pillars.map(({ icon: Icon, title, short, full, accent }, i) => (
            <div
              key={title}
              className={`h-80 cursor-pointer perspective ${visible ? "animate-fade-up" : "opacity-0"
                }`}
              style={{
                animationDelay: visible ? `${(i + 1) * 120}ms` : "0ms",
              }}
              onClick={() => toggleFlip(i)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-gpu ${flipped === i
                    ? "[transform:rotateY(180deg)]"
                    : "[transform:rotateY(0deg)]"
                  }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front */}
                <div
                  className={`absolute inset-0 rounded-2xl p-8 border-2 bg-surface flex flex-col items-center justify-center text-center ${accent.border} shadow-lg hover:shadow-xl transition-shadow`}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-xl ${accent.bg} flex items-center justify-center mb-6`}
                  >
                    <Icon size={32} className={accent.icon} />
                  </div>

                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {short}
                  </p>

                  <p className="text-xs text-muted-foreground mt-4 opacity-60">
                    Click to see more
                  </p>
                </div>

                {/* Back */}
                <div
                  className={`absolute inset-0 rounded-2xl p-8 border-2 bg-gradient-to-br ${accent.gradient} flex flex-col items-center justify-center text-center ${accent.border} shadow-lg`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${accent.bg} flex items-center justify-center mb-4 mx-auto`}
                  >
                    <Icon size={24} className={accent.icon} />
                  </div>

                  <p className="text-primary font-medium leading-relaxed text-base">
                    {full}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div
          className={`bg-surface rounded-2xl p-12 border border-border ${visible ? "animate-fade-up" : "opacity-0"
            }`}
          style={{
            animationDelay: visible ? "450ms" : "0ms",
          }}
        >
          <h3 className="text-3xl font-bold text-primary mb-6">
            Our Story
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded with a simple belief—that the best talent transcends
                borders, Klyvora emerged from deep experience in real estate
                finance, international markets, and recruitment. We recognized
                that U.S. firms were struggling to find accounting
                professionals with the specialized real estate expertise they
                needed.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                The answer wasn't outsourcing. It was building genuine global
                teams that work as seamlessly as in-house staff, bringing
                world-class expertise at unprecedented value.
              </p>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Klyvora places accounting and finance professionals with
                leading real estate investment firms across the United States.
                Each placement is backed by rigorous vetting, continuous
                training, and a commitment to long-term success.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                We're not just a recruiting firm—we're a strategic partner in
                your growth, enabling your team to focus on what matters most
                while we handle the talent acquisition and management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}