import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { NotionAPI } from "notion-client"
import { BlogPost, BlogPostDetail } from "./types"
import { ExtendedRecordMap } from "notion-types"
import { getPreviewImageMap } from "./preview-images"

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

const notionApi = new NotionAPI({
    authToken: process.env.NOTION_TOKEN_V2,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID!

function normalizeNotionMarkdown(md: string): string {
    return (
        md
            // Normalize line endings
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            // Notion sometimes over-escapes asterisks inside table cells (\*\* → **)
            .replace(/\\\*/g, "*")
            // Notion sometimes over-escapes underscores (\_text\_ → _text_)
            .replace(/\\_/g, "_")
            // Ensure blank line before ATX headings so they're not merged into prev paragraph
            .replace(/([^\n])\n(#{1,6} )/g, "$1\n\n$2")
            // Ensure blank line before table rows
            .replace(/([^\n])\n(\|)/g, "$1\n\n$2")
    )
}

function estimateReadingTime(text: string): number {
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function getRecordMapText(recordMap: ExtendedRecordMap): string {
    return Object.values(recordMap.block)
        .flatMap((b) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const block = b as any
            const title = block?.value?.properties?.title as [string, ...unknown[]][] | undefined
            return title ? title.map(([t]) => String(t)) : []
        })
        .join(" ")
}

function extractPlainText(richTexts: Array<{ plain_text: string }>): string {
    return richTexts.map((t) => t.plain_text).join("")
}

function mapPageToBlogPost(page: PageObjectResponse): BlogPost {
    const props = page.properties

    const titleProp = props["Title"]
    const slugProp = props["Slug"]
    const descProp = props["Description"]
    const tagsProp = props["Tags"]
    const statusProp = props["Status"]
    const publishedAtProp = props["PublishedAt"]
    const authorProp = props["Author"]
    const urlProp = props["URL"]

    const title = titleProp?.type === "title" ? extractPlainText(titleProp.title) : ""
    const url = urlProp?.type === "url" ? (urlProp.url ?? null) : null
    const slugRaw = slugProp?.type === "rich_text" ? extractPlainText(slugProp.rich_text) : ""
    const slug =
        slugRaw ||
        title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")

    const description = descProp?.type === "rich_text" ? extractPlainText(descProp.rich_text) : ""

    const tags: string[] =
        tagsProp?.type === "multi_select" ? tagsProp.multi_select.map((t) => t.name) : []

    const publishedAt =
        publishedAtProp?.type === "date"
            ? (publishedAtProp.date?.start ?? page.created_time)
            : page.created_time

    const updatedAt = page.last_edited_time ?? publishedAt

    const author =
        authorProp?.type === "rich_text" ? extractPlainText(authorProp.rich_text) : "Author"

    const status =
        statusProp?.type === "select" ? (statusProp.select?.name ?? "Published") : "Published"

    return {
        id: page.id,
        title,
        slug,
        description,
        tags,
        publishedAt,
        updatedAt,
        status: status as "Published" | "Draft",
        author,
        readingTime: 5,
        url: url,
    }
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const response = await notion.dataSources.query({
        data_source_id: DATABASE_ID,
        filter: {
            property: "Status",
            select: { equals: "Published" },
        },
        sorts: [{ property: "PublishedAt", direction: "descending" }],
    })

    const posts = response.results
        .filter((p): p is PageObjectResponse => p.object === "page" && "properties" in p)
        .map(mapPageToBlogPost)

    return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
    const response = await notion.dataSources.query({
        data_source_id: DATABASE_ID,
        filter: {
            property: "Slug",
            rich_text: { equals: slug },
        },
    })

    const pages = response.results.filter(
        (p): p is PageObjectResponse => p.object === "page" && "properties" in p,
    )

    if (pages.length === 0) return null

    const page = pages[0]
    const post = mapPageToBlogPost(page)

    let recordMap: object | undefined
    try {
        const rawId = page.id.replace(/-/g, "")
        recordMap = await getPage(rawId)
    } catch {
        // Fallback gracefully – page will use markdown renderer
        recordMap = undefined
    }

    const readingTime = recordMap
        ? estimateReadingTime(getRecordMapText(recordMap as ExtendedRecordMap))
        : 5

    return {
        ...post,
        readingTime,
        recordMap,
    }
}

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
    const recordMap = await notionApi.getPage(pageId)

    const previewImageMap = await getPreviewImageMap(recordMap)
    ;(recordMap as any).preview_images = previewImageMap

    return recordMap
}

export async function getAllSlugs(): Promise<string[]> {
    const posts = await getAllPosts()
    return posts.map((p) => p.slug)
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    const response = await notion.dataSources.query({
        data_source_id: DATABASE_ID,
        filter: {
            and: [
                { property: "Status", select: { equals: "Published" } },
                { property: "Tags", multi_select: { contains: tag } },
            ],
        },
        sorts: [{ property: "PublishedAt", direction: "descending" }],
    })

    return response.results
        .filter((p): p is PageObjectResponse => p.object === "page" && "properties" in p)
        .map(mapPageToBlogPost)
}
