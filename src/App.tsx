import { useEffect, useMemo, useState, type ComponentType } from 'react';
import {
  CalendarBlank,
  Clock,
  Target,
  SquaresFour,
  ChartPieSlice,
  ArrowsLeftRight,
  ClipboardText
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';
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

type TabId = 'overview' | 'inventory' | 'operations' | 'governance';

interface NavItem {
  id: TabId;
  label: string;
  description: string;
  icon: ComponentType<IconProps>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    label: '总览',
    description: '核心指标与仓配洞察',
    icon: SquaresFour
  },
  {
    id: 'inventory',
    label: '库存结构',
    description: 'ABC 占比与仓储分布',
    icon: ChartPieSlice
  },
  {
    id: 'operations',
    label: '执行效率',
    description: '流向与作业负荷',
    icon: ArrowsLeftRight
  },
  {
    id: 'governance',
    label: '规则联动',
    description: '规则达成与调整建议',
    icon: ClipboardText
  }
];

function formatNumber(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)} 万`;
  }
  return value.toFixed(0);
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

const dateTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

function formatDateTime(value: Date): string {
  return dateTimeFormatter.format(value);
}
function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const activeItem = useMemo(
    () => NAV_ITEMS.find((item) => item.id === activeTab) ?? NAV_ITEMS[0],
    [activeTab]
  );
    const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);
const ActiveIcon = activeItem.icon;

  const operationsNotes = useMemo(() => {
    const notes: string[] = [];
    const direct = flowMix.find((item) => item.label.includes('直'));
    const cross = flowMix.find((item) => item.label.includes('跨'));
    const highLoad = workloadMetrics.filter((item) => item.loadPercent >= 80);
    const early = earlyShipmentItems[0];

    if (direct) {
      notes.push(`直发路径占比 ${direct.share.toFixed(1)}%，保持主通路发运优势。`);
    }
    if (cross) {
      notes.push(`跨仓移库占比 ${cross.share.toFixed(1)}%，需结合波次削峰压降跨仓频次。`);
    }
    highLoad.forEach((item) => {
      notes.push(`${item.metric} 负荷 ${item.loadPercent}% ，${item.note}`);
    });
    if (early) {
      notes.push(`重点 SKU ${early.sku} 提前发货 ${formatNumber(early.earlyShipment)} 箱，跟进补货节奏。`);
    }

    return notes.length ? notes.slice(0, 4) : ['持续监控执行效率核心指标。'];
  }, [flowMix, workloadMetrics, earlyShipmentItems]);

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <Target size={26} weight="duotone" />
          <div>
            <h2>三仓联动驾驶舱</h2>
            <p>库存均衡策略视图</p>
          </div>
        </div>
        <nav className="app-nav" aria-label="数据分区导航">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                className={`app-nav__item${isActive ? ' active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                aria-pressed={isActive}
              >
                <Icon size={20} weight="duotone" />
                <div>
                  <span>{item.label}</span>
                  <p>{item.description}</p>
                </div>
              </button>
            );
          })}
        </nav>
        <footer className="app-sidebar__footer">
          <span>联动策略</span>
          <strong>多仓执行指引</strong>
        </footer>
      </aside>

      <div className="app">
        <header className="app-header">
          <div>
            <h1>联动协同可视化驾驶舱</h1>
            <p className="muted">聚焦品规结构、移库效率与能力阈值的静态分析。</p>
          </div>
          <div className="header-meta">
            <span>
              <CalendarBlank size={18} weight="duotone" /> 指标面板
            </span>
            <span>
              <Clock size={18} weight="duotone" /> {formatDateTime(currentTime)}
            </span>
            <span className="header-meta__active">
              <ActiveIcon size={18} weight="duotone" /> {activeItem.label}
            </span>
          </div>
        </header>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="app-grid">
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
                    <span>A 类占有</span>
                    <strong>{formatPercent(summaryHighlights.aClassInventoryShare.current)}</strong>
                    <p>目标 {formatPercent(summaryHighlights.aClassInventoryShare.target)}</p>
                  </div>
                </div>
                <div>
                  <Target size={20} weight="duotone" />
                  <div>
                    <span>移库总量</span>
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

              <section className="span-12 insight-grid">
                {insightCards.map((insight, index) => (
                  <InsightCard key={insight.id} insight={insight} index={index} />
                ))}
              </section>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="app-grid">
              <section className="span-4">
                <CategoryChart data={categories} />
              </section>

              <section className="span-4">
                <CategoryCoverageChart data={categoryCoverage} />
              </section>

              <section className="span-4 warehouse-stack">
                {warehouseStats.map((stat) => (
                  <WarehouseCard key={stat.warehouse} stat={stat} />
                ))}
              </section>

              <section className="span-12 sku-grid">
                <div className="section-header">
                  <div>
                    <h3>高频 SKU 监控</h3>
                    <p className="muted">聚焦 ABC 中前 5 位品规，观察库存与移库压力。</p>
                  </div>
                </div>
                <div className="sku-grid__items">
                  {topSkus.map((sku) => (
                    <SkuHighlightCard key={sku.code} sku={sku} />
                  ))}
                </div>
              </section>
            </div>
          )}

                    {activeTab === 'operations' && (
            <div className="operations-rows">
              <section className="operations-rows__group operations-rows__group--dual">
                <div className="operations-rows__item">
                  <FlowMixChart data={flowMix} />
                </div>
                <div className="operations-rows__item">
                  <TransferLeaderChart data={transferLeaders} />
                </div>
              </section>

              <section className="operations-rows__group">
                <div className="operations-rows__item">
                  <WorkloadChart metrics={workloadMetrics} />
                </div>
              </section>

              <section className="operations-rows__group operations-rows__group--dual">
                <div className="operations-rows__item">
                  <EarlyShipmentChart data={earlyShipmentItems} />
                </div>
                <div className="operations-rows__item operations-rows__item--summary">
                  <article className="card operations-summary-card" tabIndex={0}>
                    <div className="section-header">
                      <div>
                        <h3>执行效率点评</h3>
                        <p className="muted">结合作业负荷与订单流向，突出立即关注点。</p>
                      </div>
                    </div>
                    <ul className="operations-summary-card__list">
                      {operationsNotes.map((note) => (
                        <li key={note}>
                          <span className="dot" />
                          <p>{note}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="app-grid">
              <section className="span-12">
                <RuleEvaluationPanel items={ruleEvaluations} />
              </section>

              <section className="span-8 narrative-card">
                <article className="card" tabIndex={0}>
                  <div className="section-header">
                    <div>
                      <h3>运营提示</h3>
                      <p className="muted">根据规则执行状态整理的重点动作。</p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <span>直发水平距离目标 2pp，可通过高架库补货节奏与优先策略提速。</span>
                    </li>
                    <li>
                      <span>A 类占比低于 60% 目标，应聚焦动销补货与 SKU 挑选。</span>
                    </li>
                    <li>
                      <span>移库占比 48.2%，需要优化跨仓路径，压缩同城移库比例。</span>
                    </li>
                    <li>
                      <span>综合作业负荷已接近阈值，需保持波次调整与预警机制。</span>
                    </li>
                  </ul>
                </article>
              </section>

              <section className="span-4">
                <Recommendations items={recommendations} />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;











