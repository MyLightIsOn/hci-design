import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>© HCI Design Lab 2026 — Reno, NV</span>
      <a href="mailto:hello@hcidesignlab.com" className={styles.email}>
        hello@hcidesignlab.com
      </a>
    </footer>
  );
}
