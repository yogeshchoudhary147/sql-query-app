export interface Query {
  id: number;
  text: string;
  title: string;
  data: Record<string, string | number>[];
}

export type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;
