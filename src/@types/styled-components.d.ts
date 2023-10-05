/* eslint-disable @typescript-eslint/no-empty-interface, no-duplicate-imports, import/no-duplicates */

// Strongly type the styled-components theme
import {} from 'styled-components'
import { CSSProp } from 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject
  }
}
