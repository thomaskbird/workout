import {Session} from '@app/store/types/session';

export const selectUser = (store: Session) => store.user;

export const selectSetUser = (store: Session) => store.setUser;
