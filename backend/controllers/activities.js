import pool from "../db.js";

export const createActivity = async (req, res) => {
	const { name, userId } = req.body;

	try {
		let query = `SELECT * FROM activities WHERE user_id = $1 AND activity_name = $2`;
		const existingNameCheck = await pool.query(query, [userId, name]);

		if (existingNameCheck.rows.length > 0) {
			return res.status(409).json({ message: "You already have an activity with that name." });
		}

    query = `
			INSERT INTO activities (user_id, activity_name)
			VALUES ($1, $2)
			RETURNING activity_id, activity_name;
		`;

    const newActivity = await pool.query(query, [userId, name]);
		let result = {
			activity_id: newActivity.rows[0].activity_id,
			user_id: userId,
			activity_name: name
		 };

    res.status(201).json({ message: "Activity successfully created.", result: result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong when creating an activity: ", error });
	}
};


export const getActivity = async (req, res) => {
  const { userId } = req.query;

  try {
    let query = `
      SELECT * FROM activities WHERE user_id = $1;
    `;

    const activityList = await pool.query(query, [userId]);

    res.status(200).json({ result: activityList.rows });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when fetching activities: ", error });
  }
}


export const changeActivityName = async (req, res) => {
  const { name, activityId, userId } = req.body;

  try {
		let query = `SELECT * FROM activities WHERE activity_name = $1 AND user_id = $2`;
		const existingNameCheck = await pool.query(query, [name, userId]);

		if (existingNameCheck.rows.length > 0) {
			return res.status(409).json({ message: "You already have an activity with that name." });
		}

    query = `
      UPDATE activities
			SET activity_name = $1
			WHERE activity_id = $2
    `;

    const updateName = await pool.query(query, [name, activityId]);
		let result = {
			activity_id: parseInt(activityId),
			user_id: userId,
			activity_name: name
		}

    res.status(200).json({ message: "Activity name successfully changed.", result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when changing the activity name: ", error });
  }
}


export const deleteActivity = async (req, res) => {
	const { id } = req.params;

	try {
		let query = `
			DELETE FROM activities
			WHERE activity_id = $1
		`;

		const deleteRequest = await pool.query(query, [id]);
		let result = { activity_id: parseInt(id) };

		res.status(200).json({ message: "Activity successfully deleted.", result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong when deleting the activity: ", error });
	}
}
