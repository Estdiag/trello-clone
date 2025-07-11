import { useCallback, useState } from 'react';
import { useBoardStore } from '../store/boardStore';


export function useTaskActions({ taskId }: { taskId?: string }) {
  const { addTask, updateTask, board } = useBoardStore();
  const task = taskId ? board.tasks[taskId] : null;
  const [values, setValues] = useState({
    title: task?.title || '',
    description: task?.description || '',
  });
  const [title, setTitle] = useState('');

  // create a new task
  const createTask = useCallback(
    ({ columnId }: { columnId: string }) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      addTask(columnId, trimmed);
      setTitle('');
    },
    [title, addTask]
  );

  const handleChangeCreate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleClear = useCallback(() => {
    setTitle('');
  }, []);

  // update a task

  const editTask = useCallback(
    () => {
      if (!values.title.trim() || !taskId) return;
      updateTask(taskId, {
        title: values.title,
        description: values.description.trim(),
      });
    },
    [values, updateTask, taskId]
  );

  const handleChangeUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    [values]
  );

  return {
    createTask,
    handleChangeCreate,
    taskValues: values,
    handleClear,
    editTask,
    handleChangeUpdate,
    taskTitle: title,
  };
}
