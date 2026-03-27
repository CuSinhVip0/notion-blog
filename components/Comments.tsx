"use client"

import Script from "next/script"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Clock } from "lucide-react"
import { ReactCusdis } from "react-cusdis"
declare global {
    interface Window {
        CUSDIS?: {
            initial: () => void
            setTheme: (theme: string) => void
        }
    }
}

interface CommentsProps {
    pageId: string
    pageTitle: string
    pageUrl: string
    lang?: string
}

export default function Comments({ pageId, pageTitle, pageUrl }: CommentsProps) {
    const { resolvedTheme } = useTheme()
    const t = useTranslations("comments")

    const appId = process.env.NEXT_PUBLIC_CUSDIS_APP_ID

    useEffect(() => {
        if (typeof window !== "undefined" && window.CUSDIS) {
            window.CUSDIS.setTheme(resolvedTheme === "dark" ? "dark" : "light")
        }
    }, [resolvedTheme])

    if (!appId) return null

    return (
        <section className="pt-10 border-t border-border/60">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-6">
                <h2 className="text-xl font-semibold tracking-tight">{t("title")}</h2>
            </div>

            {/* Moderation notice */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-8 dark:border-amber-800/60 dark:bg-amber-950/30">
                <Clock className="mt-0.5 w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                    {t("moderationNotice")}
                </p>
            </div>

            {/* Cusdis widget */}
            <div className="rounded-xl border border-border/60 bg-card/50 p-6 shadow-sm">
                <Script
                    id="cusdis-lang"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.CUSDIS_LOCALE = {
                            powered_by: "${t("powered_by")}",
                            post_comment: "${t("post_comment")}",
                            loading: "${t("loading")}",
                            email: "${t("email")}",
                            nickname: "${t("nickname")}",
                            reply_placeholder: "${t("reply_placeholder")}",
                            reply_btn: "${t("reply_btn")}",
                            sending: "${t("sending")}",
                            mod_badge: "${t("mod_badge")}",
                            content_is_required: "${t("content_is_required")}",
                            nickname_is_required: "${t("nickname_is_required")}",
                            comment_has_been_sent: "${t("comment_has_been_sent")}",
                        }`,
                    }}
                />
                <ReactCusdis
                    attrs={{
                        host: "https://cusdis.com",
                        appId,
                        pageId,
                        pageTitle,
                        pageUrl,
                        theme: (resolvedTheme ?? "dark") === "dark" ? "dark" : "light",
                    }}
                />
            </div>
        </section>
    )
}
