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
} from "lucide-react";
import { es } from 'date-fns/locale';

import type { MonthData, Event, PPVEvent } from "@/lib/events-data";
import {
  searchEventInsights,
  type AISearchEventInsightsOutput,
  type AISearchEventInsightsInput,
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
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RawIcon } from "./icons/raw-icon";
import { SmackDownIcon } from "./icons/smackdown-icon";
import { PpvIcon } from "./icons/ppv-icon";

interface EventTimelineProps {
  initialEvents: MonthData[];
}

type EventStatus = "disponible" | "visto" | "no-visto";
type EventStatusMap = { [eventId: string]: EventStatus };

const flattenEventsToSearchableObjects = (data: MonthData[]): AISearchEventInsightsInput['eventData'] => {
  const eventObjects: AISearchEventInsightsInput['eventData'] = [];
  data.forEach((month, monthIndex) => {
    month.raw.forEach((event, eventIndex) => {
      eventObjects.push({
        id: `${month.monthId}-raw-${eventIndex}`,
        text: `RAW en ${month.month} ${event.date}: ${event.location}`
      });
    });
    month.smackdown.forEach((event, eventIndex) => {
      eventObjects.push({
        id: `${month.monthId}-smackdown-${eventIndex}`,
        text: `SmackDown en ${month.month} ${event.date}: ${event.location}`
      });
    });
    month.ppvs.forEach((event, eventIndex) => {
      eventObjects.push({
        id: `${month.monthId}-ppv-${eventIndex}`,
        text: `PPV ${event.name} en ${month.month} ${event.date}: ${event.location}`
      });
    });
  });
  return eventObjects;
};

const monthNameToNumber: { [key: string]: number } = {
  Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
  Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11,
};

type DayEvents = { raw: (Event & {id: string})[]; smackdown: (Event & {id: string})[]; ppvs: (PPVEvent & {id: string})[] };
type DetailedEvent = (Event | PPVEvent) & { type: 'raw' | 'smackdown' | 'ppv', id: string };

const getEventsByDate = (data: MonthData[]) => {
  const eventsByDate = new Map<string, DayEvents>();
  data.forEach((month) => {
    const monthIndex = monthNameToNumber[month.month];
    if (monthIndex === undefined) return;
    const processEvents = (events: (Event | PPVEvent)[], type: 'raw' | 'smackdown' | 'ppvs', typeName: 'raw' | 'smackdown' | 'ppv') => {
      events.forEach((event, eventIndex) => {
        const date = new Date(2000, monthIndex, parseInt(event.date));
        const dateString = date.toDateString();
        if (!eventsByDate.has(dateString)) {
          eventsByDate.set(dateString, { raw: [], smackdown: [], ppvs: [] });
        }
        const dayEvents = eventsByDate.get(dateString)!;
        const eventWithId = { ...event, id: `${month.monthId}-${typeName}-${eventIndex}`};
        (dayEvents[type] as (Event & {id: string})[]).push(eventWithId);
      });
    };
    processEvents(month.raw, 'raw', 'raw');
    processEvents(month.smackdown, 'smackdown', 'smackdown');
    processEvents(month.ppvs, 'ppvs', 'ppv');
  });
  return eventsByDate;
};

const getEventDates = (eventsByDate: Map<string, DayEvents>, eventStatuses: EventStatusMap) => {
  const eventDates: {
    all: Date[],
    raw: Date[],
    smackdown: Date[],
    ppv: Date[],
    watched: Date[],
  } = { all: [], raw: [], smackdown: [], ppv: [], watched: [] };

  eventsByDate.forEach((dayEvents, dateString) => {
    const date = new Date(dateString);
    eventDates.all.push(date);
    if (dayEvents.raw.length > 0) eventDates.raw.push(date);
    if (dayEvents.smackdown.length > 0) eventDates.smackdown.push(date);
    if (dayEvents.ppvs.length > 0) eventDates.ppv.push(date);

    const allDayEvents = [...dayEvents.raw, ...dayEvents.smackdown, ...dayEvents.ppvs];
    if (allDayEvents.some(event => eventStatuses[event.id] === 'visto')) {
      eventDates.watched.push(date);
    }
  });
  return eventDates;
}

const createEventMap = (data: MonthData[]): Map<string, DetailedEvent> => {
    const map = new Map<string, DetailedEvent>();
    data.forEach((month) => {
        month.raw.forEach((event, index) => map.set(`${month.monthId}-raw-${index}`, { ...event, type: 'raw', id: `${month.monthId}-raw-${index}` }));
        month.smackdown.forEach((event, index) => map.set(`${month.monthId}-smackdown-${index}`, { ...event, type: 'smackdown', id: `${month.monthId}-smackdown-${index}` }));
        month.ppvs.forEach((event, index) => map.set(`${month.monthId}-ppv-${index}`, { ...event, type: 'ppv', id: `${month.monthId}-ppv-${index}` }));
    });
    return map;
};

