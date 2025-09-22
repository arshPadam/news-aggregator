import { Router } from "express";
import { db } from "../db.ts";

const router = Router();

// GET /api/articles?q=keyword
router.get("/", async (req, res) => {
  const query = (req.query.q as string) || "";

  try {
    const [rows] = await db.query(
      `SELECT * FROM Article WHERE title LIKE ? OR description LIKE ? ORDER BY publishedAt DESC LIMIT 50`,
      [`%${query}%`, `%${query}%`]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch articles from DB" });
  }
});

export default router;
