
import Link from 'next/link';
import { EventGrid } from '@/components/event-grid';
import { WWF_2000_DATA } from '@/lib/events-data-2000';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-1/3 right-0 z-10 -mr-6">
        <Link href="/stats">
          <Button variant="outline" className="transform rotate-90 origin-bottom-right rounded-b-none">
              <BarChart2 className="h-4 w-4 mr-2 -rotate-90" />
              Ver Estadísticas
          </Button>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-4">
        <header className="text-center mb-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            <span className="text-black dark:text-white">Attitude Rewind</span>
          </h1>
        </header>
      </div>
      <EventGrid initialEvents={WWF_2000_DATA} />
    </main>
  );
}
