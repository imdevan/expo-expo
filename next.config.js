const { withExpo } = require('@expo/next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-native', 'expo', '@expo/next-adapter'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/pages/:path*',
      },
    ];
  },
};

module.exports = withExpo(nextConfig);
