"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface DisplayNameProps {
    hiIm?: string
}

const nameTexts = ["Nguyen Van Sinh", "Shin Code", "Cu Sinh DZai Top 1"]

export default function DisplayName({ hiIm = "Hi, I'm" }: DisplayNameProps) {
    const [displayedName, setDisplayedName] = useState("")
    const [charIndex, setCharIndex] = useState(0)
    const [textIndex, setTextIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    useEffect(() => {
        const currentText = nameTexts[textIndex]
        let timeout: ReturnType<typeof setTimeout>

        if (!isDeleting && charIndex < currentText.length) {
            timeout = setTimeout(() => {
                setDisplayedName(currentText.slice(0, charIndex + 1))
                setCharIndex(charIndex + 1)
            }, 100)
        } else if (!isDeleting && charIndex === currentText.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1500)
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setDisplayedName(currentText.slice(0, charIndex - 1))
                setCharIndex(charIndex - 1)
            }, 50)
        } else if (isDeleting && charIndex === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDeleting(false)
            setTextIndex((textIndex + 1) % nameTexts.length)
        }

        return () => clearTimeout(timeout)
    }, [charIndex, isDeleting, textIndex])

    return (
        <h1 className="mb-6">
            <motion.div
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 text-warp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-gray-800 dark:text-gray-200"
                >
                    {hiIm}
                </motion.span>
                <span className="relative block">
                    <motion.span
                        className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                        initial={{ backgroundSize: "0% 100%" }}
                        animate={{ backgroundSize: "100% 100%" }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        {displayedName}
                        <motion.span
                            className="inline-block w-1 h-[0.8em] bg-cyan-400 ml-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                    </motion.span>
                    <motion.span
                        className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: [0.5, 0.8, 0.5],
                            scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    />
                </span>
            </motion.div>
        </h1>
    )
}
