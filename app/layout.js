import "./globals.css";

export const metadata = {
  title: "HCI Design Lab",
  description: "Human AI Creative Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
