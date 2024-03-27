import { Table as TableInterface, Task } from '@services';
import { useDropCustom } from '@hooks';

import { Table } from '../table';
import { TaskCard } from '../task-card';

import { TaskTableHeader } from './components';

import styles from './task-table.module.scss';
import { observer } from 'mobx-react-lite';

interface TaskTable {
  table: TableInterface;
  tasks: Task[];
}

const TableCell = observer(
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

const TaskTable = (props: TaskTable) => {
  const { table, tasks } = props;
  const tableColumnWidth = table.workflow.map(() => 'auto');

  return (
    <Table columnWidths={tableColumnWidth}>
      <TaskTableHeader table={table} />
      <Table.Row>
        {table.workflow.map((status) => {
          return (
            <TableCell
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          );
        })}
      </Table.Row>
    </Table>
  );
};

export { TaskTable };
