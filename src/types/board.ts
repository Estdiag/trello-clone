export interface Task {
  id: string;
  title: string;
  description?: string;    
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];    
}

export interface Board {
  id: string;
  title: string;
  columnOrder: string[];          
  columns: Record<string, Column>;
  tasks:   Record<string, Task>;
}
