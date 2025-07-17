import { renderHook, act } from '@testing-library/react';
import { useTaskActions } from '../hooks/useTaskActions';
import { addTask, board } from './boardStoreMock';
import { useBoardStore } from '../store/boardStore';

describe('useTaskActions - createTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    board.tasks = {};
  });

  it('no llama a addTask si el título está vacío', () => {
    const { result } = renderHook(() => useTaskActions({}));

    act(() => {
      result.current.createTask({ columnId: 'todo' });
    });

    expect(addTask).not.toHaveBeenCalled();
  });

  it('crea una tarea con título válido', () => {
    const spy = jest.spyOn(useBoardStore.getState(), 'addTask');
    const { result } = renderHook(() => useTaskActions({}));
    act(() => {
      result.current.handleChangeCreate({
        target: { value: 'Nueva tarea' },
      } as React.ChangeEvent<HTMLInputElement>);

    });
    act(() => {
      result.current.createTask({ columnId: 'todo' })
    })
    expect(spy).toHaveBeenCalledWith('todo', 'Nueva tarea')
  });

  it('crea una tarea haciendo trim del titulo', () => {
    const spy = jest.spyOn(useBoardStore.getState(), 'addTask');
    const { result } = renderHook(() => useTaskActions({}));
    act(() => {
      result.current.handleChangeCreate({
        target: { value: '     Nueva       tarea    ' },
      } as React.ChangeEvent<HTMLInputElement>);

    });
    act(() => {
      result.current.createTask({ columnId: 'todo' })
    })
    expect(spy).toHaveBeenCalledWith('todo', 'Nueva tarea')
  });

  it('crea una tarea y limpia el valor del titulo', () => {    
    const { result } = renderHook(() => useTaskActions({}));
    act(() => {
      result.current.handleChangeCreate({
        target: { value: '     Nueva       tarea    ' },
      } as React.ChangeEvent<HTMLInputElement>);

    });
    act(() => {
      result.current.createTask({ columnId: 'todo' })
    })
    expect(result.current.taskTitle).toBe('');
  });
});

describe('useTaskActions - editTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Edita una tarea', () => {
    const spy = jest.spyOn(useBoardStore.getState(), 'updateTask');
    const taskName= 'Nueva tarea para editar' ;   
    let taskId = '';
    const { result } = renderHook(() => useTaskActions({taskId}));
    act(() => {
      result.current.handleChangeCreate({
        target: { value: taskName },
      } as React.ChangeEvent<HTMLInputElement>);
      
    });
    act(() => {
      result.current.createTask({ columnId: 'todo' })
    })
    const { board } = useBoardStore.getState()
    taskId = Object.values(board.tasks).find(task => task.title === taskName)?.id||'';
    const updatTaskProperties = {
      title: 'Tarea editada desde pruebas',
      description: 'Tarea editada desde pruebas descripción',
    };
    act(() => {
      result.current.handleChangeUpdate({
        target: {name: 'title' , value: updatTaskProperties.title },
      } as React.ChangeEvent<HTMLInputElement>);

    });
    act(() => {
      result.current.handleChangeUpdate({
        target: {name: 'description' , value: updatTaskProperties.description },
      } as React.ChangeEvent<HTMLInputElement>);

    });
    act(() => {
      result.current.editTask()
    })
    
    expect(spy).toHaveBeenCalledWith(taskId, updatTaskProperties)
  });

  it('No edita una tarea si el título está vacío', () => {
    const spy = jest.spyOn(useBoardStore.getState(), 'updateTask');
    const taskName= 'Tarea para editar' ;   
    let taskId = '';
    const { result } = renderHook(() => useTaskActions({taskId}));
    act(() => {
      result.current.handleChangeCreate({
        target: { value: taskName },
      } as React.ChangeEvent<HTMLInputElement>);
      
    });
    act(() => {
      result.current.createTask({ columnId: 'todo' })
    })
    const { board } = useBoardStore.getState()
    taskId = Object.values(board.tasks).find(task => task.title === taskName)?.id||'';
    
    act(() => {
      result.current.editTask()
    })
    
    expect(spy).not.toHaveBeenCalled();
  });
});
