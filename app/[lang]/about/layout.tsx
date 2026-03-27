import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Về tôi",
    description: "Tìm hiểu thêm về tác giả ShinCode.",
    openGraph: {
        type: "website",
        locale: "vi_VN",
        siteName: "ShinCode",
        images: [{ url: "/me.jpg", width: 1200, height: 630 }],
    },
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <div className="bg-background text-foreground min-h-screen">{children}</div>
}
