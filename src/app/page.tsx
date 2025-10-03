
"use client";

import React, { useState, useMemo } from "react";
import { EventGrid, flattenEvents } from '@/components/event-grid';
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

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  const filteredEvents = useMemo(() => {
    let events = allEvents;

    if (yearFilter !== 'all') {
      const year = parseInt(yearFilter);
      events = events.filter(event => event.year === year);
    }

    if (showFilter !== 'all') {
        events = events.filter(event => event.type === showFilter);
    }
    
    return events;
  }, [allEvents, yearFilter, showFilter]);
  
  const getEventTypeDisplay = (type: 'raw' | 'smackdown' | 'ppv') => {
      switch(type) {
          case 'raw': return 'RAW';
          case 'smackdown': return 'SmackDown';
          case 'ppv': return 'PPV';
      }
  };

  const monthDataForComponents = useMemo(() => {
    const groupedByYearAndMonth: Record<string, { month: string; monthId: string; year: number; raw: any[]; smackdown: any[]; ppvs: any[] }> = {};

    filteredEvents.forEach(event => {
      const key = `${event.year}-${event.monthId}`;
      if (!groupedByYearAndMonth[key]) {
        groupedByYearAndMonth[key] = {
          month: event.month,
          monthId: event.monthId,
          year: event.year,
          raw: [],
          smackdown: [],
          ppvs: [],
        };
      }
      if (event.type === 'raw') groupedByYearAndMonth[key].raw.push(event);
      if (event.type === 'smackdown') groupedByYearAndMonth[key].smackdown.push(event);
      if (event.type === 'ppv') groupedByYearAndMonth[key].ppvs.push(event);
    });

    return Object.values(groupedByYearAndMonth);
  }, [filteredEvents]);

  return (
    <main className="min-h-screen">
      <Header
        yearFilter={yearFilter}
        onYearFilterChange={setYearFilter}
        showFilter={showFilter}
        onShowFilterChange={setShowFilter}
      />
      
      <EventGrid 
        events={filteredEvents}
      />

      <div className="fixed bottom-8 right-8 z-10 flex flex-col items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-full h-14 w-14 shadow-lg bg-card hover:bg-muted border">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <span className="sr-only">Ver Calendario</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-fit rounded-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl">Calendario de Eventos</DialogTitle>
            </DialogHeader>
             <EventsCalendar initialEvents={monthDataForComponents} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
              <Button size="icon" className="rounded-full h-14 w-14 shadow-lg bg-card hover:bg-muted">
                  <BarChart2 className="h-6 w-6 text-red-500" />
                  <span className="sr-only">Ver Estadísticas</span>
              </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-4xl rounded-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl">Estadísticas</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[70vh] pr-4">
              <StatsDashboard initialEvents={monthDataForComponents} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
