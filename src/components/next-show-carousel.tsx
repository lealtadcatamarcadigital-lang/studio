
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { DetailedEvent, PPVEvent } from './event-grid';
import { getEventTypeDisplay, getMonthNumber, getShowImage } from './event-grid';
import { Badge } from './ui/badge';
import { CalendarDays } from 'lucide-react';

interface NextShowCarouselProps {
  events: DetailedEvent[];
}

export function NextShowCarousel({ events }: NextShowCarouselProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-16 z-20 bg-card border-y backdrop-blur-sm bg-card/90">
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Próximos Shows</h2>
            <Carousel
                opts={{
                align: 'start',
                loop: false,
                }}
                className="w-full"
            >
                <CarouselContent>
                {events.slice(0, 10).map((event, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Link href={`/event/${event.id}`}>
                                <Card className="overflow-hidden group hover:border-primary">
                                    <CardContent className="p-0">
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={getShowImage(event.type, event)}
                                                alt={event.type === 'ppv' ? (event as PPVEvent).name : getEventTypeDisplay(event.type)}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <Badge className="absolute top-2 left-2">{index === 0 ? "Próximo a ver" : `#${index + 1}`}</Badge>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg truncate">
                                                {event.type === 'ppv' ? (event as PPVEvent).name : `WWF ${getEventTypeDisplay(event.type)}`}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <CalendarDays className="h-4 w-4" />
                                                <span>{new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    </div>
  );
}
