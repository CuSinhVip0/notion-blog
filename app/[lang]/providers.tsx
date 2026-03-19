import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NextIntlClientProvider } from "next-intl"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </NextThemesProvider>
    )
}
