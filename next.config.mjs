import { withPayload } from '@payloadcms/next/withPayload'

if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  serverExternalPackages: ['sharp', 'payload'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    // Add packages that should be treated as external packages to improve build performance
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Force all server components to use Node.js runtime by default
  // This ensures compatibility with Payload CMS which uses Node.js modules
  serverRuntimeConfig: {
    runtime: 'nodejs',
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
