export const siteName = "HCI Design Lab";

export const ogImages = [
  {
    url: "/open-graph-image.png",
    width: 1200,
    height: 630,
  },
];

export function pageMetadata({ title, description, type = "website" }) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName,
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
  };
}
