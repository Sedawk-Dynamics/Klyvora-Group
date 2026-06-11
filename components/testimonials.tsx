"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface TestimonialProfile {
  name: string
  title: string
  company: string
  logo: string
  image: string
  quote: string
}

const profileTestimonials: TestimonialProfile[] = [
  {
    name: "David Cooper",
    title: "Partner",
    company: "Annenberg Investments",
    logo: "/logo-annenberg.jpg",
    image: "/testimonial-david.jpg",
    quote:
      "We were skeptical about offshore hiring, but the vetting process gave us real confidence. Our fund accountant has been an integral part of the team for over a year.",
  },
  {
    name: "Marc Nguyen",
    title: "Asset Manager",
    company: "Bonus Homes",
    logo: "/logo-bonus.webp",
    image: "/testimonial-marc.jpg",
    quote:
      "Klyvora Group understood exactly what we needed from day one. The cost savings were meaningful, but what really mattered was the caliber of talent they delivered.",
  },
  {
    name: "Sammy R",
    title: "Partner",
    company: "Magnolia Capital",
    logo: "/logo-magnolia.jpg",
    image: "/testimonial-sammy.jpg",
    quote:
      "Klyvora Group talent is on par with any near shore employee. The quality and professionalism have exceeded our expectations across the board.",
  },
]

export function Testimonials() {
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
    <section className="py-24 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`flex flex-col items-center text-center mb-20 ${visible ? "animate-fade-up" : "opacity-0"}`}>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance">
            Don&apos;t Take Our Word for It
          </h2>
        </div>

        {/* Professional Profile Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {profileTestimonials.map((profile, i) => (
            <figure
              key={profile.name}
              className={`flex flex-col items-center text-center group cursor-pointer ${visible ? "animate-fade-up" : "opacity-0"
                }`}
              style={{ animationDelay: visible ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              {/* Profile Photo Container */}
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className="relative w-48 h-56 md:w-56 md:h-64">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
              </div>

              {/* Name and Title */}
              <h3 className="font-semibold text-lg text-primary mb-1 group-hover:text-secondary transition-colors duration-300">
                {profile.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{profile.title}</p>

              {/* Company Logo */}
              <div className="relative h-12 mb-6 flex items-center justify-center">
                <Image
                  src={profile.logo}
                  alt={profile.company}
                  height={48}
                  width={120}
                  className="object-contain max-h-12 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-foreground/75 text-sm leading-relaxed italic">
                &ldquo;{profile.quote}&rdquo;
              </blockquote>

              {/* Interactive Bottom Border */}
              <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent group-hover:w-16 transition-all duration-300 rounded-full"></div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
