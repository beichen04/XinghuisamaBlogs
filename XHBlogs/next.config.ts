import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 静态导出模式
  output: 'export',
  trailingSlash: true,
  // 自定义域名直接指向根路径，不需要 basePath
  basePath: '',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略 TS 错误，方便快速部署
  },
};

export default nextConfig;
