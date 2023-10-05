import crypto from 'crypto'

import React from 'react'
import { NextScript, DocumentProps } from 'next/document'

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return `'sha256-${hash.digest('base64')}'`
}

const CSP = (props: DocumentProps): any => {
  const cspSettings = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
    'connect-src': ["'self'", 'ws://localhost:*', 'https://apistaging.pwly.io'],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'"]
  }

  const csp = `${Object.entries(cspSettings)
    .map(([key, val]) => `${key} ${val.join(' ')}`)
    .join(';')} ${cspHashOf(NextScript.getInlineScriptSource(props))}`

  return <meta httpEquiv="Content-Security-Policy" content={csp} />
}

export { CSP }
