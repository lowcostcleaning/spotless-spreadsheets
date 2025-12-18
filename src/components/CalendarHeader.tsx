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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-card rounded-xl p-1 shadow-sm border border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevMonth}
            className="h-9 w-9 rounded-lg hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextMonth}
            className="h-9 w-9 rounded-lg hover:bg-secondary"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="text-2xl font-semibold capitalize">{monthYear}</h1>
      </div>
      
      <Button
        variant="outline"
        onClick={onToday}
        className="gap-2 rounded-xl border-border hover:bg-accent hover:text-accent-foreground"
      >
        <CalendarDays className="h-4 w-4" />
        Сегодня
      </Button>
    </div>
  );
}
