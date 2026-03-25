"use client"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "@/hooks/useInView"

export function Skills() {
    const ref = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    const skillCategories = [
        {
            category: "Machine Learning",
            skills: [
                { name: "PyTorch", level: 90 },
                { name: "TensorFlow", level: 85 },
                { name: "Scikit-learn", level: 88 },
                { name: "Keras", level: 82 },
            ],
        },
        {
            category: "Deep Learning",
            skills: [
                { name: "Computer Vision", level: 87 },
                { name: "NLP", level: 85 },
                { name: "Transformers", level: 83 },
                { name: "GANs", level: 75 },
            ],
        },
        {
            category: "Programming",
            skills: [
                { name: "Python", level: 95 },
                { name: "JavaScript", level: 80 },
                { name: "C++", level: 75 },
                { name: "SQL", level: 85 },
            ],
        },
        {
            category: "Tools & Frameworks",
            skills: [
                { name: "Docker", level: 80 },
                { name: "Git", level: 90 },
                { name: "AWS", level: 75 },
                { name: "MLflow", level: 78 },
            ],
        },
    ]

    return (
        <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        Skills & Technologies
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mb-12" />

                    <div className="grid md:grid-cols-2 gap-8">
                        {skillCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                className="bg-neutral-800/30 border border-neutral-700 rounded-lg p-6"
                            >
                                <h3 className="text-2xl mb-6 text-cyan-400">{category.category}</h3>
                                <div className="space-y-5">
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillBar
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
                                            delay={categoryIndex * 0.1 + skillIndex * 0.05}
                                            isInView={isInView}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-8"
                    >
                        <h3 className="text-2xl mb-4 text-center">Additional Expertise</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                "LangChain",
                                "HuggingFace",
                                "OpenCV",
                                "Pandas",
                                "NumPy",
                                "Matplotlib",
                                "FastAPI",
                                "Streamlit",
                                "Jupyter",
                                "CUDA",
                                "Ray",
                                "Weights & Biases",
                            ].map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.3, delay: 0.6 + index * 0.03 }}
                                    className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-sm hover:border-cyan-500 hover:text-cyan-400 transition-all cursor-default"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

function SkillBar({
    name,
    level,
    delay,
    isInView,
}: {
    name: string
    level: number
    delay: number
    isInView: boolean
}) {
    const [displayLevel, setDisplayLevel] = useState(0)

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                let current = 0
                const increment = level / 50
                const interval = setInterval(() => {
                    current += increment
                    if (current >= level) {
                        setDisplayLevel(level)
                        clearInterval(interval)
                    } else {
                        setDisplayLevel(Math.floor(current))
                    }
                }, 20)
                return () => clearInterval(interval)
            }, delay * 1000)
            return () => clearTimeout(timer)
        }
    }, [isInView, level, delay])

    return (
        <div>
            <div className="flex justify-between mb-2">
                <span className="text-neutral-300">{name}</span>
                <span className="text-cyan-400">{displayLevel}%</span>
            </div>
            <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                />
            </div>
        </div>
    )
}
