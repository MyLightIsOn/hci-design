import "./globals.css";

const title = "HCI Design Lab";
const description = "Human AI Creative Studio";

export const metadata = {
  metadataBase: new URL("https://hcidesignlab.com"),
  title,
  description,
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
    title,
    description,
    siteName: title,
    url: "/",
    type: "website",
    images: [
      {
        url: "/open-graph-image.png",
        width: 2400,
        height: 1260,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/open-graph-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
