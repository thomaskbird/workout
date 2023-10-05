const withSourceMaps = require('@zeit/next-source-maps')()
const withOffline = require('next-offline')
const path = require('path')

const setup = require('./lib/setup')

const nextConfig = phase => {
  const environment = setup(phase)

  return {
    dontAutoRegisterSw: true,
    workboxOpts: {
      swDest: 'static/sw.js',
      runtimeCaching: [
        {
          handler: 'StaleWhileRevalidate',
          urlPattern: /[.](webp|png|jpg|woff|woff2)/
        },
        {
          handler: 'NetworkFirst',
          urlPattern: /^https?.*/
        }
      ]
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')]
    },
    crossOrigin: 'anonymous',
    target: 'server',
    reactStrictMode: true,
    experimental: {
      modern: true
    },
    redirects: () => [],
    rewrites: () => [],
    headers: () => [
      {
        source: '/(.*)',
        headers: [{ key: 'X-App-Version', value: environment.VERSION }]
      },
      {
        source: '/manifest.webmanifest',
        headers: [{ key: 'Content-Type', value: 'application/manifest+json' }]
      },
      {
        source: '/_next/static/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable' // 1 year, images will get a new hash every build
          }
        ]
      },
      {
        source: '/static/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable' // 1 year, font files likely _wont_ change
          }
        ]
      }
    ],
    env: environment,
    webpack: (config, { buildId, webpack, isServer }) => {
      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser'
      }

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_ID': JSON.stringify(buildId)
        })
      )

      return config
    }
  }
}

module.exports = phase =>
  withSourceMaps(withOffline(nextConfig(phase)))
