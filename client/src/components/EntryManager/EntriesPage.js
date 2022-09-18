import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEntries } from "../../actions/entries.js";
import ActivityManager from "./ActivityManager.js";

export default function EntriesPage () {
  const storedUser = useSelector((state) => state.authReducer);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!storedUser.authData) {
      navigate('/');
    }
  }, [storedUser]);

  async function handleSubmit (e) {
    e.preventDefault();

    let entryList = await dispatch(getEntries(navigate));
    console.log(entryList.message);
  }

  return (
    <div id="entries-page-container-wrapper">
    { storedUser?.authData ?
      <div className="entries-page-container">
        <h1> Authenticated routes work, this is the Entries Page. </h1>
        <ActivityManager />
      </div>
      :
      <div className="entries-page-container">
        <h1> You must login to use this page. </h1>
      </div>
    }
    </div>
  );
}
