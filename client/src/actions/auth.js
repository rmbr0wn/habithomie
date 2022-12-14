import { instance } from "../apis/axios.js";

export const signIn = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await instance.post("/user/sign-in", formData);
    dispatch({ type: "AUTH", data });

    navigation("/");
    return data;
  } catch (error) {
    return error;
  }
};

export const signUp = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await instance.post("/user/sign-up", formData);

    dispatch({ type: "AUTH", data });

    navigation("/");
    return data;
  } catch (error) {
    return error;
  }
};

export const googleAccountHandling = (payload, navigation) => async (dispatch) => {
  try {
    const { data } = await instance.post("/user/google-user", payload);

    dispatch({ type: "AUTH", data });

    navigation("/");
    return data;
  } catch (error) {
    return error;
  }
};
