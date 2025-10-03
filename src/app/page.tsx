
"use client";

import React, { useState, useMemo } from "react";
import { EventGrid } from '@/components/event-grid';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { Button } from '@/components/ui/button';
import { BarChart2, CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatsDashboard } from "@/components/stats-dashboard";
import { ScrollArea } from '@/components/ui/scroll-area';
import { EventsCalendar } from '@/components/events-calendar';

export default function Home() {
  const [yearFilter, setYearFilter] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    if (yearFilter === 'all') {
      return WWF_ALL_DATA;
    }
    const year = parseInt(yearFilter);
    return WWF_ALL_DATA.filter(month => month.year === year);
  }, [yearFilter]);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <header className="text-center mb-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            <span className="text-black dark:text-white">Attitude </span><span className="text-red-500">Rewind</span>
          </h1>
        </header>

        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filtrar por Año</span>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="2000">2000</SelectItem>
                <SelectItem value="2001">2001</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <EventGrid initialEvents={filteredEvents} />

      <div className="fixed bottom-8 right-8 z-10 flex flex-col items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-full h-14 w-14 shadow-lg bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <span className="sr-only">Ver Calendario</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-fit rounded-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl">Calendario de Eventos</DialogTitle>
            </DialogHeader>
             <EventsCalendar initialEvents={filteredEvents} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
              <Button size="icon" className="rounded-full h-14 w-14 shadow-lg bg-black hover:bg-black/90">
                  <BarChart2 className="h-6 w-6 text-red-500" />
                  <span className="sr-only">Ver Estadísticas</span>
              </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-4xl rounded-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl">Estadísticas</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[70vh] pr-4">
              <StatsDashboard initialEvents={filteredEvents} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

    