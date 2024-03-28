import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  CssBaseline,
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
import { CreateTaskModal } from '@components';

const MorePopover = observer(({ task }: { task: Task }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { taskStore } = useStores();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        {taskStore.tasks.map((task) => (
          <ListItem
            key={task.id}
            disableGutters
            secondaryAction={<MorePopover key={task.id} task={task} />}
          >
            <ListItemText primary={task.name} />

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
          </ListItem>
        ))}
      </List>
      <CreateTaskModal
        open={showCreateTaskModal}
        handleClose={() => setShowCreateTaskModal(false)}
      />
    </>
  );
});

export { Tasks };
