"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backHref?: string
  backLabel?: string
}

export function PageHeader({ title, subtitle, backHref = "/", backLabel = "Back to Home" }: PageHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Fixed sticky header */}
      <header
        className={cn(
          "fixed top-20 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-white/40 backdrop-blur-sm border-b border-border/40"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Back link */}
          {/* <Link
            href={backHref}
            className={cn(
              "flex items-center gap-2 font-semibold text-sm tracking-wide transition-colors duration-300",
              scrolled ? "text-secondary hover:text-coral" : "text-secondary hover:text-coral"
            )}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {backLabel}
          </Link> */}

          {/* Title displayed on scroll */}
          <div
            className={cn(
              "transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <h2 className="font-serif text-lg font-bold text-primary text-balance max-w-xs text-center">
              {title}
            </h2>
          </div>

          {/* Right spacer for balance */}
          <div className="w-16" />
        </div>
      </header>

      {/* Hero section with padding for fixed header */}
      <section className="pt-40 pb-16 bg-surface/50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary leading-tight text-balance mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl text-pretty">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
