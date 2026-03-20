import "katex/dist/katex.min.css" // `rehype-katex` does not import the CSS for you
import "github-markdown-css"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
interface BlogContentProps {
    recordMap: string
}

export default function BlogContent({ recordMap }: BlogContentProps) {
    return (
        <div className="markdown-body">
            <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                {recordMap}
            </Markdown>
        </div>
    )
}
