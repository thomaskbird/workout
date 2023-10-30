import {Session} from '@app/store/types/session';
import {StateCreator} from 'zustand';

// todo: need to persist this data

const initialState = {
  user: null
}

export const createSessionSlice: StateCreator<
  Session,
  [],
  [],
  Session
> = (set) => ({
  ...initialState,
  setUser: (user: any) => {
    set((state) => {
      state.user = user;
      return state;
    })
  }
})
