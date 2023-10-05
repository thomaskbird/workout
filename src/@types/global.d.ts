/// <reference types="node" />

// Extend the NodeJS namespace with variables in next.config.js
declare namespace NodeJS {
  interface ProcessEnv {
    readonly VERSION: string
    readonly BUILD_ID: string
    readonly ENV: 'development' | 'staging' | 'production'
    readonly PORT: number
    readonly SENTRY_DSN: string
    readonly SENTRY_RELEASE: string
    readonly ENDPOINT: string
    readonly ADVISOR: string
  }
}
