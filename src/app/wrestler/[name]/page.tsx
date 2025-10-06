
'use client';

import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import { WrestlerDetails } from '@/components/wrestler-details';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { wrestlersData } from '@/lib/wrestlers-data';

export default function WrestlerPage() {
  const params = useParams();
  const name = typeof params.name === 'string' ? params.name : '';
  const wrestlerName = decodeURIComponent(name.replace(/_/g, ' '));
  const wrestler = wrestlersData[wrestlerName];
  
  const searchParams = useSearchParams();
  const fromEvent = searchParams.get('from');
  const backUrl = fromEvent || '/';

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button asChild variant="outline">
            <Link href={backUrl}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline">{wrestlerName}</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <WrestlerDetails wrestlerName={wrestlerName} />
      </div>
    </main>
  );
