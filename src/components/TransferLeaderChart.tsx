import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TransferLeaderItem } from '../data/summary';

interface TransferLeaderChartProps {
  data: TransferLeaderItem[];
}

export function TransferLeaderChart({ data }: TransferLeaderChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    transfers: Number((item.transfersOut / 10000).toFixed(2)),
    salesVolume: Number((item.sales / 10000).toFixed(2))
  }));

  return (
    <article className="card transfer-card" tabIndex={0}>
      <div className="section-header">
        <div>
          <h3>移库贡献 Top5 SKU</h3>
          <p className="muted">对比各 SKU 的移库与销量体量，识别驱动规则压力的单品。</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis dataKey="sku" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(248, 113, 113, 0.08)' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0].payload as (typeof chartData)[number];
              return (
                <div className="tooltip-card">
                  <strong>{item.sku}</strong>
                  <p>移库出库：{item.transfers.toFixed(2)} 万箱</p>
                  <p>销量：{item.salesVolume.toFixed(2)} 万箱</p>
                  <p>库存：{(item.inventory / 10000).toFixed(2)} 万箱</p>
                </div>
              );
            }}
          />
          <Legend wrapperStyle={{ color: '#cbd5f5' }} />
          <Bar dataKey="transfers" name="移库出库 (万箱)" radius={[6, 6, 0, 0]} fill="#f97316" />
          <Bar dataKey="salesVolume" name="销量 (万箱)" radius={[6, 6, 0, 0]} fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
}
