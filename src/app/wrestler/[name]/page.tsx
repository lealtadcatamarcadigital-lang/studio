
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useParams } from 'next/navigation';
import { WrestlerDetails } from '@/components/wrestler-details';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { wrestlersData } from '@/lib/wrestlers-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WWF_ALL_DATA } from '@/lib/events-data-all';

export default function WrestlerPage() {
  const params = useParams();
  const name = typeof params.name === 'string' ? params.name : '';
  const wrestlerName = decodeURIComponent(name.replace(/_/g, ' '));
  const wrestler = wrestlersData[wrestlerName];
  
  const searchParams = useSearchParams();
  const fromEvent = searchParams.get('from');
  const backUrl = fromEvent ? `/#${fromEvent}` : '/';

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
       <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <Button asChild variant="outline" size="icon">
              <Link href={backUrl}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Volver</span>
              </Link>
            </Button>
          </div>
          
          <div className="flex-1 flex justify-center items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={wrestler?.imageUrl} alt={wrestlerName} />
              <AvatarFallback>{wrestlerName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-headline text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {wrestlerName}
              </h1>
              <p className="text-muted-foreground text-sm">Historial de Combates</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <WrestlerDetails wrestlerName={wrestlerName} initialEvents={WWF_ALL_DATA} />
      </div>
    </main>
  );
}
