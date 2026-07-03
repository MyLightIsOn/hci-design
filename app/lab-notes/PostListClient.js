"use client";

import { useState } from "react";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import styles from "./page.module.css";

const ALL_FILTERS = ["Case Studies", "Essays", "Accessibility", "AI Design"];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function PostListClient({ posts }) {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All"
      ? posts
      : posts.filter((p) =>
          p.tags.some(
            (t) =>
              t.toLowerCase().includes(filter.toLowerCase()) ||
              filter.toLowerCase().includes(t.toLowerCase())
          )
        );

  return (
    <>
      {/* Re-enable once there are 10+ articles */}
      {/* <FilterBar filters={ALL_FILTERS} onFilter={setFilter} /> */}
      <div className={styles.list}>
        {visible.map((post, i) => (
          <Link
            key={post.slug}
            href={`/lab-notes/${post.slug}`}
            className={`${styles.post} ${i === 0 ? styles.featured : ""}`}
          >
            <div className={styles.postMeta}>
              {i === 0 && <span className={styles.featuredBadge}>Latest</span>}
              <span className={styles.postIssue}>No. {post.issue}</span>
              <span className={styles.postDate}>{formatDate(post.date)}</span>
            </div>
            <div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postPull}>{post.lede}</p>
              <div className={styles.postTags}>
                {post.tags.map((t) => (
                  <span key={t} className={styles.postTag}>{t}</span>
                ))}
              </div>
            </div>
            <div className={styles.postRight}>
              <span className={styles.readTime}>{post.readTime}</span>
              <span className={styles.readLink}>Read →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
