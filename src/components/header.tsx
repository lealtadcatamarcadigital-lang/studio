
'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, LayoutGrid, Search } from 'lucide-react';
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
import { Input } from './ui/input';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
}

export function Header({ searchQuery, onSearchChange, showSearch = false }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-card shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
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
            
            <Link href="/" className='hidden sm:flex items-center gap-2'>
                <h1 className="text-2xl font-bold font-headline cursor-pointer">
                    <span className="text-foreground">Attitude</span>
                    <span className="text-red-500">Rewind</span>
                </h1>
            </Link>
          </div>
          
          {showSearch && onSearchChange && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar eventos, luchas, shows..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={onSearchChange}
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Right side elements can go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
