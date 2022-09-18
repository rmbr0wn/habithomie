import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stopwatch from "./Stopwatch/Stopwatch.js";

export default function HomePage () {
  const storedUser = useSelector((state) => state.authReducer);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (storedUser.authData) {
      setEmail(storedUser.authData.result.email);
    }
  }, [storedUser]);

  return (
    <div className="dashboard-page-container-wrapper">
    { storedUser?.authData ?
      <div>
        <h1> The dashboard for {email}. </h1>
        <Stopwatch />
      </div>
      :
      <div>
        <h1> You need to login to use the dashboard page. </h1>
      </div>
    }
    </div>
  );
}
