
'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { WrestlerDetails } from '@/components/wrestler-details';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Star, Tv, Ticket } from 'lucide-react';
import { wrestlersData } from '@/lib/wrestlers-data';
import { useMemo } from 'react';
import { flattenEvents } from '@/components/event-grid';
import type { Match } from '@/lib/events-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getEventTypeDisplay, getMonthNumber, getShowBadgeStyle } from '@/components/event-grid';
import { WWF_ALL_DATA } from '@/lib/events-data-all';

const getShowIcon = (type: 'raw' | 'smackdown' | 'ppv') => {
    return type === 'ppv' ? <Ticket className="h-3 w-3" /> : <Tv className="h-3 w-3" />;
};


export default function WrestlerPage() {
  const params = useParams();
  const router = useRouter();
  const name = typeof params.name === 'string' ? params.name : '';
  const wrestlerName = decodeURIComponent(name.replace(/_/g, ' '));
  const wrestler = wrestlersData[wrestlerName];
  
  const handleBack = () => {
    router.push('/');
  };

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  const wrestlerMatches = useMemo(() => {
    return allEvents
      .flatMap(event => 
        (event.matches || []).map(match => ({ event, match }))
      )
      .filter(({ match }) => {
        const matchText = typeof match === 'string' ? match : match.match;
        return matchText.includes(wrestlerName);
      })
      .map(({ event, match }) => ({
        ...event,
        match,
      }));
  }, [allEvents, wrestlerName]);

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
            <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <WrestlerDetails wrestlerName={wrestlerName} />

        <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold pt-4">Historial de Combates</h2>
            <div className="space-y-4">
                {wrestlerMatches.map((eventItem, index) => {
                    const matchData = eventItem.match;
                    const matchText = typeof matchData === 'string' ? matchData : matchData.match;
                    const rating = typeof matchData !== 'string' ? matchData.rating : undefined;

                    return (
                        <Link href={`/event/${eventItem.id}?from=/wrestler/${wrestlerName.replace(/ /g, '_')}`} key={`${eventItem.id}-${index}`}>
                            <Card className="hover:bg-accent transition-colors">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg pr-4">{matchText}</h3>
                                        <Badge className={cn("text-xs flex-shrink-0", getShowBadgeStyle(eventItem.type))}>
                                            {getShowIcon(eventItem.type)}
                                            <span>{getEventTypeDisplay(eventItem.type)}</span>
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className='flex items-center gap-2'>
                                            <CalendarDays className="h-4 w-4" />
                                            <span>{new Date(eventItem.year, getMonthNumber(eventItem.month), parseInt(eventItem.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        {rating && (
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="font-bold">{rating.toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
                {wrestlerMatches.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No se encontraron combates para este luchador.</p>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}
