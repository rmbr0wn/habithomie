import pool from "../db.js";

export const createTimeEntry = async (req, res) => {
  const { user_id, activity_id, time_value, entry_date } = req.body;

  try {
    let query = `
      INSERT INTO times (user_id, activity_id, time_value, entry_date)
      VALUES ($1, $2, $3, $4)
      RETURNING time_id, activity_id, time_value, entry_date;
    `;

    let insertRequest = await pool.query(query, [user_id, activity_id, time_value, entry_date]);
    let result = insertRequest.rows[0];

    res.status(201).json({ message: "New time entry created.", result: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when creating a time entry: ", error});
  }
}

export const getTimeEntries = async (req, res) => {
  const { userId } = req.query;

  try {
    let query = `
      SELECT * FROM times WHERE user_id = $1;
    `;

    const timesList = await pool.query(query, [userId]);

    res.status(200).json({ result: timesList.rows });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when fetching time entries: ", error });
  }
}

export const updateTimeEntry = async (req, res) => {
  const { time_id, user_id, activity_id, time_value, entry_date } = req.body;

  try {
    let query = `
      UPDATE times
      SET activity_id = $1, time_value = $2, entry_date = $3
      WHERE time_id = $4 AND user_id = $5
    `;

    const updatedEntry = await pool.query(query, [activity_id, time_value, entry_date, time_id, user_id]);
    let result = req.body;

    res.status(200).json({ message: "Time entry successfully updated.", result: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong when updating the time entry: ", error });
  }
}

export const deleteTimeEntry = async (req, res) => {
	const { id } = req.params;

	try {
    let timeId = parseInt(id);
		let query = `
			DELETE FROM times
			WHERE time_id = $1
		`;

		const deleteRequest = await pool.query(query, [timeId]);
		let result = { time_id: timeId };

		res.status(200).json({ message: "Entry successfully deleted.", result });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong when deleting the entry: ", error });
	}
}
