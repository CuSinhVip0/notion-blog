import { getAllPosts } from "@/lib/notion"
import { BlogPost } from "@/lib/types"
import BlogPageContent from "@/components/BlogPageContent"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Blog",
    description: "Browse all articles on technology, design, and more.",
}

export default async function BlogPage() {
    let posts: BlogPost[] = []
    let error: string | null = null

    try {
        posts = await getAllPosts()
    } catch {
        error = "failed"
    }

    const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))

    return <BlogPageContent posts={posts} error={error} allTags={allTags} />
}
