import { getAllPosts } from "@/lib/posts";

const baseUrl = "https://www.hcidesignlab.com";

export default function sitemap() {
  const staticRoutes = ["", "/work", "/lab-notes", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/lab-notes/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
