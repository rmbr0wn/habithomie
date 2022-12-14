import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";

import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import EntriesPage from "./components/EntryManagement/EntriesPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import { store, persistor } from "./reducers/store.js";

function App() {
  return (
    <GoogleOAuthProvider clientId="794956968618-b1o8rcuov3dv6po9a2h5o8q9dejgf980.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div id="app-page-container">
              <Navbar />
              <Routes>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/entries" element={<EntriesPage/>}/>
              </Routes>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
