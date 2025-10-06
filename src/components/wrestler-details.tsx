
'use client';

import React, { useMemo } from 'react';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents } from './event-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WrestlerDetailsProps {
  wrestlerName: string;
}

export function WrestlerDetails({ wrestlerName }: WrestlerDetailsProps) {
  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  const wrestlerMatches = useMemo(() => {
    return allEvents
      .flatMap(event => 
        (event.matches || []).map(match => ({ event, match }))
      )
      .filter(({ match }) => {
        const matchText = typeof match === 'string' ? match : match.match;
        return matchText.includes(wrestlerName);
      })
      .map(({ event, match }) => ({
        ...event,
        match,
      }));
  }, [allEvents, wrestlerName]);

  const stats = useMemo(() => {
    return wrestlerMatches.reduce((acc, match) => {
      acc[match.type] = (acc[match.type] || 0) + 1;
      return acc;
    }, {} as Record<'raw' | 'smackdown' | 'ppv', number>);
  }, [wrestlerMatches]);

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Card>
                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">Total de Luchas</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold">{wrestlerMatches.length}</p>
                </CardContent>
            </Card>
            <Card className="border-red-500/50">
                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-sm font-semibold text-red-500">Luchas en RAW</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold">{stats.raw || 0}</p>
                </CardContent>
            </Card>
            <Card className="border-blue-500/50">
                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-sm font-semibold text-blue-500">Luchas en SmackDown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold">{stats.smackdown || 0}</p>
                </CardContent>
            </Card>
            <Card className="border-amber-500/50">
                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-sm font-semibold text-amber-500">Luchas en PPV</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-3xl font-bold">{stats.ppv || 0}</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
