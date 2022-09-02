import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "flashlight",
  host: "localhost",
  port: 5432,
  database: "habithomie"
})

export default pool;
