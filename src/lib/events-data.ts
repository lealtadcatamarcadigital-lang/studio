export type Match = string | { match: string; rating?: number };

export interface Event {
  date: string;
  location: string;
  description?: string;
  matches?: Match[];
}

export interface PPVEvent extends Event {
  name: string;
  coverUrl?: string;
}

export interface MonthData {
  month: string;
  monthId: string;
  year: number;
  raw: Event[];
  smackdown: Event[];
  ppvs: PPVEvent[];
}
