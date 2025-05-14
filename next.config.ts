import type { NextConfig } from "next";

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY);

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
