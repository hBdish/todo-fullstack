import { Table } from '@components';
import { Table as TableInterface } from '@services';

import styles from './task-table-header.module.scss';

interface TaskTableHeader {
  table: TableInterface;
}

const TaskTableHeader = (props: TaskTableHeader) => {
  const { table } = props;
  return (
    <Table.Row>
      {table.workflow.map((workStatus) => {
        return (
          <Table.HeaderCell
            className={styles.taskTableCellHeader}
            key={workStatus}
          >
            {workStatus}
          </Table.HeaderCell>
        );
      })}
    </Table.Row>
  );
};

export { TaskTableHeader };
