
'use client';

import Link from 'next/link';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
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
                <h1 className="text-xl font-bold text-white">{wrestlerName}</h1>
            </div>
            <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
            {wrestler?.imageUrl && (
              <div className="md:w-1/3 flex-shrink-0">
                  <div className="rounded-lg overflow-hidden border shadow-lg">
                      <Image 
                          src={wrestler.imageUrl}
                          alt={wrestlerName}
                          width={400}
                          height={600}
                          className="w-full h-auto object-cover"
                      />
                  </div>
              </div>
            )}
            <div className="flex-grow">
              <WrestlerDetails wrestlerName={wrestlerName} />
            </div>
        </div>
      </div>
    </main>
  );
}
