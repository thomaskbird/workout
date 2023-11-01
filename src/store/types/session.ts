import {User} from '@firebase/auth';
import {UserType} from '@app/types/types';

export type SessionState = {
  user: User & UserType | null;
}

export type SessionActions = {
  setUser: (user: SessionState['user']) => void;
}

export type Session = SessionState & SessionActions;
