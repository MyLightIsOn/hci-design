"use client";

import { useState } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({ filters, onFilter }) {
  const [active, setActive] = useState("All");

  function handleClick(label) {
    setActive(label);
    onFilter(label);
  }

  return (
    <div className={styles.bar}>
      <span className={styles.label}>Filter</span>
      {["All", ...filters].map((f) => (
        <button
          key={f}
          className={`${styles.btn} ${active === f ? styles.active : ""}`}
          onClick={() => handleClick(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
