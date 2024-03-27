import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, IconButton } from '@mui/material';

import { Project, useStores } from '@services';
import { CreateProjectModal, Table } from '@components';

import { routeToTableId } from '@data';
import styles from './project-table-body.module.scss';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { stringAvatar } from '@shared';
import { UpdateProjectModal } from '../../../../../../components/modals/update-project-modal.tsx';

interface ProjectTableBody {
  projects: Project[];
}

const ProjectTableBody = observer((props: ProjectTableBody) => {
  const { projects } = props;
  const { projectStore } = useStores();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editableProject, setEditableProject] = useState<Project>();

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
          <Table.Cell className={styles.tableCeil}>
            {project?.photo ? (
              <Avatar alt="img_alt" src={project.photo} />
            ) : (
              <Avatar {...stringAvatar(project.name)} />
            )}
          </Table.Cell>
          <Table.Cell className={styles.tableCeil}>{project.name}</Table.Cell>

          <Table.Cell className={styles.tableCeil}>{project.type}</Table.Cell>
          <Table.Cell className={styles.tableCeil}>
            {format(project.createdAt, 'yyyy-MM-dd HH:mm')}
          </Table.Cell>

          <Table.Cell className={styles.tableCeil}>
            <IconButton
              color="success"
              onClick={(event) => {
                event.stopPropagation();
                setEditableProject(project);
                setShowUpdateModal(true);
              }}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Table.Cell>
          <Table.Cell className={styles.tableCeil}>
            <IconButton
              color={'error'}
              onClick={(event) => {
                event.stopPropagation();
                void projectStore.deleteProject(project.id);
              }}
              aria-label="delete"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Table.Cell>
        </Table.Row>
      ))}
      <CreateProjectModal
        open={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      />
      {editableProject && (
        <UpdateProjectModal
          project={editableProject}
          open={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
});

export { ProjectTableBody };
