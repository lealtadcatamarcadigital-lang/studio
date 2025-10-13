
'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, type DetailedEvent, type EventStatusMap } from '@/lib/utils';
import { NextShowCarousel } from "@/components/next-show-carousel";
import { EventGrid } from "@/components/event-grid";
import { EventDetails } from "@/components/event-details";
import { Skeleton } from "@/components/ui/skeleton";

export type ShowTypeFilter = 'todos' | 'raw' | 'smackdown' | 'ppv';
export type YearFilter = 'todos' | '2000' | '2001';

export default function Home() {
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [showFilter, setShowFilter] = useState<ShowTypeFilter>('todos');
  const [yearFilter, setYearFilter] = useState<YearFilter>('todos');
  const [isLoading, setIsLoading] = useState(true);


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
    } finally {
        setIsLoading(false);
    }
  }, []);

  const handleShowFilterChange = (value: ShowTypeFilter) => {
    setShowFilter(value);
    setSelectedEventId(null);
    try {
      localStorage.setItem('attitude-rewind-show-filter', value);
    } catch (error) {
      console.error("Could not save show filter to localStorage:", error);
    }
  };

  const handleYearFilterChange = (value: YearFilter) => {
    setYearFilter(value);
    setSelectedEventId(null);
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
  
  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return allEvents.find(e => e.id === selectedEventId);
  }, [selectedEventId, allEvents]);


  useEffect(() => {
    if (!isLoading && upcomingEvents.length > 0 && !selectedEventId) {
       const firstEventInFilter = filteredEvents.find(e => upcomingEvents.some(ue => ue.id === e.id));
       if (firstEventInFilter) {
           setSelectedEventId(firstEventInFilter.id);
       } else if (filteredEvents.length > 0) {
           setSelectedEventId(filteredEvents[0].id);
       } else {
           setSelectedEventId(upcomingEvents[0].id)
       }
    }
  }, [isLoading, upcomingEvents, selectedEventId, filteredEvents]);
  
  if (isLoading) {
    return (
        <main className="min-h-screen">
          <Header
            showFilter={showFilter}
            yearFilter={yearFilter}
            onShowFilterChange={handleShowFilterChange}
            onYearFilterChange={handleYearFilterChange}
          />
           <div className="bg-card/90 backdrop-blur-sm border-y h-[272px] sticky top-16 z-20">
                <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">Próximos Shows</h2>
                     <div className="w-full mt-4">
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </div>
             <div className="container mx-auto max-w-6xl px-4 py-8">
                <Skeleton className="h-[400px] w-full" />
            </div>
        </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header
        showFilter={showFilter}
        yearFilter={yearFilter}
        onShowFilterChange={handleShowFilterChange}
        onYearFilterChange={handleYearFilterChange}
      />
      <NextShowCarousel events={upcomingEvents} onEventSelect={setSelectedEventId} />
      
      {selectedEvent ? (
        <EventDetails event={selectedEvent} onBack={() => setSelectedEventId(null)} isEmbedded={true}/>
      ) : (
        <EventGrid events={filteredEvents} onEventClick={setSelectedEventId} />
      )}

    </main>
  );
}
