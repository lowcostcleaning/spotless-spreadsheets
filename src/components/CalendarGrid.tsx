import { DayData } from "@/types/cleaning";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  days: DayData[];
  onDayClick: (day: number) => void;
}

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function CalendarGrid({ days, onDayClick }: CalendarGridProps) {
  const getLoadClass = (count: number, isDayOff: boolean) => {
    if (isDayOff) return "border-l-4 border-l-muted-foreground bg-muted/50";
    if (count >= 5) return "border-l-4 border-l-destructive bg-destructive/5";
    if (count >= 3) return "border-l-4 border-l-warning bg-warning/5";
    if (count >= 1) return "border-l-4 border-l-success bg-success/5";
    return "";
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((dayData, index) => (
          <div
            key={index}
            onClick={() => dayData.isCurrentMonth && dayData.count > 0 && onDayClick(dayData.day)}
            className={cn(
              "min-h-[100px] rounded-xl p-3 transition-all duration-200",
            dayData.isCurrentMonth
                ? cn(
                    "bg-card shadow-sm border border-border",
                    dayData.count > 0 && "cursor-pointer hover:shadow-md hover:scale-[1.02]",
                    getLoadClass(dayData.count, dayData.isDayOff)
                  )
                : "bg-transparent"
            )}
          >
            {dayData.isCurrentMonth && (
              <>
                <div className="font-semibold text-foreground mb-1">
                  {dayData.day}
                </div>
                {dayData.count > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {dayData.isDayOff ? "Выходной" : `${dayData.count} уборок`}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
