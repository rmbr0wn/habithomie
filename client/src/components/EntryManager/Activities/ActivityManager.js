import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createActivity, getActivities, changeActivityName, deleteActivity } from "../../../actions/activities.js";
import ActivityInput from "./ActivityInput.js";

export default function ActivityManager (props) {
  const storedUser = useSelector((state) => state.authReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const [newActivity, setNewActivity] = useState("");
  const [createInputVisible, setCreateInputVisible] = useState(false);
  const [beingViewed, setBeingViewed] = useState(false);
  const [editingPayload, setEditingPayload] = useState({ beingEdited: false, id: -1 });
  const [updatedActivityName, setUpdatedActivityName] = useState("");
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const dispatch = useDispatch();

  // Send db fetch only if activities not already in redux store
  useEffect(() => {
    if (storedUser.authData && !storedActivities.activitiesData) {
      let userId = storedUser.authData.result.id;
      let fetchActivities = dispatch(getActivities(userId));
    }
  }, []);

  // useEffect(() => {
  //   console.log(storedActivities);
  // }, [storedActivities]);

  async function submitNewActivity (e) {
    e.preventDefault();
    setError("");

    if (newActivity.length === 0) {
      setError("The new activity name cannot be empty.");
      return;
    }

    let payload = {
      name: newActivity,
      userId: storedUser.authData.result.id
    }
    let createRequest = await dispatch(createActivity(payload));

    // There will only be a .response for errors
    if (createRequest.response) {
      setError(createRequest.response.data.message);
    } else {
        toggleCreate();
        setSuccessMessage(createRequest?.message);
    }
    setNewActivity("");
  }

  function handleNewActivityChange (e) {
    setNewActivity(e.target.value);
  }

  function toggleCreate () {
    setCreateInputVisible(!createInputVisible);
    setError("");
    setSuccessMessage("");
  }

  function toggleViewing () {
    setBeingViewed(!beingViewed);
    setError("");
    setSuccessMessage("");
  }

  async function toggleEditing (e) {
    setEditingPayload({
      beingEdited: !editingPayload.beingEdited,
      id: parseInt(e.target.attributes.activityid.value)
    });
    setUpdatedActivityName("");
    setError("");
  }

  function activityListDisplay (activities) {
    let displayArray = [];

    if (!activities || activities === [] || activities.length === 0) {
      displayArray.push("No activities to be found.");
      return displayArray;
    }

    for (let i = 0; i < activities.length; i++) {
      let activity = <ActivityInput
        name={activities[i].activity_name}
        id={activities[i].activity_id}
        key={activities[i].activity_id}
        editingPayload={editingPayload}
        toggleEditing={toggleEditing}
        handleNameChange={handleNameChange}
        submitNameChange={submitNameChange}
        deleteActivityHandler={deleteActivityHandler}
        error={error}
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
      setError("The new name cannot be empty.");
      return;
    }

    let nameCheck = await dispatch(changeActivityName(updatedActivityName, e.target.attributes.activityid.value, storedUser.authData.result.id));

    if (nameCheck.response) {
      setError(nameCheck.response.data.message);
    } else {
        toggleEditing(e);
        setError("");
        setSuccessMessage(nameCheck?.message);
    }
  }

  async function deleteActivityHandler (e) {
    e.preventDefault();

    let deleteRequest = await dispatch(deleteActivity(e.target.attributes.activityid.value));
    if (deleteRequest.message) {
      setSuccessMessage(deleteRequest.message);
    }
    toggleEditing(e);
  }

  return (
    <div id="activity-manager-panel-wrapper">
      <h3> Activities </h3>
      { createInputVisible ?
          <div id="create-activity-input-container">
            <input type="text" id="create-activity-input" placeholder="New activity name" onChange={handleNewActivityChange} />
            <button onClick={submitNewActivity}> Submit </button>
            <button onClick={toggleCreate}> Cancel </button>
            { error && <h3 className="form-error-message">{error}</h3> }
          </div>
        :
          !beingViewed && <button onClick={toggleCreate}> Create new activity </button>
      }
      { !createInputVisible ?
          <div>
            <button onClick={toggleViewing}> { beingViewed ? "Cancel" : "View/edit activities"} </button>
          </div>
        :
          null
      }
      {
        successMessage && <h3 className="form-response-message">{successMessage}</h3>
      }
      { beingViewed ?
          <div id="activity-viewing-container">
            <div>
              {activityListDisplay(storedActivities.activitiesData)}
            </div>
          </div>
        :
          null
      }
    </div>
  );
}
