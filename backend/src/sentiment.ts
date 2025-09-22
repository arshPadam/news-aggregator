import Sentiment from "sentiment";

const sentiment = new Sentiment();

export function analyzeSentiment(text: string): string {
  const result = sentiment.analyze(text);
  if (result.score > 0) return "positive";
  if (result.score < 0) return "negative";
  return "neutral";
}