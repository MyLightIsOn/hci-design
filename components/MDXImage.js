import Image from "next/image";

const dimensions = {
  "/lab-notes-images/001/1.png": { width: 1693, height: 809 },
  "/lab-notes-images/001/2.png": { width: 1532, height: 731 },
  "/lab-notes-images/001/3.png": { width: 1536, height: 812 },
  "/lab-notes-images/001/4.png": { width: 1672, height: 941 },
  "/lab-notes-images/002/1.png": { width: 1692, height: 930 },
  "/lab-notes-images/002/2.png": { width: 1024, height: 1536 },
  "/lab-notes-images/002/3.png": { width: 1536, height: 1024 },
  "/lab-notes-images/003/2.png": { width: 1104, height: 1084 },
  "/lab-notes-images/003/3.png": { width: 1536, height: 923 },
  "/lab-notes-images/003/4.png": { width: 1774, height: 785 },
  "/lab-notes-images/004/1.png": { width: 1693, height: 859 },
  "/lab-notes-images/004/2.png": { width: 1668, height: 833 },
  "/lab-notes-images/004/4.png": { width: 1536, height: 877 },
};

export default function MDXImage({ src, alt }) {
  const size = dimensions[src];
  if (!size) return <img src={src} alt={alt} />;

  return (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      style={{ width: "100%", height: "auto" }}
      sizes="(max-width: 640px) 100vw, 720px"
    />
  );
}
