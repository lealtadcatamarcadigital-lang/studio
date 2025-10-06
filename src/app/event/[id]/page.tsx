
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, ChevronDown, CheckCircle, Circle, Eye, EyeOff, Info, ListChecks, MapPin, Star, Ticket } from 'lucide-react';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, getMonthNumber, getEventTypeDisplay, type DetailedEvent, type EventStatus, type EventStatusMap, getShowBadgeStyle } from '@/components/event-grid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Match } from '@/lib/events-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const parseWrestlers = (match: string): { text: string; wrestler: boolean }[] => {
    const parts = match.split(':');
    const mainMatch = parts.length > 1 ? parts.slice(1).join(':') : parts[0];
    const title = parts.length > 1 ? `${parts[0]}: ` : '';

    const wrestlerNames = new Set([
        "The Rock", "Stone Cold Steve Austin", "Triple H", "The Undertaker", "Mankind", "Cactus Jack", 
        "The Dudley Boyz", "Bubba Ray Dudley", "D-Von Dudley", "The Hardy Boyz", "Matt Hardy", "Jeff Hardy", 
        "Edge & Christian", "Edge", "Christian", "Kurt Angle", "Chris Jericho", "Chris Benoit", "Eddie Guerrero", 
        "Dean Malenko", "Perry Saturn", "Big Show", "Kane", "Rikishi", "X-Pac", "Road Dogg", "Billy Gunn", "Tazz",
        "Al Snow", "Test", "Albert", "Big Boss Man", "Hardcore Holly", "Crash Holly", "The Godfather", 
        "D'Lo Brown", "Chyna", "Lita", "Trish Stratus", "Val Venis", "Scotty 2 Hotty", "Grandmaster Sexay", 
        "The Acolytes", "Faarooq", "Bradshaw", "Gangrel", "The British Bulldog", "Shane McMahon", "Vince McMahon", 
        "Stephanie McMahon", "Linda McMahon", "Mick Foley", "Bob Backlund", "Bull Buchanan", "T & A", 
        "Pat Patterson", "Gerald Brisco", "William Regal", "K-Kwik", "Jacqueline", "Lo Down", 
        "Los Conquistadores", "Right to Censor", "Drew Carey", "The Radicalz", "D-Generation X", "DX", 
        "The New Age Outlaws", "Steve Blackman", "The Headbangers", "Mosh", "Thrasher", "Viscera", "Hervina", 
        "The Kat", "The Fabulous Moolah", "Mae Young", "The Mean Street Posse", "Joey Abs", "Pete Gas", "Rodney", "Too Cool", "The Hollys"
    ]);
    
    const regex = new RegExp(`(${[...wrestlerNames].sort((a,b) => b.length - a.length).map(name => name.replace(/[.*+?^${'()'}|\\[\\]\\\\]/g, '\\$&')).join('|')}|vs\\.|&)`, 'g');
    const segments = mainMatch.split(regex).filter(Boolean);

    const result: { text: string; wrestler: boolean }[] = [{ text: title, wrestler: false }];

    segments.forEach(segment => {
        const trimmedSegment = segment.trim();
        if (wrestlerNames.has(trimmedSegment)) {
            result.push({ text: trimmedSegment, wrestler: true });
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
    
    const parsedMatch = parseWrestlers(matchText);

    return (
        <div class="bg-card border rounded-lg p-3">
            <div class="flex justify-between items-start">
                <p class="font-semibold text-card-foreground">
                    {parsedMatch.map((part, index) => 
                        part.wrestler ? (
                            <Link key={index} href={`/wrestler/${part.text.replace(/ /g, '_')}?from=/event/${eventId}`} className="text-primary hover:underline">
                                {part.text}
                            </Link>
                        ) : (
                            <span key={index}>{part.text}</span>
                        )
                    )}
                </p>
                {rating && (
                    <div class="flex items-center gap-1 text-amber-500 flex-shrink-0 ml-2">
                        <Star class="h-4 w-4 fill-current" />
                        <span class="font-bold text-sm">{rating.toFixed(1)}</span>
                    </div>
                )}
            </div>
             {typeof match !== 'string' && match.match.includes(":") && (
                 <p class="text-red-600 dark:text-red-500 text-xs font-bold tracking-wider uppercase mt-1">{match.match.split(':').slice(0, 1).join(':').trim()}</p>
            )}
        </div>
    );
};

export default function EventPage() {
    const params = useParams();
    const router = useRouter();

    const eventId = typeof params.id === 'string' ? params.id : '';

    const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);
    const event = useMemo(() => allEvents.find(e => e.id === eventId), [allEvents, eventId]);
    
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

    const handleBack = () => {
        router.push('/');
    };

    if (!event) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p>Evento no encontrado</p>
            </main>
        )
    }

    const isPpvWithCover = event.type === 'ppv' && (event as any).coverUrl;
    
    return (
        <main className="min-h-screen bg-background">
             <header className="sticky top-0 z-20 bg-card shadow-md" style={{ backgroundColor: '#2A3B57' }}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 text-white hover:bg-white/10">
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Button>
                    <Link href="/">
                        <h1 className="text-2xl font-bold font-headline cursor-pointer">
                            <span className="text-white">Attitude</span>
                            <span className="text-red-500">Rewind</span>
                        </h1>
                    </Link>
                    <div className="w-24"></div> {/* Spacer */}
                </div>
            </header>

            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="space-y-6">
                    <div className={cn("flex flex-col md:flex-row gap-8 items-start")}>
                        {isPpvWithCover && (
                            <div className="md:w-1/3 flex-shrink-0">
                                <div className="rounded-lg overflow-hidden border shadow-lg">
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
                                <Badge className={cn("text-sm", getShowBadgeStyle(event.type))}>{getEventTypeDisplay(event.type)}</Badge>
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
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                                    <ListChecks className="h-5 w-5 text-primary" />
                                    Cartelera de Luchas
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
                                <h3 className="font-semibold text-lg flex items-center gap-2">
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
                        <h3 className="font-semibold text-lg flex items-center gap-2">
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
        </main>
    )

    
}

    