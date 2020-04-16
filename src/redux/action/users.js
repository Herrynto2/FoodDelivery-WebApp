import axios from "axios";
import { GET_USER_PROFILE, GET_ADMIN_PROFILE } from "./types";

export const getDataUser = (token) => (dispatch) => {
  axios
    .get(process.env.REACT_APP_API_URL + "/profile", {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      console.log("user", res);
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.data[0][0],
        payloads: res.data.data[1][0],
      });
    })
    .catch((err) => console.log(err));
};

export const getDataAdmin = (token) => (dispatch) => {
  axios
    .get(process.env.REACT_APP_API_URL + "/restaurant", {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      console.log("res", res);
      dispatch({
        type: GET_ADMIN_PROFILE,
        payload: res.data.data[0],
      });
    })
    .catch((err) => console.log("err", err));
};
