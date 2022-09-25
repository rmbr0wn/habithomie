import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { changeActivityName, deleteActivity } from "../../../actions/activities.js";
import ActivityEditInput from "./ActivityEditInput";

export default function ActivityEditor (props) {
  const [updatedActivityName, setUpdatedActivityName] = useState("");
  const dispatch = useDispatch();

  function activityListDisplay (activities) {
    let displayArray = [];

    if (!activities || activities === [] || activities.length === 0) {
      displayArray.push("No activities to be found.");
      return displayArray;
    }

    for (let i = 0; i < activities.length; i++) {
      let activity = <ActivityEditInput
        name={activities[i].activity_name}
        id={activities[i].activity_id}
        key={activities[i].activity_id}
        editingPayload={props.editingPayload}
        toggleEditing={toggleEditingAndClearName}
        handleNameChange={handleNameChange}
        submitNameChange={submitNameChange}
        deleteActivityHandler={deleteActivityHandler}
        error={props.error}
      />;
      displayArray.push(activity);
    }

    return displayArray;
  }

  function handleNameChange (e) {
    e.preventDefault();

    setUpdatedActivityName(e.target.value);
  }

  async function submitNameChange (e) {
    e.preventDefault();

    if (updatedActivityName.length === 0) {
      props.setError("The new name cannot be empty.");
      return;
    }

    let nameCheck = await dispatch(changeActivityName(updatedActivityName, e.target.attributes.activityid.value, props.userId));

    if (nameCheck.response) {
      props.setError(nameCheck.response.data.message);
    } else {
        toggleEditingAndClearName(e);
        props.setError("");
        props.setSuccessMessage(nameCheck?.message);
    }
  }

  async function deleteActivityHandler (e) {
    e.preventDefault();

    let deleteRequest = await dispatch(deleteActivity(e.target.attributes.activityid.value));
    if (deleteRequest.message) {
      props.setSuccessMessage(deleteRequest.message);
    }
    toggleEditingAndClearName(e);
  }

  async function toggleEditingAndClearName (e) {
    props.toggleEditing(e);
    setUpdatedActivityName("");
  }

  return (
    <div id="activity-editor-wrapperr">
      { props.activitiesBeingViewed ?
          <div id="activity-viewing-container">
            <div>
              {activityListDisplay(props.activitiesData)}
            </div>
          </div>
        :
          null
      }
    </div>
  );
}
