// Server-side Ghost Content API client.
// Reads published blog content over the read-only Content API using native fetch
// so we don't need an SDK dependency. Results are cached via Next's ISR
// (`next.revalidate`) so new Ghost posts appear without a redeploy.

const GHOST_API_URL = (process.env.GHOST_API_URL ?? "https://blog.klyvora-group.com").replace(/\/$/, "")
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY ?? ""

// How long (seconds) to cache Ghost responses before revalidating.
const REVALIDATE_SECONDS = 60

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image: string | null
  bio: string | null
}

export interface GhostTag {
  id: string
  name: string
  slug: string
}

export interface GhostPost {
  id: string
  uuid: string
  title: string
  slug: string
  html: string
  excerpt: string | null
  custom_excerpt: string | null
  feature_image: string | null
  feature_image_alt: string | null
  feature_image_caption: string | null
  featured: boolean
  published_at: string
  updated_at: string
  reading_time: number
  tags?: GhostTag[]
  authors?: GhostAuthor[]
  primary_tag?: GhostTag | null
  primary_author?: GhostAuthor | null
}

interface GhostPostsResponse {
  posts: GhostPost[]
  meta?: { pagination?: { page: number; pages: number; total: number } }
}

function buildUrl(path: string, params: Record<string, string>): string {
  const search = new URLSearchParams({ key: GHOST_CONTENT_API_KEY, ...params })
  return `${GHOST_API_URL}/ghost/api/content/${path}/?${search.toString()}`
}

async function ghostFetch(url: string): Promise<GhostPostsResponse | null> {
  if (!GHOST_CONTENT_API_KEY) {
    console.error("[ghost] Missing GHOST_CONTENT_API_KEY — returning no posts.")
    return null
  }
  try {
    const res = await fetch(url, {
      headers: { "Accept-Version": "v5.0" },
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) {
      console.error(`[ghost] Request failed: ${res.status} ${res.statusText}`)
      return null
    }
    return (await res.json()) as GhostPostsResponse
  } catch (err) {
    console.error("[ghost] Fetch error:", err)
    return null
  }
}

/** All published posts, newest first. Returns [] on any failure. */
export async function getPosts(): Promise<GhostPost[]> {
  const url = buildUrl("posts", {
    include: "tags,authors",
    order: "published_at desc",
    limit: "all",
  })
  const data = await ghostFetch(url)
  return data?.posts ?? []
}

/** A single published post by slug, or null if not found. */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  const url = buildUrl(`posts/slug/${encodeURIComponent(slug)}`, {
    include: "tags,authors",
  })
  const data = await ghostFetch(url)
  return data?.posts?.[0] ?? null
}

/** Lightweight slug list for generateStaticParams. */
export async function getPostSlugs(): Promise<string[]> {
  const url = buildUrl("posts", { fields: "slug", limit: "all" })
  const data = await ghostFetch(url)
  return (data?.posts ?? []).map((p) => p.slug)
}

/** Best available short summary for a post. */
export function excerptOf(post: GhostPost): string {
  return (post.custom_excerpt || post.excerpt || "").trim()
}

/** Human-readable reading time label, e.g. "5 min read". */
export function readTimeLabel(post: GhostPost): string {
  return `${Math.max(1, post.reading_time || 0)} min read`
}
