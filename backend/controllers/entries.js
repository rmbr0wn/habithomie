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
