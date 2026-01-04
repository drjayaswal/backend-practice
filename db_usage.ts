// FOR FUTURE USE
import { pool } from "./app/api/database/db";

const [rows] = await pool.query("SELECT * FROM users");
console.log(rows);