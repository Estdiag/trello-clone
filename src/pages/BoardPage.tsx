import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from '../components/board/Column';
import { useBoardStore } from '../store/boardStore';
import AddColumn from '../components/board/AddColumn';

export default function BoardPage() {
  const { board, moveTask } = useBoardStore();

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
   
    if (!destination) return;

    moveTask(
      source.droppableId,
      destination.droppableId,
      draggableId,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: 16, padding: 16, alignItems: 'flex-end' }}>
        {board.columnOrder.map((colId) => (
          <Column key={colId} columnId={colId} />
        ))}
        <AddColumn/>
      </div>
      
    </DragDropContext>
  );
}
