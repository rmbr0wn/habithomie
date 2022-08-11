import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Auth from "./components/Auth/Auth";
import store from "./reducers/store.js";

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <div id="app-page-container">
            <Routes>
              <Route path="/" element={<Auth/>}/> // Later change path to /auth when we have that up and running
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
