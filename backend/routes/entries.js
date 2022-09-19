import express from "express";

import { createTimeEntry, getTimeEntries } from "../controllers/entries.js";
import authentication from "../middleware/auth.js";

var router = express.Router();

router.post("/create-time", authentication, createTimeEntry);
router.get("/get-user-times", authentication, getTimeEntries);

export default router;
