import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCleaningData, toISO, formatDate } from "@/lib/csvParser";
import { CleaningRecord, DayData } from "@/types/cleaning";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarFilters } from "./CalendarFilters";
import { CalendarGrid } from "./CalendarGrid";
import { ResultsTable } from "./ResultsTable";
import { LoadingSpinner } from "./LoadingSpinner";
import maviLogo from "@/assets/mavi-logo.jpg";

type View = "calendar" | "results";

export function CleanBoard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<View>("calendar");
  const [selectedCleaner, setSelectedCleaner] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredRecords, setFilteredRecords] = useState<CleaningRecord[]>([]);
  const [resultsTitle, setResultsTitle] = useState("");

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["cleaningData"],
    queryFn: fetchCleaningData,
  });

  const cleaners = useMemo(() => {
    const unique = [...new Set(records.map((r) => r.cleaner).filter(Boolean))];
    return unique.sort();
  }, [records]);

  const calendarDays = useMemo((): DayData[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const lastDate = new Date(year, month + 1, 0).getDate();

    const counts: Record<number, number> = {};
    const dayOffs: Record<number, boolean> = {};
    
    records.forEach((record) => {
      if (!record.date) return;
      const [d, mm, yy] = record.date.split(".").map(Number);
      if (yy === year && mm === month + 1) {
        counts[d] = (counts[d] || 0) + 1;
        if (record.apartment?.toLowerCase().includes("выходной") || 
            record.cleaner?.toLowerCase().includes("выходной")) {
          dayOffs[d] = true;
        }
      }
    });

    const days: DayData[] = [];

    for (let i = 0; i < startOffset; i++) {
      days.push({ day: 0, count: 0, isCurrentMonth: false, isDayOff: false });
    }

    for (let d = 1; d <= lastDate; d++) {
      days.push({ day: d, count: counts[d] || 0, isCurrentMonth: true, isDayOff: dayOffs[d] || false });
    }

    return days;
  }, [currentDate, records]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day: number) => {
    const date = formatDate(day, currentDate.getMonth(), currentDate.getFullYear());
    const dayRecords = records.filter((r) => r.date === date);
    setFilteredRecords(dayRecords);
    setResultsTitle(`Уборки за ${date}`);
    setView("results");
  };

  const handleApplyFilters = () => {
    const filtered = records.filter((r) => {
      if (selectedCleaner !== "all" && r.cleaner !== selectedCleaner) return false;
      if (r.date) {
        const iso = toISO(r.date);
        if (fromDate && iso < fromDate) return false;
        if (toDate && iso > toDate) return false;
      }
      return true;
    });
    setFilteredRecords(filtered);
    setResultsTitle("Результаты по фильтру");
    setView("results");
  };

  const handleBackToCalendar = () => {
    setView("calendar");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <button 
            onClick={handleToday}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            title="Перейти к сегодня"
          >
            <img 
              src={maviLogo} 
              alt="MAVI Guest" 
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-cover"
            />
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">MAVI</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Календарь уборок</p>
            </div>
          </button>
        </div>

        {view === "calendar" ? (
          <>
            <CalendarHeader
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onToday={handleToday}
            />

            <CalendarFilters
              cleaners={cleaners}
              selectedCleaner={selectedCleaner}
              fromDate={fromDate}
              toDate={toDate}
              onCleanerChange={setSelectedCleaner}
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
              onApplyFilters={handleApplyFilters}
            />

            <CalendarGrid days={calendarDays} onDayClick={handleDayClick} />

            <div className="flex flex-wrap gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded border-l-4 border-l-success bg-success/20" />
                <span>1-2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded border-l-4 border-l-warning bg-warning/20" />
                <span>3-4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded border-l-4 border-l-destructive bg-destructive/20" />
                <span>5+</span>
              </div>
            </div>
          </>
        ) : (
          <ResultsTable
            title={resultsTitle}
            records={filteredRecords}
            onBack={handleBackToCalendar}
          />
        )}
      </div>
    </div>
  );
}
