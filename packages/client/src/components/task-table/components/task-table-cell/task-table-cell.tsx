import { observer } from 'mobx-react-lite';

import { Task } from '@services';
import { useDropCustom } from '@hooks';
import { Table, TaskCard } from '@components';

import styles from '../../task-table.module.scss';
import { classNames } from '@shared';

const TaskTableCell = observer(
  ({
    status,
    tasks,
    className,
  }: {
    status: string;
    tasks: Task[];
    className: string;
  }) => {
    const [dropValue] = useDropCustom(status);

    const renderTaskCard = (task: Task) => (
      <TaskCard task={task} key={task.id} />
    );

    return (
      <Table.Cell
        className={classNames(styles.taskTableCell, {}, [className])}
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
