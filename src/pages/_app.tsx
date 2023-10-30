import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/styles.css';

import React from 'react'
import { AppProps } from 'next/app'

// import { Provider } from 'react-redux';
// import { appStore } from '~/redux/app-reducers'
import {
  Container,
  Typography
} from '@mui/material';
import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading} from '@app/store/selectors/globalStore';
import Header from '@app/components/Header/Header';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const isLoading = useGlobalStore(selectIsLoading);

  return (
    <>
      <Header />

      {isLoading && <Typography>Loading...</Typography>}

      <Container className="content-container">
        <Component {...pageProps} />
      </Container>
    </>
  )
}

export default App
