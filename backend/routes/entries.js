import express from "express";

import { getUserEntries } from "../controllers/entries.js";
import authentication from "../middleware/auth.js";

var router = express.Router();

router.get("/getEntries", authentication, getUserEntries);

export default router;
