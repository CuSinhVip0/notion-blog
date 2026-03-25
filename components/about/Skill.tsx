"use client"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface SkillCategory {
    name: string
    items: string[]
}

const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
})

const palette = [
    "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20",
    "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20",
    "bg-pink-500/10 border-pink-500/30 text-pink-400 hover:bg-pink-500/20",
    "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20",
]

export function Skills() {
    const t = useTranslations("about.skills")
    const categories = t.raw("categories") as SkillCategory[]

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div {...fadeInUp()} className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-cyan-400">
                        {t("badge")}
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                        {t("title")}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            {...fadeInUp(i * 0.1)}
                            whileHover={{ y: -4 }}
                            className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-700/60 backdrop-blur-sm hover:border-neutral-600 transition-colors"
                        >
                            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                                {cat.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.items.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        whileHover={{ scale: 1.08 }}
                                        className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-default ${palette[i % palette.length]}`}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
