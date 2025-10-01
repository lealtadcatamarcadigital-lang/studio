
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from 'next/image';
import {
  Search,
  Download,
  LoaderCircle,
  CalendarDays,
  MapPin,
  Sparkles,
  List,
  Info,
  Eye,
  EyeOff,
  Circle,
  Tv,
  Ticket,
  ListChecks,
} from "lucide-react";

import type { MonthData, Event, PPVEvent } from "@/lib/events-data";
import {
  searchEventInsights,
  type AISearchEventInsightsOutput,
} from "@/ai/flows/ai-search-event-insights";
import { generateEventSummary, type AIGenerateEventSummaryOutput } from "@/ai/flows/ai-generate-event-summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AISearchEventInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState<DetailedEvent | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<AIGenerateEventSummaryOutput | null>(null);
  const [isAiSummaryLoading, setIsAiSummaryLoading] = useState(false);
  
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});

  useEffect(() => {
    const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
    if(storedStatuses) {
      setEventStatuses(JSON.parse(storedStatuses));
    }
  }, []);
  
  const handleStatusChange = (eventId: string, status: EventStatus) => {
    const newStatuses = { ...eventStatuses, [eventId]: status };
    setEventStatuses(newStatuses);
    localStorage.setItem('attitude-rewind-statuses', JSON.stringify(newStatuses));
  };
  
  const allEvents = useMemo(() => flattenEvents(initialEvents), [initialEvents]);
  const eventsByMonth = useMemo(() => groupEventsByMonth(allEvents), [allEvents]);
  const eventMap = useMemo(() => new Map(allEvents.map(event => [event.id, event])), [allEvents]);

  const flattenEventsToSearchableObjects = (data: MonthData[]) => {
    const eventObjects: { id: string; text: string }[] = [];
    data.forEach((month, monthIndex) => {
      month.raw.forEach((event, eventIndex) => {
        eventObjects.push({
          id: `${month.monthId}-${month.year}-raw-${eventIndex}`,
          text: `RAW en ${month.month} ${event.date}, ${month.year}: ${event.location}`
        });
      });
      month.smackdown.forEach((event, eventIndex) => {
        eventObjects.push({
          id: `${month.monthId}-${month.year}-smackdown-${eventIndex}`,
          text: `SmackDown en ${month.month} ${event.date}, ${month.year}: ${event.location}`
        });
      });
      month.ppvs.forEach((event, eventIndex) => {
        eventObjects.push({
          id: `${month.monthId}-${month.year}-ppv-${eventIndex}`,
          text: `PPV ${event.name} en ${month.month} ${event.date}, ${month.year}: ${event.location}`
        });
      });
    });
    return eventObjects;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setIsSearchDialogOpen(true);
    setSearchResults(null);

    const eventObjects = flattenEventsToSearchableObjects(initialEvents);
    try {
      const results = await searchEventInsights({
        query: searchQuery,
        eventData: eventObjects,
      });
      setSearchResults(results);
    } catch (error) {
      console.error("AI search failed:", error);
      toast({
        variant: "destructive",
        title: "Error de búsqueda",
        description: "No se pudo completar la búsqueda de IA. Inténtalo de nuevo.",
      });
      setIsSearchDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

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
    setAiSummary(null);
  };

  const handleSearchResultClick = (eventId: string) => {
      const event = eventMap.get(eventId);
      if (event) {
          handleEventClick(event);
          setIsSearchDialogOpen(false);
      }
  };
  
  const handleGenerateSummary = async () => {
    if (!selectedEvent) return;
    
    setIsAiSummaryLoading(true);
    setAiSummary(null);

    try {
        const eventName = selectedEvent.type === 'ppv' ? (selectedEvent as PPVEvent).name : selectedEvent.type.toUpperCase();
        const result = await generateEventSummary({
            eventName: eventName,
            matches: selectedEvent.matches || [],
        });
        setAiSummary(result);
    } catch(error) {
        console.error("AI summary generation failed:", error);
        toast({
            variant: "destructive",
            title: "Error de IA",
            description: "No se pudo generar el resumen. Inténtalo de nuevo.",
        });
    } finally {
        setIsAiSummaryLoading(false);
    }
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
                    {events.map(event => (
                        <Card 
                            key={event.id}
                            className={cn(
                                "cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl border-2",
                                getCardStyle(event.type)
                            )}
                            onClick={() => handleEventClick(event)}
                        >
                            <CardContent className="p-4 flex flex-col justify-between h-full">
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
                                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                    <EventTypeIcon type={event.type} />
                                    <span>{getEventTypeDisplay(event.type)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        ))}
      
      <div className="max-w-4xl mx-auto my-12">
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Busca eventos por ciudad, nombre de PPV, etc. (p.ej. 'WrestleMania' o 'eventos en Houston')"
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" disabled={isLoading} className="h-12">
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Search />
            )}
            <span className="hidden md:inline ml-2">Buscar con IA</span>
          </Button>
        </form>
      </div>

      <div className="text-center">
        <Button onClick={handleDownload} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar Datos
        </Button>
      </div>

      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Resultados:</DialogTitle>
          </DialogHeader>
          <div className="flex-grow min-h-0">
            <ScrollArea className="h-full pr-4 -mr-4">
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">
                      La IA está analizando los eventos...
                    </p>
                  </div>
                </div>
              )}
              {searchResults && (
                <div className="space-y-4">
                  {searchResults.results.length > 0 ? (
                    searchResults.results.map((result, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg bg-card/50 cursor-pointer hover:bg-accent/50"
                        onClick={() => handleSearchResultClick(result.eventId)}
                      >
                        <p className="font-semibold mb-2">
                          {result.eventText}
                        </p>
                        <Separator className="my-2" />
                        <p className="text-sm text-muted-foreground">
                          {result.insights}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No se encontraron eventos relevantes para tu búsqueda.
                    </p>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
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
                    
                    <div className="p-4 bg-card rounded-lg">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                  <Sparkles className="h-5 w-5 text-primary" />
                                  Avance del Evento con IA
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1">Genere un resumen histórico del evento.</p>
                            </div>
                            <Button onClick={handleGenerateSummary} disabled={isAiSummaryLoading} className="bg-red-600 hover:bg-red-700 text-white flex-shrink-0">
                              {isAiSummaryLoading ? <LoaderCircle className="animate-spin" /> : "Generar Avance"}
                            </Button>
                        </div>
                        

                        {isAiSummaryLoading && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                <LoaderCircle className="animate-spin h-4 w-4" />
                                <span>Analizando las rivalidades...</span>
                            </div>
                        )}

                        {aiSummary && (
                          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm text-primary-foreground/90">{aiSummary.summary}</p>
                          </div>
                        )}
                         {selectedEvent.description && !aiSummary && !isAiSummaryLoading &&(
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground italic">{selectedEvent.description}</p>
                          </div>
                        )}
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

    

    