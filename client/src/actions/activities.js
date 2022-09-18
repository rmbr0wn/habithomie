import { instance } from "../apis/axios.js";

export const createActivity = (payload) => async (dispatch) => {
  try {
    const { data } = await instance.post("/activities/create-activity", payload);
    dispatch({ type: "CREATE_ACTIVITY", data });

    return data;
  } catch (error) {
    return error;
  }
};

export const getActivities = (userId) => async (dispatch) => {
  try {
    const { data } = await instance.get("/activities/get-activities", {
      params: { userId: userId } });

    dispatch({ type: "GET_ACTIVITIES", data });

    return data;
  } catch (error) {
    return error;
  }
};

export const changeActivityName = (name, activityId, userId) => async (dispatch) => {
  try {
    const payload = { name, activityId, userId };
    const { data } = await instance.put("/activities/update-activity", payload);

    dispatch({ type: "UPDATE_ACTIVITY", data });

    return data;
  } catch (error) {
    return (error);
  }
};

export const deleteActivity = (id) => async (dispatch) => {
  try {
    const { data } = await instance.delete(`/activities/delete-activity/${id}`);

    dispatch({ type: "DELETE_ACTIVITY", data });

    return data;
  } catch (error) {
    return error;
  }
};
