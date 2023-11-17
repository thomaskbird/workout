import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/styles.css';

import { AppProps } from 'next/app';
import React from 'react';

// import { Provider } from 'react-redux';
// import { appStore } from '~/redux/app-reducers'
import Header from '@app/components/Header/Header';
import Loading from '@app/components/Loading/Loading';
import theme from '@app/components/theme';
import { selectIsLoading } from '@app/store/selectors/globalStore';
import { useGlobalStore } from '@app/store/useGlobalStore';
import {
  Container,
  ThemeProvider
} from '@mui/material';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const isLoading = useGlobalStore(selectIsLoading);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className="content-container">
        <Component {...pageProps} />
      </Container>
      <Loading />
    </ThemeProvider>
  )
}

export default App
