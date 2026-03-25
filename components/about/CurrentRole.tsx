"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
export default function CurrentRole() {
    const roles = [
        "Front-End Developer",
        "Back-End Developer",
        "Data Scientist",
        "Blogger",
        "Problem Solver",
    ]
    const [currentRole, setCurrentRole] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])
    return (
        <motion.div
            key={currentRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl sm:text-3xl md:text-4xl text-neutral-400 mb-4 h-12"
        >
            {roles[currentRole]}
        </motion.div>
    )
}
