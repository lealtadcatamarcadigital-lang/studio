
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WWF_2000_DATA } from '@/lib/events-data-2000';
import { WrestlerDetails } from '@/components/wrestler-details';
import { WrestlingMaskIcon } from '@/components/icons/wrestling-mask-icon';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function WrestlerPage({ params }: { params: { name: string } }) {
  const wrestlerName = decodeURIComponent(params.name.replace(/_/g, ' '));
  const searchParams = useSearchParams();
  const fromEvent = searchParams.get('from');
  const backUrl = fromEvent ? `/#${fromEvent}` : '/';

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="relative text-center mb-8 border-b pb-4">
          <div className="absolute top-0 left-0">
              <Button asChild variant="outline" size="icon">
                <Link href={backUrl}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Link>
              </Button>
          </div>
          <div className="flex justify-center items-center gap-4">
            <WrestlingMaskIcon className="h-12 w-12 text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
              {wrestlerName}
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">Historial de Combates</p>
        </header>

        <WrestlerDetails wrestlerName={wrestlerName} initialEvents={WWF_2000_DATA} />
      </div>
    </main>
  );
}
