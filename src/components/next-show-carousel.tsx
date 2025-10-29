'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { DetailedEvent, PPVEvent, EventStatus, EventStatusMap } from '@/lib/utils';
import { getEventTypeDisplay, getMonthNumber, getShowImage, cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { CalendarDays, Eye, Tv } from 'lucide-react';

interface NextShowCarouselProps {
  events: DetailedEvent[];
  onEventSelect: (eventId: string) => void;
  eventStatuses: EventStatusMap;
  onToggleStatus: (eventId: string, currentStatus: EventStatus) => void;
}

export function NextShowCarousel({ events, onEventSelect, eventStatuses, onToggleStatus }: NextShowCarouselProps) {
  if (events.length === 0) {
    return null;
  }
  
  const handleEventClick = (event: React.MouseEvent, eventId: string) => {
    event.preventDefault();
    onEventSelect(eventId);
    const element = document.getElementById('event-details-section');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleStatus = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    e.preventDefault();
    const currentStatus = eventStatuses[eventId] || 'disponible';
    onToggleStatus(eventId, currentStatus);
  };

  return (
    <div className="bg-card/90 backdrop-blur-sm border-y sticky top-16 z-20 py-4">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4"></h2>
        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {events.slice(0, 10).map((event, index) => {
              const status = eventStatuses[event.id] || 'disponible';
              const isWatched = status === 'visto';

              return (
                <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <a href={`/event/${event.id}`} onClick={(e) => handleEventClick(e, event.id)}>
                      <Card className="overflow-hidden group hover:border-primary">
                        <CardContent className="p-0 relative">
                          <div className="relative h-48 w-full">
                            <Image
                              src={getShowImage(event.type, event)}
                              alt={event.type === 'ppv' ? (event as PPVEvent).name : getEventTypeDisplay(event.type)}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <Badge className="absolute top-2 left-2">{index === 0 ? "Próximo a ver" : `#${index + 1}`}</Badge>
                            <Badge 
                                variant={isWatched ? 'default' : 'secondary'} 
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={(e) => handleToggleStatus(e, event.id)}
                            >
                                <Eye className={cn("h-4 w-4", isWatched ? 'text-green-400' : 'text-gray-400')} />
                            </Badge>
                            <div className="absolute bottom-0 left-0 p-4 text-white">
                                <h3 className="font-bold text-lg truncate">
                                    {event.type === 'ppv' ? (event as PPVEvent).name : `WWF ${getEventTypeDisplay(event.type)}`}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <CalendarDays className="h-4 w-4" />
                                    <span>{new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
                                  <Tv className="h-4 w-4" />
                                  <span>Disponible en Netflix</span>
                                </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-white/50 hover:bg-black/70 hover:text-white" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-white/50 hover:bg-black/70 hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
}
