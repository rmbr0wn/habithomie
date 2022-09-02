import pool from "../db.js";

export const getUserEntries = async (req, res) => {
  try {
    console.log("Get user entries working.");

    res.status(200).json({ message: "Get user entries working."});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with getUserEntries: ", error});
  }
}
