import { useEffect, useState, RefObject } from "react"

export function useInView(
    ref: RefObject<HTMLDivElement | null>,
    options?: { once?: boolean; amount?: number },
): boolean {
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = ref?.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    if (options?.once) {
                        observer.unobserve(element)
                    }
                } else if (!options?.once) {
                    setIsInView(false)
                }
            },
            {
                threshold: options?.amount ?? 0,
            },
        )

        observer.observe(element)

        return () => {
            observer.unobserve(element)
        }
    }, [ref, options?.once, options?.amount])

    return isInView
}
