
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
import { StatsDashboard } from "@/components/stats-dashboard";
import { ScrollArea } from '@/components/ui/scroll-area';
import { EventsCalendar } from '@/components/events-calendar';
import { Header } from '@/components/header';
import type { EventType } from '@/components/event-grid';

export default function Home() {
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [showFilter, setShowFilter] = useState<EventType | 'all'>('all');

  const filteredEvents = useMemo(() => {
    let events = WWF_ALL_DATA;

    if (yearFilter !== 'all') {
      const year = parseInt(yearFilter);
      events = events.filter(month => month.year === year);
    }
    
    return events;
  }, [yearFilter]);

  return (
    <main className="min-h-screen">
      <Header
        yearFilter={yearFilter}
        onYearFilterChange={setYearFilter}
        showFilter={showFilter}
        onShowFilterChange={setShowFilter}
      />
      
      <EventGrid 
        initialEvents={filteredEvents}
        showFilter={showFilter}
      />

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
