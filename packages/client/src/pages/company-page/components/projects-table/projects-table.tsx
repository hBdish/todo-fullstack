import { Project } from '@services';
import { Table } from '@components';
import { ProjectTableBody, ProjectTableHeader } from './components';

interface ProjectsTable {
  projects: Project[];
}

const ProjectsTable = (props: ProjectsTable) => {
  const { projects } = props;
  console.log(projects);
  return (
    <Table columnWidths={['50%', '25%', '25%']}>
      <ProjectTableHeader />
      <ProjectTableBody projects={projects} />
    </Table>
  );
};

export { ProjectsTable };
