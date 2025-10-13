
'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, LayoutGrid, Filter } from 'lucide-react';
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
import type { ShowTypeFilter, YearFilter } from '@/app/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
    showFilter?: ShowTypeFilter;
    yearFilter?: YearFilter;
    onShowFilterChange?: (value: ShowTypeFilter) => void;
    onYearFilterChange?: (value: YearFilter) => void;
}

export function Header({ showFilter, yearFilter, onShowFilterChange, onYearFilterChange }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
                  <SheetHeader className='p-6'>
                     <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                     <Link href="/" className="flex items-center gap-2">
                        <Image src="https://i.imgur.com/ITpm1XW.png" alt="Attitude Rewind Logo" width={32} height={32} className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">AR</h1>
                    </Link>
                  </SheetHeader>
                  <nav className="flex-grow p-6 space-y-2">
                      <Link href="/" className={cn('flex items-center gap-3 p-2 rounded-md hover:bg-black/10', { 'bg-black/20': pathname === '/' })}>
                        <LayoutGrid className="h-5 w-5" /> Grilla de Eventos
                      </Link>

                      {isHomePage && onYearFilterChange && onShowFilterChange && (
                        <>
                            <Separator className='bg-primary-foreground/20 my-4' />
                            <div className='space-y-4'>
                                <h3 className='font-bold flex items-center gap-2 text-lg'>
                                    <Filter className="h-5 w-5" />
                                    Filtros
                                </h3>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>Show</label>
                                    <div className="space-y-1 pl-2">
                                        <div
                                            onClick={() => onShowFilterChange('ppv')}
                                            className={cn(
                                                'cursor-pointer p-1 rounded-md text-sm',
                                                showFilter === 'ppv' ? 'font-bold text-amber-300' : 'hover:bg-black/10'
                                            )}
                                        >
                                            PPV
                                        </div>
                                        <div
                                            onClick={() => onShowFilterChange('raw')}
                                            className={cn(
                                                'cursor-pointer p-1 rounded-md text-sm',
                                                showFilter === 'raw' ? 'font-bold text-red-300' : 'hover:bg-black/10'
                                            )}
                                        >
                                            RAW
                                        </div>
                                        <div
                                            onClick={() => onShowFilterChange('smackdown')}
                                            className={cn(
                                                'cursor-pointer p-1 rounded-md text-sm',
                                                showFilter === 'smackdown' ? 'font-bold text-blue-300' : 'hover:bg-black/10'
                                            )}
                                        >
                                            SmackDown
                                        </div>
                                         <div
                                            onClick={() => onShowFilterChange('todos')}
                                            className={cn(
                                                'cursor-pointer p-1 rounded-md text-sm',
                                                showFilter === 'todos' ? 'font-bold' : 'hover:bg-black/10'
                                            )}
                                        >
                                            Todos
                                        </div>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>Año</label>
                                    <Select value={yearFilter} onValueChange={(value) => onYearFilterChange(value as YearFilter)}>
                                        <SelectTrigger className='text-black'>
                                            <SelectValue placeholder="Seleccionar año" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="todos">Todos</SelectItem>
                                            <SelectItem value="2000">2000</SelectItem>
                                            <SelectItem value="2001">2001</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </>
                      )}

                  </nav>
                  <div className="p-6 border-t border-primary-foreground/20">
                    <span className="text-xs text-primary-foreground/50">v2.7.613</span>
                  </div>
              </SheetContent>
          </Sheet>
          
          <Link href="/">
              <h1 className="text-2xl font-bold font-headline cursor-pointer">
                  <span className="text-foreground">Attitude</span>
                  <span className="text-primary">Rewind</span>
              </h1>
          </Link>

          <div className="w-10"></div>
        </div>
      </div>
    </header>
  );
}
