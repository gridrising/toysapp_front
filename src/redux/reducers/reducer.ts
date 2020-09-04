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
  CHANGE_FILTER,
  ADD_TO_BAG,
  GET_BAG_SUCCESS,
  GET_BAG_BEGIN,
  REMOVE_PURCHASE,
  UPDATE_BAG,
} from '../action-types';
import { DispatchType } from '../../types/types';

export interface Toy {
  _id: string;
  title: string;
  avatar: string;
  status: string[];
  price: number;
  amounts: number;
  body: string;
  imageUrl: string[];
}

export type Toys = Toy[];

export interface InitialState {
  toys: Toys;
  isLoading: boolean;
  isLoadingSingle: boolean;
  isLoadingTable: boolean;
  isLoadingUser: boolean;
  errorMsg: boolean;
  toy: {};
  isRegistrationSucced: null | {};
  registrationError: null | {};
  isUserLogged: boolean | {};
  loggedUser: null | {};
  loginError: null | {};
  tokenCompared: boolean;
  currentFilters: {};
  purchases: Toys;
}

const initialState = {
  toys: [] as Toys,
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
  currentFilters: {},
  purchases: [] as Toys,
};
export const rootReducer = (
  state: InitialState = initialState,
  action: DispatchType
) => {
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
        toys: state.toys.map((toy) =>
          toy._id === action.payload._id ? action.payload : toy
        ),
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
    case CHANGE_FILTER: {
      return {
        ...state,
        currentFilters: {
          ...state.currentFilters,
          [action.payload.type]: action.payload.filter,
        },
      };
    }
    case ADD_TO_BAG: {
      return {
        ...state,
        purchases: [...state.purchases, action.payload],
      };
    }
    case UPDATE_BAG: {
      return {
        ...state,
        purchases: state.purchases.map((purchase) =>
          purchase._id === action.payload._id ? action.payload : purchase
        ),
      };
    }
    case GET_BAG_BEGIN: {
      return {
        ...state,
        isLoadingUser: true,
      };
    }
    case GET_BAG_SUCCESS: {
      const purchasesWithAmount = action.payload.data.map((oneProduct: Toy) => {
        oneProduct.amounts = 0;
        action.payload.idsAndAmounts.forEach((element: any) => {
          if (oneProduct._id === element.id) {
            oneProduct.amounts += element.amount;
          }
        });
        return oneProduct;
      });
      return {
        ...state,
        isLoadingUser: false,
        purchases: purchasesWithAmount,
      };
    }
    case REMOVE_PURCHASE: {
      const oldLocalPurchases = JSON.parse(localStorage.getItem('bag') || '');
      const newLocalPurchases = oldLocalPurchases?.filter(
        (purchase: any) => purchase.id != action.payload
      );
      localStorage.setItem('bag', JSON.stringify(newLocalPurchases));
      return {
        ...state,
        purchases: state.purchases.filter(
          (purchase: Toy) => purchase._id != action.payload
        ),
      };
    }
    default:
      return state;
  }
};
