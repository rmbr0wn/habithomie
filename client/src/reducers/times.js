const timesReducer = (state = { timesData: null }, action) => {
  switch (action.type) {
    case "CREATE_TIME":
      return { ...state, timesData: [...state.timesData, action.data.result] };
    case "GET_TIMES":
      return { ...state, timesData: action.data.result };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, timesData: null };
    default:
      return state;
  }
};

export default timesReducer;
