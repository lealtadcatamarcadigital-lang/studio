
import { EventGrid } from '@/components/event-grid';
import { WWF_2000_DATA } from '@/lib/events-data-2000';

export default function Home() {
  return (
    <main className="min-h-screen">
      <EventGrid initialEvents={WWF_2000_DATA} />
    </main>
  );
}
