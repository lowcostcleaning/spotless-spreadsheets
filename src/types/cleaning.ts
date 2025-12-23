export interface CleaningRecord {
  date: string;
  apartment: string;
  cleaner: string;
  salary: number;
  urgency: string;
}

export interface DayData {
  day: number;
  count: number;
  isCurrentMonth: boolean;
  isDayOff: boolean;
}
