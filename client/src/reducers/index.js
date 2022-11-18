import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.js";
import activitiesReducer from "./activities.js";
import timesReducer from "./times.js";

export const reducers = combineReducers({ authReducer, activitiesReducer, timesReducer });

// For testing purposes
export const setupTestStore = preloadedState => {
  return configureStore({
    reducer: reducers,
    preloadedState
  })
}
