
'use client';

import Link from 'next/link';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { WrestlerDetails } from '@/components/wrestler-details';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { wrestlersData } from '@/lib/wrestlers-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function WrestlerPage() {
  const params = useParams();
  const router = useRouter();
  const name = typeof params.name === 'string' ? params.name : '';
  const wrestlerName = decodeURIComponent(name.replace(/_/g, ' '));
  const wrestler = wrestlersData[wrestlerName];
  
  const searchParams = useSearchParams();
  const fromEvent = searchParams.get('from');
  const backUrl = fromEvent || '/';

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-24 flex items-center gap-4">
          <Button asChild variant="ghost" onClick={() => router.back()} className="self-start mt-5">
            <Link href={backUrl}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                  <AvatarImage src={wrestler?.imageUrl} alt={wrestlerName} />
                  <AvatarFallback>{wrestlerName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                  <h1 className="text-2xl font-bold">{wrestlerName}</h1>
                  <p className="text-sm text-muted-foreground">Historial de Combates</p>
              </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <WrestlerDetails wrestlerName={wrestlerName} />
      </div>
    </main>
  );
}
