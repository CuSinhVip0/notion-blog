import { getAllPosts } from "@/lib/notion"
import { BlogPost } from "@/lib/types"
import BlogList from "@/components/BlogList"
import SearchBar from "@/components/SearchBar"
import TagFilter from "@/components/TagFilter"
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
        error = "Could not load posts. Please check your Notion API configuration."
    }

    const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
                    Blog
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    {posts.length > 0
                        ? `${posts.length} article${posts.length !== 1 ? "s" : ""} – thoughts on tech, design & more`
                        : "Coming soon..."}
                </p>
            </div>

            {error && (
                <div className="mb-8 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-sm">
                    ⚠️ {error}
                </div>
            )}

            {!error && posts.length > 0 && (
                <>
                    {/* Search & Filter bar */}
                    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="w-full sm:max-w-xs">
                            <SearchBar />
                        </div>
                    </div>

                    <div className="mb-8">
                        <TagFilter tags={allTags} />
                    </div>

                    <BlogList posts={posts} />
                </>
            )}

            {!error && posts.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-5xl mb-4">📝</p>
                    <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300">
                        No posts yet
                    </p>
                </div>
            )}
        </div>
    )
}
