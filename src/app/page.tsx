import { EventTimeline } from '@/components/event-timeline';
import { WWF_2001_DATA } from '@/lib/events-data-2001';

export default function Home() {
  return (
    <main className="min-h-screen">
      <EventTimeline initialEvents={WWF_2001_DATA} />
    </main>
  );
}
