import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createGlobalStoreSlice} from '@app/store/slices/createGlobalStoreSlice';

export const useGlobalStore = create(immer(createGlobalStoreSlice));
