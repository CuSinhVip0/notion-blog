import { supabase, THUMBNAIL_BUCKET } from "./supabase"

function getExtFromMime(mime: string): string {
    const map: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/gif": "gif",
        "image/avif": "avif",
    }
    return map[mime.split(";")[0].trim()] ?? "jpg"
}

export async function getCachedThumbnailUrl(
    postId: string,
    sourceUrl: string | null,
): Promise<string | null> {
    if (!sourceUrl) return null

    const filePrefix = postId.replace(/-/g, "")

    const { data: existingFiles } = await supabase.storage
        .from(THUMBNAIL_BUCKET)
        .list("", { search: filePrefix })

    if (existingFiles && existingFiles.length > 0) {
        const { data } = supabase.storage.from(THUMBNAIL_BUCKET).getPublicUrl(existingFiles[0].name)
        return data.publicUrl
    }

    let res: Response
    try {
        res = await fetch(sourceUrl)
        if (!res.ok) return sourceUrl
    } catch {
        return sourceUrl
    }

    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get("content-type") ?? "image/jpeg"
    const ext = getExtFromMime(contentType)
    const filename = `${filePrefix}.${ext}`

    const { error } = await supabase.storage
        .from(THUMBNAIL_BUCKET)
        .upload(filename, buffer, { contentType, upsert: true })

    if (error) return sourceUrl

    const { data } = supabase.storage.from(THUMBNAIL_BUCKET).getPublicUrl(filename)
    return data.publicUrl
}
