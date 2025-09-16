export interface Task {
  id: string;
  title: string;
  description?: string;    
  priority: TaskPriority;
}

export type TaskPriority = 'low' | 'medium' | 'high'| 'urgent';
