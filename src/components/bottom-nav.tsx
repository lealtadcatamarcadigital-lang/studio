
'use client';

import Link from 'next/link';
import { Newspaper, CalendarDays, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChampionshipBeltIcon } from './icons/championship-belt-icon';

const navItems = [
  { href: '/news', icon: Newspaper, label: 'Noticias' },
  { href: '/superstars', icon: ChampionshipBeltIcon, label: 'Superstars' },
  { href: '/', icon: CalendarDays, label: 'Eventos' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-red-500/50 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center text-xs gap-1 transition-colors',
              isActive ? 'text-red-500' : 'text-gray-400 hover:text-white'
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </footer>
  );
}
