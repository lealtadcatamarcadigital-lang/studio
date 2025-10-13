
'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, type EventStatusMap } from '@/lib/utils';
import type { DetailedEvent } from '@/lib/utils';
import { NextShowCarousel } from "@/components/next-show-carousel";
import { EventDetails } from "@/components/event-details";

export default function Home() {
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  useEffect(() => {
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
    } catch (error) {
      console.error("Could not parse data from localStorage:", error);
    }
  }, []);

  const upcomingEvents = useMemo(() => {
    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    if (firstUnwatchedIndex === -1) {
      return []; // All events watched
    }
    return allEvents.slice(firstUnwatchedIndex);
  }, [allEvents, eventStatuses]);

  useEffect(() => {
    if (upcomingEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(upcomingEvents[0].id);
    }
  }, [upcomingEvents, selectedEventId]);
  
  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return allEvents.find(e => e.id === selectedEventId);
  }, [selectedEventId, allEvents]);


  return (
    <main className="min-h-screen">
      <Header />
      <NextShowCarousel events={upcomingEvents} onEventSelect={setSelectedEventId} />
      
      {selectedEvent && (
        <div className="mt-4">
          <EventDetails event={selectedEvent} onBack={() => {}} isEmbedded={true} />
        </div>
      )}

    </main>
  );
}
