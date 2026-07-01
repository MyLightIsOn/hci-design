import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <>
      <Nav active="contact" />

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Get in touch</p>
          <h1 className={styles.title}>Contact<span className={styles.dot}>.</span></h1>
        </header>

        <section className={styles.section}>
          <p className={styles.body}>
            Have a project idea, a question, or want to learn more about our services?
            Send us a message, we read every note and get back to you as soon as we can.
          </p>
          <a href="mailto:hello@hcidesignlab.com" className={styles.email}>
            hello@hcidesignlab.com
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
