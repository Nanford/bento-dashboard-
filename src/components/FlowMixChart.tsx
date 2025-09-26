import { Bar, CartesianGrid, Cell, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { FlowMixItem } from '../data/summary';

interface FlowMixChartProps {
  data: FlowMixItem[];
}

export function FlowMixChart({ data }: FlowMixChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    formattedVolume: Number((item.volume / 10000).toFixed(2)),
    formattedShare: item.share
  }));

  return (
    <article className="card flowmix-card" tabIndex={0}>
      <div className="section-header">
        <div>
          <h3>订单与移库路径占比</h3>
          <p className="muted">对比直发与各类移库的体量与占比，审视执行效率。</p>
        </div>
      </div>
      <div className="flowmix-card__chart">
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={chartData} barSize={42} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const item = payload[0].payload as (typeof chartData)[number];
                return (
                  <div className="tooltip-card">
                    <strong>{item.label}</strong>
                    <p>体量：{item.formattedVolume} 万箱</p>
                    <p>占比：{item.formattedShare}%</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="formattedShare" radius={[10, 10, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.label} fill={entry.accent} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <footer className="muted">目标：直发优先，同城移库替代跨仓移库。</footer>
    </article>
  );
}
