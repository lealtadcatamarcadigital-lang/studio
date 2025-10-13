import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { MonthData, Event, PPVEvent } from "@/lib/events-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type EventType = 'raw' | 'smackdown' | 'ppv';
export type DetailedEvent = (Event | PPVEvent) & { type: EventType, id: string, year: number, month: string, monthId: string };
export type EventStatus = "disponible" | "visto" | "no-visto";
export type EventStatusMap = { [eventId: string]: EventStatus };


export const flattenEvents = (data: MonthData[]): DetailedEvent[] => {
  const allEvents: DetailedEvent[] = [];
  data.forEach(month => {
    month.raw.forEach((event, index) => allEvents.push({ ...event, type: 'raw', id: `${month.monthId}-${month.year}-raw-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
    month.smackdown.forEach((event, index) => allEvents.push({ ...event, type: 'smackdown', id: `${month.monthId}-${month.year}-smackdown-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
    month.ppvs.forEach((event, index) => allEvents.push({ ...event, type: 'ppv', id: `${month.monthId}-${month.year}-ppv-${index}`, year: month.year, month: month.month, monthId: month.monthId }));
  });
  allEvents.sort((a, b) => new Date(a.year, getMonthNumber(a.month), parseInt(a.date)).getTime() - new Date(b.year, getMonthNumber(b.month), parseInt(b.date)).getTime());
  return allEvents;
};

export const getShowBadgeStyle = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch (type) {
        case 'raw': return 'bg-red-500 hover:bg-red-500/80 text-white';
        case 'smackdown': return 'bg-blue-500 hover:bg-blue-500/80 text-white';
        case 'ppv': return 'bg-amber-500 hover:bg-amber-500/80 text-white';
    }
};

export const getMonthNumber = (monthName: string) => {
    const monthMap: { [key: string]: number } = { Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5, Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11 };
    return monthMap[monthName];
};

export const getEventTypeDisplay = (type: 'raw' | 'smackdown' | 'ppv') => {
    switch(type) {
        case 'raw': return 'RAW';
        case 'smackdown': return 'SmackDown';
        case 'ppv': return 'PPV';
    }
};

export const getShowImage = (type: EventType, event: DetailedEvent) => {
    if (type === 'ppv') {
      return (event as PPVEvent).coverUrl || 'https://i.imgur.com/S6Imh3m.png';
    }
    const images = {
      raw: 'https://i.pinimg.com/736x/52/b7/9f/52b79f70e2da83f192ba455d42a0ef9f.jpg',
      smackdown: 'https://i.pinimg.com/736x/e8/e4/9f/e8e49feb5765132c8583cb6e17f9f5f2.jpg',
    };
    return images[type] || 'https://i.imgur.com/S6Imh3m.png';
};
