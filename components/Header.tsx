import Link from "next/link"
import { PenLine, Menu, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import { getTranslations } from "next-intl/server"

export default async function Header() {
    const t = await getTranslations()

    const navLinks = [
        { href: "/", label: t("nav.home") },
        { href: "/blog", label: t("nav.blog") },
        { href: "/about", label: t("nav.about") },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800`}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white hover:opacity-80 transition-opacity"
                >
                    <PenLine className="w-5 h-5 text-indigo-500" />
                    <span>NotionBlog</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = false
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                    <div className="ml-2 flex items-center gap-1">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center gap-1">
                    <LanguageToggle />
                    <ThemeToggle />
                    {/* <button
                        className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button> */}
                </div>
            </div>

            {/* Mobile menu */}
            {/* <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md"
                    >
                        <nav className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const isActive =
                                    link.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(link.href)
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </header>
    )
}
