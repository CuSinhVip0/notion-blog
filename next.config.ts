import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
    staticPageGenerationTimeout: 300,
    images: {
        remotePatterns: [
            // Notion S3 private files
            {
                protocol: "https",
                hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "s3.us-west-2.amazonaws.com",
            },
            // Any S3 bucket
            { protocol: "https", hostname: "**.amazonaws.com" },
            // Notion CDN
            { protocol: "https", hostname: "www.notion.so" },
            { protocol: "https", hostname: "notion.so" },
            // Notion static files
            { protocol: "https", hostname: "**.notion-static.com" },
            // Stock photos
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "**.pexels.com" },
        ],
        formats: ["image/avif", "image/webp"],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
