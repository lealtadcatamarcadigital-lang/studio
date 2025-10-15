
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
    // This effect runs only ONCE on component mount to handle the initial loading state.
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
    
    // Add a small delay to prevent flickering on fast loads
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only ONCE.


  useEffect(() => {
    // This effect handles selecting the appropriate event when statuses or events change.
    // It does not control the main loading state.
    if (isLoading) return; // Don't run this logic during initial load

    let statuses: EventStatusMap = {};
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        statuses = JSON.parse(storedStatuses);
      }
    } catch (error) {
        // Use existing state if localStorage fails
        statuses = eventStatuses;
        console.error("Could not parse data from localStorage:", error);
    }

    const firstUnwatchedIndex = allEvents.findIndex(event => statuses[event.id] !== 'visto');
    
    if (firstUnwatchedIndex !== -1) {
        // If the currently selected event is watched OR there is no selection, find the next unwatched one.
        if (!selectedEventId || statuses[selectedEventId] === 'visto') {
            setSelectedEventId(allEvents[firstUnwatchedIndex].id);
        }
    } else if (allEvents.length > 0) {
        // If all events are watched, and there's no selection, select the first one.
        if (!selectedEventId) {
            setSelectedEventId(allEvents[0].id);
        }
    }
  }, [eventStatuses, allEvents, isLoading]); // depends on eventStatuses to re-run when a status changes


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
    if (!allEvents.length) return [];
    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    if (firstUnwatchedIndex === -1) {
      // If all are watched, show from the beginning
      return allEvents.slice(0, 10);
    }
    return allEvents.slice(firstUnwatchedIndex, firstUnwatchedIndex + 10);
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
