
import { WWF_2000_DATA } from '@/lib/events-data-2000';
import { WrestlerDetails } from '@/components/wrestler-details';
import { WrestlingMaskIcon } from '@/components/icons/wrestling-mask-icon';

export default function WrestlerPage({ params }: { params: { name: string } }) {
  const wrestlerName = decodeURIComponent(params.name.replace(/_/g, ' '));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 border-b pb-4">
          <div className="flex justify-center items-center gap-4">
            <WrestlingMaskIcon className="h-12 w-12 text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
              {wrestlerName}
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">Historial de Combates</p>
        </header>

        <WrestlerDetails wrestlerName={wrestlerName} initialEvents={WWF_2000_DATA} />
      </div>
    </main>
  );
}
