export type State = {
  [key: string]: any;
};

export interface DispatchType {
  type: string;
  [key: string]: any;
}
export interface Toy {
  _id: string;
  title: string;
  status: string[];
  price: number;
  amounts: number;
  body: string;
  imageUrl: string[];
}

export type Toys = Toy[];

export interface InitialState {
  toys: Toy;
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
}
