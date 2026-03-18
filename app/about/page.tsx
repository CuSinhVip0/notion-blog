import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about the author behind NotionBlog.",
}

export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
            {/* Avatar placeholder */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    N
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1 tracking-tight">
                        About Me
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        Developer, writer, curious human.
                    </p>
                </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
                <p>
                    Hi! I&apos;m a software developer passionate about building things on the web. I
                    write about technology, design systems, developer experience, and the occasional
                    personal reflection.
                </p>

                <p>
                    This blog is built with{" "}
                    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                        Next.js
                    </a>
                    ,{" "}
                    <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">
                        Tailwind CSS
                    </a>
                    , and powered by{" "}
                    <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
                        Notion
                    </a>{" "}
                    as a headless CMS. All articles are written and managed directly in Notion.
                </p>

                <h2>Tech Stack</h2>
                <ul>
                    <li>
                        <strong>Framework:</strong> Next.js 15 (App Router)
                    </li>
                    <li>
                        <strong>Styling:</strong> Tailwind CSS v4
                    </li>
                    <li>
                        <strong>CMS:</strong> Notion via official API
                    </li>
                    <li>
                        <strong>Animations:</strong> Framer Motion
                    </li>
                    <li>
                        <strong>Deployment:</strong> Vercel
                    </li>
                </ul>

                <h2>Get in Touch</h2>
                <p>
                    Feel free to reach out via{" "}
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>{" "}
                    or{" "}
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}
