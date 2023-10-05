/* eslint-disable no-console */

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER
} = require('next/constants')

const pkgJSON = require('../package.json')

const developmentEnv = {
  ENV: 'development',
  VERSION: pkgJSON.version,
  PORT: process.env.PORT || 4000,
  SENTRY_DSN:
    'https://94022fcd349943caad6d3104e83f5eba@o74198.ingest.sentry.io/5285676',
  SENTRY_RELEASE: `migreenpower@${pkgJSON.version}`,
  ENDPOINT: 'https://apistaging.pwly.io',
  ADVISOR: 'https://homeadvisor-staging.pwly.io'
}

const stagingEnv = {
  ...developmentEnv,
  ENV: 'staging'
}

const productionEnv = {
  ...developmentEnv,
  ENV: 'production',
  ENDPOINT: 'https://apistaging.pwly.io',
  ADVISOR: 'https://homeadvisor.pwly.io'
}

module.exports = phase => {
  const { ENV } = process.env

  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isStaging = phase === PHASE_PRODUCTION_SERVER && ENV === 'staging'
  const isProd = phase === PHASE_PRODUCTION_SERVER && ENV === 'production'

  console.log(`isDev: ${isDev} | isStaging: ${isStaging} | isProd: ${isProd}`)
  if ([isDev, isStaging, isProd].every(stage => stage === false)) {
    console.warn(
      `Current env "${ENV}" not recognized, defaulting to production variables`
    )
  }

  if (isDev) return developmentEnv
  if (isStaging) return stagingEnv
  if (isProd) return productionEnv
  return productionEnv
}
