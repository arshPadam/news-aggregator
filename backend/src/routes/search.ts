import { Router } from "express";
import { fetchNews } from "../services/newsapi.ts";
import { analyzeSentiment } from "../sentiment.ts";
import { db } from "../db.ts";

const router = Router();

router.get("/", async (req, res) => {
  const query = req.query.q as string;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const articles = await fetchNews(query);

    for (const a of articles) {
      const sentiment = analyzeSentiment(a.title + " " + (a.description || ""));

      try {
        await db.query(
          `INSERT INTO Article (title, description, url, source, publishedAt, sentiment)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [a.title, a.description, a.url, a.source.name, new Date(a.publishedAt).toISOString().slice(0, 19).replace("T", " "), sentiment]
        );
      } catch (err: any) {
        // Skip duplicates
        if (err.code !== "ER_DUP_ENTRY") console.error(err);
      }
    }

    res.json({ message: `Fetched and stored ${articles.length} articles for '${query}'` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
