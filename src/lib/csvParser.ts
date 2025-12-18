import { CleaningRecord } from "@/types/cleaning";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRe6bsx2rDJvoxxzC8Wl82GHIatzxQJcGsiMWFDWpSStIDMX3JzKbLIULoU_isuM3jMuwwfgazIi86l/pub?gid=0&single=true&output=csv";

export async function fetchCleaningData(): Promise<CleaningRecord[]> {
  const response = await fetch(CSV_URL);
  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(text: string): CleaningRecord[] {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift()?.split(",") || [];
  
  return lines.map(line => {
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
    };
  });
}

export function toISO(dateStr: string): string {
  const [dd, mm, yy] = dateStr.split(".");
  return `${yy}-${mm}-${dd}`;
}

export function formatDate(day: number, month: number, year: number): string {
  return `${String(day).padStart(2, "0")}.${String(month + 1).padStart(2, "0")}.${year}`;
}
