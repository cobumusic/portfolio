module.exports = {
  experimental: { optimizeCss: true, esmExternals: false },
  staticPageGenerationTimeout: 30,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      loader: "@svgr/webpack",
      options: {
        svgo: false,
      },
    });

    return config;
  },
  async redirects() {
    return [];
  },

  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  poweredByHeader: false,
};
