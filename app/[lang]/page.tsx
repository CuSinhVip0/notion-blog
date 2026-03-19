import { getAllPosts } from "@/lib/notion"
import { BlogPost } from "@/lib/types"
import HomePageContent from "@/components/HomePageContent"

export const revalidate = 60

export default async function HomePage() {
    let posts: BlogPost[] = []
    let error: string | null = null

    try {
        posts = await getAllPosts()
    } catch {
        error = "failed"
    }

    const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))

    return <HomePageContent posts={posts} error={error} allTags={allTags} />
}
