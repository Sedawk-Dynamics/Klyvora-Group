"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ClipboardList, Users, Lightbulb, Handshake } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell Us Your Needs",
    description:
      "Share your firm's accounting or finance requirements—team structure, tools, and the role you need to fill.",
    accent: { bg: "bg-emerald", text: "text-emerald" },
  },
  {
    number: "02",
    icon: Users,
    title: "We Recruit & Vet",
    description:
      "Our team recruits, cognitively tests, and technically evaluates candidates, presenting only the top matches.",
    accent: { bg: "bg-coral", text: "text-coral" },
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Review & Select",
    description:
      "You interview shortlisted candidates and choose the professional who fits your culture and requirements best.",
    accent: { bg: "bg-amber", text: "text-amber" },
  },
  {
    number: "04",
    icon: Handshake,
    title: "Your Team Grows",
    description:
      "Your new team member joins as a fully embedded long-term partner—working your hours, using your tools.",
    accent: { bg: "bg-teal", text: "text-teal" },
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section id="process" className="py-24 bg-background" ref={ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex flex-col items-center text-center mb-16 ${visible ? "animate-fade-up" : "opacity-0"}`}>
            <span className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">
              How It Works
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance mb-5">
              Getting Started Is Simple
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl text-pretty">
              From first conversation to your new team member starting, our process is
              straightforward, fast, and designed to fit your schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className={`group relative flex flex-col ${visible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: visible ? `${i * 150}ms` : "0ms" }}
                >
                  {/* Connector line between steps */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] right-0 h-px overflow-hidden" aria-hidden="true">
                      <div
                        className="h-full bg-border origin-left"
                        style={{
                          transform: visible ? "scaleX(1)" : "scaleX(0)",
                          transition: `transform 0.5s ease ${i * 150 + 300}ms`,
                        }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center">
                    {/* Step number pill + icon */}
                    <div className="flex flex-col items-center mb-5">
                      <span className={`text-xs font-bold ${step.accent.text} tracking-widest uppercase mb-2 transition-colors`}>
                        {step.number}
                      </span>
                      <div className={`w-14 h-14 rounded-full bg-primary group-hover:${step.accent.bg} flex items-center justify-center shadow-md transition-colors duration-300`}>
                        <Icon size={24} className="text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className={`font-sans text-base font-bold text-primary group-hover:${step.accent.text} mb-3 transition-colors duration-300`}>{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA strip with animated gradient */}
      <section
        className="py-16 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, oklch(0.52 0.1 230), oklch(0.42 0.11 240), oklch(0.58 0.09 222))",
          backgroundSize: "200% 200%",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-2">
              The Klyvora Advantage
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight text-balance">
              Big-Four talent. A fraction of the cost.<br className="hidden md:block" /> Long-term partnerships.
            </h2>
          </div>
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-2 bg-white text-secondary font-semibold px-8 py-4 rounded-full hover:bg-coral hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap text-base"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </section>
    </>
  )
}
