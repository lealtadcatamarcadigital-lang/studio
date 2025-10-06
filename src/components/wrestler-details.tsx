
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import type { Match } from '@/lib/events-data';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, getEventTypeDisplay } from './event-grid';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CalendarDays, Star, Tv, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WrestlerDetailsProps {
  wrestlerName: string;
}

const getShowBadgeStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return 'bg-red-500 hover:bg-red-500/80 text-white';
        case 'smackdown': return 'bg-blue-500 hover:bg-blue-500/80 text-white';
        case 'ppv': return 'bg-amber-500 hover:bg-amber-500/80 text-white';
    }
};

const getShowIcon = (type: 'raw' | 'smackdown' | 'ppv') => {
    return type === 'ppv' ? <Ticket className="h-3 w-3" /> : <Tv className="h-3 w-3" />;
};

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-muted-foreground">Total de Luchas</h3>
                    <p className="text-4xl font-bold">{wrestlerMatches.length}</p>
                </CardContent>
            </Card>
            <Card className="border-red-500/50">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-red-500">Luchas en RAW</h3>
                    <p className="text-4xl font-bold">{stats.raw || 0}</p>
                </CardContent>
            </Card>
            <Card className="border-blue-500/50">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-500">Luchas en SmackDown</h3>
                    <p className="text-4xl font-bold">{stats.smackdown || 0}</p>
                </CardContent>
            </Card>
            <Card className="border-amber-500/50">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-amber-500">Luchas en PPV</h3>
                    <p className="text-4xl font-bold">{stats.ppv || 0}</p>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-4">
            {wrestlerMatches.map((eventItem, index) => {
                const matchData = eventItem.match;
                const matchText = typeof matchData === 'string' ? matchData : matchData.match;
                const rating = typeof matchData !== 'string' ? matchData.rating : undefined;

                return (
                    <Link href={`/event/${eventItem.id}?from=/wrestler/${wrestlerName.replace(/ /g, '_')}`} key={`${eventItem.id}-${index}`}>
                        <Card className="hover:bg-accent transition-colors">
                            <CardContent className="p-4 space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg pr-4">{matchText}</h3>
                                    <Badge className={cn("text-xs flex-shrink-0", getShowBadgeStyle(eventItem.type))}>
                                        {getShowIcon(eventItem.type)}
                                        <span>{getEventTypeDisplay(eventItem.type)}</span>
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className='flex items-center gap-2'>
                                        <CalendarDays className="h-4 w-4" />
                                        <span>{new Date(eventItem.year, new Date(Date.parse(eventItem.month +" 1, 2000")).getMonth(), parseInt(eventItem.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    {rating && (
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="font-bold">{rating.toFixed(1)}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
            {wrestlerMatches.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No se encontraron combates para este luchador.</p>
            )}
        </div>
    </div>
  );
}
