import { useRef, useEffect, useState } from 'react';
import Button from '../basic/Button';
import { useColumnActions } from '../../hooks/useColumnActions';

export default function AddColumn() {
  const { createColumn, columnTitle, handleChange } = useColumnActions({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createColumn();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <Button
        onClick={() => {
          setIsAdding(true);
        }}
      >
        crear nueva columna
      </Button>
    );
  }

  return (
    <>
      <form className="mb-2" onSubmit={handleFormSubmit}>
        <input
          id="cardTitle"
          ref={inputRef}
          value={columnTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsAdding(false)}
          placeholder="Título de la columna…"
          name="title"
          required
          aria-label="Título de la columna"
        />

        <div className="mt-2 flex gap-2">
          <Button type="submit" disabled={!columnTitle.trim()}>
            Crear
          </Button>
        </div>
      </form>
    </>
  );
}
