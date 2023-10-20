export type GlobalStoreState = {
  isLoading: boolean;
}

export type GlobalStoreActions = {
  setIsLoading: (isLoading: boolean) => void;
}

export type GlobalStore = GlobalStoreState & GlobalStoreActions;
