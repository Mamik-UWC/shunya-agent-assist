import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Widget } from '@/features/dashboards/types';

interface DashboardConfigState {
    selectedWidgets: Widget[];
    toggleWidget: (widgetId: string, enabled: boolean) => void;
    setSelectedWidgets: (widgets: Widget[]) => void;
    getEnabledWidgets: () => Widget[];
}

export const useDashboardConfig = create<DashboardConfigState>()(
    persist(
        (set, get) => ({
            selectedWidgets: [
                {
                    id: 'widget1',
                    type: 'kpi-card',
                    name: 'Active Sessions',
                    enabled: true,
                    config: {},
                },
                {
                    id: 'widget2',
                    type: 'kpi-card',
                    name: 'CSAT Score',
                    enabled: true,
                    config: {},
                },
                {
                    id: 'widget3',
                    type: 'kpi-card',
                    name: 'Avg Resolution',
                    enabled: true,
                    config: {},
                },
                {
                    id: 'widget9',
                    type: 'kpi-card',
                    name: 'Automation Rate',
                    enabled: true,
                    config: {},
                },
                {
                    id: 'widget4',
                    type: 'line-chart',
                    name: 'Sentiment Trend',
                    enabled: true,
                    config: {},
                },
                {
                    id: 'widget5',
                    type: 'pie-chart',
                    name: 'Intent Distribution',
                    enabled: true,
                    config: {},
                },
                {
                    id: 'widget6',
                    type: 'bar-chart',
                    name: 'Agent Performance',
                    enabled: false,
                    config: {},
                },
                {
                    id: 'widget7',
                    type: 'data-table',
                    name: 'Top Automations',
                    enabled: true,
                    config: {},
                },
            ],
            toggleWidget: (widgetId, enabled) =>
                set((state) => ({
                    selectedWidgets: state.selectedWidgets.map((widget) =>
                        widget.id === widgetId ? { ...widget, enabled } : widget
                    ),
                })),
            setSelectedWidgets: (widgets) => set({ selectedWidgets: widgets }),
            getEnabledWidgets: () => get().selectedWidgets.filter((w) => w.enabled),
        }),
        {
            name: 'dashboard-config-storage',
        }
    )
);
