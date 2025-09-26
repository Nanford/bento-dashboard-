import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import type { WorkloadMetric } from '../data/summary';

interface WorkloadChartProps {
  metrics: WorkloadMetric[];
}

export function WorkloadChart({ metrics }: WorkloadChartProps) {
  const chartData = metrics.map((metric) => ({
    name: metric.metric,
    current: Number(metric.current.toFixed(1)),
    threshold: Number(metric.threshold.toFixed(1)),
    loadPercent: metric.loadPercent,
    status: metric.status,
    note: metric.note
  }));

  return (
    <article className="card workload-card" tabIndex={0}>
      <div className="section-header">
        <div>
          <h3>能力阈值监控</h3>
          <p className="muted">对比历史日均×1.2 阈值与当前强度，识别波动风险。</p>
        </div>
      </div>
      <div className="workload-card__chart">
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const item = payload[0].payload;
                return (
                  <div className="tooltip-card">
                    <strong>{item.name}</strong>
                    <p>当前：{item.current} 箱/日</p>
                    <p>阈值：{item.threshold} 箱/日</p>
                    <p>负荷率：{item.loadPercent}%</p>
                    <span className="muted">{item.note}</span>
                  </div>
                );
              }}
            />
            <Bar dataKey="current" radius={[6, 6, 0, 0]} fill="#38bdf8" maxBarSize={36} />
            <Line type="monotone" dataKey="threshold" stroke="#f97316" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <ul className="workload-card__list">
        {metrics.map((metric) => (
          <li key={metric.metric} className={`status-${metric.status}`}>
            <div>
              <span>{metric.metric}</span>
              <strong>{metric.loadPercent}% 负荷</strong>
            </div>
            <p className="muted">{metric.note}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}


