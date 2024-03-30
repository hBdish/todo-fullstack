import { format } from 'date-fns';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, IconButton, Typography } from '@mui/material';

import { Project, useStores } from '@services';
import { UpdateProjectModal, Table } from '@components';
import { routeToTableId } from '@data';
import { stringAvatar } from '@shared';

import styles from './project-table-body.module.scss';

interface ProjectTableBody {
  projects: Project[];
}

const ProjectTableBody = observer((props: ProjectTableBody) => {
  const { projects } = props;
  const {
    projectStore,
    companyStore,
    userStore: { user },
  } = useStores();
  const navigate = useNavigate();

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
          <Table.Cell className={styles.tableCell}>
            {project?.photo ? (
              <Avatar alt="img_alt" src={project.photo} />
            ) : (
              <Avatar {...stringAvatar(project.name)} />
            )}
          </Table.Cell>
          <Table.Cell className={styles.tableCell}>{project.name}</Table.Cell>

          <Table.Cell className={styles.tableCell}>{project.type}</Table.Cell>
          <Table.Cell className={styles.tableCell}>
            <Typography>
              {format(
                project?.updatedAt || project.createdAt,
                'dd.MM.yy HH:mm',
              )}
            </Typography>
          </Table.Cell>

          <Table.Cell className={styles.tableCell}>
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
          <Table.Cell className={styles.tableCell}>
            <IconButton
              color={'error'}
              onClick={(event) => {
                event.stopPropagation();
                void projectStore
                  .deleteProject(project.id)
                  .then(
                    () => void companyStore.getCompanyData(user.company.id),
                  );
              }}
              aria-label="delete"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Table.Cell>
        </Table.Row>
      ))}

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
