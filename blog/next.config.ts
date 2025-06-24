import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
console.log("isProd\n\n\n\n\n", isProd, process.env.NODE_ENV, "\n\n\n\n\n")
const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['next-mdx-remote'],
  basePath: isProd ? '/portfolio' : '', 
  assetPrefix: isProd ? '/portfolio' : '', 
  images: { unoptimized: true}, // GitHub Pages does not support Next.js image optimization 
  output: "export"
};

export default nextConfig;