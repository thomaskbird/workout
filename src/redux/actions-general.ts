export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
export const ERRORS_ADD = 'ERRORS_ADD';

export const toggleIsLoading = (): any => ({
  type: TOGGLE_IS_LOADING
})

export const errorsAdd = (error: any): any => ({
  type: ERRORS_ADD,
  error
})
