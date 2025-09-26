import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import type { EarlyShipmentItem } from '../data/summary';

interface EarlyShipmentChartProps {
  data: EarlyShipmentItem[];
}

export function EarlyShipmentChart({ data }: EarlyShipmentChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    formattedVolume: Number((item.earlyShipment / 1000).toFixed(1)),
    formattedShare: Number(item.share.toFixed(2))
  }));

  return (
    <article className="card earlyshipment-card" tabIndex={0}>
      <div className="section-header">
        <div>
          <h3>提前发货分布</h3>
          <p className="muted">识别提前发货集中的 SKU，规划补货与缓冲策略。</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 20, left: 12, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            dataKey="sku"
            type="category"
            width={160}
            interval={0}
            tick={{ fill: '#cbd5f5', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(56, 189, 248, 0.1)' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0].payload as (typeof chartData)[number];
              return (
                <div className="tooltip-card">
                  <strong>{item.sku}</strong>
                  <p>提前发货 {(item.earlyShipment / 10000).toFixed(2)} 万箱</p>
                  <p>占比 {item.formattedShare}%</p>
                </div>
              );
            }}
          />
          <Bar dataKey="formattedVolume" radius={[0, 10, 10, 0]} fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
}
