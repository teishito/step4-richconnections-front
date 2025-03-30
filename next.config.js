/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tech0-gen-8-step4-richconnections-back.azurewebsites.net/api/:path*', // バックエンドのURL
      },
    ];
  },
};

module.exports = nextConfig;
