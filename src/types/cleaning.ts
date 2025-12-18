export interface CleaningRecord {
  date: string;
  apartment: string;
  cleaner: string;
  salary: number;
}

export interface DayData {
  day: number;
  count: number;
  isCurrentMonth: boolean;
}
