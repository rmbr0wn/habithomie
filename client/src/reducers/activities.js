const activitiesReducer = (state = { activitiesData: null }, action) => {
  switch (action.type) {
    case "CREATE_ACTIVITY":
      return { ...state, activitiesData: [...state.activitiesData, action.data.result] };
    case "GET_ACTIVITIES":
      return { ...state, activitiesData: action.data.result };
    case "UPDATE_ACTIVITY":
      return { ...state, activitiesData: state.activitiesData.map(
        (activity) => (activity.activity_id === action.data.result.activity_id ? action.data.result : activity)) };
    case "DELETE_ACTIVITY":
      return { ...state, activitiesData: state.activitiesData.filter(
        (activity) => activity.activity_id !== action.data.result.activity_id) };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, activitiesData: null };
    default:
      return state;
  }
};

export default activitiesReducer;
