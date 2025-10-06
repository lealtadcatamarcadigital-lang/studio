
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
  
  const handleBack = () => {
    if (fromEvent) {
      router.push(fromEvent);
    } else {
      router.back();
    }
  };

  return (
    <main className="min-h-screen bg-background">
       <header className="sticky top-0 z-20 bg-card shadow-md" style={{ backgroundColor: '#2A3B57' }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4" />
                Volver
            </Button>
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarImage src={wrestler?.imageUrl} alt={wrestlerName} />
                    <AvatarFallback>{wrestlerName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-bold text-white">{wrestlerName}</h1>
                    <p className="text-sm text-white/80">Historial de Combates</p>
                </div>
            </div>
            <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <WrestlerDetails wrestlerName={wrestlerName} />
      </div>
    </main>
  );
}
