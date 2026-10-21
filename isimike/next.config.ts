import type { NextConfig } from "next";

// Static export: the site is plain HTML/JS, served from Netlify.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
