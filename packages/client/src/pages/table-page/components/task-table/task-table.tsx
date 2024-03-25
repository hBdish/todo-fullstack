import { observer } from 'mobx-react-lite';
import { TaskTable as TaskTableComponent } from '@components';
import { useStores } from '@services';

const TaskTable = observer(() => {
  const {
    tableStore: { activeTable },
    taskStore: { tasks },
  } = useStores();

  if (!activeTable) {
    return <>Error</>;
  }

  return <TaskTableComponent table={activeTable} tasks={tasks} />;
});

export { TaskTable };
