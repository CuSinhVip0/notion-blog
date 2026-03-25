"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare, Tag } from "lucide-react"
import { useTranslations } from "next-intl"

type FormStatus = "idle" | "sending" | "sent" | "error"

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
})

export default function ContactForm() {
    const t = useTranslations("about.contact")
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [status, setStatus] = useState<FormStatus>("idle")
    const [errors, setErrors] = useState<Partial<FormData>>({})

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {}
        if (!formData.name.trim()) newErrors.name = t("errorRequired")
        if (!formData.email.trim()) {
            newErrors.email = t("errorRequired")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t("errorEmail")
        }
        if (!formData.subject.trim()) newErrors.subject = t("errorRequired")
        if (!formData.message.trim()) newErrors.message = t("errorRequired")
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        setStatus("sending")
        try {
            // Send via mailto as a fallback — replace with your preferred email API
            const mailtoHref = `mailto:sinhnguyen2k2@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
            )}`
            window.location.href = mailtoHref
            await new Promise((r) => setTimeout(r, 800))
            setStatus("sent")
            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch {
            setStatus("error")
        }
    }

    const inputBase =
        "w-full bg-neutral-900/80 border rounded-xl px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/50"
    const inputNormal = `${inputBase} border-neutral-700/60 focus:border-cyan-500/60`
    const inputError = `${inputBase} border-red-500/60 focus:border-red-500/80 focus:ring-red-500/30`

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div {...fadeInUp()} className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-cyan-400">
                        {t("badge")}
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                        {t("title")}
                    </h2>
                    <p className="text-neutral-400 max-w-lg mx-auto">{t("subtitle")}</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-4" />
                </motion.div>

                <motion.div
                    {...fadeInUp(0.15)}
                    className="relative p-8 rounded-2xl bg-neutral-900/60 border border-neutral-700/60 backdrop-blur-sm"
                >
                    {/* Decorative corner gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-2xl pointer-events-none" />

                    <AnimatePresence mode="wait">
                        {status === "sent" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                    <CheckCircle className="text-cyan-400" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    {t("successTitle")}
                                </h3>
                                <p className="text-neutral-400">{t("successSubtitle")}</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatus("idle")}
                                    className="mt-2 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded-xl text-neutral-300 text-sm transition-colors"
                                >
                                    {t("sendAnother")}
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="relative z-10 space-y-5"
                            >
                                {/* Name + Email row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm text-neutral-300 mb-2 font-medium">
                                            <User size={14} className="text-cyan-400" />
                                            {t("labelName")}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t("placeholderName")}
                                            className={errors.name ? inputError : inputNormal}
                                        />
                                        {errors.name && (
                                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                                <AlertCircle size={11} /> {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm text-neutral-300 mb-2 font-medium">
                                            <Mail size={14} className="text-cyan-400" />
                                            {t("labelEmail")}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t("placeholderEmail")}
                                            className={errors.email ? inputError : inputNormal}
                                        />
                                        {errors.email && (
                                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                                <AlertCircle size={11} /> {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-neutral-300 mb-2 font-medium">
                                        <Tag size={14} className="text-cyan-400" />
                                        {t("labelSubject")}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder={t("placeholderSubject")}
                                        className={errors.subject ? inputError : inputNormal}
                                    />
                                    {errors.subject && (
                                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                            <AlertCircle size={11} /> {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-neutral-300 mb-2 font-medium">
                                        <MessageSquare size={14} className="text-cyan-400" />
                                        {t("labelMessage")}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder={t("placeholderMessage")}
                                        className={`resize-none ${errors.message ? inputError : inputNormal}`}
                                    />
                                    {errors.message && (
                                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                            <AlertCircle size={11} /> {errors.message}
                                        </p>
                                    )}
                                </div>

                                {status === "error" && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                        <AlertCircle size={16} />
                                        {t("errorSend")}
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === "sending"}
                                    whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                                    whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === "sending" ? (
                                        <>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            {t("sending")}
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            {t("submit")}
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
