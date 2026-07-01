'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <Image src="/logo_transparent.png" alt="" width={28} height={28} className={styles.logoMark} />
          HCI Design Lab
        </Link>
        <ul className={styles.links}>
          <li><Link href="/#services" className={active === "services" ? styles.active : ""}>Services</Link></li>
          <li><Link href="/lab-notes" className={active === "lab-notes" ? styles.active : ""}>Lab Notes</Link></li>
          <li><Link href="/#contact" className={active === "contact" ? styles.active : ""}>Contact</Link></li>
        </ul>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barMid : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ""}`} />
        </button>
      </nav>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <ul className={styles.overlayLinks} onClick={e => e.stopPropagation()}>
            <li><Link href="/#services" className={active === "services" ? styles.active : ""} onClick={() => setOpen(false)}>Services</Link></li>
            <li><Link href="/lab-notes" className={active === "lab-notes" ? styles.active : ""} onClick={() => setOpen(false)}>Lab Notes</Link></li>
            <li><Link href="/#contact" className={active === "contact" ? styles.active : ""} onClick={() => setOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </>
  );
}
