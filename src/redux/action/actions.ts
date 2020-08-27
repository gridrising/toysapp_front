import axios from 'axios';
import {
  LOADING_TOY_SUCCESS,
  LOADING_TOY_FAILED,
  LOADING_TOYS_SUCCESS,
  LOADING_TOYS_FAILED,
  LOADING,
  LOADING_SINGLE,
  LOADING_TABLE,
  ADD_TOY_TABLE,
  DELETE_TOY_TABLE,
  UPDATE_TOY_TABLE,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
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
} from '../action-types';
import { DispatchType, Toy } from '../../types/types';

export const getToys = () => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    dispatch({ type: LOADING });
    const { data } = await axios.get('http://localhost:3000/toys');
    dispatch({ type: LOADING_TOYS_SUCCESS, payload: data });
  } catch (err) {
    console.log(err, LOADING_TOYS_FAILED);
  }
};
export const getToy = (id: string) => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    dispatch({ type: LOADING_SINGLE });
    const { data } = await axios.get(`http://localhost:3000/toypage/${id}`);

    dispatch({ type: LOADING_TOY_SUCCESS, payload: data });
    return data;
  } catch (err) {
    console.log(err, LOADING_TOY_FAILED);
  }
};
export const getToysTable = () => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    dispatch({ type: LOADING_TABLE });
    const { data } = await axios.get('http://localhost:3000/toys');
    dispatch({ type: LOADING_TOYS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, LOADING_TOYS_FAILED);
  }
};
export const addToyTable = (payload: { [key: string]: any }) => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    const { data } = await axios.post('http://localhost:3000/table', payload);
    const datatWithId = { ...payload, _id: data._id };
    dispatch({ type: ADD_TOY_TABLE, payload: datatWithId });
  } catch (error) {
    console.log(error);
  }
};

export const deleteToyTable = (payload: string) => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    await axios.delete(`http://localhost:3000/table/${payload}`);
    dispatch({ type: DELETE_TOY_TABLE, payload });
  } catch (error) {
    console.log(error);
  }
};
export const updateToyTable = (payload: { [key: string]: any }) => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    await axios.patch(`http://localhost:3000/table/${payload._id}`, payload);
    dispatch({ type: UPDATE_TOY_TABLE, payload });
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (payload: {
  email: string;
  name: string;
  password: string;
}) => async (dispatch: (obj: DispatchType) => Promise<any>) => {
  try {
    await axios.post('http://localhost:3000/register', payload);
    dispatch({ type: REGISTER_USER_SUCCESS, payload });
    setTimeout(() => dispatch({ type: HIDE_REGISTRATION_MSG }), 5000);
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAILED, payload: error.response.data });
    setTimeout(() => dispatch({ type: HIDE_REGISTRATION_MSG }), 5000);
  }
};
export const loginUser = (payload: {
  email: string;
  password: string;
}) => async (dispatch: (obj: DispatchType) => Promise<any>) => {
  try {
    dispatch({ type: LOGGINING_BEGIN });
    const { data } = await axios.post('http://localhost:3000/login', payload);
    dispatch({ type: LOGGINING_SUCCESS, payload: data });
  } catch (error) {
    setTimeout(() => dispatch({ type: HIDE_LOGIN_ERROR }), 5000);
    dispatch({ type: LOGGINING_FAILED, payload: error.response.data.message });
  }
};
export const checkAuth = (token: string | null, id: string) => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    dispatch({ type: CHECK_AUTH_BEGIN });
    const response = await axios.post('http://localhost:3000/users/logged', {
      token,
      id,
    });
    if (response.data === 'auth error') {
      dispatch({ type: CHECK_AUTH_FAILED, payload: 'auth failed' });
    } else {
      dispatch({ type: CHECK_AUTH_SUCCESS });
    }
  } catch (error) {
    console.log('something wrong', error);
  }
};
export const compareToken = (): DispatchType => ({ type: COMPARE_TOKEN });

export const changeFilter = (payload: object) => async (
  dispatch: (obj: DispatchType) => Promise<any>
) => {
  try {
    dispatch({ type: LOADING });
    dispatch({ type: CHANGE_FILTER, payload });
    const { data } = await axios.get('http://localhost:3000/toys');
    dispatch({ type: LOADING_TOYS_SUCCESS, payload: data });
  } catch (error) {
    console.log('something wrong', error);
  }
};
