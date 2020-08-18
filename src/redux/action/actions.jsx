import axios from "axios";
import {
  LOADING_TOY_SUCCESS,
  LOADING_TOY_FAILED,
  LOADING_TOYS_SUCCESS,
  LOADING_TOYS_FAILED,
  LOADING,
  LOADING_SINGLE,
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
      console.log("MY MONGODB DATA", data);
      dispatch({ type: LOADING_TOY_SUCCESS, payload: data });
    } catch (err) {
      console.log(err, LOADING_TOY_FAILED);
    }
  };
};
