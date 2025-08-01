import { useEffect, useState, useRef } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { useColumnActions } from '../../hooks/useColumnActions';

export default function ColumnTitle({ columnId }: { columnId: string }) {
  const { board } = useBoardStore();
  const { editColumnTitle, handleChange, columnTitle, handleCancel } =
    useColumnActions({ columnId });
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const column = board.columns[columnId];

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editColumnTitle();
    setEditing(false)
  };

  const handleCancelEdit=()=>{
    handleCancel()
    setEditing(false)
  }

  if (editing) {
    return (
      <>
        <form className="mb-2" onSubmit={handleFormSubmit}>
          <input
            id="columnTitle"
            ref={inputRef}
            value={columnTitle}
            onChange={handleChange}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
            placeholder="Título de la columna…"
            name="title"
            required
            aria-label="Título de la columna…"
          />

          <div className="mt-2 flex gap-2">
            <button type="submit" disabled={!columnTitle.trim()}>
              Actualizar
            </button>
            <button
              type="button"
              onClick={() => {
                handleCancelEdit();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </>
    );
  }
  return (
    <div onDoubleClick={() => setEditing(true)}>
      <h2>{column.title}</h2>
    </div>
  );
}
