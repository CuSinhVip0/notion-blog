export default function BlogPostLoading() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12 animate-pulse">
            {/* Back button skeleton */}
            <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-700 rounded mb-8" />

            {/* Tags skeleton */}
            <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
            </div>

            {/* Title skeleton */}
            <div className="space-y-3 mb-4">
                <div className="h-9 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-9 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>

            {/* Meta (author, date, read time) skeleton */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>

            {/* Cover image skeleton */}
            <div className="w-full h-64 sm:h-80 bg-zinc-200 dark:bg-zinc-700 rounded-xl mb-10" />

            {/* Content skeleton */}
            <div className="space-y-4">
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded" />

                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded mt-6" />
                <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-4/6 bg-zinc-200 dark:bg-zinc-700 rounded" />

                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded mt-6" />
                <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>
        </div>
    )
}
