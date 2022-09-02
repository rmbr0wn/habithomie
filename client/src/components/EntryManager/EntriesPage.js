import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEntries } from "../../actions/entries.js";

export default function EntriesPage () {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();

    let entryList = await dispatch(getEntries(navigate));
    console.log(entryList.message);
  }

  return (
    <div className="entries-page-container-wrapper">
      <h1> Authenticated routes work, this is the Entries Page. </h1>
      <button onClick={handleSubmit}> Click me </button>
    </div>
  );
}
