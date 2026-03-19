"use client"

import "react-notion-x/src/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import "katex/dist/katex.min.css"
import "@/styles/notion.css"

import dynamic from "next/dynamic"
import Link from "next/link"
import { type ExtendedRecordMap } from "notion-types"

const Code = dynamic(() =>
    import("react-notion-x/build/third-party/code").then(async (m) => {
        // add / remove any prism syntaxes here
        await Promise.allSettled([
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-markup-templating.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-markup.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-bash.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-c.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-cpp.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-csharp.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-docker.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-java.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-js-templates.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-coffeescript.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-diff.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-git.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-go.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-graphql.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-handlebars.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-less.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-makefile.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-markdown.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-objectivec.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-ocaml.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-python.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-reason.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-rust.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-sass.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-scss.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-solidity.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-sql.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-stylus.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-swift.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-wasm.js"),
            // @ts-expect-error Ignore prisma types
            import("prismjs/components/prism-yaml.js"),
        ])
        return m.Code
    }),
)

const Equation = dynamic(
    () => import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
    { ssr: false },
)

const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), {
    ssr: false,
})

const NotionRenderer = dynamic(() => import("react-notion-x").then((m) => m.NotionRenderer), {
    ssr: false,
})

interface BlogContentProps {
    recordMap: ExtendedRecordMap
}

export default function BlogContent({ recordMap }: BlogContentProps) {
    return (
        <div className="notion-content-wrapper">
            <NotionRenderer
                recordMap={recordMap}
                fullPage={false}
                darkMode={false}
                previewImages={!!recordMap.preview_images}
                disableHeader={true}
                components={{
                    nextLink: Link,
                    Code,
                    Equation,
                    Modal,
                }}
            />
        </div>
    )
}
