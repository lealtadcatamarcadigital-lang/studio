import { EventTimeline } from '@/components/event-timeline';
import { WWF_2000_DATA } from '@/lib/events-data';

export default function Home() {
  return (
    <main>
      <EventTimeline initialEvents={WWF_2000_DATA} />
    </main>
  );
}
