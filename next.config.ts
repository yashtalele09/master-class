import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'tagmango.com' },
      { protocol: 'https', hostname: 'www.enae.es' },
      { protocol: 'https', hostname: 'tse2.mm.bing.net' },
    ],
  },

  async headers() {
    return [
      {
        source: "/admin/config.yml",
        headers: [
          {
            key: "Content-Type",
            value: "text/yaml",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

export default nextConfig;
