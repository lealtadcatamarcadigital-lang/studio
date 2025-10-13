
'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { WrestlerDetails } from '@/components/wrestler-details';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Star, Tv, Ticket } from 'lucide-react';
import { wrestlersData } from '@/lib/wrestlers-data';
import { useMemo } from 'react';
import { flattenEvents, getMonthNumber, getEventTypeDisplay, getShowBadgeStyle } from '@/lib/utils';
import type { Match } from '@/lib/events-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { Header } from '@/components/header';


const getShowIcon = (type: 'raw' | 'smackdown' | 'ppv') => {
    return type === 'ppv' ? <Ticket className="h-3 w-3" /> : <Tv className="h-3 w-3" />;
};


export default function WrestlerPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const name = typeof params.name === 'string' ? params.name : '';
  const wrestlerName = decodeURIComponent(name.replace(/_/g, ' '));
  const wrestler = wrestlersData[wrestlerName];
  
  const handleBack = () => {
    if (from) {
      router.push(from);
    } else {
      router.back();
    }
  };

  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);

  const wrestlerMatches = useMemo(() => {
    if (!wrestlerName) return [];
    return allEvents
      .flatMap(event => 
        (event.matches || []).map(match => ({ event, match }))
      )
      .filter(({ match }) => {
        const matchText = typeof match === 'string' ? match : match.match;
        const regex = new RegExp(`\\b${wrestlerName.replace(/[.*+?^${'()'}|\\[\\]\\\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(matchText);
      })
      .map(({ event, match }) => ({
        ...event,
        match,
      }));
  }, [allEvents, wrestlerName]);

  return (
    <main className="min-h-screen bg-background">
       <Header />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
        </Button>
        <h2 className="text-3xl font-bold font-headline mb-4">{wrestlerName}</h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 flex-shrink-0 space-y-4">
                {wrestler && wrestler.imageUrl && (
                    <div className="rounded-lg overflow-hidden border shadow-lg">
                        <Image
                            src={wrestler.imageUrl}
                            alt={`Foto de ${wrestlerName}`}
                            width={400}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex-grow w-full">
                <WrestlerDetails wrestlerName={wrestlerName} />
            </div>
        </div>
        
        <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold pt-4">Historial de Combates</h2>
            <div className="space-y-4">
                {wrestlerMatches.map((eventItem, index) => {
                    const matchData = eventItem.match;
                    const matchText = typeof matchData === 'string' ? matchData : matchData.match;
                    const rating = typeof matchData !== 'string' ? matchData.rating : undefined;

                    return (
                        <Link href={`/event/${eventItem.id}?from=/wrestler/${name}`} key={`${eventItem.id}-${index}`}>
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
