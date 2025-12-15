/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  // Allow importing from parent directory (p2ba-core)
  transpilePackages: [],
}

module.exports = nextConfig




