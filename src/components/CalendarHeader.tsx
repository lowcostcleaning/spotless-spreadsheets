import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onToday }: CalendarHeaderProps) {
  const monthYear = currentDate.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-0.5 sm:gap-1 bg-card rounded-lg sm:rounded-xl p-0.5 sm:p-1 shadow-sm border border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevMonth}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-md sm:rounded-lg hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextMonth}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-md sm:rounded-lg hover:bg-secondary"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="text-base sm:text-2xl font-semibold capitalize">{monthYear}</h1>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onToday}
        className="gap-1 sm:gap-2 rounded-lg sm:rounded-xl border-border hover:bg-accent hover:text-accent-foreground text-xs sm:text-sm px-2 sm:px-4"
      >
        <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Сегодня</span>
        <span className="sm:hidden">Сег.</span>
      </Button>
    </div>
  );
}
