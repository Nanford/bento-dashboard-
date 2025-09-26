import { ArrowDownRight, ArrowUpRight, Minus } from '@phosphor-icons/react';
import clsx from 'clsx';
import type { Kpi } from '../data/summary';

interface KpiCardProps {
  kpi: Kpi;
}

function resolveDeltaTone(kpi: Kpi) {
  if (!kpi.deltaLabel || kpi.trend === 'neutral') {
    return 'neutral';
  }
  const trimmed = kpi.deltaLabel.trim();
  const isPositiveDelta = trimmed.startsWith('+');
  const isNegativeDelta = trimmed.startsWith('-');

  if (kpi.trend === 'up') {
    if (isPositiveDelta) return 'positive';
    if (isNegativeDelta) return 'negative';
  }
  if (kpi.trend === 'down') {
    if (isNegativeDelta) return 'positive';
    if (isPositiveDelta) return 'negative';
  }
  return 'neutral';
}

export function KpiCard({ kpi }: KpiCardProps) {
  const tone = resolveDeltaTone(kpi);
  const Icon =
    tone === 'positive' ? ArrowUpRight : tone === 'negative' ? ArrowDownRight : Minus;

  return (
    <article className="card kpi-card" tabIndex={0}>
      <div className="kpi-card__header">
        <span className="card-label">{kpi.label}</span>
        {kpi.targetLabel ? <span className="kpi-card__target">{kpi.targetLabel}</span> : null}
      </div>
      <div className="kpi-card__value">{kpi.formattedValue}</div>
      <p className="muted">{kpi.description}</p>
      {kpi.deltaLabel ? (
        <div className={clsx('kpi-card__delta', tone)}>
          <Icon size={16} weight="bold" />
          <span>{kpi.deltaLabel}</span>
        </div>
      ) : null}
    </article>
  );
}

