"use client"

import { useSearchStore } from "@/lib/store"

interface TagFilterProps {
    tags: string[]
}

export default function TagFilter({ tags }: TagFilterProps) {
    const { activeTag, setActiveTag } = useSearchStore()

    if (tags.length === 0) return null

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeTag === null
                        ? "bg-indigo-500 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
            >
                All
            </button>
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        activeTag === tag
                            ? "bg-indigo-500 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}
