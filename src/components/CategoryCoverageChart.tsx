import { CartesianGrid, ComposedChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, Cell } from 'recharts';
import type { CategoryCoverageItem } from '../data/summary';

interface CategoryCoverageChartProps {
  data: CategoryCoverageItem[];
}

const CATEGORY_COLORS: Record<CategoryCoverageItem['category'], string> = {
  A: '#38bdf8',
  B: '#a855f7',
  C: '#f97316'
};

export function CategoryCoverageChart({ data }: CategoryCoverageChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    diff: Number((item.days - item.targetDays).toFixed(1))
  }));

  return (
    <article className="card coverage-card" tabIndex={0}>
      <div className="section-header">
        <div>
          <h3>分类覆盖天数</h3>
          <p className="muted">依据库存上下限规则，比较实际库存覆盖天数与目标 N 日。</p>
        </div>
        <span className="pill">规则要求：A3 / B7 / C15 天</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart layout="vertical" data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, (chartData[chartData.length - 1]?.days ?? 0) * 1.1]} />
          <YAxis dataKey="label" type="category" tick={{ fill: '#cbd5f5', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0].payload as (typeof chartData)[number];
              return (
                <div className="tooltip-card">
                  <strong>{item.label}</strong>
                  <p>覆盖天数：{item.days.toFixed(1)} 天</p>
                  <p>目标：{item.targetDays} 天</p>
                  <p>超额：{item.diff >= 0 ? '+' : ''}{item.diff.toFixed(1)} 天</p>
                </div>
              );
            }}
          />
          {chartData.map((item) => (
            <ReferenceLine key={item.label} x={item.targetDays} stroke="#94a3b8" strokeDasharray="4 4" />
          ))}
          <Bar dataKey="days" radius={[0, 10, 10, 0]}>
            {chartData.map((item) => (
              <Cell key={item.label} fill={CATEGORY_COLORS[item.category]} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </article>
  );
}
