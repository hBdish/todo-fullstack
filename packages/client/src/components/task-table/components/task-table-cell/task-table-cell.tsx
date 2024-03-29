import { observer } from 'mobx-react-lite';

import { Task } from '@services';
import { useDropCustom } from '@hooks';
import { Table, TaskCard, TaskInfoCard } from '@components';

import styles from '../../task-table.module.scss';
import { classNames } from '@shared';
import { useState } from 'react';

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

    const [showInfoTaskModal, setShowInfoTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const renderTaskCard = (task: Task) => (
      <TaskCard
        onClick={() => {
          setSelectedTask(task);
          setShowInfoTaskModal(true);
        }}
        task={task}
        key={task.id}
      />
    );

    return (
      <>
        <Table.Cell
          className={classNames(styles.taskTableCell, {}, [className])}
          key={status}
          myRef={dropValue}
        >
          {tasks.map((task) => {
            return renderTaskCard(task);
          })}
        </Table.Cell>
        {selectedTask && (
          <TaskInfoCard
            open={showInfoTaskModal}
            handleClose={() => setShowInfoTaskModal(false)}
            task={selectedTask}
          />
        )}
      </>
    );
  },
);

export { TaskTableCell };
