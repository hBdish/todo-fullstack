import { Table as TableInterface, Task } from '@services';
import { Table } from '../table';
import { useEffect } from 'react';

interface TaskTable {
  table: TableInterface;
  tasks: Task;
}

const TaskTable = (props: TaskTable) => {
  const { table, tasks } = props;
  const tableColumnWidth = table.workflow.map(() => 'auto');

  useEffect(() => {}, [tasks]);

  return (
    <Table columnWidths={tableColumnWidth}>
      <Table.Row>
        {table.workflow.map((workStatus) => {
          return <Table.Cell key={workStatus}>{workStatus}</Table.Cell>;
        })}
      </Table.Row>

      <Table.Row></Table.Row>
    </Table>
  );
};

export { TaskTable };
