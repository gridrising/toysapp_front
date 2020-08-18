import {
  LOADING_TOYS_SUCCESS,
  LOADING_TOYS_FAILED,
  LOADING,
  LOADING_SINGLE,
  LOADING_TOY_SUCCESS,
  LOADING_TOY_FAILED,
} from "../action-types";
const initialState = {
  toys: [],
  isLoading: false,
  isLoadingSingle: false,
  errorMsg: false,
  toy: {},
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case LOADING_TOYS_SUCCESS:
      return { ...state, toys: action.payload, isLoading: false };
    case LOADING_TOYS_FAILED:
      return { ...state, errorMsg: action.payload, isLoading: false };
    case LOADING_SINGLE: {
      return { ...state, isLoadingSingle: true };
    }
    case LOADING_TOY_SUCCESS:
      return { ...state, toy: action.payload, isLoadingSingle: false };
    case LOADING_TOY_FAILED:
      return { ...state, isLoadingSingle: false };
    default:
      return state;
  }
};

export default rootReducer;
