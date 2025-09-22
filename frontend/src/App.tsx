import React, { useState } from "react";
import { fetchArticles } from "./services/api";
import ArticleList from "./components/ArticleList";

const App: React.FC = () => {
  const [query, setQuery] = useState("AI");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchArticles(query);
    setArticles(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>News Aggregator MVP</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter keyword"
      />
      <button onClick={handleSearch} style={{ marginLeft: 8 }}>
        Search
      </button>

      {loading ? <p>Loading...</p> : <ArticleList articles={articles} />}
    </div>
  );
};

export default App;
