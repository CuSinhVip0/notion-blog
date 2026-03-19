import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

export default function NotFound() {
    const t = useTranslations()

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-center">
            <div>
                <div className="flex justify-center select-none mb-2">
                    <Image src="/404.png" alt="404" width={400} height={400} />
                </div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                    {t("notFound.title")}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">{t("notFound.description")}</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t("notFound.backHome")}
                </Link>
            </div>
        </div>
    )
}
