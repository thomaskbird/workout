interface Error {
  msg: string;
  type?: any;
}

export interface GeneralState {
  isLoading: boolean;
  errors: Error[];
}
