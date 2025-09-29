"use client";

import type { MonthData } from "@/lib/events-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RawIcon } from "@/components/icons/raw-icon";
import { SmackDownIcon } from "@/components/icons/smackdown-icon";
import { PpvIcon } from "@/components/icons/ppv-icon";
import { CalendarDays, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  monthData: MonthData;
}

export function EventCard({ monthData, className, ...props }: EventCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl",
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">
          {monthData.month}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Accordion type="single" collapsible className="w-full">
          {monthData.raw.length > 0 && (
            <AccordionItem value="raw">
              <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                <div className="flex items-center gap-2">
                  <RawIcon className="h-6 w-6" />
                  <span>RAW</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pl-2 border-l-2 border-red-500/50 ml-3">
                  {monthData.raw.map((event, index) => (
                    <li key={index} className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Día {event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {monthData.smackdown.length > 0 && (
            <AccordionItem value="smackdown">
              <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                <div className="flex items-center gap-2">
                  <SmackDownIcon className="h-6 w-6" />
                  <span>SmackDown</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pl-2 border-l-2 border-blue-500/50 ml-3">
                  {monthData.smackdown.map((event, index) => (
                    <li key={index} className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Día {event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {monthData.ppvs.length > 0 && (
            <AccordionItem value="ppvs">
              <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                <div className="flex items-center gap-2">
                  <PpvIcon className="h-6 w-6 text-accent" />
                  <span>PPVs</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pl-2 border-l-2 border-amber-500/50 ml-3">
                  {monthData.ppvs.map((event, index) => (
                    <li key={index} className="space-y-1">
                      <p className="font-bold">{event.name}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Día {event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
