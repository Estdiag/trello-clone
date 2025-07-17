// tests/mocks/boardStoreMock.ts  (la ruta es libre; lo importante es usarla en jest.mock)

import type { Board } from "../types/board";

export const addTask = jest.fn();
export const updateTask = jest.fn();
export const board: Board = {
    tasks: {},
    id: "12345",
    title: "",
    columnOrder: [],
    columns: {}
};

export const useBoardStore = () => ({
  addTask,
  updateTask,
  board,
});
