import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectsClient from "./ProjectsClient";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "A selection of AI, accessibility, and human-centered design projects — built, studied, and shipped.",
  path: "/work",
});

export default function WorkPage() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Nav active="work" />

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Selected work</p>
          <h1 className={styles.title}>Projects<span className={styles.dot}>.</span></h1>
        </div>
        <div>
          <p className={styles.desc}>
            A selection of AI, accessibility, and human-centered design projects — built, studied, and shipped.
          </p>
          <p className={styles.count}><span>{projects.length}</span> projects</p>
        </div>
      </header>

      <ProjectsClient featured={featured} rest={rest} />

      <Footer />
    </>
  );
}
