export interface BlogPost {
    id: string
    title: string
    slug: string
    description: string
    tags: string[]
    publishedAt: string
    updatedAt: string
    status: "Published" | "Draft"
    author: string
    readingTime: number
    url: string | null
}

export interface BlogPostDetail extends BlogPost {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recordMap?: any
}

export interface Tag {
    name: string
    color: string
}
