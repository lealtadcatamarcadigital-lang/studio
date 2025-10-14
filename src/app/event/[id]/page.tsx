
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { EventDetails } from '@/components/event-details';
import { flattenEvents } from '@/lib/utils';
import { Header } from '@/components/header';

export default function EventPage() {
    const params = useParams();
    const router = useRouter();

    const eventId = typeof params.id === 'string' ? params.id : '';

    const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);
    const event = useMemo(() => allEvents.find(e => e.id === eventId), [allEvents, eventId]);

    if (!event) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p>Evento no encontrado</p>
            </main>
        )
    }
    
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <EventDetails event={event} onBack={() => router.back()} />
        </main>
    )
}
