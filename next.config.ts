import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/v2',
                permanent: true, // gunakan true untuk redirect 308 (permanent), false untuk 307 (temporary)
            },
        ]
    },
};

export default nextConfig;
