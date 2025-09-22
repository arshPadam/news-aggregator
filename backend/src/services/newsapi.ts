import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

export async function fetchNews(query: string) {
  const response = await axios.get(BASE_URL, {
    params: {
      q: query,
      sortBy: "publishedAt",
      language: "en",
      apiKey: API_KEY,
      pageSize: 10
    }
  });

  return response.data.articles;
}
