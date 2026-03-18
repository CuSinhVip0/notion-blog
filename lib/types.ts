export interface BlogPost {
    id: string
    title: string
    slug: string
    description: string
    coverImage: string | null
    tags: string[]
    publishedAt: string
    updatedAt: string
    status: "Published" | "Draft"
    author: string
    readingTime: number
}

export interface BlogPostDetail extends BlogPost {
    content: string
}

export interface Tag {
    name: string
    color: string
}
