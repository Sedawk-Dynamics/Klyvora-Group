"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import type { GhostPost } from "@/lib/ghost"

// Gradient palette reused for cards that have no feature image, so the original
// colorful look is preserved when Ghost posts lack a cover image.
const gradients = [
  "from-emerald/30 to-teal/20",
  "from-coral/30 to-amber/20",
  "from-amber/30 to-coral/20",
  "from-violet/30 to-emerald/20",
  "from-teal/30 to-coral/20",
  "from-coral/30 to-teal/20",
]

function categoryOf(post: GhostPost): string {
  return post.primary_tag?.name ?? "Insights"
}

function excerptOf(post: GhostPost): string {
  return (post.custom_excerpt || post.excerpt || "").trim()
}

function readTimeLabel(post: GhostPost): string {
  return `${Math.max(1, post.reading_time || 0)} min read`
}

function formatDate(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "" : format(d, "MMM d, yyyy")
}

export function BlogSection({ posts }: { posts: GhostPost[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

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

  // Derive the category filter list from the tags present on the posts.
  const categories = ["All", ...Array.from(new Set(posts.map(categoryOf)))]

  const filteredPosts = posts.filter((post) => {
    const categoryMatch = selectedCategory === "All" || categoryOf(post) === selectedCategory
    const term = searchTerm.toLowerCase()
    const searchMatch =
      post.title.toLowerCase().includes(term) || excerptOf(post).toLowerCase().includes(term)
    return categoryMatch && searchMatch
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <section className="py-24 bg-gradient-to-b from-background via-surface to-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Search and Filter Section */}
        <div className={`mb-16 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary opacity-60" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                    : "bg-surface border border-border text-foreground hover:border-secondary hover:text-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className={`mb-20 ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group bg-white rounded-xl overflow-hidden border border-border hover:border-secondary hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
                    visible ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${200 + idx * 100}ms` }}
                >
                  {/* Media header (feature image or gradient fallback) */}
                  <div className={`relative h-48 bg-gradient-to-br ${gradients[idx % gradients.length]}`}>
                    {post.feature_image && (
                      <Image
                        src={post.feature_image}
                        alt={post.feature_image_alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute top-4 left-4 z-10 inline-block px-3 py-1 bg-white/90 text-xs font-bold text-secondary rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <span className="inline-block w-fit px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded mb-3">
                      {categoryOf(post)}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight mb-3 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-base mb-4 line-clamp-3">{excerptOf(post)}</p>

                    {/* Meta Info */}
                    <div className="mt-auto pt-4 border-t border-border space-y-3">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {formatDate(post.published_at)}
                        </div>
                        {post.primary_author?.name && (
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            {post.primary_author.name}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-semibold text-secondary">{readTimeLabel(post)}</span>
                        <ArrowRight size={18} className="text-secondary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        {regularPosts.length > 0 && (
          <div className={visible ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: "150ms" }}>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
              {featuredPosts.length > 0 ? "Latest Articles" : "Articles"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group bg-white rounded-lg overflow-hidden border border-border hover:border-secondary hover:shadow-md transition-all duration-300 flex flex-col h-full ${
                    visible ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${300 + idx * 80}ms` }}
                >
                  {/* Media header (feature image or gradient fallback) */}
                  <div className={`relative h-32 bg-gradient-to-br ${gradients[idx % gradients.length]}`}>
                    {post.feature_image && (
                      <Image
                        src={post.feature_image}
                        alt={post.feature_image_alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col">
                    <span className="inline-block w-fit px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded mb-3">
                      {categoryOf(post)}
                    </span>

                    <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{excerptOf(post)}</p>

                    {/* Meta */}
                    <div className="border-t border-border pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={14} />
                        {formatDate(post.published_at)}
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty states */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No articles have been published yet. Check back soon.</p>
          </div>
        ) : (
          filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-coral transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )
        )}

        {/* Newsletter CTA */}
        <div
          className={`mt-20 bg-gradient-to-r from-secondary/20 to-coral/20 rounded-xl border border-secondary/30 p-8 md:p-12 text-center ${
            visible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on real estate accounting and finance talent management.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-secondary transition-colors"
            />
            <button className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-coral transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
