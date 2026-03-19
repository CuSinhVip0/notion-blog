export interface BlogPost {
    id: string
    title: string
    slug: string
    description: string
    coverImage: string | null
    thumbnail: string | null
    tags: string[]
    publishedAt: string
    updatedAt: string
    status: "Published" | "Draft"
    author: string
    readingTime: number
}

export interface BlogPostDetail extends BlogPost {
    content: string
    // react-notion-x record map (fetched via unofficial notion-client)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recordMap?: any
}

export interface Tag {
    name: string
    color: string
}
