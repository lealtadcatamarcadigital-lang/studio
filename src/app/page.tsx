
'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, type DetailedEvent, type EventStatusMap } from '@/lib/utils';
import { NextShowCarousel } from "@/components/next-show-carousel";
import { EventGrid } from "@/components/event-grid";

export type ShowTypeFilter = 'todos' | 'raw' | 'smackdown' | 'ppv';
export type YearFilter = 'todos' | '2000' | '2001';

export default function Home() {
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [showFilter, setShowFilter] = useState<ShowTypeFilter>('todos');
  const [yearFilter, setYearFilter] = useState<YearFilter>('todos');

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  useEffect(() => {
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
      const storedShowFilter = localStorage.getItem('attitude-rewind-show-filter');
      if (storedShowFilter) {
        setShowFilter(storedShowFilter as ShowTypeFilter);
      }
      const storedYearFilter = localStorage.getItem('attitude-rewind-year-filter');
      if (storedYearFilter) {
        setYearFilter(storedYearFilter as YearFilter);
      }
    } catch (error) {
      console.error("Could not parse data from localStorage:", error);
    }
  }, []);

  const handleShowFilterChange = (value: ShowTypeFilter) => {
    setShowFilter(value);
    try {
      localStorage.setItem('attitude-rewind-show-filter', value);
    } catch (error) {
      console.error("Could not save show filter to localStorage:", error);
    }
  };

  const handleYearFilterChange = (value: YearFilter) => {
    setYearFilter(value);
    try {
      localStorage.setItem('attitude-rewind-year-filter', value);
    } catch (error) {
      console.error("Could not save year filter to localStorage:", error);
    }
  };

  const upcomingEvents = useMemo(() => {
    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    if (firstUnwatchedIndex === -1) {
      return []; // All events watched
    }
    return allEvents.slice(firstUnwatchedIndex);
  }, [allEvents, eventStatuses]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const showMatch = showFilter === 'todos' || event.type === showFilter;
      const yearMatch = yearFilter === 'todos' || event.year.toString() === yearFilter;
      return showMatch && yearMatch;
    });
  }, [allEvents, showFilter, yearFilter]);

  useEffect(() => {
    if (upcomingEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(upcomingEvents[0].id);
    }
  }, [upcomingEvents, selectedEventId]);

  return (
    <main className="min-h-screen">
      <Header
        showFilter={showFilter}
        yearFilter={yearFilter}
        onShowFilterChange={handleShowFilterChange}
        onYearFilterChange={handleYearFilterChange}
      />
      <NextShowCarousel events={upcomingEvents} onEventSelect={setSelectedEventId} />
      
      <EventGrid events={filteredEvents} />

    </main>
  );
}
