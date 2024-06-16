import "@repo/ui/globals.css";
import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import React from "react";
import {CSPostHogProvider} from "../components/providers/analytics";
import {ThemeProvider} from "../components/providers/theme";
import {cn} from "@ui/lib/utils";
import {siteConfig} from "../config/site";
import {SiteHeader} from "../components/nav/site-header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Server Components",
        "Radix UI",
    ],
    authors: [
        {
            name: "shadcn",
            url: "https://shadcn.com",
        },
    ],
    creator: "shadcn",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@shadcn",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head/>
        <CSPostHogProvider>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div vaul-drawer-wrapper="">
                    <div className="relative flex min-h-screen flex-col bg-background">
                        <SiteHeader/>
                        {children}
                    </div>
                </div>
            </ThemeProvider>
            </body>
        </CSPostHogProvider>
        </html>
    );
}