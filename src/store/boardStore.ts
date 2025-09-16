import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Board } from '../types/board';
import type { Column } from '../types/column';
import type { Task } from '../types/task';
import { removeAllSpaces } from '../utils/textFormater';

const initialBoard: Board = {
  id: 'board-1',
  title: 'Mi tablero',
  columnOrder: ['done', 'todo'],
  columns: {
    todo: { id: 'todo', title: 'Todo', taskIds: [] },
    done: { id: 'done', title: 'Doooone', taskIds: [] },
  },
  tasks: {},
};

type State = {
  board: Board;
  addTask: (columnId: string, title: string) => void;
  moveTask: (from: string, to: string, taskId: string, toIdx: number) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addColumn: (title: string) => void;
  updateColumn: (columnId: string, updates: Partial<Column>) => void;
};

export const useBoardStore = create<State>()(
  persist(
    (set, get) => ({
      board: initialBoard,

      addTask: (columnId, title) => {
        const { board } = get();
        const id = uuid();
        const newTasks = { ...board.tasks, [id]: { id, title } as Task };
        const newCol = {
          ...board.columns[columnId],
          taskIds: [...board.columns[columnId].taskIds, id],
        };
        set({
          board: {
            ...board,
            tasks: newTasks,
            columns: { ...board.columns, [columnId]: newCol },
          },
        });
      },

      moveTask: (from, to, taskId, toIdx) => {
        if (from === to) return;
        const { board } = get();

        const fromIds = board.columns[from].taskIds.filter(id => id !== taskId);
        const toIds = [...board.columns[to].taskIds];
        toIds.splice(toIdx, 0, taskId);

        set({
          board: {
            ...board,
            columns: {
              ...board.columns,
              [from]: { ...board.columns[from], taskIds: fromIds },
              [to]: { ...board.columns[to], taskIds: toIds },
            },
          },
        });
      },
      updateTask: (taskId, updates) => {
        const { board } = get();
        const task = board.tasks[taskId];
        if (!task) return;

        set({
          board: {
            ...board,
            tasks: {
              ...board.tasks,
              [taskId]: { ...task, ...updates },
            },
          },
        });
      },
      addColumn: title => {
        const { board } = get();
        const id = removeAllSpaces(title);
        const newColumns = {
          ...board.columns,
          [id]: { id, title, taskIds: [] } as Column,
        };

        set({
          board: {
            ...board,
            columnOrder: [...board.columnOrder, id],
            columns: newColumns,
          },
        });
      },
      updateColumn: (columnId, updates) => {
        const { board } = get();
        const column = board.columns[columnId];
        if (!column) return;
        set({
          board: {
            ...board,
            columns: {
              ...board.columns,
              [columnId]: { ...column, ...updates },
            },
          },
        });
      },
    }),
    { name: 'trello-clone' }
  )
);
