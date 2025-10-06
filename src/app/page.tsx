
'use client';

import React, { useState, useMemo } from "react";
import { EventGrid, flattenEvents } from '@/components/event-grid';
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import type { EventType } from '@/components/event-grid';

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
      <EventGrid events={filteredEvents} />
    </main>
  );
}
