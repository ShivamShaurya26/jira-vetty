export type ColumnId = 'todo' | 'inprogress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: ColumnId; 
}

export interface Column {
  id: ColumnId;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: { [taskId: string]: Task };
  columns: { [columnId: string]: Column };
  columnOrder: ColumnId[];
}
