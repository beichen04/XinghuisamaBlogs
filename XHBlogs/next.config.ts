import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 静态导出模式
  output: 'export',
  trailingSlash: true,
  // 部署在项目子路径下时设置 basePath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略 TS 错误，方便快速部署
  },
};

export default nextConfig;
