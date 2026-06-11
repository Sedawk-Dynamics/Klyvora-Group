"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ArrowRight } from "lucide-react"

const features = [
  {
    heading: "Elite Talent From India",
    subtitle: "Big Four-Caliber Professionals",
    description:
      "Access rigorously vetted accounting and finance professionals with Big Four and multinational experience—all trained to U.S. standards and ready to integrate into your team.",
    stats: [
      { label: "Top Recruiters", value: "100+" },
      { label: "Average Experience", value: "8+ yrs" },
    ],
    points: ["Accounting Expertise", "Portfolio Management"],
    accent: "coral",
  },
  {
    heading: "7-Step Selection Process",
    subtitle: "Rigorous Vetting & Assessment",
    description:
      "Every candidate undergoes cognitive testing, technical accounting assessments, and behavioral interviews. We only present the top 2% who meet our standards.",
    stats: [
      { label: "Candidates Screened", value: "1,300+" },
      { label: "Final Selection Rate", value: "2%" },
    ],
    points: ["Technical Testing", "Industry Verification"],
    accent: "emerald",
  },
  {
    heading: "Manage & Track All",
    subtitle: "Digital Workspace & Real-Time Collaboration",
    description:
      "Monitor your team's performance, communication, and productivity through our integrated digital workspace. Real-time messaging, time tracking, and performance analytics.",
    stats: [
      { label: "Active Users", value: "500+" },
      { label: "Avg. Uptime", value: "99.8%" },
    ],
    points: ["Real-time Messaging", "Performance Tracking"],
    accent: "amber",
  },
]

export function WhyKlyvora() {
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
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="py-32 relative overflow-hidden bg-[#0b1220]"
      aria-label="Why Klyvora Services"
    >

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-coral/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div
          className={`flex flex-col items-center text-center mb-32 ${visible ? "animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-coral text-xs font-bold tracking-widest uppercase mb-3">
            Why Klyvora
          </span>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built for Real Estate Finance Excellence
          </h2>

          <p className="text-white/70 text-lg max-w-3xl leading-relaxed">
            From recruitment to ongoing management, we provide end-to-end
            solutions that help U.S. real estate investment firms build
            world-class teams without the overhead.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-28">
          {features.map((feature, idx) => {
            const isEven = idx % 2 === 0

            const accentColors = {
              coral: "border-coral/50 bg-coral/5",
              emerald: "border-emerald/50 bg-emerald/5",
              amber: "border-amber/50 bg-amber/5",
            }

            const accentTextColors = {
              coral: "text-coral",
              emerald: "text-emerald",
              amber: "text-amber",
            }

            return (
              <div
                key={feature.heading}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-16 items-center ${visible ? "animate-fade-up" : "opacity-0"
                  }`}
                style={{
                  animationDelay: visible ? `${(idx + 1) * 200}ms` : "0ms",
                }}
              >

                {/* Text */}
                <div className="flex-1">

                  <span
                    className={`text-xs font-bold tracking-widest uppercase mb-3 block ${accentTextColors[
                      feature.accent as keyof typeof accentTextColors
                    ]
                      }`}
                  >
                    {`0${idx + 1}`} {feature.subtitle}
                  </span>

                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
                    {feature.heading}
                  </h3>

                  <p className="text-white/60 leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  {/* Points */}
                  <div className="flex flex-col gap-3 mb-8">
                    {feature.points.map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${accentColors[
                            feature.accent as keyof typeof accentColors
                          ]
                            }`}
                        >
                          <Check
                            size={14}
                            className={
                              accentTextColors[
                              feature.accent as keyof typeof accentTextColors
                              ]
                            }
                          />
                        </div>
                        <span className="text-white/80">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {feature.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`border rounded-lg p-4 ${accentColors[
                          feature.accent as keyof typeof accentColors
                        ]
                          }`}
                      >
                        <div
                          className={`font-bold text-2xl ${accentTextColors[
                            feature.accent as keyof typeof accentTextColors
                          ]
                            }`}
                        >
                          {stat.value}
                        </div>

                        <div className="text-white/60 text-xs mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1">

                  <div
                    className={`group relative h-80 rounded-2xl border-2 p-8 flex flex-col justify-between overflow-hidden
                    transform transition-all duration-500
                    hover:-translate-y-3 hover:scale-[1.02]
                    hover:shadow-2xl
                    ${accentColors[
                      feature.accent as keyof typeof accentColors
                      ]
                      }`}
                  >

                    {/* border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500"></div>

                    {/* background pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]" />

                    <div className="relative z-10">

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 mb-4 border border-white/20">
                        <div
                          className={`w-2 h-2 rounded-full ${accentTextColors[
                            feature.accent as keyof typeof accentTextColors
                          ]
                            }`}
                        />
                        <span className="text-xs text-white/70">
                          Active Feature
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2">
                        {feature.heading}
                      </h4>

                      <p className="text-white/70 text-sm">
                        Integrated system for managing your global team with
                        real-time insights.
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10">
                      <span className="text-xs text-white/60">
                        Learn more
                      </span>

                      <ArrowRight
                        size={16}
                        className="text-white/60 group-hover:translate-x-1 transition-transform"
                      />
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div
          className={`mt-32 flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/2 ${visible ? "animate-fade-up" : "opacity-0"
            }`}
          style={{ animationDelay: visible ? "700ms" : "0ms" }}
        >

          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to build your dream team?
            </h3>

            <p className="text-white/60 text-sm">
              Let's discuss how Klyvora Services can help your firm scale.
            </p>
          </div>

          <button className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white
          bg-gradient-to-r from-coral to-orange-500
          hover:scale-105 hover:shadow-xl hover:shadow-coral/40
          transition-all duration-300">

            Get Started

            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>
    </section>
  )
}
