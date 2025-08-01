import { renderHook, act } from '@testing-library/react';
import { useBoardStore } from '../store/boardStore';
import { useColumnActions } from '../hooks/useColumnActions';

describe('useColumnActions - createColumn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('crea una columna con título válido', () => {
    const spy = jest.spyOn(useBoardStore.getState(), 'addColumn');
    const { result } = renderHook(() => useColumnActions({}));
    const columnName = 'Nueva columna';
    act(() => {
      result.current.handleChange({
        target: { value: columnName },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.createColumn();
    });
    expect(spy).toHaveBeenCalledWith(columnName);
  });
  it('no llama a addColumn si el título está vacío', () => {
    const { result } = renderHook(() => useColumnActions({}));
    const spy = jest.spyOn(useBoardStore.getState(), 'addColumn');

    act(() => {
      result.current.createColumn();
    });

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('useColumnActions - EditColumn', () => {
   beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Edita el nombre de una columna', () => {
    const spy = jest.spyOn(useBoardStore.getState(), 'updateColumn');
    const { board } = useBoardStore.getState();
    const columnId = board.columnOrder[board.columnOrder.length - 1];
    const { result } = renderHook(() => useColumnActions({ columnId }));
    const title = 'Nueva columna editadaaaa';
    act(() => {
      result.current.handleChange({
        target: { value: title },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.editColumnTitle();
    });
    expect(spy).toHaveBeenCalledWith(columnId, { title });
  });

  it('No edita el nombre de una columna si el titulo es vacio', () => {
    const spy = jest.spyOn(useBoardStore.getState(), 'updateColumn');
    const { board } = useBoardStore.getState();
    const columnId = board.columnOrder[board.columnOrder.length - 1];   
    const { result } = renderHook(() => useColumnActions({ columnId }));
    const title = '';
    act(() => {
      result.current.handleChange({
        target: { value: title },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.editColumnTitle();
    });

    expect(spy).not.toHaveBeenCalled();
  });
});
