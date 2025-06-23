import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['next-mdx-remote'],
  basePath: isProd ? 'canyonturtle.github.io/portfolio/' : '', 
  assetPrefix: isProd ? 'canyonturtle.github.io/portfolio/' : '', 
  images: { unoptimized: true}, // GitHub Pages does not support Next.js image optimization 
  output: "export"
};

export default nextConfig;