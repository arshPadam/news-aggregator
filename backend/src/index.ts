import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDBConnection } from "./db.ts";
import searchRouter from "./routes/search.ts";
import articlesRouter from "./routes/articles.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/search", searchRouter)
app.use("/api/articles", articlesRouter);

app.get("/ping", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await testDBConnection();
});