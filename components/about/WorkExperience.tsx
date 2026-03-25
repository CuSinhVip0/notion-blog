"use client"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"

interface ExperienceItem {
    role: string
    company: string
    period: string
    location: string
    description: string
    techs: string[]
    current?: boolean
}

const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
})

export default function WorkExperience() {
    const t = useTranslations("about.experience")
    const items = t.raw("items") as ExperienceItem[]

    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div {...fadeInUp()} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-cyan-400">
                        {t("badge")}
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                        {t("title")}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

                    <div className="space-y-10">
                        {items.map((item, index) => {
                            const isLeft = index % 2 === 0
                            return (
                                <motion.div
                                    key={index}
                                    {...fadeInUp(index * 0.1)}
                                    className={`relative flex items-start gap-8 sm:gap-0 ${
                                        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                                    }`}
                                >
                                    {/* Content card */}
                                    <div
                                        className={`ml-12 sm:ml-0 w-full sm:w-[calc(50%-2rem)] ${
                                            isLeft
                                                ? "sm:pr-8 sm:text-right"
                                                : "sm:pl-8 sm:text-left"
                                        }`}
                                    >
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="relative p-6 rounded-2xl bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-sm hover:border-cyan-500/40 transition-colors duration-300"
                                        >
                                            {item.current && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400">
                                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                                    {t("currentLabel")}
                                                </span>
                                            )}

                                            <h3 className="text-xl font-bold text-white mb-1">
                                                {item.role}
                                            </h3>

                                            <div
                                                className={`flex flex-wrap gap-3 mb-3 ${
                                                    isLeft ? "sm:justify-end" : "sm:justify-start"
                                                } justify-start`}
                                            >
                                                <span className="flex items-center gap-1 text-sm text-purple-400 font-medium">
                                                    <Briefcase size={13} />
                                                    {item.company}
                                                </span>
                                                <span className="flex items-center gap-1 text-sm text-neutral-400">
                                                    <Calendar size={13} />
                                                    {item.period}
                                                </span>
                                                <span className="flex items-center gap-1 text-sm text-neutral-400">
                                                    <MapPin size={13} />
                                                    {item.location}
                                                </span>
                                            </div>

                                            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                                                {item.description}
                                            </p>

                                            {/* Tech stack badges */}
                                            <div
                                                className={`flex flex-wrap gap-2 ${
                                                    isLeft ? "sm:justify-end" : "sm:justify-start"
                                                } justify-start`}
                                            >
                                                {item.techs.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2.5 py-1 text-xs rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Center dot */}
                                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: index * 0.1 + 0.2,
                                                type: "spring",
                                            }}
                                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                                                item.current
                                                    ? "bg-cyan-500/20 border-cyan-500"
                                                    : "bg-neutral-900 border-neutral-600"
                                            }`}
                                        >
                                            <CheckCircle
                                                size={14}
                                                className={
                                                    item.current
                                                        ? "text-cyan-400"
                                                        : "text-neutral-500"
                                                }
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
