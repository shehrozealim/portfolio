import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-tau-sepia-67.vercel.app/"),
  title: {
    default: "Shehroze Malik — Full-Stack & Systems Engineer",
    template: "%s | Shehroze Malik",
  },
  description:
    "Portfolio of Shehroze Malik, a Full-Stack Developer specializing in high-performance backends, modern web applications, and low-latency system architectures.",
  keywords: [
    "Shehroze Malik",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Portfolio",
    "React Engineer",
    "Node.js Developer",
    "TypeScript",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Shehroze Malik", url: "https://portfolio-tau-sepia-67.vercel.app/" }],
  creator: "Shehroze Malik",
  publisher: "Shehroze Malik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-tau-sepia-67.vercel.app/",
    title: "Shehroze Malik — Full-Stack & Systems Engineer",
    description:
      "Architecting scalable full-stack applications with high-performance backends and interactive UI frameworks.",
    siteName: "Shehroze Malik Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shehroze Malik - Portfolio",
      },
    ],
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://portfolio-tau-sepia-67.vercel.app/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
