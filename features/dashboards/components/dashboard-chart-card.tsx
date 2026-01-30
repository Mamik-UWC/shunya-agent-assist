'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { DashboardChartData } from '../data/mock-dashboard-data';

interface DashboardChartCardProps {
    data: DashboardChartData;
}

export function DashboardChartCard({ data }: DashboardChartCardProps) {
    const chartConfig = data.data.reduce((acc, item, index) => {
        acc[item.label] = {
            label: item.label,
            color: item.color || `hsl(var(--chart-${(index % 5) + 1}))`,
        };
        return acc;
    }, {} as Record<string, { label: string; color: string }>);

    const renderChart = () => {
        switch (data.type) {
            case 'bar':
                return (
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.data}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                                <XAxis
                                    dataKey="label"
                                    className="text-xs"
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    className="text-xs"
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar
                                    dataKey="value"
                                    radius={[6, 6, 0, 0]}
                                >
                                    {data.data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color || '#3b82f6'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                );

            case 'line':
                return (
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.data}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="label"
                                    className="text-xs"
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <YAxis
                                    className="text-xs"
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ fill: 'hsl(var(--primary))' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                );

            case 'donut':
            case 'pie':
                return (
                    <div className="flex items-center justify-between gap-8">
                        <ChartContainer config={chartConfig} className="h-[300px] w-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Pie
                                        data={data.data}
                                        dataKey="value"
                                        nameKey="label"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={data.type === 'donut' ? 60 : 0}
                                        outerRadius={100}
                                        paddingAngle={2}
                                    >
                                        {data.data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color || `hsl(var(--chart-${(index % 5) + 1}))`}
                                                stroke="hsl(var(--background))"
                                                strokeWidth={2}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                        <div className="flex-1 space-y-3">
                            {data.total !== undefined && (
                                <div className="text-center mb-4">
                                    <p className="text-3xl font-bold">{data.total.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground uppercase">Total</p>
                                </div>
                            )}
                            {data.data.map((item, index) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="size-3 rounded-full"
                                            style={{ backgroundColor: item.color || `hsl(var(--chart-${(index % 5) + 1}))` }}
                                        />
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle>{data.title}</CardTitle>
                        <CardDescription>{data.description}</CardDescription>
                    </div>
                    {data.status && (
                        <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                            ● {data.status}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {renderChart()}
            </CardContent>
        </Card>
    );
}
