
"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, Filter, Tv, Ticket, List, Calendar, LayoutGrid, Utensils, X, Home, ShoppingBag, Bell, User, HelpCircle, LogOut } from 'lucide-react';
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
  SheetClose,
  SheetOverlay,
} from '@/components/ui/sheet';
import { cn } from "@/lib/utils";
import type { EventType } from '@/components/event-grid';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  showFilter?: EventType | 'all';
  onShowFilterChange?: (value: EventType | 'all') => void;
  yearFilter?: string;
  onYearFilterChange?: (value: string) => void;
  title?: string;
  activePage?: 'grid' | 'calendar';
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
  const pathname = usePathname();
  const activePage = pathname === '/calendar' ? 'calendar' : 'grid';

  const FilterMenu = () => (
    <div className="flex items-center gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start">
                    <Filter className="h-4 w-4 mr-2" />
                    {showOptions.find(s => s.value === showFilter)?.label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={showFilter} onValueChange={(val) => onShowFilterChange?.(val as EventType | 'all')}>
                    {showOptions.map(show => (
                        <DropdownMenuRadioItem key={show.value} value={show.value}>
                            <show.icon className="mr-2 h-4 w-4" />
                            {show.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
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
                  <div className='flex flex-col h-full'>
                      <div className="p-6">
                        <Link href="/" className="flex items-center gap-2">
                           <Utensils className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">cheaf</h1>
                        </Link>
                        <p className='mt-4'>Sin nombre</p>
                      </div>
                      <nav className="flex-grow p-6 space-y-2">
                          <Link href="/" className='flex items-center gap-3 p-2 rounded-md hover:bg-black/10'>
                            <LayoutGrid className="h-5 w-5" /> Grilla de Eventos
                          </Link>
                          <Link href="/calendar" className='flex items-center gap-3 p-2 rounded-md hover:bg-black/10'>
                            <Calendar className="h-5 w-5" /> Calendario
                          </Link>

                          {activePage === 'grid' && onShowFilterChange && (
                            <div className="flex flex-col gap-4 pt-4 border-t border-primary-foreground/20">
                                <h3 className="font-semibold px-2">Filtros</h3>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="justify-between w-full text-primary-foreground hover:bg-black/10 hover:text-primary-foreground">
                                            <span>{showOptions.find(s => s.value === showFilter)?.label}</span>
                                            <Filter className="h-4 w-4" />
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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="justify-between w-full text-primary-foreground hover:bg-black/10 hover:text-primary-foreground">
                                             <span>{yearOptions.find(y => y.value === yearFilter)?.label}</span>
                                            <Calendar className="h-4 w-4" />
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
                          )}

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

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
