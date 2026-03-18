"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"

interface BlogContentProps {
    content: string
}

export default function BlogContent({ content }: BlogContentProps) {
    return (
        <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-code:text-indigo-600 dark:prose-code:text-indigo-300 prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-indigo-400 prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-900/10 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                {content}
            </ReactMarkdown>
        </article>
    )
}
