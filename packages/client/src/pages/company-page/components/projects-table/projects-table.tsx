import { Project } from '@services';
import { Table } from '@components';
import { ProjectTableBody, ProjectTableHeader } from './components';

interface ProjectsTable {
  projects: Project[];
}

const ProjectsTable = (props: ProjectsTable) => {
  const { projects } = props;

  return (
    <Table columnWidths={['60px', '50%', '25%', 'auto', '40px', '40px']}>
      <ProjectTableHeader />
      <ProjectTableBody projects={projects} />
    </Table>
  );
};

export { ProjectsTable };
