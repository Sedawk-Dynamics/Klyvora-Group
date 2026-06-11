"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "Big Four", label: "Trained Professionals" },
  { value: "70%+", label: "Cost Savings vs. US Hires" },
  { value: "1 Week", label: "Typical Time to Hire" },
]

export function Hero() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const [visible, setVisible] = useState(false)
  const [hoverButton, setHoverButton] = useState(false)
  const [scrollPos, setScrollPos] = useState(0)

  // Trigger staggered entrance on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  // Track scroll for parallax background shift
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated gradient mesh background - pure CSS, no images */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base gradient layer with organic flow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, oklch(0.20 0.04 245 / 0.4) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, oklch(0.35 0.06 240 / 0.3) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, oklch(0.14 0.03 245 / 0.6) 0%, transparent 100%),
              linear-gradient(135deg, oklch(0.16 0.03 245) 0%, oklch(0.20 0.05 240) 50%, oklch(0.25 0.04 235) 100%)
            `,
            animation: "subtle-pulse 20s ease-in-out infinite",
          }}
        />

        {/* Secondary flowing shapes layer */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 70% 20%, oklch(0.30 0.05 230 / 0.2) 0%, transparent 45%),
              radial-gradient(ellipse at 15% 80%, oklch(0.25 0.04 245 / 0.15) 0%, transparent 50%)
            `,
            animation: "subtle-pulse-delayed 25s ease-in-out infinite",
          }}
        />

        {/* Soft noise texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.02) 2px, rgba(255,255,255,.02) 4px)
            `,
          }}
        />

        {/* Ambient light orbs - creates depth */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-1/3 w-96 h-96 bg-blue-100/3 rounded-full blur-3xl" />
      </div>

      {/* Slightly lighter overlay for better text contrast */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: "linear-gradient(to bottom, oklch(0.16 0.02 245 / 0.45), oklch(0.18 0.02 240 / 0.4))",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow tag with hover glow */}
          {/* <div
            className={`inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white/90 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-secondary/20 cursor-default ${visible ? "animate-fade-up" : "opacity-0"
              }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
            Real Estate Finance Talent, Globally Sourced
          </div> */}

          {/* Headline with enhanced typography */}
          <h1
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance mb-6 drop-shadow-lg ${visible ? "animate-fade-up delay-150" : "opacity-0"
              }`}
          >
            Hire{" "}
            <span className="text-secondary drop-shadow-md">
              Big 4 Accounting & Finance
            </span>{" "}
            Talent
          </h1>

          {/* Body text with improved readability */}
          <p
            className={`text-white/85 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl text-pretty drop-shadow-md ${visible ? "animate-fade-up delay-300" : "opacity-0"
              }`}
          >
            Klyvora connects U.S. real estate investment firms with Big-Four-caliber
            accounting and financial analysis professionals based in India—rigorously
            vetted, selectively placed, and built for long-term partnerships. We
            leverage the most cutting-edge AI tools to bring additional efficiencies and
            operational advantages to our partners.
          </p>

          {/* Enhanced CTA Button with dynamic hover effects */}
          <div
            className={`flex flex-col sm:flex-row gap-4 ${visible ? "animate-fade-up delay-375" : "opacity-0"
              }`}
          >
            <button
              onClick={scrollToContact}
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              className={`flex items-center justify-center gap-2 bg-secondary text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base group hover:bg-coral ${hoverButton
                ? "shadow-lg shadow-coral/50 scale-105"
                : "shadow-md shadow-secondary/25"
                }`}
            >
              Start Hiring
              <ArrowRight
                size={18}
                aria-hidden="true"
                className={`transition-transform duration-300 ${hoverButton ? "translate-x-1" : "translate-x-0"
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Enhanced stats bar with better visual hierarchy */}
        <div
          className={`mt-20 grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-2xl backdrop-blur-sm border border-white/15 transition-all duration-500 hover:bg-white/15 hover:border-white/25 ${visible ? "animate-fade-up delay-600" : "opacity-0"
            }`}
        >
          {stats.map((stat, idx) => {
            const colors = ["text-emerald", "text-coral", "text-amber"]
            return (
              <div
                key={stat.value}
                className="bg-white/5 backdrop-blur-sm px-6 py-5 text-center transition-all duration-300 hover:bg-white/10 group"
              >
                <div className={`text-2xl md:text-3xl font-bold text-white mb-1 group-hover:${colors[idx]} transition-colors duration-300`}>
                  {stat.value}
                </div>
                <div className="text-white/60 text-xs font-medium tracking-wide group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

