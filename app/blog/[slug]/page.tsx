import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/contact-footer"
import { JsonLd, breadcrumb, SITE_URL } from "@/components/json-ld"
import { getPostBySlug, getPostSlugs, excerptOf, readTimeLabel } from "@/lib/ghost"
import type { Metadata } from "next"

// Revalidate individual posts from Ghost at most once per minute (ISR).
export const revalidate = 60

function formatDate(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "" : format(d, "MMMM d, yyyy")
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: "Post not found | Klyvora Group" }
  }

  const description = excerptOf(post)
  const url = `/blog/${post.slug}`

  return {
    title: `${post.title} | Klyvora Group`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: post.feature_image ? [{ url: post.feature_image }] : undefined,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const category = post.primary_tag?.name
  const author = post.primary_author?.name

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: excerptOf(post),
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.feature_image || undefined,
    author: author ? { "@type": "Person", name: author } : undefined,
    publisher: { "@type": "Organization", name: "Klyvora Group" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }

  return (
    <main>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={articleSchema} />
      <Navbar />

      <article className="pt-32 pb-20 bg-gradient-to-b from-surface/50 to-background">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-coral transition-colors mb-8"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Blog
          </Link>

          {/* Category */}
          {category && (
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-4">
              {category}
            </span>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary leading-tight text-balance mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
            {author && (
              <span className="flex items-center gap-2">
                <User size={16} />
                {author}
              </span>
            )}
            {post.published_at && (
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(post.published_at)}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {readTimeLabel(post)}
            </span>
          </div>

          {/* Feature image */}
          {post.feature_image && (
            <figure className="mb-10">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-border">
                <Image
                  src={post.feature_image}
                  alt={post.feature_image_alt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
              {post.feature_image_caption && (
                <figcaption
                  className="mt-3 text-center text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: post.feature_image_caption }}
                />
              )}
            </figure>
          )}

          {/* Body */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-surface border border-border text-foreground text-xs font-medium rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}
