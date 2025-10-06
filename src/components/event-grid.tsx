
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from 'next/image';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { WWF_ALL_DATA } from "@/lib/events-data-all";

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

const groupEventsByMonth = (events: DetailedEvent[]) => {
  return events.reduce((acc, event) => {
    const monthYearKey = `${event.month} ${event.year}`;
    if (!acc[monthYearKey]) {
      acc[monthYearKey] = [];
    }
    acc[monthYearKey].push(event);
    return acc;
  }, {} as Record<string, DetailedEvent[]>);
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

const getCardStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return 'border-red-500/50';
        case 'smackdown': return 'border-blue-500/50';
        case 'ppv': return 'border-amber-500/50';
    }
};

const getDateBoxStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return 'bg-red-500/80 text-white';
        case 'smackdown': return 'bg-blue-500/80 text-white';
        case 'ppv': return 'bg-amber-500/80 text-white';
    }
};

const EventTypeIcon = ({ type }: { type: 'raw' | 'smackdown' | 'ppv' }) => {
    switch (type) {
        case 'raw': return <Tv className="h-4 w-4 text-muted-foreground" />;
        case 'smackdown': return <Tv className="h-4 w-4 text-muted-foreground" />;
        case 'ppv': return <Ticket className="h-4 w-4 text-muted-foreground" />;
    }
};

export function EventGrid({ events }: EventGridProps) {
  const { toast } = useToast();
  
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
  
  const eventsByMonth = useMemo(() => groupEventsByMonth(events), [events]);

  const handleDownload = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(WWF_ALL_DATA, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "wwf_events_data.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Descarga iniciada",
        description: "El archivo de datos ha comenzado a descargarse.",
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        variant: "destructive",
        title: "Error de descarga",
        description: "No se pudo preparar el archivo para la descarga.",
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      
        {Object.keys(eventsByMonth).length > 0 ? (
          Object.entries(eventsByMonth).map(([monthYear, events]) => (
              <div key={monthYear} className="mb-8">
                  <h2 className="font-headline text-2xl font-bold text-foreground mb-4 sticky top-16 bg-background/80 backdrop-blur-sm py-2 z-10">{monthYear.split(' ')[0]}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {events.map(event => {
                          const status = eventStatuses[event.id] || 'disponible';
                          return (
                          <Link href={`/event/${event.id}`} key={event.id}>
                            <Card 
                                id={event.id}
                                className={cn(
                                    "cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl border-2 scroll-mt-24 bg-card h-full",
                                    getCardStyle(event.type)
                                )}
                            >
                                <CardContent className="p-4 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-start gap-4">
                                            <div className={cn("flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center font-bold text-2xl", getDateBoxStyle(event.type))}>
                                                {event.date}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-bold">
                                                    {event.type === 'ppv' ? (event as PPVEvent).name : getEventTypeDisplay(event.type)}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">{event.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <EventTypeIcon type={event.type} />
                                            <span>{getEventTypeDisplay(event.type)}</span>
                                        </div>
                                        {status === 'visto' && <Eye className="h-4 w-4 text-green-500" />}
                                        {status === 'no-visto' && <EyeOff className="h-4 w-4 text-red-500" />}
                                    </div>
                                </CardContent>
                            </Card>
                          </Link>
                      )})}
                  </div>
              </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron eventos con los filtros seleccionados.</p>
          </div>
        )}
      
      <div className="text-center my-12">
        <Button onClick={handleDownload} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar Datos
        </Button>
      </div>

    </div>
  );
}

    

    