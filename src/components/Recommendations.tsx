import { Sparkle } from '@phosphor-icons/react';
import type { Recommendation } from '../data/summary';

interface RecommendationsProps {
  items: Recommendation[];
}

export function Recommendations({ items }: RecommendationsProps) {
  return (
    <article className="card recommendations-card">
      <div className="section-header">
        <div>
          <h3>行动建议</h3>
          <p className="muted">结合规则与数据生成的优先动作清单。</p>
        </div>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item.title}>
            <div className="recommendations-card__title">
              <span className="badge">0{index + 1}</span>
              <h4>{item.title}</h4>
            </div>
            <p>{item.description}</p>
            <div className="recommendations-card__rules">
              <Sparkle size={16} weight="duotone" />
              <span>关联主题：{item.relatedTags.join("、")}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}


