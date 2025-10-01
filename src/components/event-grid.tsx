
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from 'next/image';
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
} from "lucide-react";

import type { MonthData, Event, PPVEvent } from "@/lib/events-data";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface EventGridProps {
  initialEvents: MonthData[];
}

type DetailedEvent = (Event | PPVEvent) & { type: 'raw' | 'smackdown' | 'ppv', id: string, year: number, month: string };
type EventStatus = "disponible" | "visto" | "no-visto";
type EventStatusMap = { [eventId: string]: EventStatus };

const flattenEvents = (data: MonthData[]): DetailedEvent[] => {
  const allEvents: DetailedEvent[] = [];
  data.forEach(month => {
    month.raw.forEach((event, index) => allEvents.push({ ...event, type: 'raw', id: `${month.monthId}-${month.year}-raw-${index}`, year: month.year, month: month.month }));
    month.smackdown.forEach((event, index) => allEvents.push({ ...event, type: 'smackdown', id: `${month.monthId}-${month.year}-smackdown-${index}`, year: month.year, month: month.month }));
    month.ppvs.forEach((event, index) => allEvents.push({ ...event, type: 'ppv', id: `${month.monthId}-${month.year}-ppv-${index}`, year: month.year, month: month.month }));
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

const getMonthNumber = (monthName: string) => {
    const monthMap: { [key: string]: number } = { Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5, Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11 };
    return monthMap[monthName];
};

const getEventTypeDisplay = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch(type) {
        case 'raw': return 'RAW';
        case 'smackdown': return 'SmackDown';
        case 'ppv': return 'PPV';
    }
};

const getShowBadgeStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return 'bg-red-500 hover:bg-red-500/80 text-white';
        case 'smackdown': return 'bg-blue-500 hover:bg-blue-500/80 text-white';
        case 'ppv': return 'bg-amber-500 hover:bg-amber-500/80 text-white';
    }
};

const EventTypeIcon = ({ type }: { type: 'raw' | 'smackdown' | 'ppv' }) => {
    switch (type) {
        case 'raw': return <Tv className="h-4 w-4 text-muted-foreground" />;
        case 'smackdown': return <Tv className="h-4 w-4 text-muted-foreground" />;
        case 'ppv': return <Ticket className="h-4 w-4 text-muted-foreground" />;
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

const MatchCard = ({ match }: { match: string }) => {
    const parts = match.split(':');
    const mainMatch = parts[0];
    const stipulation = parts.length > 1 ? parts.slice(1).join(':').trim() : null;

    return (
        <div className="bg-card border rounded-lg p-3">
            <p className="font-semibold text-card-foreground">{mainMatch}</p>
            {stipulation && (
                <p className="text-red-600 dark:text-red-500 text-xs font-bold tracking-wider uppercase mt-1">{stipulation}</p>
            )}
        </div>
    );
};

export function EventGrid({ initialEvents }: EventGridProps) {
  const { toast } = useToast();
  
  const [selectedEvent, setSelectedEvent] = useState<DetailedEvent | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  
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
  
  const allEvents = useMemo(() => flattenEvents(initialEvents), [initialEvents]);
  const eventsByMonth = useMemo(() => groupEventsByMonth(allEvents), [allEvents]);

  const handleDownload = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(initialEvents, null, 2)
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
  
  const handleEventClick = (event: DetailedEvent) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          <span className="text-black dark:text-white">Attitude Rewind</span>
        </h1>
      </header>

        {Object.entries(eventsByMonth).map(([monthYear, events]) => (
            <div key={monthYear} className="mb-12">
                <h2 className="font-headline text-3xl text-primary mb-6">{monthYear.split(' ')[0]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {events.map(event => {
                        const status = eventStatuses[event.id] || 'disponible';
                        return (
                        <Card 
                            key={event.id}
                            className={cn(
                                "cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl border-2",
                                getCardStyle(event.type)
                            )}
                            onClick={() => handleEventClick(event)}
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
                    )})}
                </div>
            </div>
        ))}
      
      <div className="text-center my-12">
        <Button onClick={handleDownload} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar Datos
        </Button>
      </div>

      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="max-w-2xl h-[80vh] flex flex-col bg-background">
          {selectedEvent && (
            <>
              <DialogHeader className="text-left">
                 <DialogTitle className="font-headline text-3xl">
                    {selectedEvent.type === 'ppv' ? (selectedEvent as PPVEvent).name : `WWF ${getEventTypeDisplay(selectedEvent.type)}`}
                </DialogTitle>
                <DialogDescription>
                  {`${new Date(selectedEvent.year, getMonthNumber(selectedEvent.month), parseInt(selectedEvent.date)).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} · ${selectedEvent.location}`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-grow min-h-0">
                <ScrollArea className="h-full pr-6">
                  <div className="space-y-6">
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <Badge className={cn("text-sm", getShowBadgeStyle(selectedEvent.type))}>{getEventTypeDisplay(selectedEvent.type)}</Badge>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>{new Date(selectedEvent.year, getMonthNumber(selectedEvent.month), parseInt(selectedEvent.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                        <ListChecks className="h-5 w-5 text-primary" />
                        Cartelera de Luchas
                      </h3>
                      {selectedEvent.matches && selectedEvent.matches.length > 0 ? (
                        <div className="space-y-2">
                          {selectedEvent.matches.map((match, i) => <MatchCard key={i} match={match} />)}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No se ha anunciado la cartelera de combates.</p>
                      )}
                    </div>
                    
                    {selectedEvent.description && (
                      <Collapsible>
                        <div className="p-4 bg-card rounded-lg border">
                          <CollapsibleTrigger className="flex w-full items-center justify-between">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <Info className="h-5 w-5 text-primary" />
                              Resumen del Evento
                            </h3>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-3 bg-muted/50 rounded-lg mt-2">
                              <p className="text-sm text-muted-foreground italic">{selectedEvent.description}</p>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    )}

                    <div className="p-4 bg-card rounded-lg space-y-3 border">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            Estado de Visualización
                        </h3>
                        <Select
                            value={eventStatuses[selectedEvent.id] || 'disponible'}
                            onValueChange={(value) => handleStatusChange(selectedEvent.id, value as EventStatus)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="disponible">
                                    <div className="flex items-center gap-2">
                                        <Circle className="h-4 w-4 text-muted-foreground" />
                                        Disponible
                                    </div>
                                </SelectItem>
                                <SelectItem value="visto">
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4 text-green-500" />
                                        Visto
                                    </div>
                                </SelectItem>
                                <SelectItem value="no-visto">
                                    <div className="flex items-center gap-2">
                                        <EyeOff className="h-4 w-4 text-red-500" />
                                        No Visto
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
