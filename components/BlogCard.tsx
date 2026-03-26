import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { BlogPost } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { coverImageCache } from "@/config/init"

interface BlogCardProps {
    post: BlogPost
    index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    const t = useTranslations()
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
        >
            <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-300">
                    {/* Cover image */}
                    {post.url && (
                        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            <Image
                                src={post.url ?? coverImageCache!}
                                alt={post.title}
                                fill
                                loading="eager"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    )}

                    <div className="p-5 flex flex-col gap-3">
                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {post.title}
                        </h2>

                        {/* Description */}
                        {post.description && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                {post.description}
                            </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between pt-2 mt-auto border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDate(post.publishedAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.readingTime} {t("readingTime")}
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
