
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from 'next/link';
import {
  Tv,
  Ticket,
  Eye,
  ChevronDown
} from "lucide-react";

import type { MonthData, Event, PPVEvent } from "@/lib/events-data";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EventGridProps {
  events: DetailedEvent[];
}

export type EventType = 'raw' | 'smackdown' | 'ppv';
export type DetailedEvent = (Event | PPVEvent) & { type: EventType, id: string, year: number, month: string, monthId: string };
export type EventStatus = "disponible" | "visto" | "no-visto";
export type EventStatusMap = { [eventId: string]: EventStatus };

export const flattenEvents = (data: MonthData[]): DetailedEvent[] => {
  const allEvents: DetailedEvent[] = [];
  data.forEach(month => {
    month.raw.forEach((event, index) => allEvents.push({ ...event, type: 'raw', id: `${month.monthId}-${month.year}-raw-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
    month.smackdown.forEach((event, index) => allEvents.push({ ...event, type: 'smackdown', id: `${month.monthId}-${month.year}-smackdown-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
    month.ppvs.forEach((event, index) => allEvents.push({ ...event, type: 'ppv', id: `${month.monthId}-${month.year}-ppv-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
  });
  allEvents.sort((a, b) => new Date(a.year, getMonthNumber(a.month), parseInt(a.date)).getTime() - new Date(b.year, getMonthNumber(b.month), parseInt(b.date)).getTime());
  return allEvents;
};

const getShowStyles = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return {
            card: 'border-red-500',
            dateBox: 'bg-red-500 text-white',
            showName: 'text-red-500'
        };
        case 'smackdown': return {
            card: 'border-blue-500',
            dateBox: 'bg-blue-500 text-white',
            showName: 'text-blue-500'
        };
        case 'ppv': return {
            card: 'border-amber-500',
            dateBox: 'bg-amber-500 text-white',
            showName: 'text-amber-500'
        };
    }
};

export const getShowBadgeStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return 'bg-red-500 hover:bg-red-500/80 text-white';
        case 'smackdown': return 'bg-blue-500 hover:bg-blue-500/80 text-white';
        case 'ppv': return 'bg-amber-500 hover:bg-amber-500/80 text-white';
    }
};

export const getMonthNumber = (monthName: string) => {
    const monthMap: { [key: string]: number } = { Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5, Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11 };
    return monthMap[monthName];
};

export const getEventTypeDisplay = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch(type) {
        case 'raw': return 'RAW';
        case 'smackdown': return 'SmackDown';
        case 'ppv': return 'PPV';
    }
};


export function EventGrid({ events }: EventGridProps) {
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});

  useEffect(() => {
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
    } catch (error) {
      console.error("Could not parse event statuses from localStorage:", error);
    }
  }, []);

  const toggleStatus = (eventId: string) => {
    const currentStatus = eventStatuses[eventId];
    const newStatus = currentStatus === 'visto' ? 'disponible' : 'visto';
    const newStatuses = { ...eventStatuses, [eventId]: newStatus };
    setEventStatuses(newStatuses);
    try {
        localStorage.setItem('attitude-rewind-statuses', JSON.stringify(newStatuses));
    } catch (error) {
        console.error("Could not save event statuses to localStorage:", error);
    }
  };

  const toggleCollapsible = (monthId: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [monthId]: !prev[monthId] }));
  };

  const groupedEvents = useMemo(() => {
    return events.reduce<Record<string, DetailedEvent[]>>((acc, event) => {
      const monthKey = `${event.month} ${event.year}`;
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(event);
      return acc;
    }, {});
  }, [events]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {Object.entries(groupedEvents).length > 0 ? (
          Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <Collapsible
                key={month}
                open={openCollapsibles[month] ?? true}
                onOpenChange={() => toggleCollapsible(month)}
            >
                <div className="sticky top-16 z-10 bg-background/90 backdrop-blur-sm -mx-4 px-4 py-3 mb-4 border-b">
                    <CollapsibleTrigger asChild>
                        <div className="flex items-center gap-4 cursor-pointer group">
                            <h2 className="text-2xl font-bold">{month}</h2>
                            <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", (openCollapsibles[month] ?? true) ? '' : '-rotate-90')} />
                        </div>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {monthEvents.map((event) => {
                        const styles = getShowStyles(event.type);
                        const isWatched = eventStatuses[event.id] === 'visto';

                        return (
                        <Link href={`/event/${event.id}`} key={event.id}>
                            <Card className={cn("border-2", styles.card, "hover:shadow-lg transition-shadow")}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className={cn("h-16 w-16 flex flex-col items-center justify-center rounded-lg", styles.dateBox)}>
                                    <span className="text-3xl font-bold">{event.date}</span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg">
                                        {event.type === 'ppv' ? (event as PPVEvent).name : `WWF ${getEventTypeDisplay(event.type)}`}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{event.location}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        {event.type === 'ppv' ? <Ticket className="h-4 w-4" /> : <Tv className="h-4 w-4" />}
                                        <span>{getEventTypeDisplay(event.type)}</span>
                                    </div>
                                </div>
                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleStatus(event.id); }} className="p-2">
                                   <Eye className={cn("h-6 w-6", isWatched ? 'text-green-500' : 'text-gray-400')} />
                                </button>
                            </CardContent>
                            </Card>
                        </Link>
                        );
                    })}
                    </div>
                </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron eventos con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
