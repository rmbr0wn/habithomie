import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../../actions/activities.js";
import ActivityCreator from "./ActivityCreator.js";
import ActivityEditor from "./ActivityEditor.js";
import "./activitymanager.css";

export default function ActivityManager () {
  const storedUser = useSelector((state) => state.authReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const myStore = useSelector((state) => state);
  const [activityBeingCreated, setActivityBeingCreated] = useState(false);
  const [activitiesBeingViewed, setActivitiesBeingViewed] = useState(false);
  const [editingPayload, setEditingPayload] = useState({ beingEdited: false, id: -1 });
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const dispatch = useDispatch();

  // Send db fetch only if activities not already in redux store
  useEffect(() => {
    if (storedUser.authData && !storedActivities.activitiesData) {
      let userId = storedUser.authData.result.id;
      dispatch(getActivities(userId));
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(storedUser);
  //   console.log(storedActivities);
  //   console.log(myStore);
  // }, [storedUser, storedActivities, myStore])

  function toggleCreate () {
    setActivityBeingCreated(!activityBeingCreated);
    setError("");
    setSuccessMessage("");
  }

  function toggleViewing () {
    setActivitiesBeingViewed(!activitiesBeingViewed);
    setError("");
    setSuccessMessage("");
  }

  async function toggleEditing (e) {
    setEditingPayload({
      beingEdited: !editingPayload.beingEdited,
      id: parseInt(e.target.attributes.activityid.value)
    });
    setError("");
  }

  return (
    <div id="activity-manager-panel-wrapper">
      <h3> Activities </h3>
      <ActivityCreator
        storedUser={storedUser}
        setError={setError}
        error={error}
        toggleCreate={toggleCreate}
        activityBeingCreated={activityBeingCreated}
        toggleViewing={toggleViewing}
        activitiesBeingViewed={activitiesBeingViewed}
        setSuccessMessage={setSuccessMessage}
      />
      {
        successMessage && <h3 className="form-response-message">{successMessage}</h3>
      }
      <ActivityEditor
        activitiesData={storedActivities.activitiesData}
        activitiesBeingViewed={activitiesBeingViewed}
        toggleEditing={toggleEditing}
        editingPayload={editingPayload}
        setSuccessMessage={setSuccessMessage}
        setError={setError}
        error={error}
        userId={storedUser.authData.result.id}
      />
    </div>
  );
}
