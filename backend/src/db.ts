import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "news_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testDBConnection() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("✅ MySQL connected successfully", rows);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
