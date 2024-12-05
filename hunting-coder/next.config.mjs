/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allow all hostnames
            },
            {
                protocol: 'http',
                hostname: '**', // Allow all hostnames for HTTP as well
            },
        ],
    },
};

export default nextConfig;
