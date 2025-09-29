export interface Event {
  date: string;
  location: string;
}

export interface PPVEvent extends Event {
  name: string;
}

export interface MonthData {
  month: string;
  monthId: string;
  raw: Event[];
  smackdown: Event[];
  ppvs: PPVEvent[];
}

export const WWF_2000_DATA: MonthData[] = [
  {
    month: "Enero",
    monthId: "january",
    raw: [
      { date: "3", location: "Miami" },
      { date: "10", location: "St. Louis" },
      { date: "17", location: "New Haven" },
      { date: "24", location: "Philadelphia" },
      { date: "31", location: "Pittsburgh" },
    ],
    smackdown: [
      { date: "6", location: "Orlando" },
      { date: "13", location: "Chicago" },
      { date: "20", location: "Providence" },
      { date: "27", location: "Baltimore" },
    ],
    ppvs: [
      {
        date: "23",
        name: "Royal Rumble",
        location: "New York, NY (Madison Square Garden)",
      },
    ],
  },
  {
    month: "Febrero",
    monthId: "february",
    raw: [
      { date: "7", location: "Dallas" },
      { date: "14", location: "San José" },
      { date: "21", location: "Atlanta" },
      { date: "28", location: "Hartford" },
    ],
    smackdown: [
      { date: "3", location: "Detroit" },
      { date: "10", location: "Austin" },
      { date: "17", location: "Fresno" },
      { date: "24", location: "Nashville" },
    ],
    ppvs: [{ date: "27", name: "No Way Out", location: "Hartford, CT" }],
  },
  {
    month: "Marzo",
    monthId: "march",
    raw: [
      { date: "6", location: "Springfield" },
      { date: "13", location: "East Rutherford" },
      { date: "20", location: "Chicago" },
      { date: "27", location: "Houston" },
    ],
    smackdown: [
      { date: "2", location: "Trenton" },
      { date: "9", location: "Boston" },
      { date: "16", location: "Uniondale" },
      { date: "23", location: "Milwaukee" },
      { date: "30", location: "San Antonio" },
    ],
    ppvs: [],
  },
  {
    month: "Abril",
    monthId: "april",
    raw: [
      { date: "3", location: "Los Ángeles" },
      { date: "10", location: "Fort Lauderdale" },
      { date: "17", location: "State College" },
      { date: "24", location: "Raleigh" },
    ],
    smackdown: [
      { date: "6", location: "San José" },
      { date: "13", location: "Tampa" },
      { date: "20", location: "Philadelphia" },
      { date: "27", location: "Charlotte" },
    ],
    ppvs: [
      { date: "2", name: "WrestleMania 2000", location: "Anaheim, CA" },
      { date: "30", name: "Backlash", location: "Washington, D.C." },
    ],
  },
  {
    month: "Mayo",
    monthId: "may",
    raw: [
      { date: "1", location: "Baltimore" },
      { date: "8", location: "Uniondale" },
      { date: "15", location: "Cleveland" },
      { date: "22", location: "Indianapolis" },
      { date: "29", location: "Vancouver" },
    ],
    smackdown: [
      { date: "4", location: "Richmond" },
      { date: "11", location: "New Haven" },
      { date: "18", location: "Detroit" },
      { date: "25", location: "Evansville" },
    ],
    ppvs: [
      { date: "6", name: "Insurrextion", location: "Londres, Inglaterra" },
      { date: "21", name: "Judgment Day", location: "Louisville, KY" },
    ],
  },
  {
    month: "Junio",
    monthId: "june",
    raw: [
      { date: "5", location: "St. Louis" },
      { date: "12", location: "Chicago" },
      { date: "19", location: "Nashville" },
      { date: "26", location: "Worcester" },
    ],
    smackdown: [
      { date: "1", location: "Tacoma" },
      { date: "8", location: "Buffalo" },
      { date: "15", location: "Chicago" },
      { date: "22", location: "Memphis" },
      { date: "29", location: "Hartford" },
    ],
    ppvs: [
      { date: "25", name: "King of the Ring", location: "East Rutherford, NJ" },
    ],
  },
  {
    month: "Julio",
    monthId: "july",
    raw: [
      { date: "3", location: "College Station" },
      { date: "10", location: "San Antonio" },
      { date: "17", location: "Albany" },
      { date: "24", location: "Austin" },
      { date: "31", location: "Atlanta" },
    ],
    smackdown: [
      { date: "6", location: "Orlando" },
      { date: "13", location: "Oakland" },
      { date: "20", location: "Albany" },
      { date: "27", location: "Providence" },
    ],
    ppvs: [{ date: "23", name: "Fully Loaded", location: "Dallas, TX" }],
  },
  {
    month: "Agosto",
    monthId: "august",
    raw: [
      { date: "7", location: "New York" },
      { date: "14", location: "East Rutherford" },
      { date: "21", location: "Lafayette" },
      { date: "28", location: "Greensboro" },
    ],
    smackdown: [
      { date: "3", location: "Birmingham" },
      { date: "10", location: "Chicago" },
      { date: "17", location: "Sacramento" },
      { date: "24", location: "Fayetteville" },
      { date: "31", location: "Hartford" },
    ],
    ppvs: [{ date: "27", name: "SummerSlam", location: "Raleigh, NC" }],
  },
  {
    month: "Septiembre",
    monthId: "september",
    raw: [
      { date: "4", location: "Lexington" },
      { date: "11", location: "Phoenix" },
      { date: "18", location: "Detroit" },
      { date: "25", location: "State College" },
    ],
    smackdown: [
      { date: "7", location: "Louisville" },
      { date: "14", location: "Las Vegas" },
      { date: "21", location: "Nashville" },
      { date: "28", location: "Pittsburgh" },
    ],
    ppvs: [
      { date: "24", name: "Unforgiven", location: "Philadelphia, PA" },
    ],
  },
  {
    month: "Octubre",
    monthId: "october",
    raw: [
      { date: "2", location: "Washington D.C." },
      { date: "9", location: "Anaheim" },
      { date: "16", location: "Detroit" },
      { date: "23", location: "Hartford" },
      { date: "30", location: "Boston" },
    ],
    smackdown: [
      { date: "5", location: "Baltimore" },
      { date: "12", location: "Los Ángeles" },
      { date: "19", location: "Cleveland" },
      { date: "26", location: "Albany" },
    ],
    ppvs: [{ date: "22", name: "No Mercy", location: "Albany, NY" }],
  },
  {
    month: "Noviembre",
    monthId: "november",
    raw: [
      { date: "6", location: "Houston" },
      { date: "13", location: "Columbus" },
      { date: "20", location: "Orlando" },
      { date: "27", location: "Raleigh" },
    ],
    smackdown: [
      { date: "2", location: "Rochester" },
      { date: "9", location: "Chicago" },
      { date: "16", location: "Indianapolis" },
      { date: "23", location: "Tampa" },
      { date: "30", location: "Charlotte" },
    ],
    ppvs: [{ date: "19", name: "Survivor Series", location: "Tampa, FL" }],
  },
  {
    month: "Diciembre",
    monthId: "december",
    raw: [
      { date: "4", location: "East Rutherford" },
      { date: "11", location: "Memphis" },
      { date: "18", location: "Greenville" },
      { date: "25", location: "Chattanooga" },
    ],
    smackdown: [
      { date: "7", location: "San José" },
      { date: "14", location: "Little Rock" },
      { date: "21", location: "Durham" },
      { date: "28", location: "San Antonio" },
    ],
    ppvs: [
      { date: "2", name: "Rebellion", location: "Sheffield, Inglaterra" },
      { date: "10", name: "Armageddon", location: "Birmingham, AL" },
    ],
  },
];
