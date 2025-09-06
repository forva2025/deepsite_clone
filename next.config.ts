import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* DeepSite Local Configuration - Hugging Face Integration Removed */
  
  // Webpack configuration for audio/video files
  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
  
  // Turbopack configuration for audio/video files (faster bundler)
  turbo: {
    rules: {
      "*.ogg": {
        loaders: ["url-loader"],
        as: "*.js",
      },
      "*.mp3": {
        loaders: ["url-loader"],
        as: "*.js",
      },
      "*.wav": {
        loaders: ["url-loader"],
        as: "*.js",
      },
      "*.mpeg": {
        loaders: ["url-loader"],
        as: "*.js",
      },
    },
  },
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      // Add trusted image domains here for external images
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
    // Enable image optimization
    unoptimized: false,
  },
  
  // Performance optimizations
  experimental: {
    // Enable Turbopack for faster builds
    turbo: {
      rules: {
        // Additional rules can be added here
      },
    },
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
