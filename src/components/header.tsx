
"use client";

import React from 'react';
import { Menu, Filter, Tv, Ticket, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from "@/lib/utils";
import type { EventType } from '@/components/event-grid';

interface HeaderProps {
  showFilter: EventType | 'all';
  onShowFilterChange: (value: EventType | 'all') => void;
  yearFilter: string;
  onYearFilterChange: (value: string) => void;
  title: string;
}

const showOptions: { value: EventType | 'all'; label: string; icon: React.ElementType }[] = [
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
  showFilter,
  onShowFilterChange,
  yearFilter,
  onYearFilterChange,
}: HeaderProps) {

  const FilterMenu = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn("flex flex-col gap-4", isMobile ? "p-4" : "")}>
        <h3 className="font-semibold">Filtrar por Show</h3>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    {showOptions.find(s => s.value === showFilter)?.label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={showFilter} onValueChange={(val) => onShowFilterChange(val as EventType | 'all')}>
                    {showOptions.map(show => (
                        <DropdownMenuRadioItem key={show.value} value={show.value}>
                            <show.icon className="mr-2 h-4 w-4" />
                            {show.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

        <h3 className="font-semibold mt-4">Filtrar por Año</h3>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    {yearOptions.find(y => y.value === yearFilter)?.label}
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
    </div>
  );

  return (
    <header className="sticky top-0 z-20 bg-card shadow-md" style={{ backgroundColor: '#2A3B57' }}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
            <h1 className="text-2xl font-bold font-headline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="text-white">Attitude</span>
                <span className="text-red-500">Rewind</span>
            </h1>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir Menú</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-card text-card-foreground">
                    <SheetHeader>
                        <SheetTitle>Filtros</SheetTitle>
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
