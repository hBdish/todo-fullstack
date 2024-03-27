import { useDrop } from 'react-dnd';
import { Task, useStores } from '@services';

export const useDropCustom = (value: string) => {
  const { taskStore } = useStores();

  const [, dropDone] = useDrop<{
    type: string;
    task: Task;
    status: string;
  }>(
    () => ({
      accept: 'task',
      drop: ({ task }) => {
        void taskStore.updateTask({ ...task, status: value });
      },
      collect: (monitor) => ({
        isOverDone: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return [dropDone];
};
