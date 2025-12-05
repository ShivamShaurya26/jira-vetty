import { Injectable, signal } from '@angular/core';
import { BoardData, ColumnId, Task } from '../models/task.model';

const BOARD_KEY = 'vetty_board';

const INITIAL_BOARD: BoardData = {
  tasks: {},
  columns: {
    'todo': { id: 'todo', title: 'To Do', taskIds: [] },
    'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [] },
    'review': { id: 'review', title: 'Need Review', taskIds: [] },
    'done': { id: 'done', title: 'Completed', taskIds: [] }
  },
  columnOrder: ['todo', 'inprogress', 'review', 'done']
};

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  // Using Signals for state management
  private boardSignal = signal<BoardData>(this.loadBoard());

  readonly board = this.boardSignal.asReadonly();

  constructor() { }

  private loadBoard(): BoardData {
    const saved = localStorage.getItem(BOARD_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse board data', e);
      }
    }
    return INITIAL_BOARD;
  }

  private saveBoard(board: BoardData) {
    localStorage.setItem(BOARD_KEY, JSON.stringify(board));
    this.boardSignal.set(board);
  }

  addTask(columnId: ColumnId, task: Task) {
    const current = this.boardSignal();
    const newTasks = { ...current.tasks, [task.id]: task };
    const newColumns = { ...current.columns };
    
    newColumns[columnId] = {
      ...newColumns[columnId],
      taskIds: [...newColumns[columnId].taskIds, task.id]
    };

    this.saveBoard({
      ...current,
      tasks: newTasks,
      columns: newColumns
    });
  }

  moveTask(taskId: string, sourceColId: ColumnId, destColId: ColumnId, sourceIndex: number, destIndex: number) {
    const current = this.boardSignal();
    const startCol = current.columns[sourceColId];
    const finishCol = current.columns[destColId];

    if (startCol === finishCol) {
      const newTaskIds = Array.from(startCol.taskIds);
      newTaskIds.splice(sourceIndex, 1);
      newTaskIds.splice(destIndex, 0, taskId);

      const newCol = { ...startCol, taskIds: newTaskIds };
      
      this.saveBoard({
        ...current,
        columns: { ...current.columns, [newCol.id]: newCol }
      });
      return;
    }

    // Moving between columns
    const startTaskIds = Array.from(startCol.taskIds);
    startTaskIds.splice(sourceIndex, 1);
    const newStart = { ...startCol, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishCol.taskIds);
    finishTaskIds.splice(destIndex, 0, taskId);
    const newFinish = { ...finishCol, taskIds: finishTaskIds };
    
    // Update task status
    const newTasks = { ...current.tasks };
    newTasks[taskId] = { ...newTasks[taskId], status: destColId };

    this.saveBoard({
      ...current,
      tasks: newTasks,
      columns: { 
        ...current.columns, 
        [newStart.id]: newStart, 
        [newFinish.id]: newFinish 
      }
    });
  }
}
