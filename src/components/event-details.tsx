
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, ChevronDown, CheckCircle, Circle, Eye, EyeOff, Info, ListChecks, MapPin, Ticket, Trophy } from 'lucide-react';
import { getMonthNumber, getEventTypeDisplay, type DetailedEvent, type EventStatus, type EventStatusMap, getShowBadgeStyle } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Match } from '@/lib/events-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { wrestlersData } from '@/lib/wrestlers-data';
import { Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';


const getShowIcon = (type: 'raw' | 'smackdown' | 'ppv') => {
    if (type === 'raw') {
        return <Image src="https://i.pinimg.com/736x/52/b7/9f/52b79f70e2da83f192ba455d42a0ef9f.jpg" alt="RAW" width={24} height={24} className="h-6 w-auto p-1 rounded-sm" />;
    }
    if (type === 'smackdown') {
        return <Image src="https://i.pinimg.com/736x/e8/e4/9f/e8e49feb5765132c8583cb6e17f9f5f2.jpg" alt="SmackDown" width={24} height={24} className="h-6 w-auto p-1 rounded-sm" />;
    }
    return <Ticket className="h-4 w-4" />;
};


const parseWrestlers = (match: string): { text: string; wrestler: boolean }[] => {
    const parts = match.split(':');
    const mainMatch = parts.length > 1 ? parts.slice(1).join(':') : parts[0];
    const title = parts.length > 1 ? `${parts[0]}:` : '';
    
    const sortedWrestlers = [...Object.keys(wrestlersData)].sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${sortedWrestlers.map(name => name.replace(/[.*+?^${'()'}|\\[\\]\\\\]/g, '\\$&')).join('|')})`, 'g');
    const segments = mainMatch.split(regex).filter(Boolean);

    const result: { text: string; wrestler: boolean }[] = [{ text: title, wrestler: false }];

    segments.forEach(segment => {
        const trimmedSegment = segment.trim();
        if (Object.keys(wrestlersData).includes(trimmedSegment)) {
            result.push({ text: segment, wrestler: true });
        } else {
            const last = result[result.length - 1];
            if (last && !last.wrestler) {
                last.text += segment;
            } else {
                result.push({ text: segment, wrestler: false });
            }
        }
    });

    return result;
};


const MatchCard = ({ match, eventId }: { match: Match; eventId: string }) => {
    const matchText = typeof match === 'string' ? match : match.match;
    const rating = typeof match !== 'string' ? match.rating : undefined;
    const isTitleMatch = typeof match !== 'string' && match.match.includes(":");
    const title = isTitleMatch ? match.match.split(':')[0].trim() : null;

    const parsedMatch = parseWrestlers(matchText);

    return (
        <div className="bg-card border rounded-lg p-3 group hover:bg-accent/50 hover:shadow-md hover:shadow-primary/20 transition-all duration-200">
            <div className="flex justify-between items-start">
                <p className="font-semibold text-card-foreground pr-4">
                    {parsedMatch.map((part, index) => 
                        part.wrestler ? (
                            <Link key={index} href={`/wrestler/${part.text.trim().replace(/ /g, '_')}?from=/event/${eventId}`} className="text-wrestler hover:underline">
                                {part.text}
                            </Link>
                        ) : (
                            <span key={index}>{part.text}</span>
                        )
                    )}
                </p>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    {isTitleMatch && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                     <Trophy className="h-4 w-4 text-primary" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{title}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {rating && (
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-bold text-sm">{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>
             {isTitleMatch && (
                 <p className="text-destructive text-xs font-bold tracking-wider uppercase mt-1">{title}</p>
            )}
        </div>
    );
};

interface EventDetailsProps {
    event: DetailedEvent;
    onBack: () => void;
    isEmbedded?: boolean;
}

export function EventDetails({ event, onBack, isEmbedded = false }: EventDetailsProps) {
    const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});

    useEffect(() => {
        try {
          const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
          if (storedStatuses) {
            setEventStatuses(JSON.parse(storedStatuses));
          }
        } catch (error) {
          console.error("Could not parse event statuses from localStorage:", error);
        }
    }, []);
      
    const handleStatusChange = (eventId: string, status: EventStatus) => {
        const newStatuses = { ...eventStatuses, [eventId]: status };
        setEventStatuses(newStatuses);
        try {
          localStorage.setItem('attitude-rewind-statuses', JSON.stringify(newStatuses));
        } catch (error) {
          console.error("Could not save event statuses to localStorage:", error);
        }
    };
    
    const isPpvWithCover = event.type === 'ppv' && (event as any).coverUrl;

    return (
         <div className="container mx-auto max-w-6xl px-4 py-8">
            {!isEmbedded && (
              <Button variant="ghost" onClick={onBack} className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
              </Button>
            )}
            <div className="space-y-6">
                <div className={cn("flex flex-col md:flex-row gap-8 items-start")}>
                    {isPpvWithCover && (
                        <div className="md:w-1/3 flex-shrink-0">
                            <div className="rounded-lg overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20">
                                <Image 
                                    src={(event as any).coverUrl}
                                    alt={`Portada de ${(event as any).name}`}
                                    width={400}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    )}
                    
                    <div className="flex-grow space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <Badge className={cn("text-sm gap-2", getShowBadgeStyle(event.type))}>
                                {getShowIcon(event.type)}
                                {getEventTypeDisplay(event.type)}
                            </Badge>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="h-4 w-4" />
                                <span>{new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-headline font-bold text-2xl flex items-center gap-2 mb-3">
                                <ListChecks className="h-6 w-6 text-primary" />
                                Cartelera
                            </h3>
                            {event.matches && event.matches.length > 0 ? (
                                <div className="space-y-2">
                                {event.matches.map((match, i) => <MatchCard key={i} match={match} eventId={event.id} />)}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">No se ha anunciado la cartelera de combates.</p>
                            )}
                        </div>
                    </div>
                </div>
                
                {event.description && (
                  <Collapsible>
                    <div className="p-4 bg-card rounded-lg border">
                      <CollapsibleTrigger asChild>
                        <div className="flex w-full items-center justify-between group cursor-pointer">
                            <h3 className="font-headline font-bold text-xl flex items-center gap-2">
                              <Info className="h-5 w-5 text-primary" />
                              Resumen del Evento
                            </h3>
                            <div className="p-1 rounded-md group-hover:bg-accent">
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-3 bg-muted/50 rounded-lg mt-2">
                          <p className="text-sm text-muted-foreground italic">{event.description}</p>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                )}

                <div className="p-4 bg-card rounded-lg space-y-3 border">
                    <h3 className="font-headline font-bold text-xl flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Estado de Visualización
                    </h3>
                    <Select
                        value={eventStatuses[event.id] || 'disponible'}
                        onValueChange={(value) => handleStatusChange(event.id, value as EventStatus)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="disponible">
                                <div className="flex items-center gap-2">
                                    <Circle className="h-4 w-4 text-muted-foreground" />
                                    Disponible
                                </div>
                            </SelectItem>
                            <SelectItem value="visto">
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-green-500" />
                                    Visto
                                </div>

                            </SelectItem>
                            <SelectItem value="no-visto">
                                <div className="flex items-center gap-2">
                                    <EyeOff className="h-4 w-4 text-red-500" />
                                    No Visto
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
              </div>
        </div>
    );
}
