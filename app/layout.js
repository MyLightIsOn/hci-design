import "./globals.css";
import { siteName, ogImages } from "@/lib/seo";

const description = "Human AI Creative Studio";

export const metadata = {
  metadataBase: new URL("https://www.hcidesignlab.com"),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: siteName,
    description,
    siteName,
    url: "/",
    type: "website",
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ogImages.map((img) => img.url),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
