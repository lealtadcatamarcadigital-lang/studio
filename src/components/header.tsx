
"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Menu, Tv, Ticket, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import type { EventType } from './event-grid';

interface HeaderProps {
  yearFilter: string;
  onYearFilterChange: (value: string) => void;
  showFilter: EventType | 'all';
  onShowFilterChange: (value: EventType | 'all') => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

const showOptions: { value: EventType | 'all'; label: string; icon?: React.ElementType }[] = [
    { value: 'all', label: 'Todos', icon: List },
    { value: 'raw', label: 'RAW', icon: Tv },
    { value: 'smackdown', label: 'SmackDown', icon: Tv },
    { value: 'ppv', label: 'PPV', icon: Ticket },
];

const yearOptions: { value: string; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: '2000', label: '2000' },
    { value: '2001', label: '2001' },
];

export function Header({
  yearFilter,
  onYearFilterChange,
  showFilter,
  onShowFilterChange,
  searchQuery,
  onSearchQueryChange
}: HeaderProps) {

  const FilterMenu = ({ isMobile = false }: { isMobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={isMobile ? 'default' : 'icon'} className="text-white hover:text-white hover:bg-white/10">
            <Filter className="h-4 w-4" />
            {isMobile && <span className="ml-2">Filtros</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={yearFilter} onValueChange={onYearFilterChange}>
            <p className="text-xs text-muted-foreground px-2 pt-1.5 pb-1 font-semibold">AÑO</p>
            {yearOptions.map(year => (
              <DropdownMenuRadioItem key={year.value} value={year.value}>
                {year.label}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={showFilter} onValueChange={onShowFilterChange as (value: string) => void}>
            <p className="text-xs text-muted-foreground px-2 pt-1.5 pb-1 font-semibold">SHOW</p>
            {showOptions.map(show => (
              <DropdownMenuRadioItem key={show.value} value={show.value}>
                <show.icon className="mr-2 h-4 w-4" />
                {show.label}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-20 bg-blue-950/90 backdrop-blur-sm border-b border-blue-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
            <Link href="/" className="font-headline text-2xl font-bold text-white">
              <span className="text-white">Attitude</span><span className="text-red-500">Rewind</span>
            </Link>

            <div className="flex-1 flex justify-center px-4 lg:px-16">
                 <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        type="search"
                        placeholder="Buscar eventos, luchadores, shows..."
                        className="pl-10 w-full bg-blue-900/50 text-white border-blue-800 placeholder-gray-400 focus:bg-blue-900"
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="hidden md:flex">
                <FilterMenu />
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-white hover:bg-white/10">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Abrir Menú</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-sidebar text-sidebar-foreground">
                    <SheetHeader>
                        <SheetTitle className="text-sidebar-foreground">Menú</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                       <FilterMenu isMobile={true} />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
