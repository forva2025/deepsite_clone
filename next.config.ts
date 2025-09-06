import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  // Turbopack configuration for audio/video files
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
  images: {
    remotePatterns: [
      // Add your own image domains here
    ],
  },
};

export default nextConfig;
