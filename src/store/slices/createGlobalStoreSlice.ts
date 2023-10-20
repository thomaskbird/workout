import {GlobalStore} from '@app/store/types/globalStore';
import {StateCreator} from 'zustand';

const initialState = {
  isLoading: false
}

export const createGlobalStoreSlice: StateCreator<
  GlobalStore,
  [],
  [],
  GlobalStore
> = (set) => ({
  ...initialState,
  setIsLoading: (isLoading: boolean) => {
    set((state) => {
      state.isLoading = isLoading;
      return state;
    })
  }
})
