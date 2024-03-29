import { Table } from '@components';

import styles from './project-table-header.module.scss';

const ProjectTableHeader = () => {
  return (
    <Table.Row>
      <Table.HeaderCell className={styles.tableHeader}></Table.HeaderCell>
      <Table.HeaderCell className={styles.tableHeader}>Имя</Table.HeaderCell>
      <Table.HeaderCell className={styles.tableHeader}>Тип</Table.HeaderCell>
      <Table.HeaderCell className={styles.tableHeader}>
        Время последнего изменения
      </Table.HeaderCell>
      <Table.HeaderCell className={styles.tableHeader}></Table.HeaderCell>
      <Table.HeaderCell className={styles.tableHeader}></Table.HeaderCell>
    </Table.Row>
  );
};

export { ProjectTableHeader };
