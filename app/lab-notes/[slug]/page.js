import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.frontmatter.title} — HCI Design Lab` };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter: fm, content } = post;
  const { prev, next } = getAdjacentPosts(fm.issue);

  const formattedDate = new Date(fm.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Nav active="lab-notes" />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/lab-notes">Lab Notes</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>No. {fm.issue}</span>
        </div>
        <p className={styles.issue}>No. {fm.issue} — {formattedDate}</p>
        <h1 className={styles.title}>{fm.title}</h1>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>Lawrence Moore</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaItem}>{fm.tags[0]}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaItem}>{fm.readTime}</span>
          <span className={styles.metaSep}>·</span>
          {fm.tags.slice(1).map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </header>

      <div className={styles.body}>
        <p className={styles.lede}>{fm.lede}</p>
        <MDXRemote source={content} />
      </div>

      <div className={styles.footerNav}>
        {prev ? (
          <Link href={`/lab-notes/${prev.slug}`} className={styles.navItem}>
            <p className={styles.navDir}>← Previous</p>
            <p className={styles.navTitle}>{prev.title}</p>
          </Link>
        ) : (
          <div style={{ background: "var(--bg)" }} />
        )}
        {next ? (
          <Link
            href={`/lab-notes/${next.slug}`}
            className={`${styles.navItem} ${styles.navItemRight}`}
          >
            <p className={styles.navDir}>Next →</p>
            <p className={styles.navTitle}>{next.title}</p>
          </Link>
        ) : (
          <div style={{ background: "var(--bg)" }} />
        )}
      </div>

      <footer className={styles.backFooter}>
        <Link href="/lab-notes" className={styles.backLink}>← Back to Lab Notes</Link>
        <span className={styles.footerCopy}>© HCI Design Lab 2026</span>
      </footer>
    </>
  );
}
