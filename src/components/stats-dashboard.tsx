
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { MonthData } from '@/lib/events-data';
import { flattenEvents, getMonthNumber, type EventStatusMap } from '@/components/event-grid';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatsDashboardProps {
  initialEvents: MonthData[];
}

export function StatsDashboard({ initialEvents }: StatsDashboardProps) {
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
    } catch (error) {
      console.error("Could not parse event statuses from localStorage:", error);
    }
  }, []);

  const allEvents = useMemo(() => flattenEvents(initialEvents), [initialEvents]);

  const stats = useMemo(() => {
    const totalEvents = allEvents.length;
    const watchedEvents = allEvents.filter(e => eventStatuses[e.id] === 'visto').length;
    
    const rawTotal = allEvents.filter(e => e.type === 'raw').length;
    const rawWatched = allEvents.filter(e => e.type === 'raw' && eventStatuses[e.id] === 'visto').length;
    
    const smackdownTotal = allEvents.filter(e => e.type === 'smackdown').length;
    const smackdownWatched = allEvents.filter(e => e.type === 'smackdown' && eventStatuses[e.id] === 'visto').length;

    const ppvTotal = allEvents.filter(e => e.type === 'ppv').length;
    const ppvWatched = allEvents.filter(e => e.type === 'ppv' && eventStatuses[e.id] === 'visto').length;
    
    const monthlyData = initialEvents.flatMap(yearData => {
        const monthKey = `${yearData.month.substring(0,3)} ${String(yearData.year).slice(-2)}`;
        const total = yearData.raw.length + yearData.smackdown.length + yearData.ppvs.length;
        
        const watchedInMonth = allEvents.filter(e => 
            e.year === yearData.year && 
            e.month === yearData.month && 
            eventStatuses[e.id] === 'visto'
        ).length;
        
        return { name: monthKey, Vistos: watchedInMonth, Total: total };
    });


    return {
      totalEvents,
      watchedEvents,
      rawTotal,
      rawWatched,
      smackdownTotal,
      smackdownWatched,
      ppvTotal,
      ppvWatched,
      monthlyData
    };
  }, [allEvents, eventStatuses]);

  if (!isMounted) {
    return (
        <div className="text-center py-16">
            <p className="text-muted-foreground">Cargando estadísticas...</p>
        </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Progreso Total</CardTitle>
                <CardDescription>Eventos vistos del total disponible.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center space-x-4">
                    <p className="text-4xl font-bold">{stats.watchedEvents}</p>
                    <p className="text-2xl text-muted-foreground">/</p>
                    <p className="text-4xl font-bold">{stats.totalEvents}</p>
                </div>
                <Progress value={(stats.watchedEvents / stats.totalEvents) * 100} className="mt-4" />
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Progreso por Show</CardTitle>
                <CardDescription>Desglose de eventos vistos por cada programa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-medium">RAW</span>
                        <span className="text-sm text-muted-foreground">{stats.rawWatched} / {stats.rawTotal}</span>
                    </div>
                    <Progress value={(stats.rawWatched / stats.rawTotal) * 100} className="[&>div]:bg-red-500" />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-medium">SmackDown</span>
                        <span className="text-sm text-muted-foreground">{stats.smackdownWatched} / {stats.smackdownTotal}</span>
                    </div>
                    <Progress value={(stats.smackdownWatched / stats.smackdownTotal) * 100} className="[&>div]:bg-blue-500" />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-medium">PPV</span>
                        <span className="text-sm text-muted-foreground">{stats.ppvWatched} / {stats.ppvTotal}</span>
                    </div>
                    <Progress value={(stats.ppvWatched / stats.ppvTotal) * 100} className="[&>div]:bg-amber-500" />
                </div>
            </CardContent>
        </Card>

        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Eventos Vistos por Mes</CardTitle>
                <CardDescription>Resumen visual de tu actividad mensual.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={stats.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)"
                            }}
                        />
                        <Legend />
                        <Bar dataKey="Vistos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
  );
}
