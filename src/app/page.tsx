
import Link from 'next/link';
import { EventGrid } from '@/components/event-grid';
import { WWF_2000_DATA } from '@/lib/events-data-2000';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <header className="text-center mb-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            <span className="text-black dark:text-white">Attitude Rewind</span>
          </h1>
        </header>
      </div>
      <EventGrid initialEvents={WWF_2000_DATA} />

      <div className="fixed bottom-8 right-8 z-10">
        <Link href="/stats">
          <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
              <BarChart2 className="h-6 w-6" />
              <span className="sr-only">Ver Estadísticas</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
