
'use client';

import React, { useMemo } from 'react';
import type { MonthData, Match } from '@/lib/events-data';
import { WWF_2000_DATA } from '@/lib/events-data-2000';
import { flattenEvents, getMonthNumber } from './event-grid';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CalendarDays, Tv, Ticket, Star } from 'lucide-react';

interface WrestlerDetailsProps {
  wrestlerName: string;
  initialEvents: MonthData[];
}

const getShowBadgeStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return 'bg-red-500 hover:bg-red-500/80 text-white';
        case 'smackdown': return 'bg-blue-500 hover:bg-blue-500/80 text-white';
        case 'ppv': return 'bg-amber-500 hover:bg-amber-500/80 text-white';
    }
};

const getEventTypeDisplay = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch(type) {
        case 'raw': return 'RAW';
        case 'smackdown': return 'SmackDown';
        case 'ppv': return 'PPV';
    }
};

const EventTypeIcon = ({ type }: { type: 'raw' | 'smackdown' | 'ppv' }) => {
    switch (type) {
        case 'raw': return <Tv className="h-4 w-4" />;
        case 'smackdown': return <Tv className="h-4 w-4" />;
        case 'ppv': return <Ticket className="h-4 w-4" />;
    }
};

export function WrestlerDetails({ wrestlerName, initialEvents }: WrestlerDetailsProps) {
  const allEvents = useMemo(() => flattenEvents(initialEvents), [initialEvents]);

  const wrestlerMatches = useMemo(() => {
    return allEvents
      .flatMap(event => 
        (event.matches || []).map(match => ({ event, match }))
      )
      .filter(({ match }) => {
        const matchText = typeof match === 'string' ? match : match.match;
        const wrestlerRegex = new RegExp(`\\b${wrestlerName}\\b`, 'i');
        return wrestlerRegex.test(matchText);
      })
      .map(({ event, match }) => ({
        ...event,
        match,
      }));
  }, [allEvents, wrestlerName]);

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Total de Luchas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{wrestlerMatches.length}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {wrestlerMatches.map((event, index) => {
          const matchText = typeof event.match === 'string' ? event.match : event.match.match;
          const rating = typeof event.match !== 'string' ? event.match.rating : undefined;

          return (
            <Card key={`${event.id}-${index}`} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <CardTitle className="text-xl mb-1">{matchText}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </CardDescription>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                      <Badge className={getShowBadgeStyle(event.type)}>
                        <EventTypeIcon type={event.type} />
                        <span className="ml-2">{event.type === 'ppv' ? event.name : getEventTypeDisplay(event.type)}</span>
                      </Badge>
                      {rating && (
                          <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="font-bold text-sm">{rating.toFixed(1)}</span>
                          </div>
                      )}
                    </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

       {wrestlerMatches.length === 0 && (
         <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron combates para este luchador.</p>
         </div>
       )}
    </div>
  );
}
