import { format, parseISO } from "date-fns"
import { vi } from "date-fns/locale"

export function formatDate(dateStr: string, fmt = "dd MMM, yyyy"): string {
    try {
        return format(parseISO(dateStr), fmt, { locale: vi })
    } catch {
        return dateStr
    }
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
}

export const TAG_COLORS: Record<string, string> = {
    default: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    red: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    yellow: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    purple: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
}
