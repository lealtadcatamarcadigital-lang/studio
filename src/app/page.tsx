
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const shows = [
  {
    name: 'Monday Night RAW',
    type: 'raw',
    logo: 'https://www.wwe.com/f/styles/wwe_16_9_l/public/all/2022/07/raw_2022_l--820156a311b54a33116597a483e58c63.jpg',
    description: 'El show insignia de la WWF, lleno de acción y momentos inolvidables.',
    cardBg: 'bg-red-950/20',
    logoBg: 'bg-red-500',
    borderColor: 'border-red-500',
  },
  {
    name: 'Friday Night SmackDown',
    type: 'smackdown',
    logo: 'https://www.wwe.com/f/styles/wwe_16_9_l/public/2022/08/smackdown_2022_l--220790a19055818958564a0914441589.jpg',
    description: 'La otra marca principal, con su propio elenco y rivalidades explosivas.',
    cardBg: 'bg-blue-950/20',
    logoBg: 'bg-blue-500',
    borderColor: 'border-blue-500',
  },
  {
    name: 'Pay-Per-View',
    type: 'ppv',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/WWF-Attitude-Era-Logo.png/2560px-WWF-Attitude-Era-Logo.png',
    description: 'Los eventos más grandes del mes donde las rivalidades culminan.',
    cardBg: 'bg-amber-950/20',
    logoBg: 'bg-amber-500',
    borderColor: 'border-amber-500',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 bg-blue-950/90 backdrop-blur-sm border-b border-blue-900">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-white">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/WWF-Attitude-Era-Logo.png/2560px-WWF-Attitude-Era-Logo.png" alt="Attitude Era Logo" width={48} height={48} className="h-12 w-auto" />
                  <div>
                      <span className="text-white">Attitude</span><span className="text-red-500">Rewind</span>
                  </div>
              </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shows.map((show) => (
            <Link key={show.type} href={`/show/${show.type}`} className="group block">
              <Card className={`overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-1 ${show.cardBg} ${show.borderColor}`}>
                <div className="h-40 relative">
                  <Image
                    src={show.logo}
                    alt={`${show.name} Logo`}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <CardContent className="p-4">
                  <h2 className="font-headline text-2xl font-bold">{show.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1 mb-4 h-10">{show.description}</p>
                  <div className="flex items-center text-primary font-semibold">
                    <span>Ver Eventos</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
