import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Netflix Wrap 2025",
    description: "Your year. On screen. A cinematic showcase of your 2025 streaming journey.",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-black text-white antialiased font-inter">{children}</body>
        </html>
    );
}
