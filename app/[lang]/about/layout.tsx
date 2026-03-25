import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about the author behind NotionBlog.",
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <div className="bg-background text-foreground min-h-screen">{children}</div>
}
