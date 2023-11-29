import { UserType } from '@app/types/types';
import { User } from '@firebase/auth';

export type CompiledUserTypes = User & UserType;

export type SessionState = {
  user: CompiledUserTypes | null;
}

export type SessionActions = {
  setUser: (user: Partial<CompiledUserTypes> | null) => void;
}

export type Session = SessionState & SessionActions;
