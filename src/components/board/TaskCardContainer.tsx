import { Draggable } from '@hello-pangea/dnd';
import TaskCardContent from './TaskCardContent';

export default function TaskCardContainer({
  id,
  index,
}: {
  id: string;
  index: number;
}) {
  return (
    <Draggable draggableId={id} index={index}>
      {p => (
        <div
          ref={p.innerRef}
          {...p.draggableProps}
          {...p.dragHandleProps}
          style={{
             marginBottom: 8,
            ...p.draggableProps.style,
          }}
        >
          <TaskCardContent id={id} />
        </div>
      )}
    </Draggable>
  );
}
