import { Box, Button, Grid } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { TableNavbar } from '@components';
import { useStores } from '@services';
import { CloseSprintDialog, Tasks, TaskTable } from './components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SprintInfoModal } from './components/sprint-info-modal';

const TablePage = observer(() => {
  const { projectStore, tableStore, taskStore } = useStores();
  const { id } = useParams();

  const [navbarValue, setNavbarValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSprintInfo, setOpenSprintInfo] = useState(false);

  useEffect(() => {
    void projectStore.getProjectData(id || '');

    return () => {
      tableStore.destroyTableStore();
      taskStore.destroyTaskStore();
    };
  }, [openSprintInfo]);

  useEffect(() => {
    void tableStore.setActiveTable(projectStore.project?.table);
    void taskStore.setTasks(projectStore.project?.task || []);
  }, [projectStore.project]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <TableNavbar value={navbarValue} setValue={setNavbarValue} />
        </Grid>

        <Grid item xs={10}>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
            <Button
              variant={'outlined'}
              onClick={() => setOpenDialog(true)}
              // onClick={() => console.log(taskStore.tasks)}
            >
              Завершить спринт
            </Button>
          </Box>
          {navbarValue === 0 && (
            <DndProvider backend={HTML5Backend} options={HTML5toTouch}>
              <TaskTable />
            </DndProvider>
          )}
          {navbarValue === 1 && <Tasks />}
        </Grid>
      </Grid>
      <CloseSprintDialog
        isOpen={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleClickAgree={() => {
          setOpenSprintInfo(true);
          setOpenDialog(false);
        }}
      />
      <SprintInfoModal
        isOpen={openSprintInfo}
        handleClose={() => setOpenSprintInfo(false)}
        tasks={taskStore.tasks}
      />
    </>
  );
});

export { TablePage };
