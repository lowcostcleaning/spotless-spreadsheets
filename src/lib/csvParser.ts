import { CleaningRecord } from "@/types/cleaning";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSYLtvZxyunyQ3VIZ0skrmnbWxnzdUxllbUNnouJ7PSYXLuTpZmKRoHGNySJFage7zKhLDu4L9nuKrD/pub?gid=0&single=true&output=csv";

export async function fetchCleaningData(): Promise<CleaningRecord[]> {
  const response = await fetch(CSV_URL);
  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(text: string): CleaningRecord[] {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift()?.split(",") || [];
  
  return lines
    .map(line => {
      const values = line.split(",");
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header.trim()] = values[index]?.trim() || "";
      });
      
      return {
        date: record["дата"] || "",
        apartment: record["апартамент"] || "",
        cleaner: record["клинер"] || "",
        salary: parseFloat(record["зп"]) || 0,
        urgency: record["срочность"] || "",
      };
    })
    .filter(record => {
      // Filter out invalid rows: week markers, empty rows, and rows without apartment
      const isValidDate = /^\d{2}\.\d{2}\.\d{4}$/.test(record.date);
      const hasApartment = record.apartment.trim() !== "";
      return isValidDate && hasApartment;
    });
}

export function toISO(dateStr: string): string {
  const [dd, mm, yy] = dateStr.split(".");
  return `${yy}-${mm}-${dd}`;
}

export function formatDate(day: number, month: number, year: number): string {
  return `${String(day).padStart(2, "0")}.${String(month + 1).padStart(2, "0")}.${year}`;
}

export function parseDate(dateStr: string): Date | null {
  const parts = dateStr.split(".");
  if (parts.length === 3) {
    const [dd, mm, yy] = parts.map(Number);
    // Month is 0-indexed in Date constructor
    return new Date(yy, mm - 1, dd);
  }
  return null;
}