import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Select,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Task, useStores } from '@services';
import { CreateTaskModal, TaskInfoCard } from '@components';

import styles from './tasks.module.scss';

const MorePopover = observer(({ task }: { task: Task }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { taskStore } = useStores();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <IconButton
          color={'error'}
          onClick={() => {
            void taskStore.deleteTask(task.id);
          }}
          aria-label="delete"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Popover>
    </>
  );
});

const Tasks = observer(() => {
  const { tableStore, taskStore } = useStores();

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showInfoTaskModal, setShowInfoTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <CssBaseline />

          <Button
            onClick={() => {
              setShowCreateTaskModal(true);
            }}
            sx={{ display: 'grid', width: '100%', justifyContent: 'center' }}
          >
            Создать Задачу
          </Button>
        </ListItem>
        <Divider />
        {taskStore.tasks.map((task) => (
          <ListItem
            key={task.id}
            disableGutters
            secondaryAction={<MorePopover key={task.id} task={task} />}
          >
            <Box className={styles.taskCell}>
              <ListItemText
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSelectedTask(task);
                  setShowInfoTaskModal(true);
                }}
                primary={task.name}
              />

              <FormControl>
                <InputLabel id="select_id">Статус</InputLabel>
                <Select
                  labelId="select_id"
                  value={task.status || ''}
                  label="Статус"
                  onChange={({ target }) => {
                    void taskStore.updateTask({
                      ...task,
                      status: target.value,
                    });
                  }}
                >
                  {tableStore.activeTable?.workflow.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </ListItem>
        ))}
      </List>
      <CreateTaskModal
        open={showCreateTaskModal}
        handleClose={() => setShowCreateTaskModal(false)}
      />
      {selectedTask && (
        <TaskInfoCard
          open={showInfoTaskModal}
          handleClose={() => setShowInfoTaskModal(false)}
          task={selectedTask}
        />
      )}
    </>
  );
});

export { Tasks };
