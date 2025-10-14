
'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-card shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Abrir Menú</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80vw] sm:w-[300px] bg-black text-white p-0">
                  <SheetHeader className='p-6'>
                     <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                     <Link href="/" className="flex items-center gap-2">
                        <Image src="https://i.imgur.com/ITpm1XW.png" alt="Attitude Rewind Logo" width={40} height={40} className="h-10 w-10" />
                        <h1 className="text-3xl font-bold">A<span className="text-red-500">R</span></h1>
                    </Link>
                  </SheetHeader>
                  <nav className="flex-grow p-6 space-y-2">
                      <Link href="/" className={cn('flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800', { 'bg-zinc-900': pathname === '/' })}>
                        <LayoutGrid className="h-5 w-5" /> Grilla de Eventos
                      </Link>
                  </nav>
                  <div className="p-6 border-t border-zinc-800">
                    <span className="text-xs text-zinc-500">V1.9</span>
                  </div>
              </SheetContent>
          </Sheet>
          
          <Link href="/">
              <h1 className="text-2xl font-bold font-headline cursor-pointer">
                  <span className="text-foreground">Attitude</span>
                  <span className="text-red-500">Rewind</span>
              </h1>
          </Link>

          <div className="w-10"></div>
        </div>
      </div>
    </header>
  );
}
