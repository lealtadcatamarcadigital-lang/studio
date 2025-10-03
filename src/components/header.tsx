
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Tv, Ticket, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { EventType } from './event-grid';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleYearChange = (value: string) => {
    onYearFilterChange(value);
    setIsMobileMenuOpen(false);
  };

  const handleShowChange = (value: string) => {
    onShowFilterChange(value as EventType | 'all');
    setIsMobileMenuOpen(false);
  };

  const DesktopMenu = () => (
    <Menubar className="hidden md:flex rounded-lg border-2 bg-white/70 dark:bg-black/70 backdrop-blur-sm">
      <MenubarMenu>
        <MenubarTrigger>Año: {yearOptions.find(y => y.value === yearFilter)?.label}</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={yearFilter} onValueChange={handleYearChange}>
            {yearOptions.map(year => (
              <MenubarRadioItem key={year.value} value={year.value}>
                {year.label}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Show: {showOptions.find(s => s.value === showFilter)?.label}</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={showFilter} onValueChange={handleShowChange}>
            {showOptions.map(show => (
              <MenubarRadioItem key={show.value} value={show.value}>
                {show.label}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );

  const MobileMenu = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div>
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Año</h3>
            <div className="flex flex-col gap-2">
                {yearOptions.map(year => (
                    <Button key={year.value} variant={yearFilter === year.value ? 'default' : 'outline'} onClick={() => handleYearChange(year.value)}>
                        {year.label}
                    </Button>
                ))}
            </div>
          </div>
          <MenubarSeparator />
          <div>
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Show</h3>
            <div className="flex flex-col gap-2">
                 {showOptions.map(show => (
                    <Button key={show.value} variant={showFilter === show.value ? 'default' : 'outline'} onClick={() => handleShowChange(show.value)}>
                        <show.icon className="mr-2 h-4 w-4" />
                        {show.label}
                    </Button>
                 ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="container mx-auto px-4 pt-4 pb-4 sticky top-0 z-20">
      <div className="flex flex-col gap-4">
        <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              <span className="text-black dark:text-white">Attitude </span><span className="text-red-500">Rewind</span>
            </h1>
        </div>

        <div className="flex justify-center">
          <DesktopMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
