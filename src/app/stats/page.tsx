
import { StatsDashboard } from "@/components/stats-dashboard";
import { WWF_2000_DATA } from "@/lib/events-data-2000";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="relative text-center mb-8">
        <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
            <Button variant="ghost" size="icon">
                <ArrowLeft />
                <span className="sr-only">Volver</span>
            </Button>
        </Link>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          <span className="text-black dark:text-white">Estadísticas</span>
        </h1>
        <p className="text-muted-foreground mt-2">Tu progreso en el Attitude Rewind.</p>
      </header>
      <StatsDashboard initialEvents={WWF_2000_DATA} />
    </div>
  );
}
