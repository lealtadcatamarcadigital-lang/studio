
"use client";

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
import { Utensils } from 'lucide-react';

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
              <SheetContent side="left" className="w-[80vw] sm:w-[300px] bg-primary text-primary-foreground p-0">
                  <SheetHeader>
                     <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                  </SheetHeader>
                  <div className='flex flex-col h-full'>
                      <div className="p-6">
                        <Link href="/" className="flex items-center gap-2">
                           <Utensils className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">AR</h1>
                        </Link>
                        <p className='mt-4'>Sin nombre</p>
                      </div>
                      <nav className="flex-grow p-6 space-y-2">
                          <Link href="/" className={cn('flex items-center gap-3 p-2 rounded-md hover:bg-black/10', { 'bg-black/20': pathname === '/' })}>
                            <LayoutGrid className="h-5 w-5" /> Grilla de Eventos
                          </Link>
                      </nav>
                      <div className="p-6 border-t border-primary-foreground/20">
                        <span className="text-xs text-primary-foreground/50">v2.7.613</span>
                      </div>
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
