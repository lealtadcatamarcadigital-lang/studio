
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from 'next/link';
import {
  Download,
  CalendarDays,
  MapPin,
  List,
  Info,
  Eye,
  EyeOff,
  Circle,
  Tv,
  Ticket,
  ListChecks,
  CheckCircle,
  ChevronDown,
  Star,
} from "lucide-react";

import type { MonthData, Event, PPVEvent, Match } from "@/lib/events-data";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

const getShowBadgeStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
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

const EventTypeIcon = ({ type }: { type: EventType }) => {
    switch(type) {
        case 'raw': return <Tv className="h-4 w-4" />;
        case 'smackdown': return <Tv className="h-4 w-4" />;
        case 'ppv': return <Ticket className="h-4 w-4" />;
    }
}

export const getEventTypeDisplay = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch(type) {
        case 'raw': return 'RAW';
        case 'smackdown': return 'SmackDown';
        case 'ppv': return 'PPV';
    }
};

const MatchCard = ({ match }: { match: Match }) => {
    const matchText = typeof match === 'string' ? match : match.match;
    const rating = typeof match !== 'string' ? match.rating : undefined;

    return (
        <div className="bg-muted/50 border-l-4 border-primary p-3 rounded-r-lg">
            <div className="flex justify-between items-start">
                <p className="font-semibold text-card-foreground">{matchText}</p>
                {rating && (
                    <div className="flex items-center gap-1 text-amber-500 flex-shrink-0 ml-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold text-sm">{rating.toFixed(1)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export function EventGrid({ events }: EventGridProps) {
  const { toast } = useToast();
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

  const handleStatusChange = (eventId: string, status: EventStatus) => {
    const newStatuses = { ...eventStatuses, [eventId]: status };
    setEventStatuses(newStatuses);
    try {
      localStorage.setItem('attitude-rewind-statuses', JSON.stringify(newStatuses));
    } catch (error) {
      console.error("Could not save event statuses to localStorage:", error);
    }
  };
  
  const handleDownload = () => {
    toast({
      title: "Función no disponible",
      description: "La descarga de eventos aún no está implementada.",
    });
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
            <Collapsible key={month} open={openCollapsibles[month] ?? true} onOpenChange={() => toggleCollapsible(month)}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center gap-4 cursor-pointer group">
                  <h2 className="text-2xl font-bold font-headline">{month}</h2>
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {monthEvents.map((event) => (
                    <Card key={event.id} className="flex flex-col">
                      <CardContent className="p-4 flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <Link href={`/event/${event.id}`}>
                                <h3 className="font-bold text-lg hover:underline">
                                    {event.type === 'ppv' ? (event as PPVEvent).name : `WWF ${getEventTypeDisplay(event.type)}`}
                                </h3>
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <CalendarDays className="h-4 w-4" />
                                <span>{new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}</span>
                            </div>
                          </div>
                          <Badge className={cn("text-sm", getShowBadgeStyle(event.type))}>
                              <EventTypeIcon type={event.type} />
                              <span className="ml-2">{getEventTypeDisplay(event.type)}</span>
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.description && (
                           <Collapsible>
                            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold mb-2 group w-full justify-between">
                              <div className="flex items-center gap-2">
                                <Info className="h-4 w-4 text-primary" />
                                Resumen
                              </div>
                               <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <p className="text-xs text-muted-foreground italic bg-muted/50 p-2 rounded-md">{event.description}</p>
                            </CollapsibleContent>
                          </Collapsible>
                        )}

                        <Collapsible>
                          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold mt-3 group w-full justify-between">
                            <div className="flex items-center gap-2">
                              <ListChecks className="h-4 w-4 text-primary" />
                              Luchas ({event.matches?.length || 0})
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pt-2 space-y-2">
                            {event.matches && event.matches.length > 0 ? (
                                event.matches.map((match, i) => <MatchCard key={i} match={match} />)
                            ) : (
                                <p className="text-xs text-muted-foreground">No hay luchas anunciadas.</p>
                            )}
                          </CollapsibleContent>
                        </Collapsible>

                      </CardContent>

                      <div className="bg-card-foreground/5 p-3 mt-auto">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="text-sm font-semibold">Estado</span>
                            </div>
                            <Select
                                value={eventStatuses[event.id] || 'disponible'}
                                onValueChange={(value) => handleStatusChange(event.id, value as EventStatus)}
                            >
                                <SelectTrigger className="w-36 h-8 text-xs">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="disponible">
                                        <div className="flex items-center gap-2">
                                            <Circle className="h-3 w-3 text-muted-foreground" />
                                            Disponible
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="visto">
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-3 w-3 text-green-500" />
                                            Visto
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="no-visto">
                                        <div className="flex items-center gap-2">
                                            <EyeOff className="h-3 w-3 text-red-500" />
                                            No Visto
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
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
