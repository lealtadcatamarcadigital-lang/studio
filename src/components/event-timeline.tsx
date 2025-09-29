"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  LoaderCircle,
  CalendarDays,
  MapPin,
} from "lucide-react";

import type { MonthData } from "@/lib/events-data";
import {
  searchEventInsights,
  type AISearchEventInsightsOutput,
} from "@/ai/flows/ai-search-event-insights";
import { EventCard } from "@/components/event-card";
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
import { cn } from "@/lib/utils";

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

export function EventTimeline({ initialEvents }: EventTimelineProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] =
    useState<AISearchEventInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setIsDialogOpen(true);
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
      setIsDialogOpen(false);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary mb-4">
          WWF Throwback 2000
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          Revive la acción del año 2000 con esta cronología completa de eventos
          de la WWF. Busca tus shows favoritos y descarga todos los datos.
        </p>
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

      <div className="text-center mb-12">
        <Button onClick={handleDownload} variant="outline">
          <Download />
          Descargar Datos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {initialEvents.map((month, index) => (
          <EventCard
            key={month.monthId}
            monthData={month}
            style={{ animationDelay: `${index * 100}ms` }}
            className="opacity-0 animate-fade-in"
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
    </div>
  );
}
