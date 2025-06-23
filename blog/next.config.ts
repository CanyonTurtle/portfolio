import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['next-mdx-remote'],
  basePath: isProd ? '' : '', 
  assetPrefix: isProd ? '/' : '', 
  images: { unoptimized: true}, // GitHub Pages does not support Next.js image optimization 
  output: "export"
};

export default nextConfig;