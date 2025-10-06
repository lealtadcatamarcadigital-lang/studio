
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { wrestlersData } from '@/lib/wrestlers-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuperstarsPage() {
  const wrestlerEntries = Object.entries(wrestlersData);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-center relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
                <Button asChild variant="outline" size="icon">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Volver</span>
                  </Link>
                </Button>
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold">
                Superstars de la Attitude Era
            </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {wrestlerEntries.map(([name, data]) => (
            <Link key={name} href={`/wrestler/${name.replace(/ /g, '_')}`} className="group block">
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={data.imageUrl || 'https://placehold.co/300x400'}
                      alt={name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h2 className="absolute bottom-2 left-2 right-2 font-bold text-sm text-white truncate">{name}</h2>
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
