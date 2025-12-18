import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CleaningRecord } from "@/types/cleaning";
import { ArrowLeft, Calendar, Building2, User, Banknote } from "lucide-react";

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
        onClick={onBack}
        className="mb-4 gap-2 text-primary hover:text-primary/80 hover:bg-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад к календарю
      </Button>

      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {records.length > 0 && (
        <div className="bg-accent/50 rounded-xl p-4 mb-4 flex items-center gap-2">
          <Banknote className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">Итого: {total.toLocaleString("ru-RU")} ₽</span>
        </div>
      )}

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Дата
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Апартамент
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Клинер
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-muted-foreground" />
                  ЗП
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Нет данных
                </TableCell>
              </TableRow>
            ) : (
              records.map((record, index) => (
                <TableRow key={index} className="hover:bg-secondary/30 transition-colors">
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.apartment}</TableCell>
                  <TableCell>{record.cleaner}</TableCell>
                  <TableCell>{record.salary.toLocaleString("ru-RU")} ₽</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
