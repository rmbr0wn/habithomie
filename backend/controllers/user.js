import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import pool from "../db.js";

dotenv.config();

export const signIn = async (req, res) => {
	const { loginEmail, loginPassword } = req.body;

	try {
		let query = `SELECT * FROM users WHERE email = $1`;
		let existingUser = await pool.query(query, [loginEmail]);

		if (existingUser.rowCount <= 0) return res.status(404).json({ message: "No account found with that email."});

		let isPasswordCorrect = await bcrypt.compare(loginPassword, existingUser.rows[0].password);

		if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid password."});

		const token = jwt.sign({ email: existingUser.rows[0].email, id: existingUser.rows[0].user_id },
			process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

		let userResult = { user_id: existingUser.rows[0].user_id, email: existingUser.rows[0].email };

		res.status(200).json({ result: userResult, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong when signing in: ", error });
	}
};

export const signUp = async (req, res) => {
	const { signupEmail, signupPassword, confirmPassword } = req.body;

	try {
		if (signupPassword !== confirmPassword) return res.status(400).json({ message: "The passwords don't match."});

		const encryptedPassword = await bcrypt.hash(signupPassword, 12);
		let query = `SELECT * FROM users WHERE email = $1`;
		let emailCheck = await pool.query(query, [signupEmail]);

		if (emailCheck.rowCount > 0) {
			return res.status(409).json({ message: "That email has already been taken." });
		}

		query = `
			INSERT INTO users (email, password)
			VALUES ($1, $2)
			RETURNING user_id;
		`;

		const newUser = await pool.query(query, [signupEmail, encryptedPassword]);
		let userId = newUser.rows[0].user_id;
		const token = jwt.sign({ email: signupEmail, id: userId },
			process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

		let result = { email: signupEmail, id: userId };

    res.status(201).json({ result: result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong when signing up: ", error });
	}
};

export const googleAccountHandling = async (req, res) => {
	const { email } = req.body;

	try {
		let query = `SELECT * FROM users WHERE email = $1`;
		let userCheck = await pool.query(query, [email]);

		// Retrieve user if they exist, else insert into users table
		if (userCheck.rowCount > 0) {
			let userId = userCheck.rows[0].user_id;
			let result = { email: email, id: userId };
			const token = jwt.sign({ email: email, id: userId },
				process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

			return res.status(200).json({ result: result, token });
		} else {
				query = `
					INSERT INTO users (email)
					VALUES ($1)
					RETURNING user_id;
				`;

				const newUser = await pool.query(query, [email]);
				let userId = newUser.rows[0].user_id;
				let result = { email: email, id: userId };
				const token = jwt.sign({ email: email, id: userId },
					process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

				return res.status(201).json({ result: result, token });
		}
	} catch (error) {
		res.status(500).json({ message: "Something went wrong with google account handling: ", error });
	}
}
