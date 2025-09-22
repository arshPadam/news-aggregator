import axios from "axios";

const API_URL = "http://localhost:5000/api"; // backend

export async function fetchArticles(query: string) {
  const response = await axios.get(`${API_URL}/articles?q=${query}`);
  return response.data;
}