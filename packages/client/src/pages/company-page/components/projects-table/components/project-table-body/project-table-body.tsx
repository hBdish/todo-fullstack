import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { Project } from '@services';
import { Table } from '@components';
import { routeToTableId } from '@data';

import styles from './project-table-body.module.scss';

interface ProjectTableBody {
  projects: Project[];
}

const ProjectTableBody = (props: ProjectTableBody) => {
  const { projects } = props;
  const navigate = useNavigate();

  const onTableRowClick = (id: string) => {
    navigate(routeToTableId(id));
  };

  return (
    <>
      {projects.map((project) => (
        <Table.Row
          key={project.id}
          className={styles.tableRow}
          onClick={() => onTableRowClick(project.id)}
        >
          <Table.Cell className={styles.tableCeil}>{project.name}</Table.Cell>

          <Table.Cell className={styles.tableCeil}>{project.type}</Table.Cell>
          <Table.Cell className={styles.tableCeil}>
            {format(project.createdAt, 'yyyy-MM-dd HH:mm')}
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export { ProjectTableBody };
