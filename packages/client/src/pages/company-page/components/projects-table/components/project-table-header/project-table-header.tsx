import { Table } from '@components';

const ProjectTableHeader = () => {
  return (
    <Table.Row>
      <Table.HeaderCell></Table.HeaderCell>
      <Table.HeaderCell>Имя</Table.HeaderCell>
      <Table.HeaderCell>Тип</Table.HeaderCell>
      <Table.HeaderCell>Время последнего изменения</Table.HeaderCell>
      <Table.HeaderCell></Table.HeaderCell>
      <Table.HeaderCell></Table.HeaderCell>
    </Table.Row>
  );
};

export { ProjectTableHeader };
