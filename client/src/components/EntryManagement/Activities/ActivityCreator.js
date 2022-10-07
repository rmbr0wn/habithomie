import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createActivity } from "../../../actions/activities.js";
import "./activitycreator.css";

export default function ActivityCreator (props) {
  const [newActivity, setNewActivity] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setNewActivity("");    // Clear form after submission/when switching modes
  }, [props.activityBeingCreated])

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
          <div id="create-activity-input-wrapper">
            <form id="activity-creation-form">
              <input type="text" id="create-activity-input" placeholder="New activity name" onChange={handleNewActivityChange} />
              <div className="create-activity-button-container">
                <button onClick={submitNewActivity} className="create-activity-button"> Submit </button>
                <button onClick={props.toggleCreate}  className="create-activity-button"> Cancel </button>
              </div>
              { props.error && <h3 className="form-error-message">{props.error}</h3> }
            </form>
          </div>
        :
          <div>
            {!props.activitiesBeingViewed && <button onClick={props.toggleCreate}> Create new activity </button>}
          </div>

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
