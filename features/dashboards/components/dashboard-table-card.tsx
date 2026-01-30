import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { DashboardTableData } from '../data/mock-dashboard-data';

interface DashboardTableCardProps {
    data: DashboardTableData;
    showViewAll?: boolean;
}

export function DashboardTableCard({ data, showViewAll = true }: DashboardTableCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle>{data.title}</CardTitle>
                        {data.description && (
                            <CardDescription>{data.description}</CardDescription>
                        )}
                    </div>
                    {showViewAll && (
                        <Button variant="ghost" size="sm" className="text-primary">
                            View All
                            <ExternalLink className="size-4 ml-1" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {data.columns.map((column) => (
                                <TableHead key={column} className="font-semibold">
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.rows.map((row, index) => (
                            <TableRow key={index}>
                                {data.columns.map((column) => {
                                    const key = column.toLowerCase().replace(/\s+/g, '');
                                    const value = row[key];

                                    // Special formatting for rank column
                                    if (column === 'Rank') {
                                        return (
                                            <TableCell key={column} className="font-medium">
                                                {value}
                                            </TableCell>
                                        );
                                    }

                                    // Special formatting for percentage values
                                    if (typeof value === 'string' && value.includes('%')) {
                                        return (
                                            <TableCell key={column} className="font-medium text-emerald-500">
                                                {value}
                                            </TableCell>
                                        );
                                    }

                                    return (
                                        <TableCell key={column}>
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
