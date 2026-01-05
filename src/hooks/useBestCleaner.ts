import { useMemo } from "react";
import { startOfWeek, endOfWeek, subWeeks, isWithinInterval, format } from "date-fns";
import { ru } from "date-fns/locale";
import { CleaningRecord } from "@/types/cleaning";
import { parseDate } from "@/lib/csvParser";
import { toast } from "sonner";

const WEEK_OPTIONS = { locale: ru, weekStartsOn: 1 } as const; // Monday start

export function useBestCleaner(records: CleaningRecord[]) {
  const calculateBestCleaner = () => {
    const today = new Date();
    
    // Calculate previous week (Monday to Sunday)
    const lastWeekStart = startOfWeek(subWeeks(today, 1), WEEK_OPTIONS);
    const lastWeekEnd = endOfWeek(subWeeks(today, 1), WEEK_OPTIONS);

    // Format dates for display in Russian DD.MM.YYYY format
    const startDateFormatted = format(lastWeekStart, 'dd.MM.yyyy', { locale: ru });
    const endDateFormatted = format(lastWeekEnd, 'dd.MM.yyyy', { locale: ru });

    // 1. Filter records for the previous week
    const relevantRecords = records.filter(record => {
      if (!record.date) return false;
      const recordDate = parseDate(record.date);
      if (!recordDate) return false;
      
      // Check if the record date falls within the interval [lastWeekStart, lastWeekEnd]
      return isWithinInterval(recordDate, { start: lastWeekStart, end: lastWeekEnd });
    });

    // 2. Count cleanings per cleaner, excluding 'выходной' (day off) entries
    const cleanerCounts: Record<string, number> = {};
    relevantRecords.forEach(record => {
      const cleaner = record.cleaner;
      // Ensure cleaner name is present and not marked as a day off
      if (cleaner && !cleaner.toLowerCase().includes("выходной") && 
          !record.apartment?.toLowerCase().includes("выходной")) {
        cleanerCounts[cleaner] = (cleanerCounts[cleaner] || 0) + 1;
      }
    });

    // 3. Find the cleaner with the maximum count
    let bestCleaner = "";
    let maxCleanings = 0;

    for (const cleaner in cleanerCounts) {
      if (cleanerCounts[cleaner] > maxCleanings) {
        maxCleanings = cleanerCounts[cleaner];
        bestCleaner = cleaner;
      }
    }

    return {
      bestCleaner,
      maxCleanings,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    };
  };

  const result = useMemo(calculateBestCleaner, [records]);

  const showBestCleaner = () => {
    if (!result.bestCleaner) {
      toast.info(
        "Нет данных", 
        {
          description: `Не удалось найти лучшего клинера за прошлую неделю (${result.startDate} - ${result.endDate}).`,
          duration: 5000,
        }
      );
      return;
    }

    toast.success(
      `🏆 Лучший клинер недели (${result.startDate} - ${result.endDate})`,
      {
        description: `${result.bestCleaner} выполнил(а) ${result.maxCleanings} уборок!`,
        duration: 7000,
      }
    );
  };

  return {
    showBestCleaner,
    result,
  };
}