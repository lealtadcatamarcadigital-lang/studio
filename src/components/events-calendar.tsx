
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { MonthData, Event, PPVEvent } from '@/lib/events-data';
import { flattenEvents, getMonthNumber, EventStatusMap } from './event-grid';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export function EventsCalendar({ initialEvents }: EventsCalendarProps) {
  const allEvents = useMemo(() => flattenEvents(initialEvents), [initialEvents]);
  const [currentMonth, setCurrentMonth] = useState(new Date(2000, 0, 1));
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date(2000, 0, 3));
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});
  const [activeTab, setActiveTab] = useState("calendar");

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
  
  const handleSelectDay = (day: Date | undefined) => {
    setSelectedDay(day);
    if(day) {
        const eventsOnDay = allEvents.filter(event => {
            const eventDate = new Date(event.year, getMonthNumber(event.month), parseInt(event.date));
            return eventDate.toDateString() === day.toDateString();
        });
        if (eventsOnDay.length > 0) {
            setActiveTab("events");
        }
    }
  }

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
    <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
                <TabsTrigger value="events">Eventos del día</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="flex justify-center pt-4">
                 <Calendar
                    mode="single"
                    selected={selectedDay}
                    onSelect={handleSelectDay}
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
            </TabsContent>
            <TabsContent value="events" className="h-[400px] pt-2">
                <h3 className="font-headline text-lg mb-2 text-center truncate px-4">
                    {selectedDay ? selectedDay.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Ningún día seleccionado"}
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
            </TabsContent>
        </Tabs>
    </div>
  );
}

