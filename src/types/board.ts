import type { Column } from "./column";
import type { Task } from "./task";
export interface Board {
  id: string;
  title: string;
  columnOrder: string[];          
  columns: Record<string, Column>;
  tasks:   Record<string, Task>;
}
