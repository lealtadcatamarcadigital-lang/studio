
'use client';

import React, { useState, useMemo, useEffect } from "react";
import { EventGrid, flattenEvents, type EventStatusMap } from '@/components/event-grid';
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import type { EventType, DetailedEvent } from '@/components/event-grid';
import { NextShowCarousel } from "@/components/next-show-carousel";

const SCROLL_POSITION_KEY = 'attitude-rewind-scroll-position';

export default function Home() {
  const [showFilter, setShowFilter] = useState<EventType | 'all'>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  useEffect(() => {
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
    } catch (error) {
      console.error("Could not parse event statuses from localStorage:", error);
    }
  }, []);

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

  const upcomingEvents = useMemo(() => {
    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    if (firstUnwatchedIndex === -1) {
      return []; // All events watched
    }
    return allEvents.slice(firstUnwatchedIndex);
  }, [allEvents, eventStatuses]);

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
        activePage="grid"
      />
      <NextShowCarousel events={upcomingEvents} />
      <EventGrid events={filteredEvents} />
    </main>
  );
}
