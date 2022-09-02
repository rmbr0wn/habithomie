import { instance } from "../apis/axios.js";

export const getEntries = (navigation) => async (dispatch) => {
  try {
    console.log("Querying entries . . . ");

    const { data } = await instance.get("/entries/getEntries");
    // dispatch({ type: "AUTH", data });

    // navigation("/");
    return data;
  } catch (error) {
    return error;
  }
};
