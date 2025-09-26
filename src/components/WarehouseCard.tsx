import { Factory, ArrowUpRight } from '@phosphor-icons/react';
import type { WarehouseStat } from '../data/summary';

interface WarehouseCardProps {
  stat: WarehouseStat;
}

const metricList: Array<{ key: 'inbound' | 'outbound' | 'sales' | 'finalInventory' | 'earlyShipment'; label: string; unit?: string }> = [
  { key: 'inbound', label: '入库总量', unit: '箱' },
  { key: 'outbound', label: '出库总量', unit: '箱' },
  { key: 'sales', label: '销售出库', unit: '箱' },
  { key: 'finalInventory', label: '期末库存', unit: '箱' },
  { key: 'earlyShipment', label: '提前发货', unit: '箱' }
];

export function WarehouseCard({ stat }: WarehouseCardProps) {
  return (
    <article className="card warehouse-card" tabIndex={0}>
      <header>
        <div className="warehouse-card__title">
          <Factory size={28} weight="duotone" />
          <div>
            <h3>{stat.warehouse}</h3>
            <span className="muted">SKU {stat.skuCount} 个</span>
          </div>
        </div>
        <ArrowUpRight size={20} weight="bold" />
      </header>
      <ul>
        {metricList.map((item) => (
          <li key={item.key}>
            <span>{item.label}</span>
            <strong>{(stat[item.key] / 10000).toFixed(2)} 万{item.unit}</strong>
          </li>
        ))}
      </ul>
    </article>
  );
}


