import { Flame } from '@phosphor-icons/react';
import type { SkuHighlight } from '../data/summary';

interface SkuHighlightCardProps {
  sku: SkuHighlight;
}

const CATEGORY_COLORS: Record<SkuHighlight['category'], string> = {
  A: '#38bdf8',
  B: '#a855f7',
  C: '#f97316'
};

export function SkuHighlightCard({ sku }: SkuHighlightCardProps) {
  return (
    <article className="card sku-card" tabIndex={0}>
      <header>
        <div className="sku-card__title">
          <Flame size={22} weight="duotone" />
          <div>
            <h4>{sku.sku}</h4>
            <span className="muted">物料 {sku.code}</span>
          </div>
        </div>
        <span className="pill" style={{ backgroundColor: `${CATEGORY_COLORS[sku.category]}20`, color: CATEGORY_COLORS[sku.category] }}>
          {sku.category} 类 · {sku.share.toFixed(1)}%
        </span>
      </header>
      <dl>
        <div>
          <dt>年销量</dt>
          <dd>{(sku.sales / 10000).toFixed(2)} 万箱</dd>
        </div>
        <div>
          <dt>期末库存</dt>
          <dd>{(sku.finalInventory / 10000).toFixed(2)} 万箱</dd>
        </div>
        <div>
          <dt>移库出库</dt>
          <dd>{(sku.transfersOut / 10000).toFixed(2)} 万箱</dd>
        </div>
        <div>
          <dt>提前发货</dt>
          <dd>{(sku.earlyShipment / 10000).toFixed(2)} 万箱</dd>
        </div>
      </dl>
    </article>
  );
}

