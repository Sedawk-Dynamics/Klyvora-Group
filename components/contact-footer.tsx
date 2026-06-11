"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Linkedin, Send, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const contactDetails = [
  { icon: Phone, label: "Phone", value: "847 471 1251", href: "tel:8474711251" },
  { icon: Mail, label: "Email", value: "Info@klyvora-group.com", href: "mailto:Info@klyvora-group.com" },
  { icon: MapPin, label: "Offices", value: "Chicago, Illinois & New Delhi, India", href: null },
]

const tickerItems = [
  "ELITE ACCOUNTING TALENT",
  "BIG FOUR CREDENTIALS",
  "REAL ESTATE SPECIALISTS",
  "70%+ COST SAVINGS",
  "ZERO COMPROMISE ON QUALITY",
  "LONG-TERM PARTNERSHIPS",
]

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`flex flex-col items-center text-center mb-16 ${vis ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance mb-5">
            Let&apos;s Start the Conversation
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl text-pretty">
            Tell us about your firm and what you&apos;re looking for. Our team will reach out within one business day.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact info panel — slides in from left */}
          <aside
            className={`lg:col-span-2 flex flex-col gap-8 ${vis ? "animate-slide-in-left" : "opacity-0"}`}
          >
            <div className="bg-primary rounded-2xl p-8 text-white">
              <h3 className="font-serif text-xl font-bold mb-6">Contact Information</h3>
              <ul className="flex flex-col gap-5">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-secondary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-medium mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-white text-sm font-medium hover:text-secondary transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/50 text-xs font-medium mb-3">Business Hours</p>
                <p className="text-white text-sm">Monday – Friday</p>
                <p className="text-white/70 text-sm">9:00 AM – 6:00 PM CST</p>
              </div>

              <div className="mt-8">
                <a
                  href="https://linkedin.com"
                  className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:text-white transition-colors"
                  aria-label="Connect with Klyvora on LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </aside>

          {/* Form — slides in from right */}
          <div
            className={`lg:col-span-3 bg-white rounded-2xl border border-border p-8 md:p-10 shadow-sm ${vis ? "animate-slide-in-right delay-150" : "opacity-0"}`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-5">
                <CheckCircle2 size={52} className="text-secondary" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-bold text-primary">Message Received</h3>
                <p className="text-muted-foreground text-base max-w-sm">
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setError(""); setForm({ name: "", company: "", email: "", phone: "", message: "" }) }}
                  className="mt-2 text-sm text-secondary font-semibold underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-serif text-2xl font-bold text-primary mb-8">Tell us about your firm</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "Jane Smith", required: true },
                    { name: "company", label: "Company Name", type: "text", placeholder: "Acme Real Estate Partners", required: true },
                    { name: "email", label: "Email Address", type: "email", placeholder: "jane@acmerealestate.com", required: true },
                    { name: "phone", label: "Phone Number", type: "tel", placeholder: "(312) 555-0100", required: false },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-1.5 group">
                      <label htmlFor={field.name} className="text-sm font-semibold text-foreground">
                        {field.label}
                        {field.required && <span className="text-secondary ml-0.5" aria-hidden="true">*</span>}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        className="h-11 px-4 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5 mb-8">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">
                    How can we help you?
                    <span className="text-secondary ml-0.5" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about the role you need to fill, your team size, and any specific requirements..."
                    value={form.message}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all duration-200"
                  />
                </div>
                {error && (
                  <p
                    role="alert"
                    className="mb-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-4 rounded-full text-base transition-colors",
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-secondary"
                  )}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // Duplicate items for seamless marquee loop
  const tickerAll = [...tickerItems, ...tickerItems]

  return (
    <footer className="bg-primary text-white">

      {/* Scrolling marquee ticker */}
      <div className="border-t border-white/10 border-b border-b-white/10 py-3 overflow-hidden marquee-track" aria-hidden="true">
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {tickerAll.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-white/50 px-8">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo.png"
              alt="Klyvora"
              width={280}
              height={80}
              className="h-16 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Connecting U.S. real estate investment firms with elite accounting and financial analysis
              professionals from India.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Chicago, Illinois &amp; New Delhi, India
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Navigation</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About", href: "#about" },
                { label: "Roles", href: "#roles" },
                { label: "Process", href: "#process" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:8474711251" className="text-white/70 text-sm hover:text-white transition-colors">
                  847 471 1251
                </a>
              </li>
              <li>
                <a href="mailto:Info@klyvora-group.com" className="text-white/70 text-sm hover:text-white transition-colors">
                  Info@klyvora-group.com
                </a>
              </li>
              {/* <li>
                <a href="mailto:Zak@Klyvora.com" className="text-white/70 text-sm hover:text-white transition-colors">
                  Zak@Klyvoraservices.com
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Klyvora (Klyvora , LLC). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
