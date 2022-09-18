import express from "express";

import { createActivity, getActivity, changeActivityName, deleteActivity } from "../controllers/activities.js";
import authentication from "../middleware/auth.js";

var router = express.Router();

router.post("/create-activity", authentication, createActivity);
router.get("/get-activities", authentication, getActivity);
router.put("/update-activity", authentication, changeActivityName);
router.delete("/delete-activity/:id", authentication, deleteActivity)

export default router;
