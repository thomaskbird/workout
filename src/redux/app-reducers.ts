import { GeneralReducer } from './general-reducers';
import { configureStore } from '@reduxjs/toolkit'

const appStore = configureStore({
  reducer: {
    general: GeneralReducer
  }
});

export { appStore };
