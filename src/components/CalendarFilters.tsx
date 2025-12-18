import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface CalendarFiltersProps {
  cleaners: string[];
  selectedCleaner: string;
  fromDate: string;
  toDate: string;
  onCleanerChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onApplyFilters: () => void;
}

export function CalendarFilters({
  cleaners,
  selectedCleaner,
  fromDate,
  toDate,
  onCleanerChange,
  onFromDateChange,
  onToDateChange,
  onApplyFilters,
}: CalendarFiltersProps) {
  return (
    <div className="bg-card rounded-2xl p-4 mb-6 shadow-sm border border-border animate-fade-in">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <Label className="text-xs font-medium text-muted-foreground">Клинер</Label>
          <Select value={selectedCleaner} onValueChange={onCleanerChange}>
            <SelectTrigger className="h-10 rounded-xl border-border bg-background">
              <SelectValue placeholder="Все клинеры" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все клинеры</SelectItem>
              {cleaners.map((cleaner) => (
                <SelectItem key={cleaner} value={cleaner}>
                  {cleaner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium text-muted-foreground">С даты</Label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="h-10 rounded-xl border-border bg-background"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium text-muted-foreground">По дату</Label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
            className="h-10 rounded-xl border-border bg-background"
          />
        </div>

        <Button
          onClick={onApplyFilters}
          className="h-10 px-5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          <Filter className="h-4 w-4" />
          Показать
        </Button>
      </div>
    </div>
  );
}
