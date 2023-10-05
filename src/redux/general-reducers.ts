import {
  TOGGLE_IS_LOADING,
  ERRORS_ADD
} from '~/redux/actions-general'

import { GeneralState } from '~/types/types'

const initialState = {
  isLoading: false,
  errors: []
}

function generalReducer(state: GeneralState = initialState, data: any): any {
  switch(data.type) {
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case ERRORS_ADD:
      const newErrors = [...state.errors];
      newErrors.push(data.error);

      return {
        ...state,
        errors: newErrors
      }
    default:
      return state;
  }
}

export const GeneralReducer = generalReducer;
