"use client"
// import AboutContent from "@/components/AboutContent"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Instagram, MapPin } from "lucide-react"
import DisplayName from "@/components/about/DisplayName"
import CurrentRole from "@/components/about/CurrentRole"
import { Skills } from "@/components/about/Skill"

export default function AboutPage() {
    // return <AboutContent />

    return (
        <>
            <section
                id="hero"
                className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
            >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-950 to-cyan-900/20">
                    <motion.div
                        className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
                        animate={{
                            x: [-30, 30, -10, 20, -30],
                            y: [-40, 20, 40, -20, -40],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{ top: "20%", left: "10%" }}
                    />
                    <motion.div
                        className="absolute w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
                        animate={{
                            x: [20, -30, 10, -20, 20],
                            y: [30, -20, -40, 20, 30],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{ bottom: "20%", right: "10%" }}
                    />
                </div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full"
                        >
                            <span className="text-cyan-400">✨ Open to Opportunities</span>
                        </motion.div>

                        <DisplayName />

                        <CurrentRole />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="flex items-center justify-center gap-2 mb-8"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <MapPin className="text-cyan-400" size={20} />
                            </motion.div>
                            <span className="text-neutral-300 text-lg">
                                <span className="text-cyan-400">Based in</span> Bangalore, India
                            </span>
                        </motion.div>

                        <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
                            Passionate about building intelligent systems that solve real-world
                            problems. Currently exploring deep learning.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
                            >
                                Get In Touch
                            </motion.a>
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border border-neutral-700 rounded-lg font-semibold hover:border-cyan-500 transition-colors"
                            >
                                View Projects
                            </motion.a>
                        </div>

                        <div className="flex justify-center gap-6">
                            <motion.a
                                href="https://github.com/saicharan197"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: "#06b6d4" }}
                                className="text-neutral-400"
                            >
                                <Github size={28} />
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com/in/saicharan-ai-ml"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: "#06b6d4" }}
                                className="text-neutral-400"
                            >
                                <Linkedin size={28} />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com/sai_charan_t_n"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: "#06b6d4" }}
                                className="text-neutral-400"
                            >
                                <Instagram size={28} />
                            </motion.a>
                            <motion.a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=saicharan10161@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: "#06b6d4" }}
                                className="text-neutral-400"
                            >
                                <Mail size={28} />
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <ChevronDown className="text-neutral-600" size={32} />
                    </motion.div>
                </div>
            </section>
            <Skills />
        </>
    )
}
