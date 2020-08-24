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
  REGISTER_USER_FAILED,
  HIDE_REGISTRATION_MSG,
  LOGGINING_BEGIN,
  LOGGINING_SUCCESS,
  LOGGINING_FAILED,
  CHECK_AUTH_BEGIN,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILED,
  COMPARE_TOKEN,
  HIDE_LOGIN_ERROR,
} from '../action-types';

const initialState = {
  toys: [],
  isLoading: false,
  isLoadingSingle: false,
  isLoadingTable: false,
  isLoadingUser: false,
  errorMsg: false,
  toy: {},
  isRegistrationSucced: null,
  registrationError: null,
  isUserLogged: false,
  loggedUser: null,
  loginError: null,
  tokenCompared: false,
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
      return { ...state, isLoadingTable: true };
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
        isRegistrationSucced: true,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        isRegistrationSucced: false,
        registrationError: action.payload,
      };
    }
    case HIDE_REGISTRATION_MSG: {
      return {
        ...state,
        isRegistrationSucced: null,
      };
    }
    case LOGGINING_BEGIN: {
      return {
        ...state,
        isUserLogged: false,
        loggedUser: null,
        isLoading: true,
      };
    }
    case LOGGINING_SUCCESS: {
      localStorage.setItem('auth-token', action.payload.token);
      localStorage.setItem('logged-user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoading: false,
        isUserLogged: true,
        loggedUser: action.payload.user,
      };
    }
    case LOGGINING_FAILED: {
      return {
        ...state,
        isLoadingUser: false,
        isUserLogged: false,
        loginError: action.payload,
      };
    }
    case HIDE_LOGIN_ERROR: {
      return {
        ...state,
        loginError: null,
      };
    }
    case CHECK_AUTH_BEGIN: {
      return {
        ...state,
        isLoadingUser: true,
      };
    }
    case CHECK_AUTH_SUCCESS: {
      return {
        ...state,
        loggedUser: action.payload,
        isUserLogged: true,
        tokenCompared: true,
        isLoadingUser: false,
      };
    }
    case CHECK_AUTH_FAILED: {
      return {
        ...state,
        isLoadingUser: false,
        tokenCompared: true,
        isUserLogged: false,
      };
    }
    case COMPARE_TOKEN: {
      return {
        ...state,
        tokenCompared: true,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
