import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { CategoryBreakdown } from '../data/summary';

interface CategoryChartProps {
  data: CategoryBreakdown[];
}

const COLORS: Record<CategoryBreakdown['label'], string> = {
  A: '#38bdf8',
  B: '#a855f7',
  C: '#f97316'
};

export function CategoryChart({ data }: CategoryChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        label: item.label,
        value: item.salesShare,
        skuCount: item.skuCount,
        sales: item.sales
      })),
    [data]
  );

  const totalSales = useMemo(() => data.reduce((acc, item) => acc + item.sales, 0), [data]);
  const totalLabel = `${(totalSales / 10000).toFixed(1)} 万箱`;

  return (
    <article className="card category-card" tabIndex={0}>
      <div className="section-header">
        <div>
          <h3>分类分布</h3>
          <p className="muted">按销售占比划分 A/B/C 类，检视爆品集中度与库位策略。</p>
        </div>
        <span className="pill">A 类库存目标 ≥60%</span>
      </div>
      <div className="category-card__chart">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {chartData.map((entry, index) => {
                const isActive = index === activeIndex;
                return (
                  <Cell
                    key={entry.label}
                    fill={COLORS[entry.label as CategoryBreakdown['label']]}
                    stroke={isActive ? '#e2e8f0' : 'transparent'}
                    strokeWidth={isActive ? 2 : 1}
                    cursor="pointer"
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="category-card__center">
          <span>总销量</span>
          <strong>{totalLabel}</strong>
        </div>
      </div>
      <ul className="category-card__legend">
        {data.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li
              key={item.label}
              className={isActive ? 'active' : ''}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="dot" style={{ background: COLORS[item.label] }} />
              <div>
                <p>{item.label} 类 · {item.skuCount} SKU</p>
                <span>{item.salesShare.toFixed(2)}% 销量</span>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

