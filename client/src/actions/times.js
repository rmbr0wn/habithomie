import { instance } from "../apis/axios.js";

export const createTimeEntry = (payload) => async (dispatch) => {
  try {
    const { data } = await instance.post("/entries/create-time", payload);

    dispatch({ type: "CREATE_TIME", data });

    return data;
  } catch (error) {
    return error;
  }
};

export const getTimeEntries = (userId) => async (dispatch) => {
  try {
    const { data } = await instance.get("/entries/get-user-times", {
      params: { userId: userId } });

    dispatch({ type: "GET_TIMES", data });

    return data;
  } catch (error) {
    return error;
  }
};
