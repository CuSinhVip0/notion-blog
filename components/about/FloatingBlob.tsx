import { useAnimation } from "framer-motion"
import { useEffect } from "react"
import { motion } from "framer-motion"

export default function FloatingBlob({
    className,
    initialTop,
    initialLeft,
}: {
    className: string
    initialTop: string
    initialLeft: string
}) {
    const controls = useAnimation()

    useEffect(() => {
        const randomAnimate = async () => {
            while (true) {
                await controls.start({
                    left: `${Math.random() * 75}%`,
                    top: `${Math.random() * 75}%`,
                    transition: {
                        duration: 8 + Math.random() * 7,
                        ease: "easeInOut",
                    },
                    speed: 0.1,
                })
            }
        }
        randomAnimate()
    }, [controls])

    return (
        <motion.div
            className={`absolute ${className}`}
            initial={{ top: initialTop, left: initialLeft }}
            animate={controls}
        />
    )
}
