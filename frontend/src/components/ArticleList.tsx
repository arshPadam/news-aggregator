import React from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment: string;
}

interface Props {
  articles: Article[];
}

const ArticleList: React.FC<Props> = ({ articles }) => {
  return (
    <div>
      {articles.map((a, index) => (
        <div key={index} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <p>
            <b>Source:</b> {a.source} | <b>Published:</b> {a.publishedAt} | <b>Sentiment:</b>{" "}
            {a.sentiment}
          </p>
          <a href={a.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
