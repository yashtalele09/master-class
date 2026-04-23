import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.freepik.com"],
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
