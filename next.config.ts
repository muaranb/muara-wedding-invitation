import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
        async redirects() {
        return [
            {
                source: '/v2',
                destination: '/',
                permanent: true, // gunakan true untuk redirect 308 (permanent), false untuk 307 (temporary)
            },
        ]
    },
};

export default nextConfig;
