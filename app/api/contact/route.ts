import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

// --- Rate limiter: max 3 requests per IP per 10 minutes ---
const RATE_LIMIT = 3
const WINDOW_MS = 10 * 60 * 1000
const ipStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const entry = ipStore.get(ip)
    if (!entry || now > entry.resetAt) {
        ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
        return true
    }
    if (entry.count >= RATE_LIMIT) return false
    entry.count++
    return true
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
    // Rate limit check
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        request.headers.get("x-real-ip") ??
        "unknown"
    if (!checkRateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const body = await request.json()
    const { name, email, subject, message, honeypot } = body

    // Honeypot check — bots fill this hidden field, humans don't
    if (honeypot) {
        return NextResponse.json({ success: true }) // silently discard
    }

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL ?? "sinhnguyen2k2@gmail.com",
        replyTo: email,
        subject: `[Contact] ${escapeHtml(subject)}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0891b2;">Tin nhắn mới đến từ portfolio của bạn</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; width: 80px;"><strong>Name</strong></td>
                        <td style="padding: 8px 0;">${escapeHtml(name)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td>
                        <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280;"><strong>Subject</strong></td>
                        <td style="padding: 8px 0;">${escapeHtml(subject)}</td>
                    </tr>
                </table>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                <p style="white-space: pre-wrap; color: #374151;">${escapeHtml(message)}</p>
            </div>
        `,
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
