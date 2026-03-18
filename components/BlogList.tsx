"use client"

import { BlogPost } from "@/lib/types"
import { useSearchStore } from "@/lib/store"
import BlogCard from "./BlogCard"
import { motion } from "framer-motion"

interface BlogListProps {
    posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
    const { query, activeTag } = useSearchStore()

    const filtered = posts.filter((post) => {
        const matchesQuery =
            query === "" ||
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.description.toLowerCase().includes(query.toLowerCase())

        const matchesTag = activeTag === null || post.tags.includes(activeTag)

        return matchesQuery && matchesTag
    })

    if (filtered.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-zinc-400 dark:text-zinc-500"
            >
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-lg font-medium">No articles found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter</p>
            </motion.div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
            ))}
        </div>
    )
}
