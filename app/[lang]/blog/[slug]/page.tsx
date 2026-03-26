import { getPostBySlug, getAllSlugs } from "@/lib/notion"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import PostHeader from "@/components/PostHeader"
import { cache } from "react"
import BlogContent from "@/components/BlogContent"
import Comments from "@/components/Comments"
import { headers } from "next/headers"

export const revalidate = 60

interface Props {
    params: Promise<{ slug: string; lang: "vi" | "en" }>
}

const getPostCached = cache(async (slug: string) => {
    return await getPostBySlug(slug)
})

export async function generateStaticParams() {
    try {
        const slugs = await getAllSlugs()
        return slugs.map((slug) => ({ slug }))
    } catch {
        return []
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    try {
        const post = await getPostCached(slug)
        if (!post) return { title: "Post not found" }

        return {
            title: post.title,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                type: "article",
                publishedTime: post.publishedAt,
                modifiedTime: post.updatedAt,
                authors: [post.author],
                tags: post.tags,
                images: post.url
                    ? [{ url: post.url, width: 1200, height: 630, alt: post.title }]
                    : [],
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: post.description,
                images: post.url ? [post.url] : [],
            },
        }
    } catch {
        return { title: "Post not found" }
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug, lang } = await params

    let post

    try {
        post = await getPostCached(slug)
    } catch {
        notFound()
    }

    if (!post) notFound()

    const headersList = await headers()
    const host = headersList.get("host") ?? "localhost:3000"
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
    const pageUrl = `${protocol}://${host}/${lang}/blog/${slug}`

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12">
            <PostHeader post={post} />
            <BlogContent recordMap={post.recordMap} />
            <Comments pageId={slug} pageTitle={post.title} pageUrl={pageUrl} />
        </div>
    )
}
