"use client"

import { useEffect } from "react"
import { usePendingPostStore } from "@/lib/store"

export default function PendingTitle() {
    const { pendingPostTitle, setPendingPostTitle } = usePendingPostStore()

    useEffect(() => {
        if (pendingPostTitle) {
            document.title = pendingPostTitle
        }
        return () => {
            setPendingPostTitle(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null
}
