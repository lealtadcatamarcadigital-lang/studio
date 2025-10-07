
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/header';
import { WWF_ALL_DATA } from '@/lib/events-data-all';
import { flattenEvents, getMonthNumber, type DetailedEvent, type EventStatusMap } from '@/components/event-grid';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getShowBadgeStyle, getEventTypeDisplay } from '@/components/event-grid';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CALENDAR_DATE_KEY = 'attitude-rewind-calendar-date';
const YEAR_FILTER_KEY = 'attitude-rewind-year-filter';

export default function CalendarPage() {
  const router = useRouter();
  const allEvents = useMemo(() => flattenEvents(WWF_ALL_DATA), []);
  const [currentMonth, setCurrentMonth] = useState(new Date(2000, 0, 1));
  const [eventStatuses, setEventStatuses] = useState<EventStatusMap>({});

  useEffect(() => {
    try {
      const storedStatuses = localStorage.getItem('attitude-rewind-statuses');
      if (storedStatuses) {
        setEventStatuses(JSON.parse(storedStatuses));
      }
      
      let dateToSet = new Date();
      const storedDate = localStorage.getItem(CALENDAR_DATE_KEY);
      if (storedDate) {
        dateToSet = new Date(storedDate);
      }

      const storedYearFilter = localStorage.getItem(YEAR_FILTER_KEY);
      if (storedYearFilter && storedYearFilter !== 'all') {
         dateToSet.setFullYear(parseInt(storedYearFilter));
      } else if (!storedDate) {
        // If no specific date is stored, and no year filter, default to 2000
        dateToSet.setFullYear(2000);
        dateToSet.setMonth(0);
      }

      setCurrentMonth(dateToSet);

    } catch (error) {
      console.error("Could not parse data from localStorage:", error);
      // If parsing fails, set a sensible default
      setCurrentMonth(new Date(2000, 0, 1));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CALENDAR_DATE_KEY, currentMonth.toISOString());
    } catch (error) {
      console.error("Could not save calendar date to localStorage:", error);
    }
  }, [currentMonth]);

  const handleEventClick = (event: DetailedEvent) => {
    router.push(`/event/${event.id}`);
  };
  
  const eventsByDay = useMemo(() => {
    const grouped: Record<string, DetailedEvent[]> = {};
    allEvents.forEach(event => {
      const day = new Date(event.year, getMonthNumber(event.month), parseInt(event.date)).toDateString();
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(event);
    });
    return grouped;
  }, [allEvents]);

  const modifiers = useMemo(() => {
    const mods: Record<string, Date[]> = {
      'day-raw': [],
      'day-smackdown': [],
      'day-ppv': [],
      'day-watched': [],
      'day-not-watched': [],
      'day-available': [],
    };
    
    Object.values(eventsByDay).forEach(dayEvents => {
      const date = new Date(dayEvents[0].year, getMonthNumber(dayEvents[0].month), parseInt(dayEvents[0].date));
      const statuses = dayEvents.map(e => eventStatuses[e.id] || 'disponible');

      if (dayEvents.some(e => e.type === 'raw')) mods['day-raw'].push(date);
      if (dayEvents.some(e => e.type === 'smackdown')) mods['day-smackdown'].push(date);
      if (dayEvents.some(e => e.type === 'ppv')) mods['day-ppv'].push(date);

      if (statuses.every(s => s === 'visto')) {
        mods['day-watched'].push(date);
      } else if (statuses.some(s => s === 'visto') || statuses.some(s => s === 'no-visto')) {
        // Partially watched or at least one not-watched
        mods['day-not-watched'].push(date);
      } else {
        mods['day-available'].push(date);
      }
    });

    return mods;
  }, [eventsByDay, eventStatuses]);

  const renderDay = (day: Date) => {
    const dayKey = day.toDateString();
    const dayEvents = eventsByDay[dayKey];
    
    if (dayEvents) {
      return (
        <div onClick={() => dayEvents.length === 1 && handleEventClick(dayEvents[0])} className={dayEvents.length === 1 ? 'cursor-pointer' : ''}>
          {day.getDate()}
        </div>
      );
    }
    return <div>{day.getDate()}</div>;
  };
  
  const handleYearChange = (year: string) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(parseInt(year));
    setCurrentMonth(newDate);
    // Also update the global year filter
    try {
      localStorage.setItem(YEAR_FILTER_KEY, year);
    } catch (error) {
       console.error("Could not save year filter to localStorage:", error);
    }
  };
  
  const handleMonthChange = (month: string) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(parseInt(month));
    setCurrentMonth(newDate);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };


  return (
    <main className="min-h-screen">
       <Header activePage="calendar" />
       <div className="container mx-auto px-4 py-8">
            <Card>
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={goToPreviousMonth}><ChevronLeft/></Button>
                            <h2 className="text-2xl font-bold text-center w-48">{currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</h2>
                            <Button variant="outline" size="icon" onClick={goToNextMonth}><ChevronRight/></Button>
                        </div>
                        <div className="flex gap-2">
                             <Select value={currentMonth.getFullYear().toString()} onValueChange={handleYearChange}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Año" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2000">2000</SelectItem>
                                    <SelectItem value="2001">2001</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={currentMonth.getMonth().toString()} onValueChange={handleMonthChange}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Mes" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <SelectItem key={i} value={i.toString()}>
                                            {new Date(0, i).toLocaleDateString('es-ES', { month: 'long' })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Calendar
                        mode="single"
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        className="p-0"
                        modifiers={modifiers}
                        modifiersClassNames={{
                          'day-raw': 'day-raw',
                          'day-smackdown': 'day-smackdown',
                          'day-ppv': 'day-ppv',
                          'day-watched': 'day-watched',
                          'day-not-watched': 'day-not-watched',
                          'day-available': 'day-available'
                        }}
                        components={{
                            DayContent: ({ date }) => renderDay(date)
                        }}
                    />
                    <div className="mt-4 flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2 text-sm"><Badge className={getShowBadgeStyle('raw')}>RAW</Badge></div>
                        <div className="flex items-center gap-2 text-sm"><Badge className={getShowBadgeStyle('smackdown')}>SmackDown</Badge></div>
                        <div className="flex items-center gap-2 text-sm"><Badge className={getShowBadgeStyle('ppv')}>PPV</Badge></div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2 text-sm"><span className="h-3 w-3 rounded-full bg-green-500"></span> Visto</div>
                        <div className="flex items-center gap-2 text-sm"><span className="h-3 w-3 rounded-full bg-red-500"></span> No Visto / Parcial</div>
                        <div className="flex items-center gap-2 text-sm"><span className="h-3 w-3 rounded-full bg-gray-400"></span> Disponible</div>
                    </div>
                </CardContent>
            </Card>
       </div>
    </main>
  );
}
