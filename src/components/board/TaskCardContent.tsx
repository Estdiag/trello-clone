import { useState } from 'react';
import { useBoardStore } from '../../store/boardStore';
import TaskModal from './TaskModal';

export default function TaskCardContent({ id }: { id: string }) {
  const task = useBoardStore(s => s.board.tasks[id]);
  const [editing, setEditing] = useState(false);

  if (!task) return null;
  return (
    <>
      <div
        style={{
          border: '1px solid #999',
          borderRadius: 4,
          padding: 8,         
          background: '#fff',
          cursor: 'pointer',
        }}
        onDoubleClick={() => setEditing(true)}
      >
        {task.title}
        {task.description && <p>Descripción: {task.description}</p>}
      </div>
      {editing && <TaskModal taskId={id} onClose={() => setEditing(false)} />}
    </>
  );
}
