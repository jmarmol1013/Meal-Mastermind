/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? process.env.NEXT_PUBLIC_BASE_URL_PROD
        : (process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : process.env.NEXT_PUBLIC_BASE_URL_LOCAL)
    },
};

export default nextConfig;
