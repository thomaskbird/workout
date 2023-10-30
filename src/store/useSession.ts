import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createSessionSlice} from '@app/store/slices/createSessionSlice';
import {persist} from 'zustand/middleware';

export const useSession = create(
  persist(immer(createSessionSlice), {
    name: 'userSession'
  })
);
