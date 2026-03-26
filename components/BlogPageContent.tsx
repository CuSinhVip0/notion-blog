import { BlogPost } from "@/lib/types"
import BlogList from "./BlogList"
import SearchBar from "./SearchBar"
import TagFilter from "./TagFilter"
import { useTranslations } from "next-intl"

interface BlogPageContentProps {
    posts: BlogPost[]
    error: string | null
    allTags: string[]
}

export default function BlogPageContent({ posts, error, allTags }: BlogPageContentProps) {
    const t = useTranslations()

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
                    {t("nav.blog")}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    {t("nav.subtitle", { count: posts.length })}
                </p>
            </div>

            {error && (
                <div className="mb-8 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-sm">
                    ⚠️ {t("error.loadPosts")}
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
                        {t("blog.noPostsYet")}
                    </p>
                </div>
            )}
        </div>
    )
}
