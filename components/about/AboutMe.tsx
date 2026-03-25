"use client"
import { motion } from "framer-motion"
import { Code2, Coffee, Rocket, Layers } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
})

export default function AboutMe() {
    const t = useTranslations("about.aboutMe")

    const highlights = [
        { icon: Code2, label: t("h1Label"), value: t("h1Value"), color: "cyan" },
        { icon: Coffee, label: t("h2Label"), value: t("h2Value"), color: "purple" },
        { icon: Layers, label: t("h3Label"), value: t("h3Value"), color: "pink" },
        { icon: Rocket, label: t("h4Label"), value: t("h4Value"), color: "cyan" },
    ]

    const colorMap: Record<string, string> = {
        cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
        purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
        pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30",
    }

    const textColorMap: Record<string, string> = {
        cyan: "text-cyan-600 dark:text-cyan-400",
        purple: "text-purple-600 dark:text-purple-400",
        pink: "text-pink-600 dark:text-pink-400",
    }

    return (
        <section id="about-me" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white/50 to-gray-50 dark:from-neutral-950 dark:via-neutral-900/50 dark:to-neutral-950 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div {...fadeInUp()} className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                        {t("title")}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Avatar & card */}
                    <motion.div
                        {...fadeInUp(0.1)}
                        className="flex flex-col items-center lg:items-center gap-6"
                    >
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                            <div className="relative w-72 h-72 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-900 border border-gray-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden">
                                {/* <span className="text-7xl select-none">👨‍💻</span> */}
                                <Image
                                    src={"/me.jpg"}
                                    alt="Me"
                                    width={286}
                                    height={286}
                                    className="rounded-2xl  object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Quote */}
                        <motion.blockquote
                            {...fadeInUp(0.2)}
                            className="relative p-5 bg-white/80 dark:bg-neutral-900/80 border border-gray-200/60 dark:border-neutral-700/60 rounded-xl max-w-sm"
                        >
                            <span className="absolute top-3 left-4 text-4xl leading-none text-cyan-500/40 font-serif select-none">
                                &quot;
                            </span>
                            <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed pt-4 italic">
                                {t("quote")}
                            </p>
                        </motion.blockquote>
                    </motion.div>

                    {/* Bio content */}
                    <div className="space-y-6">
                        <motion.div {...fadeInUp(0.2)}>
                            <p className="text-gray-700 dark:text-neutral-300 text-lg leading-relaxed">
                                {t("bio1")}
                            </p>
                        </motion.div>
                        <motion.div {...fadeInUp(0.3)}>
                            <p className="text-gray-500 dark:text-neutral-400 leading-relaxed">
                                {t("bio2")}
                            </p>
                        </motion.div>

                        {/* Highlight stats */}
                        <motion.div {...fadeInUp(0.4)} className="grid grid-cols-2 gap-3 pt-2">
                            {highlights.map(({ icon: Icon, label, value, color }) => (
                                <motion.div
                                    key={label}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${colorMap[color]} border`}
                                >
                                    <Icon size={20} className={`shrink-0 ${textColorMap[color]}`} />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-bold text-lg leading-none">
                                            {value}
                                        </p>
                                        <p className="text-gray-500 dark:text-neutral-400 text-xs mt-0.5">
                                            {label}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
