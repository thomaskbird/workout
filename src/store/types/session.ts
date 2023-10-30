export type SessionState = {
  user: any;
}

export type SessionActions = {
  setUser: (user: any) => void;
}

export type Session = SessionState & SessionActions;
