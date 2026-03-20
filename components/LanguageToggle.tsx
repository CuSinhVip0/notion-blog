"use client"
import { useLocale } from "next-intl"
import { useParams } from "next/navigation"
import { useTransition } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"

export default function LanguageToggle() {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()
    const [isPending, startTransition] = useTransition()
    const params = useParams()
    function toggle() {
        const nextLocale = locale === "en" ? "vi" : "en"
        window.scrollTo({ top: 0, behavior: "instant" })
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale },
            )
        })
    }

    return (
        <button
            onClick={toggle}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-700"
            aria-label="Switch language"
            title={locale === "en" ? "Switch to Vietnamese" : "Chuyển sang Tiếng Anh"}
        >
            {locale === "en" ? "Tiếng Việt" : "English"}
        </button>
    )
}
