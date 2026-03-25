import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { setRequestLocale } from "next-intl/server"
import "@/styles/globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Providers from "./providers"
import { routing } from "@/i18n/routing"

const inter = Inter({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    variable: "--font-inter",
})

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
        default: "ShinCode – Ý tưởng, Suy nghĩ & Câu chuyện",
        template: "%s | ShinCode",
    },
    description: "Blog cá nhân khám phá công nghệ, thiết kế và những điều khơi dậy sự tò mò.",
    openGraph: {
        type: "website",
        locale: "vi_VN",
        siteName: "ShinCode",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        site: "@shincode",
    },
}

export function generateStaticParams() {
    return routing.locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    setRequestLocale(lang)
    setRequestLocale(lang)

    return (
        <html lang={lang} className={inter.variable} suppressHydrationWarning>
            <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
                <Providers>
                    <Header />
                    <main className="flex-1 pt-16">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
