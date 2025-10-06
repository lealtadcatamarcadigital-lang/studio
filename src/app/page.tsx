
'use client';

import React, { useState, useMemo, useEffect } from "react";
import { EventGrid, flattenEvents } from '@/components/event-grid';
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import type { EventType } from '@/components/event-grid';

const SCROLL_POSITION_KEY = 'attitude-rewind-scroll-position';

export default function Home() {
  const [showFilter, setShowFilter] = useState<EventType | 'all'>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  useEffect(() => {
    // Restore scroll position when component mounts
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    };

    // Save scroll position when navigating away
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
