"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const logos = [
  { src: "/logo-bonus.webp", alt: "Bonus Homes", width: 120, height: 60, link: "#" },
  { src: "/logo-magnolia.jpg", alt: "Magnolia Capital", width: 140, height: 80, link: "#" },
  { src: "/logo-4m-group.webp", alt: "4M Group", width: 120, height: 70, link: "#" },
  { src: "/logo-annenberg.jpg", alt: "Annenberg Investments", width: 140, height: 70, link: "#" },
]

export function LogoCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

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
      className="py-20 bg-white overflow-hidden relative"
      aria-label="Trusted Partners"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`flex flex-col items-center text-center mb-12 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            FREEING 1000+ <span className="text-orange-500">FOUNDERS</span>
          </h2>
        </div>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge Fades for smoothness */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Continuous Track */}
          <div className="flex w-max">
            <div
              className={`flex gap-16 md:gap-24 items-center animate-marquee ${isPaused ? "pause" : ""}`}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <LogoItem key={idx} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoItem({ logo }: { logo: typeof logos[0] }) {
  return (
    <a
      href={logo.link}
      className="block shrink-0 transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-16 md:h-20 flex items-center justify-center">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          // "will-change-transform" keeps the image sharp during movement
          className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 will-change-transform"
        />
      </div>
    </a>
  )
}