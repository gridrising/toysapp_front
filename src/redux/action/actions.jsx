import axios from "axios";
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
} from "../action-types";
export const getToys = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const { data } = await axios.get("http://localhost:3000/toys");
      dispatch({ type: LOADING_TOYS_SUCCESS, payload: data });
    } catch (err) {
      console.log(err, LOADING_TOYS_FAILED);
    }
  };
};
export const getToy = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_SINGLE });
      const { data } = await axios.get(`http://localhost:3000/toypage/${id}`);
      dispatch({ type: LOADING_TOY_SUCCESS, payload: data });
    } catch (err) {
      console.log(err, LOADING_TOY_FAILED);
    }
  };
};
export const getToysTable = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_TABLE });
      const { data } = await axios.get(`http://localhost:3000/toys`);
      dispatch({ type: LOADING_TOYS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error, LOADING_TOYS_FAILED);
    }
  };
};
export const addToyTable = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/table`, payload);
      const datatWithId = { ...payload, _id: data._id };
      dispatch({ type: ADD_TOY_TABLE, payload: datatWithId });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteToyTable = (payload) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3000/table/${payload}`);
      dispatch({ type: DELETE_TOY_TABLE, payload });
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateToyTable = (payload) => {
  return async (dispatch) => {
    try {
      await axios.patch(`http://localhost:3000/table/${payload._id}`, payload);
      dispatch({ type: UPDATE_TOY_TABLE, payload });
    } catch (error) {
      console.log(error);
    }
  };
};
