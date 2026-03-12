import type { Metadata } from "next";
import { Geist, DM_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { VibeProvider } from "@/context/VibeContext";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://flowspacefocus.com'),
  title: "FlowSpace — Focus Timer with Ambient Music",
  description:
    "Your focused workspace. No ads, no distractions, just flow. Pomodoro timer with curated Lofi music and AI accountability.",
  keywords: [
    "focus timer", "pomodoro timer", "ambient music", "lofi", "productivity app",
    "deep work", "focus app", "study timer", "flow state", "AI accountability"
  ],
  authors: [{ name: "FlowSpace" }],
  creator: "FlowSpace",
  openGraph: {
    type: "website",
    url: "https://flowspacefocus.com",
    title: "FlowSpace — Focus Timer with Ambient Music",
    description:
      "Your focused workspace. No ads, no distractions, just flow. Pomodoro timer with curated Lofi music and AI accountability.",
    siteName: "FlowSpace",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowSpace — Focus Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowSpace — Focus Timer with Ambient Music",
    description:
      "Your focused workspace. No ads, no distractions, just flow.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Clash Display from Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --font-clash: 'Clash Display', sans-serif; }`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] font-geist text-[var(--text-primary)] antialiased" suppressHydrationWarning>
        <ClerkProvider>
          <VibeProvider>{children}</VibeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
