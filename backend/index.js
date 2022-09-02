import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import entriesRouter from "./routes/entries.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/entries", entriesRouter);

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
