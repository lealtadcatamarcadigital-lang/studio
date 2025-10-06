
'use client';

import React, { useMemo } from 'react';
import type { MonthData, Match } from '@/lib/events-data';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, getMonthNumber } from './event-grid';

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

  return (
    <div className="space-y-4">
      {wrestlerMatches.map((event, index) => {
        const matchText = typeof event.match === 'string' ? event.match : event.match.match;

        return (
          <div key={`${event.id}-${index}`} className="p-4 border rounded-lg bg-card text-card-foreground">
            <p className="font-bold">{matchText}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {event.type === 'ppv' ? event.name : `WWF ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`}
              {' - '}
              {new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        );
      })}
       {wrestlerMatches.length === 0 && (
         <p className="text-muted-foreground">No se encontraron combates para este luchador.</p>
       )}
    </div>
  );
}
