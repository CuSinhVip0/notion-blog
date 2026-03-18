import Link from "next/link"
import { PenLine, Github, Twitter } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold hover:opacity-80 transition-opacity"
                    >
                        <PenLine className="w-4 h-4 text-indigo-500" />
                        <span>NotionBlog</span>
                    </Link>

                    {/* Links */}
                    <nav className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <Link
                            href="/"
                            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Social */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs text-zinc-400">
                    © {currentYear} NotionBlog. Powered by{" "}
                    <a
                        href="https://notion.so"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                    >
                        Notion
                    </a>{" "}
                    &amp; Next.js
                </div>
            </div>
        </footer>
    )
}
