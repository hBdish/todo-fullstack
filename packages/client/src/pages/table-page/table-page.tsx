import { Box, Grid } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { TableNavbar } from '@components';
import { useStores } from '@services';
import { Tasks, TaskTable } from './components';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TablePage = observer(() => {
  const { projectStore, tableStore, taskStore } = useStores();
  const { id } = useParams();
  const [navbarValue, setNavbarValue] = useState(0);

  useEffect(() => {
    void projectStore.getProjectData(id || '');

    return () => {
      tableStore.destroyTableStore();
      taskStore.destroyTaskStore();
    };
  }, []);

  useEffect(() => {
    void tableStore.setActiveTable(projectStore.project?.table);
    void taskStore.setTasks(projectStore.project?.task || []);
  }, [projectStore.project]);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TableNavbar value={navbarValue} setValue={setNavbarValue} />
      </Grid>
      <Grid item xs={10}>
        {navbarValue === 0 && (
          <DndProvider backend={HTML5Backend} options={HTML5toTouch}>
            <TaskTable />
          </DndProvider>
        )}
        {navbarValue === 1 && <Tasks />}
      </Grid>
    </Grid>
  );
});

export { TablePage };
