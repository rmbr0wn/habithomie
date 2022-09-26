import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createActivity } from "../../../actions/activities.js";

export default function ActivityCreator (props) {
  const [newActivity, setNewActivity] = useState("");
  const dispatch = useDispatch();

  async function submitNewActivity (e) {
    e.preventDefault();
    props.setError("");

    if (newActivity.length === 0) {
      props.setError("The new activity name cannot be empty.");
      return;
    }

    let payload = {
      name: newActivity,
      userId: props.storedUser.authData.result.id
    }
    let createRequest = await dispatch(createActivity(payload));

    // There will only be a .response for errors
    if (createRequest.response) {
      props.setError(createRequest.response.data.message);
    } else {
        props.toggleCreate();
        props.setSuccessMessage(createRequest?.message);
    }
    setNewActivity("");
  }

  function handleNewActivityChange (e) {
    setNewActivity(e.target.value);
  }

  return (
    <div id="activity-creator-wrapper">
      { props.activityBeingCreated ?
          <div id="create-activity-input-container">
            <input type="text" id="create-activity-input" placeholder="New activity name" onChange={handleNewActivityChange} />
            <button onClick={submitNewActivity}> Submit </button>
            <button onClick={props.toggleCreate}> Cancel </button>
            { props.error && <h3 className="form-error-message">{props.error}</h3> }
          </div>
        :
          !props.activitiesBeingViewed && <button onClick={props.toggleCreate}> Create new activity </button>
      }
      { !props.activityBeingCreated ?
          <div>
            <button onClick={props.toggleViewing}> { props.activitiesBeingViewed ? "Cancel" : "View/edit activities"} </button>
          </div>
        :
          null
      }
    </div>
  );
}
