import { combineReducers } from "redux";

import authReducer from "./auth.js";

export const reducers = combineReducers({ authReducer });
