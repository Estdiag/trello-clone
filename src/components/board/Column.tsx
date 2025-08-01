import { useState, useCallback } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCardContainer from './TaskCardContainer';
import { useBoardStore } from '../../store/boardStore';
import AddTask from './AddTask';
import ColumnTitle from './ColumnTitle';

export default function Column({ columnId }: { columnId: string }) {
  const { board } = useBoardStore();
  const column = board.columns[columnId];
  const [isAdding, setIsAdding] = useState(false);

  const addToggle = useCallback((value: boolean) => {
    setIsAdding(value);
  }, []);

  if (!column) {
    return null;
  }
  return (
    <section aria-label={column.title} style={{ minWidth: 260 }}>
     <ColumnTitle columnId={columnId} />

      <Droppable droppableId={columnId}>
        {p => (
          <div
            ref={p.innerRef}
            {...p.droppableProps}
            style={{ minHeight: 120, border: '1px solid #ccc', padding: 8 }}
          >
            {column.taskIds.map((taskId, idx) => (
              <TaskCardContainer key={taskId} id={taskId} index={idx} />
            ))}
            {p.placeholder}
          </div>
        )}
      </Droppable>

      <AddTask isAdding={isAdding} columnId={columnId} addToggle={addToggle} />
    </section>
  );
}
