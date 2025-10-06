
'use client';

import React, { useState, useMemo } from "react";
import { EventGrid, flattenEvents } from '@/components/event-grid';
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import type { EventType } from '@/components/event-grid';
import { EventsCalendar } from "@/components/events-calendar";
import { StatsDashboard } from "@/components/stats-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, BarChart2 } from "lucide-react";

export default function Home() {
  const [showFilter, setShowFilter] = useState<EventType | 'all'>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  const filteredEvents = useMemo(() => {
    let events = allEvents;

    if (showFilter !== 'all') {
      events = events.filter(event => event.type === showFilter);
    }
    
    if (yearFilter !== 'all') {
      const year = parseInt(yearFilter);
      events = events.filter(event => event.year === year);
    }
    
    return events;
  }, [allEvents, showFilter, yearFilter]);

  return (
    <main className="min-h-screen">
      <Header
        showFilter={showFilter}
        onShowFilterChange={setShowFilter}
        yearFilter={yearFilter}
        onYearFilterChange={setYearFilter}
        title="AttitudeRewind"
      />
      
      <Tabs defaultValue="calendar" className="w-full">
        <div className="container mx-auto px-4 py-4">
          <TabsList className="grid w-full grid-cols-2 md:w-96 md:mx-auto">
            <TabsTrigger value="calendar"><Calendar className="mr-2" />Calendario</TabsTrigger>
            <TabsTrigger value="stats"><BarChart2 className="mr-2" />Estadísticas</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="calendar">
          <EventsCalendar initialEvents={WWF_ALL_DATA} />
        </TabsContent>
        <TabsContent value="stats" className="container mx-auto px-4">
           <StatsDashboard initialEvents={WWF_ALL_DATA} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
