export interface Kpi {
  id: string;
  label: string;
  formattedValue: string;
  description: string;
  targetLabel?: string;
  deltaLabel?: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface CategoryBreakdown {
  label: 'A' | 'B' | 'C';
  skuCount: number;
  sales: number;
  salesShare: number;
}

export interface WarehouseStat {
  warehouse: string;
  skuCount: number;
  inbound: number;
  outbound: number;
  sales: number;
  finalInventory: number;
  earlyShipment: number;
}

export interface SkuHighlight {
  sku: string;
  code: string;
  category: 'A' | 'B' | 'C';
  sales: number;
  share: number;
  finalInventory: number;
  transfersOut: number;
  earlyShipment: number;
}

export interface WorkloadMetric {
  metric: string;
  baseline: number;
  threshold: number;
  current: number;
  loadPercent: number;
  status: 'ok' | 'watch' | 'alert';
  note: string;
}

export interface Recommendation {
  title: string;
  description: string;
  relatedTags: string[];
}

export interface SummaryHighlights {
  directRate: { current: number; target: number };
  transferVolume: { current: number; target: number };
  finalInventory: number;
  aClassInventoryShare: { current: number; target: number };
  earlyShipment: number;
  generatedAt: string;
}

export interface FlowMixItem {
  label: string;
  volume: number;
  share: number;
  accent: string;
}

export interface EarlyShipmentItem {
  sku: string;
  code: string;
  category: 'A' | 'B' | 'C';
  earlyShipment: number;
  share: number;
}

export interface InsightCard {
  id: string;
  title: string;
  highlights: string[];
}

export interface CategoryCoverageItem {
  label: 'A 类' | 'B 类' | 'C 类';
  days: number;
  targetDays: number;
  category: 'A' | 'B' | 'C';
}

export interface TransferLeaderItem {
  sku: string;
  code: string;
  category: 'A' | 'B' | 'C';
  transfersOut: number;
  sales: number;
  inventory: number;
}

export interface RuleEvaluation {
  id: string;
  title: string;
  actual: number;
  target: number;
  unit: string;
  status: 'pass' | 'risk' | 'alert';
  description: string;
}

export const kpis: Kpi[] = [
  {
    id: 'direct-rate',
    label: '直发率',
    formattedValue: '42.9%',
    description: '销售出库占总出库 42.9%，距离目标 44.9% 仍有 2.0pp 提升空间。',
    targetLabel: '目标 ≥44.9% (+2pp)',
    deltaLabel: '-2.0pp',
    trend: 'up'
  },
  {
    id: 'transfer-volume',
    label: '移库量',
    formattedValue: '67.0 万箱',
    description: '厂内+厂间移库出库合计 67.0 万箱，较目标 60.3 万箱偏高。',
    targetLabel: '目标 ≤60.3 万箱 (-10%)',
    deltaLabel: '+6.7 万箱',
    trend: 'down'
  },
  {
    id: 'final-inventory',
    label: '当前库存',
    formattedValue: '21.4 万箱',
    description: '仓内库存 21.4 万箱，其中 A 类占比 58.8%，逼近 60% 着陆线。',
    targetLabel: 'A 类库存占比 ≥60%',
    deltaLabel: '-1.2pp',
    trend: 'up'
  },
  {
    id: 'early-shipment',
    label: '提前发货',
    formattedValue: '5.29 万箱',
    description: '提前发货 5.29 万箱，78% 聚焦软蓝爆品，需强化补货节奏。',
    trend: 'neutral'
  }
];

export const categories: CategoryBreakdown[] = [
  { label: 'A', skuCount: 3, sales: 444210.2, salesShare: 74.43 },
  { label: 'B', skuCount: 5, sales: 119538, salesShare: 20.03 },
  { label: 'C', skuCount: 126, sales: 33067, salesShare: 5.54 }
];

export const categoryCoverage: CategoryCoverageItem[] = [
  { label: 'A 类', category: 'A', days: 103.3, targetDays: 3 },
  { label: 'B 类', category: 'B', days: 128.5, targetDays: 7 },
  { label: 'C 类', category: 'C', days: 509.7, targetDays: 15 }
];

export const warehouseStats: WarehouseStat[] = [
  {
    warehouse: '高架库',
    skuCount: 134,
    inbound: 1439827.32,
    outbound: 1390614.02,
    sales: 596815.2,
    finalInventory: 213964.6,
    earlyShipment: 52857
  }
];

export const topSkus: SkuHighlight[] = [
  {
    sku: '01103黄鹤楼（软蓝）',
    code: '04101103',
    category: 'A',
    sales: 361490,
    share: 60.57,
    finalInventory: 113790,
    transfersOut: 263681.8,
    earlyShipment: 40498
  },
  {
    sku: '81284黄鹤楼（硬金砂）',
    code: '04181284',
    category: 'A',
    sales: 42888.2,
    share: 7.19,
    finalInventory: 3090,
    transfersOut: 49662.2,
    earlyShipment: 1042
  },
  {
    sku: '81299黄鹤楼（硬红）',
    code: '04181299',
    category: 'A',
    sales: 39832,
    share: 6.67,
    finalInventory: 8836.4,
    transfersOut: 36967,
    earlyShipment: 4816
  },
  {
    sku: '01103S黄鹤楼（软蓝）',
    code: '04101103S',
    category: 'B',
    sales: 38091,
    share: 6.38,
    finalInventory: 0.4,
    transfersOut: 47048.2,
    earlyShipment: 0
  },
  {
    sku: '32226S红金龙（硬神州腾龙）',
    code: '04132226S',
    category: 'B',
    sales: 33477,
    share: 5.61,
    finalInventory: 6461.2,
    transfersOut: 39631.8,
    earlyShipment: 0
  }
];

export const transferLeaders: TransferLeaderItem[] = [
  { sku: '01103黄鹤楼（软蓝）', code: '04101103', category: 'A', transfersOut: 263681.8, sales: 361490, inventory: 113790 },
  { sku: '81287黄鹤楼（硬珍品）', code: '04181287', category: 'B', transfersOut: 50844, sales: 23063, inventory: 33630 },
  { sku: '81284黄鹤楼（硬金砂）', code: '04181284', category: 'A', transfersOut: 49662.2, sales: 42888.2, inventory: 3090 },
  { sku: '01103S黄鹤楼（软蓝）', code: '04101103S', category: 'B', transfersOut: 47048.2, sales: 38091, inventory: 0.4 },
  { sku: '32226S红金龙（硬神州腾龙）', code: '04132226S', category: 'B', transfersOut: 39631.8, sales: 33477, inventory: 6461.2 }
];

export const workloadMetrics: WorkloadMetric[] = [
  {
    metric: '入库作业',
    baseline: 3808,
    threshold: 4569.6,
    current: Number((1439827.32 / 365).toFixed(1)),
    loadPercent: 86.3,
    status: 'watch',
    note: '接近能力上限，需提前规划补货波次与高峰班次。'
  },
  {
    metric: '销售出库',
    baseline: 3873,
    threshold: 4647.6,
    current: Number((596815.2 / 365).toFixed(1)),
    loadPercent: 35.2,
    status: 'ok',
    note: '直发承载稳定，仍可释放部分爆品订单。'
  },
  {
    metric: '移库出库',
    baseline: 1924,
    threshold: 2308.8,
    current: Number((670232.12 / 365).toFixed(1)),
    loadPercent: 79.5,
    status: 'watch',
    note: '移库压力偏高，应配合分类策略优化北/集并缓冲。'
  },
  {
    metric: '综合作业',
    baseline: 3839,
    threshold: 4606.8,
    current: Number((1390614.02 / 365).toFixed(1)),
    loadPercent: 82.7,
    status: 'watch',
    note: '综合负荷超过 80%，建议保持预警与波次/班次联动。'
  }
];

export const ruleEvaluations: RuleEvaluation[] = [
  {
    id: 'rule-deployment',
    title: 'A 类库存占比',
    actual: 58.76,
    target: 60,
    unit: '%',
    status: 'risk',
    description: 'A 类库存占比与 60% 目标仅差 1.2pp，需加强高架库补货。'
  },
  {
    id: 'rule-coverage',
    title: 'A/B/C 覆盖天数',
    actual: 103.3,
    target: 3,
    unit: '天 (A 类)',
    status: 'alert',
    description: 'A 类覆盖 103 天，远超 3 天目标，提示移库/补货节奏需优化。'
  },
  {
    id: 'rule-transfer',
    title: '跨仓移库占比',
    actual: 48.2,
    target: 43,
    unit: '%',
    status: 'alert',
    description: '跨仓移库占比 48.2%，较计划上限 43% 偏高，需强化同城路径。'
  },
  {
    id: 'rule-capacity',
    title: '综合负荷率',
    actual: 82.7,
    target: 85,
    unit: '%',
    status: 'pass',
    description: '综合负荷 82.7%，低于 85% 红线，但接近预警需持续监控。'
  }
];

export const recommendations: Recommendation[] = [
  {
    title: '提升 A 类库存垂直补货频次',
    description: 'A 类库存占比 58.8%，距离 60% 目标仅差 1.2pp，可通过缩短补货周期和减少 A 类移库实现。',
    relatedTags: ['库存策略', '爆品保障']
  },
  {
    title: '收敛跨仓移库占比',
    description: '移库量高于目标 6.7 万箱，建议优先引导直发与同城分流，压缩跨仓路径。',
    relatedTags: ['移库管理', '波次调度']
  },
  {
    title: '同步提前发货与缓冲位',
    description: '提前发货 5.29 万箱主要集中于软蓝系列，应提前锁定北库缓冲与生产排期。',
    relatedTags: ['旺季准备', '补货节奏']
  },
  {
    title: '建立负荷预警闭环',
    description: '入库与综合作业负荷均高于 80%，需要常态化监测并触发班次/订单让渡策略。',
    relatedTags: ['能力管理']
  }
];

export const summaryHighlights: SummaryHighlights = {
  directRate: { current: 42.92, target: 44.92 },
  transferVolume: { current: 670232.12, target: 603208.91 },
  finalInventory: 213964.6,
  aClassInventoryShare: { current: 58.76, target: 60 },
  earlyShipment: 52857,
  generatedAt: '最新运营快照'
};

export const flowMix: FlowMixItem[] = [
  { label: '直发', volume: 596815.2, share: 42.92, accent: '#38bdf8' },
  { label: '同城移库', volume: 123566.7, share: 8.89, accent: '#22c55e' },
  { label: '跨仓移库', volume: 670232.12, share: 48.2, accent: '#f97316' }
];

export const earlyShipmentItems: EarlyShipmentItem[] = [
  { sku: '01103黄鹤楼（软蓝）', code: '04101103', category: 'A', earlyShipment: 40498, share: 76.62 },
  { sku: '81287黄鹤楼（硬珍品）', code: '04181287', category: 'B', earlyShipment: 5030, share: 9.52 },
  { sku: '81299黄鹤楼（硬红）', code: '04181299', category: 'A', earlyShipment: 4816, share: 9.11 },
  { sku: '81284黄鹤楼（硬金砂）', code: '04181284', category: 'A', earlyShipment: 1042, share: 1.97 },
  { sku: '81207黄鹤楼（硬金砂）', code: '04181207', category: 'B', earlyShipment: 580, share: 1.10 }
];

export const insightCards: InsightCard[] = [
  {
    id: 'insight-demand',
    title: '爆品驱动需求结构',
    highlights: [
      'Top3 SKU 贡献 74% 销量，软蓝单品占 60.6%。',
      '提前发货近 4.0 万箱，主要由软蓝系列触发。',
      '需围绕爆品保证库存与直发能力，防止重度移库。'
    ]
  },
  {
    id: 'insight-transfer',
    title: '移库占比偏高',
    highlights: [
      '移库出库占总出库 57.1%，其中跨仓移库 48.2%。',
      '同城移库量 12.4 万箱，存在二次搬运机会。',
      '建议结合分类策略优化北库与集并库缓冲位。'
    ]
  },
  {
    id: 'insight-capacity',
    title: '能力阈值临近预警线',
    highlights: [
      '入库与综合作业负荷分别为 86% / 83%。',
      '若移库进一步抬升，将挤占直发窗口。',
      '需要保持预警与波次、班次联动响应。'
    ]
  }
];
