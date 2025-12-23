import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CleaningRecord } from "@/types/cleaning";
import { ArrowLeft, Calendar, Building2, User, Banknote, AlertCircle } from "lucide-react";

interface ResultsTableProps {
  title: string;
  records: CleaningRecord[];
  onBack: () => void;
}

export function ResultsTable({ title, records, onBack }: ResultsTableProps) {
  const total = records.reduce((sum, record) => sum + record.salary, 0);

  return (
    <div className="animate-slide-up">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-3 sm:mb-4 gap-1 sm:gap-2 text-primary hover:text-primary/80 hover:bg-accent text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад
      </Button>

      <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">{title}</h2>

      {records.length > 0 && (
        <div className="bg-accent/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 flex items-center gap-2">
          <Banknote className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <span className="font-semibold text-base sm:text-lg">Итого: {total.toLocaleString("ru-RU")} ₾</span>
        </div>
      )}

      <div className="bg-card rounded-xl sm:rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="hidden sm:inline">Дата</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="hidden sm:inline">Апартамент</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="hidden sm:inline">Клинер</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="hidden sm:inline">Срочность</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Banknote className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="hidden sm:inline">ЗП</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 sm:py-8 text-muted-foreground text-sm">
                    Нет данных
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record, index) => (
                  <TableRow key={index} className="hover:bg-secondary/30 transition-colors">
                    <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">{record.date}</TableCell>
                    <TableCell className="text-xs sm:text-sm py-2 sm:py-4 max-w-[100px] sm:max-w-none truncate">{record.apartment}</TableCell>
                    <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{record.cleaner}</TableCell>
                    <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{record.urgency}</TableCell>
                    <TableCell className="text-xs sm:text-sm py-2 sm:py-4 whitespace-nowrap">{record.salary.toLocaleString("ru-RU")} ₾</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
