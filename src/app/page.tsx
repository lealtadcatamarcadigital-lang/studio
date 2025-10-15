
'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, type DetailedEvent, type EventStatus, type EventStatusMap } from '@/lib/utils';
import { NextShowCarousel } from "@/components/next-show-carousel";
import { EventDetails } from "@/components/event-details";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Home() {
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  useEffect(() => {
    // Check session storage to see if initial load has already happened
    if (sessionStorage.getItem('initialLoadDone')) {
      setIsLoading(false);
    } else {
      // If not, show loading screen and then set the flag
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('initialLoadDone', 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // This effect runs to get statuses from localStorage.
    // It should run after the initial loading is handled.
    if (isLoading) return;
    
    let statuses: EventStatusMap = {};
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        statuses = JSON.parse(storedStatuses);
        setEventStatuses(statuses);
      }
    } catch (error) {
      console.error("Could not parse data from localStorage:", error);
    }
  }, [isLoading]);


  useEffect(() => {
    // This effect handles selecting the appropriate event when statuses or events change.
    if (isLoading) return; // Don't run this logic during initial load

    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    
    if (firstUnwatchedIndex !== -1) {
        // If the currently selected event is watched OR there is no selection, find the next unwatched one.
        if (!selectedEventId || eventStatuses[selectedEventId] === 'visto') {
            setSelectedEventId(allEvents[firstUnwatchedIndex].id);
        }
    } else if (allEvents.length > 0) {
        // If all events are watched, and there's no selection, select the first one.
        if (!selectedEventId) {
            setSelectedEventId(allEvents[0].id);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventStatuses, allEvents, isLoading]);


  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    const element = document.getElementById('event-details-section');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleEventStatus = (eventId: string, currentStatus: EventStatus) => {
    const newStatus = currentStatus === 'visto' ? 'disponible' : 'visto';
    const newStatuses = { ...eventStatuses, [eventId]: newStatus };
    setEventStatuses(newStatuses);
    try {
        localStorage.setItem('attitude-rewind-statuses', JSON.stringify(newStatuses));
    } catch (error) {
        console.error("Could not save event statuses to localStorage:", error);
    }
  };

  const upcomingEvents = useMemo(() => {
    if (!allEvents.length || Object.keys(eventStatuses).length === 0) return [];
    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    
    const startIndex = firstUnwatchedIndex === -1 ? 0 : firstUnwatchedIndex;
    
    return allEvents.slice(startIndex, startIndex + 10);
  }, [allEvents, eventStatuses]);

  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return allEvents.find(event => event.id === selectedEventId) || null;
  }, [allEvents, selectedEventId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen">
      <Header />
      <NextShowCarousel 
        events={upcomingEvents} 
        onEventSelect={handleEventSelect}
        eventStatuses={eventStatuses}
        onToggleStatus={toggleEventStatus}
      />
      
      {selectedEvent && (
         <div id="event-details-section" className="bg-muted/30 py-8">
            <EventDetails event={selectedEvent} onBack={() => {}} isEmbedded />
         </div>
      )}
    </main>
  );
}
