import type { Metadata } from "next"
import AboutContent from "@/components/AboutContent"

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about the author behind NotionBlog.",
}

export default function AboutPage() {
    return <AboutContent />
}
