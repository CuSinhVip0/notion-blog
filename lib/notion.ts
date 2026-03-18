import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BlogPost, BlogPostDetail } from "./types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function extractPlainText(richTexts: Array<{ plain_text: string }>): string {
  return richTexts.map((t) => t.plain_text).join("");
}

function mapPageToBlogPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  const titleProp = props["Title"];
  const slugProp = props["Slug"];
  const descProp = props["Description"];
  const tagsProp = props["Tags"];
  const statusProp = props["Status"];
  const publishedAtProp = props["PublishedAt"];
  const authorProp = props["Author"];

  const title =
    titleProp?.type === "title" ? extractPlainText(titleProp.title) : "";

  const slugRaw =
    slugProp?.type === "rich_text" ? extractPlainText(slugProp.rich_text) : "";
  const slug =
    slugRaw ||
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const description =
    descProp?.type === "rich_text" ? extractPlainText(descProp.rich_text) : "";

  const tags: string[] =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  const coverImage =
    page.cover?.type === "external"
      ? page.cover.external.url
      : page.cover?.type === "file"
        ? page.cover.file.url
        : null;

  const publishedAt =
    publishedAtProp?.type === "date"
      ? (publishedAtProp.date?.start ?? page.created_time)
      : page.created_time;

  const updatedAt = page.last_edited_time ?? publishedAt;

  const author =
    authorProp?.type === "rich_text"
      ? extractPlainText(authorProp.rich_text)
      : "Author";

  const status =
    statusProp?.type === "select"
      ? (statusProp.select?.name ?? "Published")
      : "Published";

  return {
    id: page.id,
    title,
    slug,
    description,
    coverImage,
    tags,
    publishedAt,
    updatedAt,
    status: status as "Published" | "Draft",
    author,
    readingTime: 5,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const response = await notion.dataSources.query({
    data_source_id: DATABASE_ID,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "PublishedAt", direction: "descending" }],
  });

  return response.results
    .filter(
      (p): p is PageObjectResponse =>
        p.object === "page" && "properties" in p
    )
    .map(mapPageToBlogPost);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostDetail | null> {
  const response = await notion.dataSources.query({
    data_source_id: DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: { equals: slug },
    },
  });

  const pages = response.results.filter(
    (p): p is PageObjectResponse => p.object === "page" && "properties" in p
  );

  if (pages.length === 0) return null;

  const page = pages[0];
  const post = mapPageToBlogPost(page);

  // Notion v5 native markdown retrieval
  const markdownResponse = await notion.pages.retrieveMarkdown({
    page_id: page.id,
  });
  const content = markdownResponse.markdown ?? "";

  return {
    ...post,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
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
  });

  return response.results
    .filter(
      (p): p is PageObjectResponse =>
        p.object === "page" && "properties" in p
    )
    .map(mapPageToBlogPost);
}
