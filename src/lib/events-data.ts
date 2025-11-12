export type Match = string | { match: string; rating?: number };

export interface Event {
  date: string;
  location: string;
  description?: string;
  matches?: Match[];
  videoUrl?: string;
}

export interface PPVEvent extends Event {
  name: string;
  coverUrl?: string;
  trailerUrl?: string;
}

export interface MonthData {
  month: string;
  monthId: string;
  year: number;
  raw: Event[];
  smackdown: Event[];
  ppvs: PPVEvent[];
}
