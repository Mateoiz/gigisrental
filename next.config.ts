import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pmrqoxlvmtaevrazsyww.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.6', '10.219.64.78'],
}

export default nextConfig