const StatusIcon = ({ status }: { status: EventStatus }) => {
  switch (status) {
    case "visto":
      return <Eye className="h-4 w-4 text-green-500" />;
    case "no-visto":
      return <EyeOff className="h-4 w-4 text-red-500" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
};

export function EventTimeline({ initialEvents }: EventTimelineProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] =
    useState<AISearchEventInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<DetailedEvent | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<AIGenerateEventSummaryOutput | null>(null);
  const [isAiSummaryLoading, setIsAiSummaryLoading] = useState(false);
  const [month, setMonth] = useState(new Date(2000, 0));
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});

  useEffect(() => {
    const storedMonth = localStorage.getItem('attitude-rewind-month');
    if (storedMonth) {
      const parsedMonth = new Date(storedMonth);
      if (!isNaN(parsedMonth.getTime())) {
        setMonth(parsedMonth);
      }
    }
    const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
    if(storedStatuses) {
      setEventStatuses(JSON.parse(storedStatuses));
    }
  }, []);
  
  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
    localStorage.setItem('attitude-rewind-month', newMonth.toISOString());
  };

  const handleStatusChange = (eventId: string, status: EventStatus) => {
    const newStatuses = { ...eventStatuses, [eventId]: status };
    setEventStatuses(newStatuses);
    localStorage.setItem('attitude-rewind-statuses', JSON.stringify(newStatuses));
  };

  const eventsByDate = useMemo(() => getEventsByDate(initialEvents), [initialEvents]);
  const eventDatesModifiers = useMemo(() => getEventDates(eventsByDate, eventStatuses), [eventsByDate, eventStatuses]);
  const eventMap = useMemo(() => createEventMap(initialEvents), [initialEvents]);
  
  const selectedDayEvents = selectedDate ? eventsByDate.get(selectedDate.toDateString()) : undefined;

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
      link.download = "wwf_2000_events.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Descarga iniciada",
        description: "El archivo wwf_2000_events.json ha comenzado a descargarse.",
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
  
  const handleDayClick = (day: Date, { selected }: { selected: boolean }) => {
    if (eventDatesModifiers.all.some(eventDate => eventDate.toDateString() === day.toDateString())) {
      setSelectedDate(selected ? undefined : day);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleEventClick = (event: DetailedEvent, date?: Date) => {
    if (date) setSelectedDate(date);
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
    setAiSummary(null);
  };

  const handleSearchResultClick = (eventId: string) => {
      const event = eventMap.get(eventId);
      if (event) {
          const monthIndex = Object.values(initialEvents).findIndex(m => m.monthId === eventId.split('-')[0]);
          const monthName = initialEvents[monthIndex].month;
          const monthNumber = monthNameToNumber[monthName];
          const eventDate = new Date(2000, monthNumber, parseInt(event.date));
          
          handleEventClick(event, eventDate);
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
          <span className="text-black dark:text-white">Attitude Rewind years </span>
          <span className="text-red-600">2000</span>
        </h1>
      </header>

      <div className="max-w-4xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Busca eventos por ciudad, nombre de PPV, etc. (p.ej. 'Royal Rumble' o 'eventos en Chicago')"
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

      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mb-12">
        <div className="w-full lg:w-auto">
          <Card>
            <CardContent className="p-0 flex justify-center">
              <Calendar
                locale={es}
                mode="single"
                month={month}
                onMonthChange={handleMonthChange}
                selected={selectedDate}
                onSelect={setSelectedDate}
                onDayClick={handleDayClick}
                modifiers={{ 
                    event: eventDatesModifiers.all,
                    raw: eventDatesModifiers.raw,
                    smackdown: eventDatesModifiers.smackdown,
                    ppv: eventDatesModifiers.ppv,
                    watched: eventDatesModifiers.watched,
                }}
                modifiersClassNames={{
                    event: 'bg-primary/20 text-primary-foreground rounded-full',
                    raw: 'day-raw',
                    smackdown: 'day-smackdown',
                    ppv: 'day-ppv',
                    watched: 'day-watched',
                }}
                fromYear={2000}
                toYear={2000}
                className="p-4"
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:max-w-md">
          {selectedDate && selectedDayEvents ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Eventos para {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                 {selectedDayEvents.raw.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <RawIcon className="h-6 w-6" />
                            <h3 className="font-semibold text-lg">RAW</h3>
                        </div>
                        <ul className="space-y-2 pl-2 border-l-2 border-red-500/50 ml-3">
                            {selectedDayEvents.raw.map((event, index) => (
                                <li key={`raw-${index}`} className="flex flex-col items-start p-1 rounded-md">
                                  <div><MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />{event.location}</div>
                                  <Button variant="ghost" size="sm" onClick={() => handleEventClick({ ...event, type: 'raw' }, selectedDate)} className="mt-1 self-start">
                                    <Info className="h-4 w-4 mr-2"/>
                                    Detalles
                                  </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}
                 {selectedDayEvents.smackdown.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <SmackDownIcon className="h-6 w-6" />
                            <h3 className="font-semibold text-lg">SmackDown</h3>
                        </div>
                        <ul className="space-y-2 pl-2 border-l-2 border-blue-500/50 ml-3">
                            {selectedDayEvents.smackdown.map((event, index) => (
                                <li key={`sd-${index}`} className="flex flex-col items-start p-1 rounded-md">
                                  <div><MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />{event.location}</div>
                                   <Button variant="ghost" size="sm" onClick={() => handleEventClick({ ...event, type: 'smackdown' }, selectedDate)} className="mt-1 self-start">
                                    <Info className="h-4 w-4 mr-2"/>
                                    Detalles
                                  </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}
                 {selectedDayEvents.ppvs.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <PpvIcon className="h-6 w-6 text-accent" />
                            <h3 className="font-semibold text-lg">PPVs</h3>
                        </div>
                        <ul className="space-y-2 pl-2 border-l-2 border-amber-500/50 ml-3">
                            {selectedDayEvents.ppvs.map((event, index) => (
                                <li key={`ppv-${index}`} className="flex flex-col items-start p-1 rounded-md">
                                    <div className="font-bold">{event.name}</div>
                                    <div><MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />{event.location}</div>
                                    <Button variant="ghost" size="sm" onClick={() => handleEventClick({ ...event, type: 'ppv' }, selectedDate)} className="mt-1 self-start">
                                    <Info className="h-4 w-4 mr-2"/>
                                    Detalles
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent className="text-center text-muted-foreground p-6">
                <CalendarDays className="mx-auto h-12 w-12 mb-4" />
                <p>Selecciona un día en el calendario para ver los detalles del evento.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <Button onClick={handleDownload} variant="outline">
          <Download />
          Descargar Datos
        </Button>
      </div>

      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">
              Resultados:
            </DialogTitle>
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
              <DialogHeader>
                 <DialogTitle className="font-headline text-2xl flex items-center gap-2">
                    <StatusIcon status={eventStatuses[selectedEvent.id] || 'disponible'} />
                    {selectedEvent.type === 'ppv' ? (selectedEvent as PPVEvent).name : `WWF ${selectedEvent.type.toUpperCase()}`}
                </DialogTitle>
                <DialogDescription asChild>
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      <span>{selectedDate?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="flex-grow min-h-0">
                <ScrollArea className="h-full pr-4 -mr-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedEvent.type === 'ppv' && (selectedEvent as PPVEvent).coverUrl && (
                        <div className="md:col-span-1">
                          <Image
                            src={(selectedEvent as PPVEvent).coverUrl!}
                            alt={`Cover for ${(selectedEvent as PPVEvent).name}`}
                            width={200}
                            height={300}
                            className="rounded-lg w-full h-auto object-cover"
                            data-ai-hint="wrestling poster"
                          />
                        </div>
                      )}
                      <div className={selectedEvent.type === 'ppv' && (selectedEvent as PPVEvent).coverUrl ? "md:col-span-2" : "md:col-span-3"}>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                            Estado
                          </h3>
                           <Select
                              value={eventStatuses[selectedEvent.id] || 'disponible'}
                              onValueChange={(value) => handleStatusChange(selectedEvent.id, value as EventStatus)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="disponible">
                                  <div className="flex items-center gap-2">
                                    <Circle className="h-4 w-4 text-muted-foreground" /> Disponible
                                  </div>
                                </SelectItem>
                                <SelectItem value="visto">
                                   <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-green-500" /> Visto
                                  </div>
                                </SelectItem>
                                <SelectItem value="no-visto">
                                  <div className="flex items-center gap-2">
                                    <EyeOff className="h-4 w-4 text-red-500" /> No Visto
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                        </div>

                        <Separator className="my-4"/>

                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                          <Sparkles className="h-5 w-5 text-accent" />
                          Resumen del Show
                        </h3>
                        {selectedEvent.description ? (
                          <p className="text-muted-foreground">{selectedEvent.description}</p>
                        ) : (
                          <p className="text-muted-foreground text-sm">No hay descripción disponible. ¡Genera una con IA!</p>
                        )}
                        
                        <Button onClick={handleGenerateSummary} disabled={isAiSummaryLoading} variant="outline" size="sm" className="mt-2">
                          {isAiSummaryLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
                          {isAiSummaryLoading ? "Generando..." : "Generar resumen con IA"}
                        </Button>

                        {aiSummary && (
                          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm text-black">{aiSummary.summary}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <List className="h-5 w-5 text-accent" />
                        Cartelera de Combates
                      </h3>
                      {selectedEvent.matches && selectedEvent.matches.length > 0 ? (
                        <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                          {selectedEvent.matches.map((match, i) => <li key={i}>{match}</li>)}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No se ha anunciado la cartelera de combates.</p>
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
