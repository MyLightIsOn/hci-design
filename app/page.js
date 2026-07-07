import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";
import { siteName, ogImages } from "@/lib/seo";

const description =
  "Thoughts on designing systems where artificial intelligence supports, augments, and adapts to human needs — running experiments, testing prototypes, and sharing what we learn.";

export const metadata = {
  description,
  openGraph: {
    title: siteName,
    description,
    siteName,
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

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Human AI Creative Studio</p>
        <h1 className={styles.heroTitle}>
          Human<span className={styles.dot}>.</span><br />
          <em>AI Experience</em><br />
          Design<span className={styles.dot}>.</span>
        </h1>
        <p className={styles.heroSub}>
          Thoughts on designing systems where artificial intelligence supports, augments,
          and adapts to human needs. Running experiments, testing prototypes, and sharing what we learn.
        </p>
        <Link href="/lab-notes" className={styles.heroCta}>
          Read the lab notes
        </Link>
      </section>

      {/* About */}
      <ScrollReveal>
        <section className={styles.section}>
          <div className={styles.about}>
            <div className={styles.aboutLabel}>What is<br />HCI?</div>
            <p className={styles.aboutBody}>
              Human-Computer Interaction is the study of how people engage with technology. At HCI Design Lab,
              we extend this to Human-AI experiences, designing systems where artificial intelligence supports,
              augments, and adapts to human needs, creating interactions that are intuitive, inclusive, and
              genuinely empowering.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Lab Notes Preview */}
      <ScrollReveal>
        <section className={styles.section}>
          <div className={styles.notesHeader}>
            <p className={styles.sectionLabel} style={{ marginBottom: 0 }}>Lab Notes</p>
            <Link href="/lab-notes" className={styles.seeAll}>See all</Link>
          </div>
          <p className={styles.notesTagline}>Observations, opinions, and dispatches from the work.</p>
          {posts.map((post) => (
            <Link href={`/lab-notes/${post.slug}`} key={post.slug} className={styles.blogPost}>
              <div className={styles.blogMeta}>
                <span className={styles.blogIssue}>No. {post.issue}</span>
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </div>
              <div>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogPull}>{post.lede}</p>
              </div>
            </Link>
          ))}
        </section>
      </ScrollReveal>

      <Footer />
    </>
  );
}
