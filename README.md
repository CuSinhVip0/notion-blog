# NotionBlog

A clean, fast, SEO-optimised personal blog powered by **Notion** as a headless CMS, built with **Next.js 15** (App Router) and **Tailwind CSS v4**.

## Stack

| Tool                    | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| Next.js 15              | Framework (App Router, SSG + ISR)        |
| Tailwind CSS v4         | Styling                                  |
| @notionhq/client        | Notion API client                        |
| notion-to-md            | Convert Notion blocks → Markdown         |
| Framer Motion           | Page & card animations                   |
| react-markdown + rehype | Markdown rendering + syntax highlighting |
| Zustand                 | Search / filter client state             |
| Lucide React            | Icons                                    |

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Header & Footer
│   ├── page.tsx            # Home page (featured + all posts)
│   ├── blog/
│   │   ├── page.tsx        # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post page
│   ├── about/
│   │   └── page.tsx        # About page
│   └── not-found.tsx       # 404 page
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BlogCard.tsx
│   ├── BlogList.tsx        # Client-side filtered list
│   ├── BlogContent.tsx     # Markdown renderer
│   ├── PostHeader.tsx      # Post hero with animations
│   ├── SearchBar.tsx       # Zustand-powered search
│   └── TagFilter.tsx       # Tag pill filters
└── lib/
    ├── notion.ts           # All Notion API calls
    ├── types.ts            # TypeScript interfaces
    ├── store.ts            # Zustand search/filter store
    └── utils.ts            # formatDate, slugify helpers
```
