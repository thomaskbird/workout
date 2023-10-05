import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render as rtlRender } from '@testing-library/react'

const render = (ui: React.ReactElement) => {
  const theme = getUtilityTheme('dtei')

  const Wrapper: React.FC = props => <ThemeProvider theme={theme} {...props} />

  return rtlRender(ui, { wrapper: Wrapper })
}

export * from '@testing-library/react'
export { render }
