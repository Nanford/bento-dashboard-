import type { InsightCard as InsightCardType } from '../data/summary';

interface InsightCardProps {
  insight: InsightCardType;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const indexLabel = (index + 1).toString().padStart(2, '0');

  return (
    <article className="card insight-card" tabIndex={0}>
      <header>
        <span className="badge">{indexLabel}</span>
        <h3>{insight.title}</h3>
      </header>
      <ul>
        {insight.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  );
}
