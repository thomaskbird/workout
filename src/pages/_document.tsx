import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'
import { CSP } from '../components/csp'

export default class MyDocument extends Document {
  public static async getInitialProps (ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
      }
  }

  public render () {
    return (
      <Html lang="en">
        <Head>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
