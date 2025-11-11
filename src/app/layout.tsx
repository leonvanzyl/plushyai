import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plushify - Transform Photos into Adorable Plushies",
  description:
    "Turn any photo into an adorable AI-generated plushie design. Fast, easy, and fun! Create custom plushies of family, friends, pets, and more with our advanced AI technology.",
  keywords: ["plushie generator", "AI plushie", "photo to plushie", "custom plushie", "AI art", "plushie maker"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Plushify - Transform Photos into Adorable Plushies",
    description: "Turn any photo into an adorable AI-generated plushie design instantly!",
    type: "website",
    images: [{ url: "/logo.svg", width: 100, height: 100, alt: "Plushify Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
