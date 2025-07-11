// src/components/TaskModal.tsx
import { useEffect, useRef } from 'react';
import { useTaskActions } from '../../hooks/useTaskActions';

interface Props {
  taskId: string;
  onClose: () => void;
}

export default function TaskModal({ taskId, onClose }: Props) {
  const { handleChangeUpdate, editTask, taskValues } = useTaskActions({
    taskId,
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => dialogRef.current?.showModal(), []);

  const handleSave = () => {
    editTask();
    onClose();
  };

  return (
    <dialog ref={dialogRef} onCancel={onClose}>
      <h3>Editar tarjeta</h3>
      <form
        action=""
        onSubmit={e => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label>
          Título
          <input
            value={taskValues.title}
            onChange={e => handleChangeUpdate(e)}
            required
            name="title"
          />
        </label>

        <label>
          Descripción
          <textarea
            rows={4}
            value={taskValues.description}
            onChange={e => handleChangeUpdate(e)}
            name="description"
          />
        </label>

        <button type="submit">Guardar</button>
        <button onClick={onClose} type="button">
          Cancelar
        </button>
      </form>
    </dialog>
  );
}
