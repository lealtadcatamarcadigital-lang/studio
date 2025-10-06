
"use client";

import React, { useState, useMemo } from "react";
import { EventGrid, flattenEvents } from '@/components/event-grid';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { Header } from '@/components/header';
import type { EventType } from '@/components/event-grid';

export default function Home() {
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [showFilter, setShowFilter] = useState<EventType>('raw');

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

    </main>
  );
}
