import { combineReducers } from "redux";

import authReducer from "./auth.js";
import activitiesReducer from "./activities.js";
import timesReducer from "./times.js";

export const reducers = combineReducers({ authReducer, activitiesReducer, timesReducer });
