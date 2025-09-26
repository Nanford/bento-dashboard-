import { CalendarBlank, CloudArrowDown, Target } from '@phosphor-icons/react';
import './App.css';
import {
  categories,
  categoryCoverage,
  earlyShipmentItems,
  flowMix,
  insightCards,
  kpis,
  recommendations,
  ruleEvaluations,
  summaryHighlights,
  topSkus,
  transferLeaders,
  warehouseStats,
  workloadMetrics
} from './data/summary';
import { CategoryChart } from './components/CategoryChart';
import { CategoryCoverageChart } from './components/CategoryCoverageChart';
import { EarlyShipmentChart } from './components/EarlyShipmentChart';
import { FlowMixChart } from './components/FlowMixChart';
import { InsightCard } from './components/InsightCard';
import { KpiCard } from './components/KpiCard';
import { Recommendations } from './components/Recommendations';
import { RuleEvaluationPanel } from './components/RuleEvaluationPanel';
import { SkuHighlightCard } from './components/SkuHighlightCard';
import { TransferLeaderChart } from './components/TransferLeaderChart';
import { WarehouseCard } from './components/WarehouseCard';
import { WorkloadChart } from './components/WorkloadChart';

function formatNumber(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)} 万`;
  }
  return value.toFixed(0);
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>三仓协同可视化驾驶舱</h1>
          <p className="muted">聚焦爆品保障、移库效率与能力预警的实时分析面板。</p>
        </div>
        <div className="header-meta">
          <span>
            <CalendarBlank size={18} weight="duotone" /> 当期运营视图
          </span>
          <span>
            <CloudArrowDown size={18} weight="duotone" /> 数据快照 · 静态演示
          </span>
        </div>
      </header>

      <main className="app-grid">
        <section className="span-12 insight-banner">
          <div>
            <Target size={20} weight="duotone" />
            <div>
              <span>直发率</span>
              <strong>{formatPercent(summaryHighlights.directRate.current)}</strong>
              <p>目标 {formatPercent(summaryHighlights.directRate.target)}</p>
            </div>
          </div>
          <div>
            <Target size={20} weight="duotone" />
            <div>
              <span>A 类库存占比</span>
              <strong>{formatPercent(summaryHighlights.aClassInventoryShare.current)}</strong>
              <p>目标 {formatPercent(summaryHighlights.aClassInventoryShare.target)}</p>
            </div>
          </div>
          <div>
            <Target size={20} weight="duotone" />
            <div>
              <span>跨仓移库量</span>
              <strong>{formatNumber(summaryHighlights.transferVolume.current)} 箱</strong>
              <p>目标 ≤{formatNumber(summaryHighlights.transferVolume.target)} 箱</p>
            </div>
          </div>
        </section>

        <section className="span-12 kpi-grid">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        <section className="span-4">
          <CategoryChart data={categories} />
        </section>

        <section className="span-4">
          <CategoryCoverageChart data={categoryCoverage} />
        </section>

        <section className="span-4">
          <FlowMixChart data={flowMix} />
        </section>

        <section className="span-6">
          <WorkloadChart metrics={workloadMetrics} />
        </section>

        <section className="span-6">
          <TransferLeaderChart data={transferLeaders} />
        </section>

        <section className="span-6">
          <EarlyShipmentChart data={earlyShipmentItems} />
        </section>

        <section className="span-6 warehouse-stack">
          {warehouseStats.map((stat) => (
            <WarehouseCard key={stat.warehouse} stat={stat} />
          ))}
        </section>

        <section className="span-12">
          <RuleEvaluationPanel items={ruleEvaluations} />
        </section>

        <section className="span-12 insight-grid">
          {insightCards.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </section>

        <section className="span-8 narrative-card">
          <article className="card" tabIndex={0}>
            <div className="section-header">
              <div>
                <h3>运营提醒</h3>
                <p className="muted">依据当前数据整理的关键观察点。</p>
              </div>
            </div>
            <ul>
              <li>
                <span>直发率仍低于目标 2pp，可通过爆品直发优先与移库收敛提升。</span>
              </li>
              <li>
                <span>A 类库存占比 58.8%，需进一步压缩 A 类移库、提升补货频度。</span>
              </li>
              <li>
                <span>跨仓移库占比 48.2%，与同城移库的差距提示可优化路由。</span>
              </li>
              <li>
                <span>入库与综合作业负荷 &gt;80%，建议保持预警并配置弹性班次。</span>
              </li>
            </ul>
          </article>
        </section>

        <section className="span-4">
          <Recommendations items={recommendations} />
        </section>

        <section className="span-12 sku-grid">
          <div className="section-header">
            <div>
              <h3>爆品与优先保障 SKU</h3>
              <p className="muted">关注销量贡献 Top5，评估库存与移库压力。</p>
            </div>
          </div>
          <div className="sku-grid__items">
            {topSkus.map((sku) => (
              <SkuHighlightCard key={sku.code} sku={sku} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
