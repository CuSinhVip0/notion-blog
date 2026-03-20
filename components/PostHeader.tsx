"use client"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BlogPostDetail } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import BlogContent from "./BlogContent"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
interface PostHeaderProps {
    post: BlogPostDetail
}

export default function PostHeader({ post }: PostHeaderProps) {
    const t = useTranslations()
    return (
        <>
            {/* Back button */}
            <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    {t("backToBlog")}
                </Link>
            </motion.div>

            {/* Tags */}
            {post.tags.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="flex flex-wrap gap-2 mb-4"
                >
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            )}

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-4"
            >
                {post.title}
            </motion.h1>

            {/* Description */}
            {post.description && (
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6"
                >
                    {post.description}
                </motion.p>
            )}

            {/* Meta */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800"
            >
                <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} min read
                </span>
            </motion.div>

            {/* Cover Image */}
            {(post.thumbnail || post.coverImage) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 bg-zinc-100 dark:bg-zinc-800"
                >
                    <Image
                        src={post.thumbnail ?? post.coverImage!}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 896px) 100vw, 896px"
                    />
                </motion.div>
            )}

            {/* Content */}
            {/* <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <BlogContent recordMap={post.recordMap} />
            </motion.div> */}
        </>
    )
}
