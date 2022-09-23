import express from "express";

import { createTimeEntry, getTimeEntries, updateTimeEntry, deleteTimeEntry } from "../controllers/entries.js";
import authentication from "../middleware/auth.js";

var router = express.Router();

router.post("/create-time", authentication, createTimeEntry);
router.get("/get-user-times", authentication, getTimeEntries);
router.put("/update-entry", authentication, updateTimeEntry);
router.delete("/delete-entry/:id", authentication, deleteTimeEntry);

export default router;
