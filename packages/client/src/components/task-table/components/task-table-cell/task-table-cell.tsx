import { observer } from 'mobx-react-lite';

import { Task } from '@services';
import { useDropCustom } from '@hooks';
import { Table, TaskCard } from '@components';

import styles from '../../task-table.module.scss';

const TaskTableCell = observer(
  ({ status, tasks }: { status: string; tasks: Task[] }) => {
    const [dropValue] = useDropCustom(status);

    const renderTaskCard = (task: Task) => (
      <TaskCard task={task} key={task.id} />
    );

    return (
      <Table.Cell
        className={styles.taskTableCell}
        key={status}
        myRef={dropValue}
      >
        {tasks.map((task) => {
          return renderTaskCard(task);
        })}
      </Table.Cell>
    );
  },
);

export { TaskTableCell };
