"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "About", href: "/about", external: true },
  { label: "Roles", href: "/roles", external: true },
  { label: "Case Studies", href: "/case-studies", external: true },
  { label: "Blog", href: "/blog", external: true },
  { label: "Contact", href: "/contact", external: true },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActive] = useState("")

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    )

    // Only observe sections on homepage (those with #)
    const homePageSections = navLinks.filter((l) => l.href.startsWith("#"))
    homePageSections.forEach((link) => {
      const id = link.href.replace("#", "")
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string, external: boolean = false) => {
    setOpen(false)
    if (external) {
      window.location.href = href
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

        {/* Logo */}
<Link href="/" aria-label="Klyvora Group home">
  <Image
    src="/logo.png"
    alt="Klyvora Group"
    width={300}
    height={80}
    className="h-16 w-auto object-contain"
    priority
  />
</Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("#")
            const className =
              "relative text-sm font-medium tracking-wide transition-colors pb-0.5 hover:text-coral text-foreground"

            // In-page anchors stay as smooth-scroll buttons; real routes render
            // crawlable <a> links so search engines can follow them.
            if (isAnchor) {
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, false)}
                  className={className}
                >
                  {link.label}
                </button>
              )
            }

            return (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavClick("#contact")}
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-colors duration-200"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-border",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6 pt-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("#")
            const className =
              "text-left text-base font-medium text-foreground hover:text-coral transition-colors py-1"

            if (isAnchor) {
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, false)}
                  className={className}
                >
                  {link.label}
                </button>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {link.label}
              </Link>
            )
          })}
          <button
            onClick={() => handleNavClick("#contact", false)}
            className="mt-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-3 rounded-full hover:bg-coral transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </header>
  )
}
