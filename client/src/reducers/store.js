import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { reducers } from "./index.js";

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
let persistor = persistStore(store);

export {store};
export {persistor};

if (window.Cypress) {
  window.store = store;
}
