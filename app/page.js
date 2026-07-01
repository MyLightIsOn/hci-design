import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

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
          We design systems where artificial intelligence supports, augments, and adapts
          to human needs. Creating intuitive, inclusive, and empowering interactions.
        </p>
        <Link href="/#services" className={styles.heroCta}>
          View our services
        </Link>
      </section>

      {/* Services */}
      <ScrollReveal>
        <section className={styles.section} id="services">
          <p className={styles.sectionLabel}>What we do</p>
          <div className={styles.services}>
            {[
              { num: "01", title: "Fast AI Prototyping", body: "Rapidly turn concepts into working prototypes. Test ideas with real users before investing in full-scale development." },
              { num: "02", title: "Human-Centered AI Design", body: "Interfaces that prioritize usability, trust, and inclusivity — AI tools that feel intuitive and supportive of real people's needs." },
              { num: "03", title: "Custom AI Solutions", body: "Tailored AI-driven tools, dashboards, and workflows that integrate seamlessly into your existing systems." },
              { num: "04", title: "AI Training + Enablement", body: "Workshops and hands-on guidance that demystify AI and empower your organization to lead confidently." },
            ].map((s) => (
              <div key={s.num} className={styles.service}>
                <p className={styles.serviceNum}>{s.num}</p>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* About */}
      <ScrollReveal>
        <section className={styles.section}>
          <div className={styles.about}>
            <div className={styles.aboutLabel}>What is<br />HCI?</div>
            <p className={styles.aboutBody}>
              Human-Computer Interaction is the study of how people engage with technology. At HCI Design Lab,
              we extend this to Human-AI experiences — designing systems where artificial intelligence supports,
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
