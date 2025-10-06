
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import {
  Download,
  CalendarDays,
  MapPin,
  List,
  Info,
  Eye,
  EyeOff,
  Circle,
  Tv,
  Ticket,
  ListChecks,
  CheckCircle,
  ChevronDown,
  Star,
  ChevronRight,
} from "lucide-react";

import type { MonthData, Event, PPVEvent, Match } from "@/lib/events-data";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { WWF_ALL_DATA } from "@/lib/events-data-all";

interface EventGridProps {
  events: DetailedEvent[];
}

export type EventType = 'raw' | 'smackdown' | 'ppv';
export type DetailedEvent = (Event | PPVEvent) & { type: EventType, id: string, year: number, month: string, monthId: string };
export type EventStatus = "disponible" | "visto" | "no-visto";
export type EventStatusMap = { [eventId: string]: EventStatus };

export const flattenEvents = (data: MonthData[]): DetailedEvent[] => {
  const allEvents: DetailedEvent[] = [];
  data.forEach(month => {
    month.raw.forEach((event, index) => allEvents.push({ ...event, type: 'raw', id: `${month.monthId}-${month.year}-raw-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
    month.smackdown.forEach((event, index) => allEvents.push({ ...event, type: 'smackdown', id: `${month.monthId}-${month.year}-smackdown-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
    month.ppvs.forEach((event, index) => allEvents.push({ ...event, type: 'ppv', id: `${month.monthId}-${month.year}-ppv-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
  });
  allEvents.sort((a, b) => new Date(a.year, getMonthNumber(a.month), parseInt(a.date)).getTime() - new Date(b.year, getMonthNumber(b.month), parseInt(b.date)).getTime());
  return allEvents;
};

export const getMonthNumber = (monthName: string) => {
    const monthMap: { [key: string]: number } = { Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5, Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11 };
    return monthMap[monthName];
};

export const getEventTypeDisplay = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch(type) {
        case 'raw': return 'Monday Night RAW';
        case 'smackdown': return 'Friday Night SmackDown';
        case 'ppv': return 'Pay-Per-View';
    }
};

const ShowLogo = ({ type, name }: { type: EventType, name?: string }) => {
    if (type === 'ppv') {
        return <span className="font-bold uppercase text-amber-400">{name}</span>;
    }
    const logoUrl = type === 'raw' 
        ? "https://www.wwe.com/f/styles/wwe_16_9_l/public/all/2022/07/raw_2022_l--820156a311b54a33116597a483e58c63.jpg"
        : "https://www.wwe.com/f/styles/wwe_16_9_l/public/2022/08/smackdown_2022_l--220790a19055818958564a0914441589.jpg";
    
    const altText = type === 'raw' ? "RAW Logo" : "SmackDown Logo";

    return <Image src={logoUrl} alt={altText} width={80} height={45} className="object-contain" />;
};


export function EventGrid({ events }: EventGridProps) {
  const { toast } = useToast();
  
  return (
    <div className="container mx-auto px-2 py-4">
      <div className="flex flex-col gap-4">
        {events.length > 0 ? (
          events.map(event => {
            const eventDate = new Date(event.year, getMonthNumber(event.month), parseInt(event.date));
            const dayOfWeek = eventDate.toLocaleDateString('es-ES', { weekday: 'long' });
            const monthShort = eventDate.toLocaleDateString('es-ES', { month: 'short' });
            
            return (
              <Card 
                  key={event.id}
                  id={event.id}
                  className="bg-card text-card-foreground border-t-4 border-t-red-600 rounded-lg overflow-hidden"
              >
                  <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg">
                              {event.type === 'ppv' ? (event as PPVEvent).name : getEventTypeDisplay(event.type)}
                          </h3>
                           <ShowLogo type={event.type} name={(event as PPVEvent).name} />
                      </div>

                      <div className="flex items-center text-muted-foreground text-sm gap-4">
                          <div className="text-center">
                              <p className="capitalize">{dayOfWeek}</p>
                              <p className="font-bold text-lg text-foreground">{event.date}</p>
                              <p className="capitalize">{monthShort}</p>
                          </div>
                          <div className="h-12 w-px bg-border"></div>
                          <div>
                              <p>{event.location}</p>
                              <p className="text-xs">8:00 PM</p>
                          </div>
                      </div>
                  </CardContent>
                  <div className="grid grid-cols-2">
                     <Button asChild variant="secondary" className="rounded-none rounded-bl-md">
                        <Link href={`/event/${event.id}`}>
                            Ver Evento
                        </Link>
                      </Button>
                      <Button variant="destructive" className="rounded-none rounded-br-md">
                          Entradas
                          <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                  </div>
              </Card>
            )
          })
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron eventos con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
