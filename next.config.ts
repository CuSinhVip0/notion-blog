import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            // Notion S3-hosted images
            { protocol: "https", hostname: "**.amazonaws.com" },
            // Notion CDN
            { protocol: "https", hostname: "www.notion.so" },
            { protocol: "https", hostname: "notion.so" },
            // Notion file hosting (prod.files.stytch.com style)
            { protocol: "https", hostname: "**.notion-static.com" },
            // For external cover images referenced in Notion
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "**.pexels.com" },
        ],
    },
}

export default nextConfig
