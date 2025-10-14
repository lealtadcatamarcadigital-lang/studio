
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from 'next/link';
import Image from "next/image";
import {
  Tv,
  Ticket,
  Eye,
  ChevronDown,
  CalendarDays,
  MapPin
} from "lucide-react";

import type { MonthData, Event, PPVEvent } from "@/lib/events-data";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getMonthNumber, getEventTypeDisplay, getShowImage, type DetailedEvent, type EventStatusMap, getShowBadgeStyle } from "@/lib/utils";
import { Badge } from "./ui/badge";


interface EventGridProps {
  events: DetailedEvent[];
  onEventClick: (eventId: string) => void;
}

const SCROLL_POSITION_KEY = 'attitude-rewind-scroll-position';
const OPEN_COLLAPSIBLES_KEY = 'attitude-rewind-open-collapsibles';

export function EventGrid({ events, onEventClick }: EventGridProps) {
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

  const handleCardClick = (eventId: string) => {
    sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    onEventClick(eventId);
  };

  const toggleStatus = (eventId: string) => {
    const currentStatus = eventStatuses[eventId] || 'disponible';
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

  const getShowIcon = (type: 'raw' | 'smackdown' | 'ppv') => {
    if (type === 'raw') return <Image src="https://i.imgur.com/jyfFEUh.png" alt="RAW is WAR" width={20} height={20} className="h-5 w-auto" />;
    if (type === 'smackdown') return <Image src="https://i.imgur.com/6TIM8Lj.png" alt="SmackDown!" width={20} height={20} className="h-5 w-auto" />;
    return <Ticket className="h-4 w-4" />;
  };

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
                <div className="sticky top-[258px] md:top-[262px] z-10 bg-background/90 backdrop-blur-sm -mx-4 px-4 py-3 mb-4 border-b">
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
                          <div key={event.id} onClick={() => handleCardClick(event.id)} className="cursor-pointer group">
                            <Card className="overflow-hidden h-full border-2 border-transparent hover:border-primary transition-all duration-300 flex flex-col">
                              {event.type === 'ppv' && (
                                <div className="relative h-48 w-full">
                                    <Image 
                                        src={getShowImage(event.type, event)}
                                        alt={getEventTypeDisplay(event.type)}
                                        layout="fill"
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                                </div>
                              )}
                              <CardContent className={cn("p-4 relative w-full flex-grow flex flex-col", event.type !== 'ppv' ? 'justify-between' : '')}>
                                {event.type === 'ppv' ? (
                                    <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                                      <Badge className="absolute top-2 right-2 text-xs" variant={isWatched ? 'default' : 'secondary'} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleStatus(event.id); }}>
                                        <Eye className={cn("h-4 w-4 mr-1", isWatched ? 'text-green-400' : 'text-gray-400')} />
                                        {isWatched ? 'Visto' : 'Marcar'}
                                      </Badge>

                                      <h3 className="font-bold text-xl drop-shadow-lg">
                                        {event.type === 'ppv' ? (event as PPVEvent).name : `WWF ${getEventTypeDisplay(event.type)}`}
                                      </h3>

                                      <div className="mt-2 space-y-1 text-sm text-white/80">
                                        <div className="flex items-center gap-2">
                                          <CalendarDays className="h-4 w-4"/>
                                          <span>{new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPin className="h-4 w-4"/>
                                          <span>{event.location}</span>
                                        </div>
                                      </div>
                                    </div>
                                ) : (
                                  <>
                                    <div>
                                      <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 pr-4">
                                            {getShowIcon(event.type)}
                                            {`WWF ${getEventTypeDisplay(event.type)}`}
                                        </h3>
                                        <Badge className="text-xs flex-shrink-0" variant={isWatched ? 'default' : 'secondary'} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleStatus(event.id); }}>
                                          <Eye className={cn("h-4 w-4 mr-1", isWatched ? 'text-green-400' : 'text-gray-400')} />
                                          {isWatched ? 'Visto' : 'Marcar'}
                                        </Badge>
                                      </div>
                                      <div className="space-y-1 text-sm text-muted-foreground">
                                          <div className="flex items-center gap-2">
                                              <CalendarDays className="h-4 w-4"/>
                                              <span>{new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                              <MapPin className="h-4 w-4"/>
                                              <span>{event.location}</span>
                                          </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </CardContent>
                            </Card>
                          </div>
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

    