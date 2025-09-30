export interface Event {
  date: string;
  location: string;
  description?: string;
  matches?: string[];
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
