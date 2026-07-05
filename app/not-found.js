import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Nav />

      <main className={styles.main}>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.title}>
          Page not found<span className={styles.dot}>.</span>
        </h1>
        <p className={styles.body}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className={styles.link}>
          ← Back to home
        </Link>
      </main>

      <Footer />
    </>
  );
}
