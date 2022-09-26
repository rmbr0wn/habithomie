import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import EntriesPage from "./components/EntryManagement/EntriesPage";
import HomePage from "./components/Dashboard/HomePage";
import store from "./reducers/store.js";

function App() {
  return (
    <GoogleOAuthProvider clientId="794956968618-b1o8rcuov3dv6po9a2h5o8q9dejgf980.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <div id="app-page-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/auth" element={<Auth/>}/>
              <Route path="/entries" element={<EntriesPage/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
