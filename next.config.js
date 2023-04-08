const config = {
  webpack5: true,
  serverless: true,
  serverlessFunctionOverrides: {
    './pages/api/*': {
      events: [
        {
          http: {
            method: 'any',
            path: '/api/:path*',
          },
        },
      ],
    },
  },
}

// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
