import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/lab-notes");

export function getAllPosts() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
      const { data } = matter(raw);
      return data;
    })
    .sort((a, b) => Number(a.issue) - Number(b.issue));
}

export function getPostBySlug(slug) {
  const filepath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

export function getAdjacentPosts(issue) {
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.issue === issue);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
