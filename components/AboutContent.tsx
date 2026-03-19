import { useTranslations } from "next-intl"

export default function AboutContent() {
    const t = useTranslations()

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
            {/* Avatar placeholder */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    N
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1 tracking-tight">
                        {t("about.title")}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {t("about.subtitle")}
                    </p>
                </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
                <p>{t("about.bio1")}</p>

                <p>
                    {t("about.bio2").split("Next.js")[0]}
                    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                        Next.js
                    </a>
                    {t("about.bio2").split("Next.js")[1]?.split("Tailwind CSS")[0]}
                    <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">
                        Tailwind CSS
                    </a>
                    {t("about.bio2").split("Tailwind CSS")[1]?.split("Notion")[0]}
                    <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
                        Notion
                    </a>
                    {t("about.bio2").split("Notion")[1]}
                </p>

                <h2>{t("about.techStack")}</h2>
                <ul>
                    <li>
                        <strong>Framework:</strong> Next.js 16 (App Router)
                    </li>
                    <li>
                        <strong>Styling:</strong> Tailwind CSS v4
                    </li>
                    <li>
                        <strong>CMS:</strong> Notion via official API
                    </li>
                    <li>
                        <strong>Animations:</strong> Framer Motion
                    </li>
                    <li>
                        <strong>Deployment:</strong> Vercel
                    </li>
                </ul>

                <h2>{t("about.getInTouch")}</h2>
                <p>
                    {t("about.getInTouchText")}{" "}
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>{" "}
                    {t("about.getInTouchOr")}{" "}
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}
