import {GlobalStore} from '@app/store/types/globalStore';

export const selectIsLoading = (store: GlobalStore) => store.isLoading;

export const selectSetIsLoading = (store: GlobalStore) => store.setIsLoading;
