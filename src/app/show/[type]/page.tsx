
"use client";

import React, { useState, useMemo } from "react";
import { useParams } from 'next/navigation';
import { EventGrid, flattenEvents } from '@/components/event-grid';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { Header } from '@/components/header';
import type { EventType } from '@/components/event-grid';

const getTitle = (type: EventType | 'all') => {
  switch (type) {
    case 'raw':
      return 'Eventos de RAW';
    case 'smackdown':
      return 'Eventos de SmackDown';
    case 'ppv':
      return 'Eventos PPV';
    default:
      return 'Todos los Eventos';
  }
}

export default function ShowPage() {
  const params = useParams();
  const showFilter = (typeof params.type === 'string' ? params.type : 'all') as EventType;

  const [yearFilter, setYearFilter] = useState<string>('all');

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
        title={getTitle(showFilter)}
      />
      
      <EventGrid 
        events={filteredEvents}
      />

    </main>
  );
}
