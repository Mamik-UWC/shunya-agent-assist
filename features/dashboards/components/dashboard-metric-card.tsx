import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { DashboardMetricData } from '../data/mock-dashboard-data';

interface DashboardMetricCardProps {
    data: DashboardMetricData;
}

export function DashboardMetricCard({ data }: DashboardMetricCardProps) {
    return (
        <Card className="relative overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-lg ${data.iconColor} flex items-center justify-center text-xl`}>
                            {data.icon}
                        </div>
                        {data.trend && (
                            <div className={`flex items-center gap-1 text-sm font-medium ${data.trend.isPositive ? 'text-emerald-500' : 'text-red-500'
                                }`}>
                                {data.trend.direction === 'up' ? (
                                    <ArrowUp className="size-4" />
                                ) : (
                                    <ArrowDown className="size-4" />
                                )}
                                {data.trend.value}
                            </div>
                        )}
                    </div>
                    {data.comparison && (
                        <span className="text-xs text-muted-foreground">
                            {data.comparison}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {data.title}
                    </p>
                    <p className="text-3xl font-bold mt-1">{data.value}</p>
                </div>

                {data.status && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{data.status}</span>
                    </div>
                )}

                {data.progress !== undefined && (
                    <div className="space-y-2">
                        <Progress value={data.progress} className="h-2" />
                        {data.progressLabel && (
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-emerald-500">
                                    {data.progressLabel}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {data.miniChart && (
                    <div className="flex items-end gap-1 h-12">
                        {data.miniChart.map((value, index) => (
                            <div
                                key={index}
                                className="flex-1 bg-primary/20 rounded-sm transition-all hover:bg-primary/30"
                                style={{ height: `${value}%` }}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
