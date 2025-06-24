import { assetPrefix } from "base-path";
import { basePath } from "base-path";
import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['next-mdx-remote'],
  basePath, 
  assetPrefix, 
  images: { unoptimized: true}, // GitHub Pages does not support Next.js image optimization 
  output: "export"
};

export default nextConfig;