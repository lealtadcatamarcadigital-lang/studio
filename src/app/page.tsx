
import Link from 'next/link';
import { EventGrid } from '@/components/event-grid';
import { WWF_2000_DATA } from '@/lib/events-data-2000';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            <span className="text-black dark:text-white">Attitude Rewind</span>
          </h1>
          <p className="text-muted-foreground mt-2">Un viaje cronológico por los eventos de la WWF en 2000 y 2001.</p>
        </header>

        <div className="text-center mb-12">
            <Link href="/stats">
                <Button variant="outline">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Ver Estadísticas
                </Button>
            </Link>
        </div>
      </div>
      <EventGrid initialEvents={WWF_2000_DATA} />
    </main>
  );
}
