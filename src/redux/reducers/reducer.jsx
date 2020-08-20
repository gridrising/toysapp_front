import {
  LOADING_TOYS_SUCCESS,
  LOADING_TOYS_FAILED,
  LOADING,
  LOADING_SINGLE,
  LOADING_TOY_SUCCESS,
  LOADING_TOY_FAILED,
  LOADING_TABLE,
  ADD_TOY_TABLE,
  DELETE_TOY_TABLE,
  UPDATE_TOY_TABLE,
  REGISTER_USER_SUCCESS,
} from '../action-types';

const initialState = {
  toys: [],
  isLoading: false,
  isLoadingSingle: false,
  isLoadingTabel: false,
  errorMsg: false,
  toy: {},
  isRegistrationSucced: false,
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
    case LOADING_TABLE:
      return { ...state, isLoadingTabel: true };
    case ADD_TOY_TABLE: {
      return { ...state, toys: [...state.toys, action.payload] };
    }
    case DELETE_TOY_TABLE: {
      return {
        ...state,
        toys: state.toys.filter((toy) => toy._id !== action.payload),
      };
    }
    case UPDATE_TOY_TABLE: {
      return {
        ...state,
        toys: state.toys.map((toy) => (toy._id === action.payload._id ? action.payload : toy)),
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,

      };
    }
    default:
      return state;
  }
};

export default rootReducer;
