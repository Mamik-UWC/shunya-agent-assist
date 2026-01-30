export interface DashboardMetricData {
    id: string;
    title: string;
    value: string;
    trend?: {
        value: string;
        direction: 'up' | 'down';
        isPositive: boolean;
    };
    comparison?: string;
    icon: string;
    iconColor: string;
    progress?: number;
    progressLabel?: string;
    miniChart?: number[];
    status?: string;
}

export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
}

export interface DashboardChartData {
    id: string;
    title: string;
    description: string;
    type: 'line' | 'bar' | 'pie' | 'donut';
    data: ChartDataPoint[];
    status?: string;
    total?: number;
}

export interface DashboardTableData {
    id: string;
    title: string;
    description?: string;
    columns: string[];
    rows: Record<string, string | number>[];
}

// Mock data for KPI cards
export const mockMetricsData: Record<string, DashboardMetricData> = {
    widget1: {
        id: 'widget1',
        title: 'Active Sessions',
        value: '1.2k',
        trend: {
            value: '+12.5%',
            direction: 'up',
            isPositive: true,
        },
        icon: '📊',
        iconColor: 'bg-blue-500',
        miniChart: [45, 52, 48, 65, 72, 85, 95],
    },
    widget2: {
        id: 'widget2',
        title: 'CSAT Score',
        value: '4.8',
        comparison: 'vs 4.8 AVG',
        icon: '😊',
        iconColor: 'bg-amber-500',
        progress: 96,
        progressLabel: 'EXCELLENT',
        status: '⭐⭐⭐⭐⭐',
    },
    widget3: {
        id: 'widget3',
        title: 'Avg Resolution',
        value: '1m 42s',
        trend: {
            value: '-14%',
            direction: 'down',
            isPositive: true,
        },
        icon: '⏱️',
        iconColor: 'bg-purple-500',
        comparison: 'EST. SAVINGS +$12.4k / mo',
    },
    widget9: {
        id: 'widget9',
        title: 'Automation Rate',
        value: '84.2%',
        trend: {
            value: 'Target 90%',
            direction: 'up',
            isPositive: true,
        },
        icon: '🤖',
        iconColor: 'bg-emerald-500',
        progress: 84.2,
    },
};

// Mock data for charts
export const mockChartsData: Record<string, DashboardChartData> = {
    widget4: {
        id: 'widget4',
        title: 'Sentiment Trend',
        description: 'Emotional trajectory over the last 30 days',
        type: 'bar',
        status: 'POSITIVE',
        data: [
            { label: 'JAN 01', value: 65, color: '#3b82f6' },
            { label: 'JAN 05', value: 72, color: '#3b82f6' },
            { label: 'JAN 10', value: 58, color: '#3b82f6' },
            { label: 'JAN 15', value: 85, color: '#3b82f6' },
            { label: 'JAN 20', value: 78, color: '#3b82f6' },
            { label: 'JAN 25', value: 92, color: '#3b82f6' },
            { label: 'JAN 30', value: 88, color: '#3b82f6' },
            { label: 'TODAY', value: 95, color: '#60a5fa' },
        ],
    },
    widget5: {
        id: 'widget5',
        title: 'Intent Distribution',
        description: 'Primary user inquiry categories',
        type: 'donut',
        total: 1402,
        data: [
            { label: 'Support', value: 42, color: '#3b82f6' },
            { label: 'Pricing', value: 28, color: '#10b981' },
            { label: 'FAQ', value: 18, color: '#f59e0b' },
            { label: 'Returns', value: 12, color: '#8b5cf6' },
        ],
    },
    widget6: {
        id: 'widget6',
        title: 'Agent Performance',
        description: 'Efficiency: Human vs AI comparison',
        type: 'bar',
        data: [
            { label: 'AI Agent Alpha', value: 98.2, color: '#3b82f6' },
            { label: 'Human Agent 1', value: 85.4, color: '#64748b' },
            { label: 'Human Agent 2', value: 82.1, color: '#64748b' },
            { label: 'AI Agent Beta', value: 95.7, color: '#3b82f6' },
        ],
    },
};

// Mock data for tables
export const mockTablesData: Record<string, DashboardTableData> = {
    widget7: {
        id: 'widget7',
        title: 'Top Automations',
        columns: ['Rank', 'Automation / Agent', 'Success Rate', 'Total Calls'],
        rows: [
            { rank: 1, name: 'AI Agent Alpha', successRate: '98.2%', totalCalls: 1245 },
            { rank: 2, name: 'Order Status Bot', successRate: '96.8%', totalCalls: 982 },
            { rank: 3, name: 'FAQ Assistant', successRate: '94.5%', totalCalls: 756 },
            { rank: 4, name: 'Returns Handler', successRate: '92.1%', totalCalls: 543 },
            { rank: 5, name: 'Pricing Bot', successRate: '89.7%', totalCalls: 421 },
        ],
    },
    widget8: {
        id: 'widget8',
        title: 'Agent Performance',
        description: 'Efficiency: Human vs AI comparison',
        columns: ['Rank', 'Agent', 'Efficiency'],
        rows: [
            { rank: 1, name: 'AI Agent Alpha', efficiency: '98.2%' },
            { rank: 2, name: 'Human Agent 1', efficiency: '85.4%' },
            { rank: 3, name: 'Human Agent 2', efficiency: '82.1%' },
        ],
    },
};
