
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from 'next/link';
import Image from "next/image";
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

const SCROLL_POSITION_KEY = 'attitude-rewind-scroll-position';
const OPEN_COLLAPSIBLES_KEY = 'attitude-rewind-open-collapsibles';

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

export const getShowImage = (type: EventType, event: DetailedEvent) => {
    if (type === 'ppv') {
      return (event as PPVEvent).coverUrl || 'https://i.imgur.com/S6Imh3m.png';
    }
    const images = {
      raw: 'https://i.pinimg.com/736x/52/b7/9f/52b79f70e2da83f192ba455d42a0ef9f.jpg',
      smackdown: 'https://i.pinimg.com/736x/e8/e4/9f/e8e49feb5765132c8583cb6e17f9f5f2.jpg',
    };
    return images[type] || 'https://i.imgur.com/S6Imh3m.png';
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
      const storedCollapsibles = localStorage.getItem(OPEN_COLLAPSIBLES_KEY);
      if (storedCollapsibles) {
        setOpenCollapsibles(JSON.parse(storedCollapsibles));
      }
    } catch (error) {
      console.error("Could not parse data from localStorage:", error);
    }
  }, []);

  const handleEventClick = () => {
    sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
  };

  const toggleStatus = (eventId: string) => {
    const currentStatus = eventStatuses[eventId] || 'disponible';
    const newStatus = currentStatus === 'visto' ? 'disponible' : 'visto';
    const newStatuses = { ...eventStatuses, [eventId]: newStatus };
    setEventStatuses(newStatuses);
    try {
        localStorage.setItem('attitude-rewind-statuses', JSON.stringify(newStatuses));
        // Force a re-render to update carousel
        window.location.reload(); 
    } catch (error) {
        console.error("Could not save event statuses to localStorage:", error);
    }
  };

  const toggleCollapsible = (monthId: string) => {
    setOpenCollapsibles(prev => {
      const newState = { ...prev, [monthId]: !prev[monthId] };
      try {
        localStorage.setItem(OPEN_COLLAPSIBLES_KEY, JSON.stringify(newState));
      } catch (error) {
        console.error("Could not save collapsible state to localStorage:", error);
      }
      return newState;
    });
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
                <div className="sticky top-[354px] z-10 bg-background/90 backdrop-blur-sm -mx-4 px-4 py-3 mb-4 border-b">
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
                        const isWatched = eventStatuses[event.id] === 'visto';

                        return (
                        <Link href={`/event/${event.id}`} key={event.id} onClick={handleEventClick} scroll={false}>
                            <Card className={cn("border-2 border-transparent hover:shadow-lg transition-shadow", {
                                'border-red-500/50': event.type === 'raw',
                                'border-blue-500/50': event.type === 'smackdown',
                                'border-amber-500/50': event.type === 'ppv',
                            })}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-16 w-16 flex-shrink-0 relative">
                                  <Image 
                                    src={getShowImage(event.type, event)}
                                    alt={getEventTypeDisplay(event.type)}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                    {event.date}
                                  </div>
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
