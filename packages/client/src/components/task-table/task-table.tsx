import { Table as TableInterface, Task } from '@services';

import { Table } from '../table';

import { TaskTableHeader } from './components';

import styles from './task-table.module.scss';
import { observer } from 'mobx-react-lite';
import { TaskTableCell } from './components/task-table-cell';

interface TaskTable {
  table: TableInterface;
  tasks: Task[];
}

const TaskTable = observer((props: TaskTable) => {
  const { table, tasks } = props;
  const tableColumnWidth = table.workflow.map(() => 'auto');

  return (
    <>
      <Table columnWidths={tableColumnWidth}>
        <TaskTableHeader table={table} />
        <Table.Row>
          {table.workflow.map((status) => {
            return (
              <TaskTableCell
                className={styles.taskTableCell}
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
              />
            );
          })}
        </Table.Row>
      </Table>
    </>
  );
});

export { TaskTable };
