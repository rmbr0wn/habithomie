import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./index.js";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;

if (window.Cypress) {
  window.store = store;
}
