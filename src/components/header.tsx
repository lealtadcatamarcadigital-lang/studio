
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Tv, Ticket, List, Filter } from 'lucide-react';
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
import type { EventType } from './event-grid';
import { cn } from "@/lib/utils";

interface HeaderProps {
  yearFilter: string;
  onYearFilterChange: (value: string) => void;
  showFilter: EventType | 'all';
  onShowFilterChange: (value: EventType | 'all') => void;
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
}: HeaderProps) {

  const FilterMenu = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(isMobile ? "flex flex-col gap-4" : "flex items-center")}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={isMobile ? 'default' : 'sm'} className={cn(isMobile ? "justify-start" : "", "text-white hover:text-white hover:bg-white/10")}>
                    <Filter className="h-4 w-4" />
                    <span className="ml-2">Año: {yearOptions.find(y => y.value === yearFilter)?.label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={yearFilter} onValueChange={onYearFilterChange}>
                    {yearOptions.map(year => (
                        <DropdownMenuRadioItem key={year.value} value={year.value}>
                            {year.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={isMobile ? 'default' : 'sm'} className={cn(isMobile ? "justify-start" : "", "text-white hover:text-white hover:bg-white/10")}>
                    <Filter className="h-4 w-4" />
                     <span className="ml-2">Show: {showOptions.find(s => s.value === showFilter)?.label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={showFilter} onValueChange={onShowFilterChange as (value: string) => void}>
                    {showOptions.map(show => (
                        <DropdownMenuRadioItem key={show.value} value={show.value}>
                            {show.icon && <show.icon className="mr-2 h-4 w-4" />}
                            {show.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );

  return (
    <header className="sticky top-0 z-20 bg-blue-950/90 backdrop-blur-sm border-b border-blue-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-white">
                <Image src="https://i.pinimg.com/1200x/eb/18/c2/eb18c26901d993ecc01b0c51909a4d5d.jpg" alt="Attitude Era Logo" width={32} height={32} className="h-8 w-auto" />
                <div>
                    <span className="text-white">Attitude</span><span className="text-red-500">Rewind</span>
                </div>
            </Link>
            
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
                        <SheetTitle className="text-sidebar-foreground">Filtros</SheetTitle>
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
