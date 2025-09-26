import type { RuleEvaluation } from '../data/summary';

interface RuleEvaluationPanelProps {
  items: RuleEvaluation[];
}

const STATUS_COLORS: Record<RuleEvaluation['status'], string> = {
  pass: '#22c55e',
  risk: '#facc15',
  alert: '#f97316'
};

export function RuleEvaluationPanel({ items }: RuleEvaluationPanelProps) {
  return (
    <section className="rule-eval-grid">
      {items.map((item) => {
        const ratio = item.status === 'alert' && item.target === 0 ? 1 : item.actual / item.target;
        const normalized = item.status === 'pass' ? Math.min(ratio, 1) : Math.min(ratio, 1.4);
        return (
          <article key={item.id} className={`card rule-eval-card status-${item.status}`} tabIndex={0}>
            <header>
              <h4>{item.title}</h4>
              <span style={{ color: STATUS_COLORS[item.status] }}>{item.status === 'pass' ? '达标' : item.status === 'risk' ? '轻度偏离' : '严重偏离'}</span>
            </header>
            <div className="rule-eval-bar">
              <div
                className="rule-eval-bar__fill"
                style={{ width: `${Math.min(normalized * 100, 140)}%`, background: STATUS_COLORS[item.status] }}
              />
              <span className="rule-eval-bar__target" />
            </div>
            <dl>
              <div>
                <dt>当前</dt>
                <dd>
                  {item.actual.toFixed(2)} {item.unit}
                </dd>
              </div>
              <div>
                <dt>目标</dt>
                <dd>
                  {item.target.toFixed(2)} {item.unit}
                </dd>
              </div>
            </dl>
            <p className="muted">{item.description}</p>
          </article>
        );
      })}
    </section>
  );
}
