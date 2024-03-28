import { Table } from '@components';
import { Table as TableInterface } from '@services';

import styles from './task-table-header.module.scss';
import { Typography } from '@mui/material';

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
            <Typography> {workStatus.toUpperCase()}</Typography>
          </Table.HeaderCell>
        );
      })}
    </Table.Row>
  );
};

export { TaskTableHeader };
