import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-center px-4">
            <div>
                <p className="text-8xl font-black text-indigo-100 dark:text-indigo-900 select-none mb-2">
                    404
                </p>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                    Page not found
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
