import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PostListClient from "./PostListClient";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lab Notes",
  description:
    "Observations, opinions, and dispatches from the work. Essays on AI design, human-centered systems, and what we're learning by building.",
});

export default function LabNotesPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav active="lab-notes" />

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>From the lab</p>
          <h1 className={styles.title}>Lab<br />Notes<span className={styles.dot}>.</span></h1>
        </div>
        <div>
          <p className={styles.desc}>
            Observations, opinions, and dispatches from the work. Essays on AI design,
            human-centered systems, and what we&apos;re learning by building.
          </p>
          <p className={styles.count}><span>{posts.length}</span> notes published</p>
        </div>
      </header>

      <PostListClient posts={posts} />

      <Footer />
    </>
  );
}
