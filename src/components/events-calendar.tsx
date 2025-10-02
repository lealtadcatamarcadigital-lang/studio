
'use client';

import React, { useState, useMemo } from 'react';
import type { MonthData, Event, PPVEvent } from '@/lib/events-data';
import { flattenEvents, getMonthNumber, EventStatusMap } from './event-grid';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { addMonths, startOfMonth, isSameMonth } from 'date-fns';

type DetailedEvent = (Event | PPVEvent) & { type: 'raw' | 'smackdown' | 'ppv', id: string, year: number, month: string };

interface EventsCalendarProps {
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

const getDayClass = (eventTypes: Set<'raw' | 'smackdown' | 'ppv'>, status?: string) => {
  const classes = new Set<string>();
  if (eventTypes.has('raw')) classes.add('day-raw');
  if (eventTypes.has('smackdown')) classes.add('day-smackdown');
  if (eventTypes.has('ppv')) classes.add('day-ppv');
  
  if (status === 'visto') classes.add('day-watched');
  else if (status === 'no-visto') classes.add('day-not-watched');
  else if (status === 'disponible') classes.add('day-available');

  return Array.from(classes).join(' ');
};

export function EventsCalendar({ initialEvents }: EventsCalendarProps) {
  const allEvents = useMemo(() => flattenEvents(initialEvents), [initialEvents]);
  const [currentMonth, setCurrentMonth] = useState(new Date(2000, 0, 1));
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date(2000, 0, 3));
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});

  React.useEffect(() => {
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
    } catch (error) {
      console.error("Could not parse statuses from localStorage:", error);
    }
  }, []);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, { types: Set<'raw' | 'smackdown' | 'ppv'>, statuses: Set<string> }>();
    allEvents.forEach(event => {
      const date = new Date(event.year, getMonthNumber(event.month), parseInt(event.date));
      const dateString = date.toDateString();
      if (!map.has(dateString)) {
        map.set(dateString, { types: new Set(), statuses: new Set() });
      }
      map.get(dateString)!.types.add(event.type);
      const status = eventStatuses[event.id] || 'disponible';
      map.get(dateString)!.statuses.add(status);
    });
    return map;
  }, [allEvents, eventStatuses]);

  const modifiers = useMemo(() => {
    const dayModifiers: Record<string, Date[]> = {
      raw: [],
      smackdown: [],
      ppv: [],
      watched: [],
      'not-watched': [],
      available: [],
    };
    
    allEvents.forEach(event => {
      const date = new Date(event.year, getMonthNumber(event.month), parseInt(event.date));
      dayModifiers[event.type].push(date);
      
      const status = eventStatuses[event.id] || 'disponible';
      if (status === 'visto') dayModifiers.watched.push(date);
      if (status === 'no-visto') dayModifiers['not-watched'].push(date);
      if (status === 'disponible') dayModifiers.available.push(date);
    });

    return dayModifiers;
  }, [allEvents, eventStatuses]);

  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return allEvents.filter(event => {
      const eventDate = new Date(event.year, getMonthNumber(event.month), parseInt(event.date));
      return eventDate.toDateString() === selectedDay.toDateString();
    });
  }, [selectedDay, allEvents]);
  
  const minDate = new Date(2000, 0, 1);
  const maxDate = new Date(2001, 11, 31);
  
  const handleMonthChange = (newMonth: Date) => {
    if (newMonth >= minDate && newMonth <= maxDate) {
        setCurrentMonth(newMonth);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={selectedDay}
                onSelect={setSelectedDay}
                month={currentMonth}
                onMonthChange={handleMonthChange}
                fromYear={2000}
                toYear={2001}
                captionLayout="dropdown-buttons"
                modifiers={modifiers}
                modifiersClassNames={{
                    raw: 'day-raw',
                    smackdown: 'day-smackdown',
                    ppv: 'day-ppv',
                    watched: 'day-watched',
                    'not-watched': 'day-not-watched',
                    available: 'day-available',
                }}
            />
        </div>

        <div className="h-[450px]">
            <h3 className="font-headline text-xl mb-4">
                Eventos para {selectedDay ? selectedDay.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "ningún día seleccionado"}
            </h3>
            <ScrollArea className="h-full pr-4">
            {selectedDayEvents.length > 0 ? (
                <div className="space-y-4">
                    {selectedDayEvents.map(event => (
                        <Card key={event.id} className="border-l-4" style={{borderColor: `var(--${event.type}-color)`}}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg">
                                        {event.type === 'ppv' ? (event as PPVEvent).name : getEventTypeDisplay(event.type)}
                                    </CardTitle>
                                    <Badge className={cn(getShowBadgeStyle(event.type), 'text-xs')}>{getEventTypeDisplay(event.type)}</Badge>
                                </div>
                                <CardDescription>{event.location}</CardDescription>
                            </CardHeader>
                            {event.matches && event.matches.length > 0 && (
                                <CardContent className="text-sm">
                                    <p className="font-semibold mb-2">Luchas destacadas:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        {event.matches.slice(0, 2).map((match, i) => <li key={i}>{match}</li>)}
                                    </ul>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>No hay eventos programados para este día.</p>
                </div>
            )}
            </ScrollArea>
        </div>
    </div>
  );
}
