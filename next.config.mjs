/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/a11y-demo", destination: "/a11y-demo.html" }];
  },
};

export default nextConfig;
