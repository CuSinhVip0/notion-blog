import ky from "ky"
import lqip from "lqip-modern"
import { type ExtendedRecordMap, type PreviewImage, type PreviewImageMap } from "notion-types"
import { defaultMapImageUrl, getPageImageUrls, normalizeUrl } from "notion-utils"
import pMap from "p-map"
import pMemoize from "p-memoize"

export async function getPreviewImageMap(recordMap: ExtendedRecordMap): Promise<PreviewImageMap> {
    const urls: string[] = getPageImageUrls(recordMap, {
        mapImageUrl: defaultMapImageUrl,
    })
        .concat([null, null].filter(Boolean))
        .filter(Boolean)

    const previewImagesMap = Object.fromEntries(
        await pMap(
            urls,
            async (url) => {
                const cacheKey = normalizeUrl(url)
                return [cacheKey, await getPreviewImage(url, { cacheKey })]
            },
            {
                concurrency: 8,
            },
        ),
    )

    return previewImagesMap
}

async function createPreviewImage(url: string): Promise<PreviewImage | null> {
    try {
        const body = await ky(url).arrayBuffer()
        const result = await lqip(body)

        const previewImage = {
            originalWidth: result.metadata.originalWidth,
            originalHeight: result.metadata.originalHeight,
            dataURIBase64: result.metadata.dataURIBase64,
        }

        return previewImage
    } catch {
        return null
    }
}

export const getPreviewImage = pMemoize(createPreviewImage)
