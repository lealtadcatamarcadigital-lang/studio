"use client";

import React, { useState, useMemo } from "react";
import Image from 'next/image';
import {
  Search,
  Download,
  LoaderCircle,
  CalendarDays,
  MapPin,
  Sparkles,
  List,
} from "lucide-react";
import { es } from 'date-fns/locale';

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

const flattenEventsToStrings = (data: MonthData[]): string[] => {
  const eventStrings: string[] = [];
  data.forEach((month) => {
    month.raw.forEach((event) => {
      eventStrings.push(
        `RAW en ${month.month} ${event.date}: ${event.location}`
      );
    });
    month.smackdown.forEach((event) => {
      eventStrings.push(
        `SmackDown en ${month.month} ${event.date}: ${event.location}`
      );
    });
    month.ppvs.forEach((event) => {
      eventStrings.push(
        `PPV ${event.name} en ${month.month} ${event.date}: ${event.location}`
      );
    });
  });
  return eventStrings;
};

const monthNameToNumber: { [key: string]: number } = {
  Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
  Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11,
};

type DayEvents = { raw: Event[]; smackdown: Event[]; ppvs: PPVEvent[] };

const getEventsByDate = (data: MonthData[]) => {
  const eventsByDate = new Map<string, DayEvents>();
  data.forEach((month) => {
    const monthIndex = monthNameToNumber[month.month];
    if (monthIndex === undefined) return;
    const processEvents = (events: (Event | PPVEvent)[], type: 'raw' | 'smackdown' | 'ppvs') => {
      events.forEach(event => {
        const date = new Date(2000, monthIndex, parseInt(event.date));
        const dateString = date.toDateString();
        if (!eventsByDate.has(dateString)) {
          eventsByDate.set(dateString, { raw: [], smackdown: [], ppvs: [] });
        }
        const dayEvents = eventsByDate.get(dateString)!;
        (dayEvents[type] as (Event | PPVEvent)[]).push(event);
      });
    };
    processEvents(month.raw, 'raw');
    processEvents(month.smackdown, 'smackdown');
    processEvents(month.ppvs, 'ppvs');
  });
  return eventsByDate;
};

const getEventDates = (eventsByDate: Map<string, DayEvents>) => {
  const eventDates: {
    all: Date[],
    raw: Date[],
    smackdown: Date[],
    ppv: Date[]
  } = { all: [], raw: [], smackdown: [], ppv: [] };

  eventsByDate.forEach((dayEvents, dateString) => {
    const date = new Date(dateString);
    eventDates.all.push(date);
    if (dayEvents.raw.length > 0) eventDates.raw.push(date);
    if (dayEvents.smackdown.length > 0) eventDates.smackdown.push(date);
    if (dayEvents.ppvs.length > 0) eventDates.ppv.push(date);
  });
  return eventDates;
}

type DetailedEvent = (Event | PPVEvent) & { type: 'raw' | 'smackdown' | 'ppv' };

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

  const eventsByDate = useMemo(() => getEventsByDate(initialEvents), [initialEvents]);
  const eventDatesModifiers = useMemo(() => getEventDates(eventsByDate), [eventsByDate]);
  
  const selectedDayEvents = selectedDate ? eventsByDate.get(selectedDate.toDateString()) : undefined;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setIsSearchDialogOpen(true);
    setSearchResults(null);

    const eventStrings = flattenEventsToStrings(initialEvents);
    try {
      const results = await searchEventInsights({
        query: searchQuery,
        eventData: eventStrings,
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

  const handleEventClick = (event: Event | PPVEvent, type: 'raw' | 'smackdown' | 'ppv') => {
    setSelectedEvent({ ...event, type });
    setIsEventDetailsOpen(true);
    setAiSummary(null);
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
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary mb-4">
          Attitude Rewind years 2000
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 flex justify-center">
            <Card>
                <CardContent className="p-0 flex justify-center">
                    <Calendar
                        locale={es}
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        onDayClick={handleDayClick}
                        modifiers={{ 
                            event: eventDatesModifiers.all,
                            raw: eventDatesModifiers.raw,
                            smackdown: eventDatesModifiers.smackdown,
                            ppv: eventDatesModifiers.ppv,
                        }}
                        modifiersClassNames={{
                            event: 'bg-primary/20 text-primary-foreground rounded-full',
                            raw: 'day-raw',
                            smackdown: 'day-smackdown',
                            ppv: 'day-ppv',
                        }}
                        defaultMonth={new Date(2000, 0)}
                        fromYear={2000}
                        toYear={2000}
                        className="p-4"
                    />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
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
                                <li key={`raw-${index}`} className="cursor-pointer hover:bg-muted p-1 rounded-md" onClick={() => handleEventClick(event, 'raw')}>
                                  <MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />{event.location}
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
                                <li key={`sd-${index}`} className="cursor-pointer hover:bg-muted p-1 rounded-md" onClick={() => handleEventClick(event, 'smackdown')}>
                                  <MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />{event.location}
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
                                <li key={`ppv-${index}`} className="cursor-pointer hover:bg-muted p-1 rounded-md" onClick={() => handleEventClick(event, 'ppv')}>
                                    <p className="font-bold">{event.name}</p>
                                    <p><MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />{event.location}</p>
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
              Resultados de la Búsqueda IA
            </DialogTitle>
            <DialogDescription>
              Resultados para: "{searchQuery}"
            </DialogDescription>
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
                  {searchResults.results
                    .filter(result => !result.insights.toLowerCase().includes("not relevant"))
                    .map((result, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg bg-card/50"
                      >
                        <p className="font-semibold text-primary-foreground mb-2">
                          {result.event}
                        </p>
                        <Separator className="my-2" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-accent-foreground/80">
                            Perspectiva de la IA:
                          </span>{" "}
                          {result.insights}
                        </p>
                      </div>
                    ))}
                    {searchResults.results.filter(result => !result.insights.toLowerCase().includes("not relevant")).length === 0 && (
                        <p className="text-muted-foreground text-center py-8">No se encontraron eventos relevantes para tu búsqueda.</p>
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
                <DialogTitle className="font-headline text-2xl">
                    {selectedEvent.type === 'ppv' ? (selectedEvent as PPVEvent).name : `WWF ${selectedEvent.type.toUpperCase()}`}
                </DialogTitle>
                <DialogDescription>
                  
                    <p className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      <span>{selectedDate?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedEvent.location}</span>
                    </p>
                  
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

    