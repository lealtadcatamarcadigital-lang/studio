
'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, type DetailedEvent, type EventStatus, type EventStatusMap } from '@/lib/utils';
import { NextShowCarousel } from "@/components/next-show-carousel";
import { EventDetails } from "@/components/event-details";
import { LoadingSpinner } from "@/components/loading-spinner";
import { EventGrid } from "@/components/event-grid";
import type { Match } from "@/lib/events-data";

export default function Home() {
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  useEffect(() => {
    if (sessionStorage.getItem('initialLoadDone')) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('initialLoadDone', 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
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
    if (isLoading) return;

    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    
    if (firstUnwatchedIndex !== -1) {
        if (!selectedEventId || eventStatuses[selectedEventId] === 'visto') {
            setSelectedEventId(allEvents[firstUnwatchedIndex].id);
        }
    } else if (allEvents.length > 0) {
        if (!selectedEventId) {
            setSelectedEventId(allEvents[0].id);
        }
    }
  }, [eventStatuses, allEvents, isLoading, selectedEventId]);


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
  
    const statusesExist = Object.keys(eventStatuses).length > 0;
  
    if (!statusesExist) {
      // If statuses are not loaded yet, show the first 10 events
      return allEvents.slice(0, 10);
    }
  
    const firstUnwatchedIndex = allEvents.findIndex(event => eventStatuses[event.id] !== 'visto');
    const startIndex = firstUnwatchedIndex === -1 ? (allEvents.length > 0 ? 0 : -1) : firstUnwatchedIndex;
  
    if (startIndex === -1) return [];
  
    return allEvents.slice(startIndex, startIndex + 10);
  }, [allEvents, eventStatuses]);

  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return allEvents.find(event => event.id === selectedEventId) || null;
  }, [allEvents, selectedEventId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredEvents = useMemo(() => {
    if (!searchQuery) return allEvents;
    const lowercasedQuery = searchQuery.toLowerCase();

    return allEvents.filter(event => {
        const name = event.type === 'ppv' ? event.name.toLowerCase() : `WWF ${event.type}`.toLowerCase();
        const description = event.description?.toLowerCase() || '';
        const location = event.location?.toLowerCase() || '';

        const matchesText = (event.matches || []).map(match => {
            return typeof match === 'string' ? match : match.match;
        }).join(' ').toLowerCase();

        return (
            name.includes(lowercasedQuery) ||
            description.includes(lowercasedQuery) ||
            location.includes(lowercasedQuery) ||
            matchesText.includes(lowercasedQuery)
        );
    });
  }, [allEvents, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        showSearch={true}
      />

      <NextShowCarousel 
          events={upcomingEvents} 
          onEventSelect={handleEventSelect}
          eventStatuses={eventStatuses}
          onToggleStatus={toggleEventStatus}
      />
      
      {searchQuery ? (
         <EventGrid events={filteredEvents} onEventClick={handleEventSelect} />
      ) : (
        <>
            {selectedEvent && (
                <div id="event-details-section" className="bg-muted/30 pt-4">
                    <EventDetails event={selectedEvent} onBack={() => {}} isEmbedded />
                </div>
            )}
        </>
      )}
    </main>
  );
}
