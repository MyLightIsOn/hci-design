"use client";

import { useState } from "react";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import styles from "./page.module.css";

const ALL_FILTERS = ["AI", "Accessibility", "UX Research", "Full Stack"];

export default function ProjectsClient({ featured, rest }) {
  const [filter, setFilter] = useState("All");

  const visibleRest =
    filter === "All"
      ? rest
      : rest.filter((p) => p.tags.includes(filter));

  return (
    <>
      <FilterBar filters={ALL_FILTERS} onFilter={setFilter} />

      <div className={styles.heroWrap}>
        <div className={styles.hero}>
          <div className={styles.heroImg}>
            <div className={styles.heroPattern} />
          </div>
          <div className={styles.heroOverlay} />
          <span className={styles.heroCta}>View project →</span>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Featured — {featured.year}</span>
            <h2 className={styles.heroTitle}>{featured.title}</h2>
            <p className={styles.heroDesc}>{featured.description}</p>
            <div className={styles.heroMeta}>
              <div className={styles.heroTags}>
                {featured.tags.map((t) => (
                  <span key={t} className={styles.heroTag}>{t}</span>
                ))}
              </div>
              <span className={styles.heroSep}>·</span>
              <span className={styles.heroRole}>{featured.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {visibleRest.map((p) => (
          <Link href="#" key={p.slug} className={styles.card}>
            <div className={styles.cardThumb}>
              <div className={styles.thumbPattern} />
              <div className={styles.thumbOverlay} />
              <span className={styles.thumbType}>{p.type}</span>
              <span className={styles.thumbYear}>{p.year}</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
              <div className={styles.cardFooter}>
                <div className={styles.cardTags}>
                  {p.tags.map((t) => <span key={t} className={styles.cardTag}>{t}</span>)}
                </div>
                <span className={styles.cardLink}>View →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
