import { useCallback, useState } from 'react';
import { useBoardStore } from '../store/boardStore';

export function useColumnActions({ columnId }: { columnId?: string }) {
  const { addColumn, board, updateColumn } = useBoardStore();
  const column = columnId ? board.columns[columnId] : null;
  const [title, setTitle] = useState(column?.title || '');

  // create a new column
  const createColumn = useCallback(() => {
    const trimmed = title.trim().replace(/\s+/g, ' ');
    if (!trimmed) return;
    addColumn(trimmed);
    setTitle('');
  }, [title, addColumn]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const editColumnTitle = useCallback(() => {
    if (!title.trim() || !columnId) return;
    updateColumn(columnId, {
      title,
    });
  }, [columnId, title, updateColumn]);

  const handleCancel = useCallback(() => {
    setTitle(column?.title ?? '');
  }, [column?.title]);

  return {
    createColumn,
    handleChange,
    columnTitle: title,
    editColumnTitle,
    handleCancel,
  };
}
