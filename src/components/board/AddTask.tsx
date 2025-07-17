import { useRef, useEffect} from 'react';
import { useTaskActions } from '../../hooks/useTaskActions';
import Button from '../basic/Button';

export default function AddTask({
  isAdding,
  columnId,
  addToggle,
}: {
  isAdding: boolean;
  columnId: string;
  addToggle: (value: boolean) => void;
}) {
 const { createTask, taskTitle, handleChangeCreate, handleClear } = useTaskActions({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]); 

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask({ columnId });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      addToggle(false);
      handleClear();
    }
  };

  if (!isAdding) {
    return <Button onClick={() => addToggle(true)}>agregar</Button>;
  }

  return (
    <>
      <form className="mb-2" onSubmit={handleFormSubmit}>
        <input
          id="cardTitle"
          ref={inputRef}
          value={taskTitle}
          onChange={handleChangeCreate}
          onKeyDown={handleKeyDown}
          placeholder="Título de la tarjeta…"
          name="title"
          required
          aria-label="Título de la tarjeta"
        />

        <div className="mt-2 flex gap-2">
          <Button type="submit" disabled={!taskTitle.trim()}>
            Añadir
          </Button>
          <Button
            type="button"
            onClick={() => {
              addToggle(false);
              handleClear();
            }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
}
