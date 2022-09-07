import express from "express";

import { signIn, signUp, googleAccountHandling } from "../controllers/user.js";

var router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/google-user", googleAccountHandling);

export default router;
