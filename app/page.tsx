import { getAllPosts } from "@/lib/notion";
import { BlogPost } from "@/lib/types";
import BlogList from "@/components/BlogList";
import SearchBar from "@/components/SearchBar";
import TagFilter from "@/components/TagFilter";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "NotionBlog – Ideas, Thoughts & Stories",
  description:
    "A personal blog powered by Notion. Explore articles on technology, design, and everything in between.",
};

export default async function HomePage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;

  try {
    posts = await getAllPosts();
  } catch {
    error =
      "Could not load posts. Please check your Notion API configuration in .env.local";
  }

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Powered by Notion
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-4 tracking-tight">
          Ideas, Thoughts &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
            Stories
          </span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          A personal blog exploring technology, design, and the things that
          spark curiosity.
        </p>
      </section>

      {/* Error notice */}
      {error && (
        <div className="mb-8 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Featured post */}
      {featuredPost && !error && (
        <section className="mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
            Featured
          </h2>
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-300 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {featuredPost.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-3">
                {featuredPost.title}
              </h3>
              {featuredPost.description && (
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                  {featuredPost.description}
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2.5 transition-all duration-200">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Blog section */}
      {!error && posts.length > 0 && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              All Articles ({posts.length})
            </h2>
            <div className="w-full sm:w-64">
              <SearchBar />
            </div>
          </div>

          <div className="mb-6">
            <TagFilter tags={allTags} />
          </div>

          <BlogList posts={restPosts.length > 0 ? posts : posts} />
        </section>
      )}

      {!error && posts.length === 0 && (
        <div className="text-center py-24 text-zinc-400">
          <p className="text-5xl mb-4">✍️</p>
          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300">
            No posts published yet
          </p>
          <p className="text-sm mt-2">
            Add published posts in your Notion database to see them here.
          </p>
        </div>
      )}
    </div>
  );
}
