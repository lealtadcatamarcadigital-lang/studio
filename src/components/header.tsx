
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Tv, Ticket, List, Filter, ArrowLeft } from 'lucide-react';
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
import type { EventType } from './event-grid';
import { cn } from "@/lib/utils";

interface HeaderProps {
  yearFilter: string;
  onYearFilterChange: (value: string) => void;
  title: string;
}

const yearOptions: { value: string; label: string }[] = [
    { value: 'all', label: 'Todos los Años' },
    { value: '2000', label: '2000' },
    { value: '2001', label: '2001' },
];

export function Header({
  yearFilter,
  onYearFilterChange,
  title,
}: HeaderProps) {

  const FilterMenu = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(isMobile ? "flex flex-col gap-4" : "flex items-center gap-2")}>
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
    </div>
  );

  return (
    <header className="sticky top-0 z-20 bg-blue-950/90 backdrop-blur-sm border-b border-blue-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="icon" className="h-8 w-8">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Link>
              </Button>
              <h1 className="font-headline text-xl font-bold text-white">{title}</h1>
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
