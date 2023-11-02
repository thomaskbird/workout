import {User} from '@firebase/auth';
import {UserType} from '@app/types/types';

export type CompiledUserTypes = User & UserType;

export type SessionState = {
  user: CompiledUserTypes | null;
}

export type SessionActions = {
  setUser: (user: Partial<CompiledUserTypes>) => void;
}

export type Session = SessionState & SessionActions;
