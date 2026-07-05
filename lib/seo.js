export const siteName = "HCI Design Lab";
export const siteUrl = "https://www.hcidesignlab.com";

export const ogImages = [
  {
    url: "/open-graph-image.png",
    width: 1200,
    height: 630,
  },
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo_transparent.png`,
    description: "Human AI Creative Studio",
  };
}

export function articleJsonLd({ title, description, path, datePublished, tags }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}${path}`,
    datePublished,
    dateModified: datePublished,
    image: `${siteUrl}${ogImages[0].url}`,
    keywords: tags?.join(", "),
    author: {
      "@type": "Person",
      name: "Lawrence Moore",
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo_transparent.png`,
      },
    },
  };
}

export function pageMetadata({ title, description, type = "website", path = "" }) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      siteName,
      type,
      url: path,
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
