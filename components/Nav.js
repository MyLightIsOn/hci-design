import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav({ active }) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>HCI Design Lab</Link>
      <ul className={styles.links}>
        <li><Link href="/work" className={active === "work" ? styles.active : ""}>Work</Link></li>
        <li><Link href="/#services" className={active === "services" ? styles.active : ""}>Services</Link></li>
        <li><Link href="/lab-notes" className={active === "lab-notes" ? styles.active : ""}>Lab Notes</Link></li>
        <li><Link href="/#contact" className={active === "contact" ? styles.active : ""}>Contact</Link></li>
      </ul>
    </nav>
  );
}
