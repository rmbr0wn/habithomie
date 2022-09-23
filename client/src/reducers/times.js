const timesReducer = (state = { timesData: null }, action) => {
  switch (action.type) {
    case "CREATE_TIME":
      return { ...state, timesData: [...state.timesData, action.data.result] };
    case "GET_TIMES":
      return { ...state, timesData: action.data.result };
    case "UPDATE_ENTRY":
      return { ...state, timesData: state.timesData.map(
        (time) => (time.time_id === action.data.result.time_id ? action.data.result : time)) };
    case "DELETE_ENTRY":
      return { ...state, timesData: state.timesData.filter(
        (time) => time.time_id !== action.data.result.time_id) };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, timesData: null };
    default:
      return state;
  }
};

export default timesReducer;
