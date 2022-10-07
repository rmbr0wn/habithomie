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

export const updateTimeEntry = (payload) => async (dispatch) => {
  try {
    const { data } = await instance.put("/entries/update-entry", payload);

    dispatch({ type: "UPDATE_ENTRY", data });

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteTimeEntry = (timeId) => async (dispatch) => {
  try {
    const { data } = await instance.delete(`/entries/delete-entry/${timeId}`);

    dispatch({ type: "DELETE_ENTRY", data });

    return data;
  } catch (error) {
    return error;
  }
}
