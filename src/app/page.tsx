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
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
    } catch (error) {
      console.error("Could not parse data from localStorage:", error);
    }
  }, []);
  
  useEffect(() => {
    if (allEvents.length > 0) {
      if (!selectedEventId) {
          const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
          if (firstUnwatchedIndex !== -1) {
              setSelectedEventId(allEvents[firstUnwatchedIndex].id);
          } else if (allEvents.length > 0) {
              setSelectedEventId(allEvents[0].id);
          }
      }
      // Add a small delay to prevent flickering on fast loads
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [allEvents, eventStatuses, selectedEventId]);

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
